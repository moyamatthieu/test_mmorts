// src/game/GameLoop.ts
/**
 * Boucle de jeu principale.
 * 
 * Responsabilités:
 * - Orchestrer la simulation de jeu
 * - Traiter les commandes (locales et réseau)
 * - Mettre à jour tous les systèmes
 * - Synchronisation lockstep pour le multijoueur
 * 
 * KISS: Une seule classe qui coordonne tous les systèmes.
 */

import {
  type GameState,
  createGameState
} from '../types/GameState';
import type { GameCommand, PlayerId } from '../types/commands';
import { processCommand } from './CommandProcessor';
import { updateAllUnits } from './units/UnitController';
import { processCombat } from './combat/CombatSystem';
import { updateEconomy } from './economy/EconomySystem';
import { P2PManager, type P2PManagerCallbacks } from '../net/P2PManager';

// ============================================================================
// Configuration du GameLoop
// ============================================================================

export const GAME_LOOP_CONFIG = {
  /** Ticks par seconde (simulation) */
  tickRate: 20,
  
  /** Délai fixe entre ticks (ms) */
  tickInterval: 50, // 1000 / 20
  
  /** Mode lockstep (attendre tous les joueurs) */
  lockstepEnabled: false,
  
  /** Frame max sans sync avant timeout */
  maxFramesBehind: 10,
  
  /** Activer les logs de debug */
  debugLogs: false,
};

// ============================================================================
// Types
// ============================================================================

export interface GameLoopCallbacks {
  /** Appelé après chaque tick de simulation */
  onTick?: (state: GameState, deltaTime: number) => void;
  
  /** Appelé quand une unité est créée */
  onUnitSpawned?: (unitId: number, state: GameState) => void;
  
  /** Appelé quand une unité est détruite */
  onUnitDestroyed?: (unitId: number, state: GameState) => void;
  
  /** Appelé quand les ressources changent */
  onResourcesChanged?: (playerId: PlayerId, state: GameState) => void;
  
  /** Appelé quand la partie est terminée */
  onGameOver?: (winnerId: PlayerId | null) => void;
}

export type GameLoopState = 
  | 'STOPPED'
  | 'RUNNING'
  | 'PAUSED'
  | 'WAITING_SYNC';

// ============================================================================
// Classe GameLoop
// ============================================================================

/**
 * Boucle de jeu principale.
 * Orchestre la simulation, le réseau et tous les systèmes de gameplay.
 */
export class GameLoop {
  // État du jeu
  private gameState: GameState;
  
  // État de la boucle
  private loopState: GameLoopState = 'STOPPED';
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private lastTickTime: number = 0;
  
  // Commandes en attente
  private pendingCommands: GameCommand[] = [];
  private localCommandsThisFrame: GameCommand[] = [];
  
  // Callbacks
  private callbacks: GameLoopCallbacks = {};
  
  // Statistiques
  private tickCount: number = 0;
  private frameTime: number = 0;
  private averageTickTime: number = 0;
  
  constructor() {
    this.gameState = createGameState();
    this.setupNetworkCallbacks();
  }
  
  // ============================================================================
  // Initialisation
  // ============================================================================
  
  /**
   * Initialise une nouvelle partie.
   */
  initializeGame(localPlayerId: PlayerId, playerName: string): void {
    this.gameState = createGameState();
    
    // Ajouter le joueur local
    this.gameState.players.set(localPlayerId, {
      id: localPlayerId,
      displayName: playerName,
      color: this.generatePlayerColor(localPlayerId),
      isConnected: true,
      isAI: false,
      resources: {
        credits: 5000,
        metal: 2000,
        crystal: 500,
        fuel: 1000,
        population: 100
      },
      controlledSystems: [],
      unlockedTechnologies: [],
      currentResearch: null,
      diplomacy: new Map(),
      homeSystemId: '',
      score: 0,
      lastActiveFrame: 0
    });
    
    this.gameState.localPlayerId = localPlayerId;
    
    this.log(`Partie initialisée pour ${playerName}`);
  }
  
  /**
   * Configure les callbacks réseau.
   * Utilise l'API de P2PManager avec les bons noms de callbacks.
   */
  private setupNetworkCallbacks(): void {
    P2PManager.getInstance().setCallbacks({
      onCommand: (command, fromPlayer) => {
        this.receiveNetworkCommand(command, fromPlayer);
      },
      onSnapshot: (state, frameNumber) => {
        this.applySyncState(state as Partial<GameState>, frameNumber);
      },
      onGameStart: () => {
        this.start();
      }
    });
  }
  
  // ============================================================================
  // Contrôle de la boucle
  // ============================================================================
  
  /**
   * Démarre la boucle de jeu.
   */
  start(): void {
    if (this.loopState === 'RUNNING') return;
    
    this.loopState = 'RUNNING';
    this.lastTickTime = performance.now();
    
    this.intervalId = setInterval(() => {
      this.tick();
    }, GAME_LOOP_CONFIG.tickInterval);
    
    this.log('Boucle de jeu démarrée');
  }
  
  /**
   * Met en pause la boucle.
   */
  pause(): void {
    if (this.loopState !== 'RUNNING') return;
    
    this.loopState = 'PAUSED';
    
    this.log('Boucle de jeu en pause');
  }
  
  /**
   * Reprend la boucle.
   */
  resume(): void {
    if (this.loopState !== 'PAUSED') return;
    
    this.loopState = 'RUNNING';
    this.lastTickTime = performance.now();
    
    this.log('Boucle de jeu reprise');
  }
  
  /**
   * Arrête la boucle.
   */
  stop(): void {
    this.loopState = 'STOPPED';
    
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.log('Boucle de jeu arrêtée');
  }
  
  /**
   * Récupère l'état de la boucle.
   */
  getState(): GameLoopState {
    return this.loopState;
  }
  
  // ============================================================================
  // Tick principal
  // ============================================================================
  
  /**
   * Exécute un tick de simulation.
   */
  private tick(): void {
    if (this.loopState !== 'RUNNING') return;
    
    const tickStart = performance.now();
    const now = tickStart;
    const deltaTime = (now - this.lastTickTime) / 1000; // En secondes
    this.lastTickTime = now;
    
    // En mode lockstep, attendre les commandes de tous les joueurs
    if (GAME_LOOP_CONFIG.lockstepEnabled) {
      if (!this.processLockstep()) {
        return; // Attendre
      }
    }
    
    // 1. Collecter les commandes de cette frame
    const commands = this.collectCommands();
    
    // 2. Envoyer les commandes locales au réseau
    if (this.localCommandsThisFrame.length > 0) {
      for (const cmd of this.localCommandsThisFrame) {
        P2PManager.getInstance().sendCommand(cmd);
      }
    }
    this.localCommandsThisFrame = [];
    
    // 3. Traiter les commandes (ordonnées pour déterminisme)
    commands.sort((a, b) => {
      // Trier par joueur puis par timestamp
      const playerCompare = (a.playerId || '').localeCompare(b.playerId || '');
      if (playerCompare !== 0) return playerCompare;
      return (a.timestamp || 0) - (b.timestamp || 0);
    });
    
    for (const command of commands) {
      processCommand(this.gameState, command);
    }
    
    // 4. Mettre à jour les systèmes
    this.updateSystems(deltaTime);
    
    // 5. Vérifier les conditions de victoire
    this.checkVictoryConditions();
    
    // 6. Avancer la frame
    this.gameState.currentFrame++;
    this.gameState.gameTime += deltaTime;
    this.tickCount++;
    
    // Statistiques
    this.frameTime = performance.now() - tickStart;
    this.averageTickTime = this.averageTickTime * 0.9 + this.frameTime * 0.1;
    
    // Callback
    this.callbacks.onTick?.(this.gameState, deltaTime);
    
    if (GAME_LOOP_CONFIG.debugLogs && this.tickCount % 100 === 0) {
      this.log(`Frame ${this.gameState.currentFrame}, Avg tick: ${this.averageTickTime.toFixed(2)}ms`);
    }
  }
  
  /**
   * Traite la synchronisation lockstep.
   * Note: Simplifié car P2PManager gère le lockstep en interne via tickLockstep().
   */
  private processLockstep(): boolean {
    const frame = this.gameState.currentFrame;
    const p2pFrame = P2PManager.getInstance().frame;
    
    // Vérifier si on est trop en retard par rapport au réseau
    const framesBehind = p2pFrame - frame;
    
    if (framesBehind > GAME_LOOP_CONFIG.maxFramesBehind) {
      console.warn(`[GameLoop] Trop de frames de retard (${framesBehind}), resync nécessaire`);
      // Demander un snapshot pour resync
      P2PManager.getInstance().sendSnapshot(this.getSnapshot());
      this.loopState = 'WAITING_SYNC';
      return false;
    }
    
    if (this.loopState === 'WAITING_SYNC') {
      this.loopState = 'RUNNING';
    }
    
    return true;
  }
  
  // ============================================================================
  // Commandes
  // ============================================================================
  
  /**
   * Ajoute une commande locale.
   */
  queueCommand(command: GameCommand): void {
    command.timestamp = Date.now();
    command.playerId = this.gameState.localPlayerId || '';
    
    this.pendingCommands.push(command);
    this.localCommandsThisFrame.push(command);
  }
  
  /**
   * Reçoit une commande du réseau.
   */
  private receiveNetworkCommand(command: GameCommand, fromPlayer: PlayerId): void {
    command.playerId = fromPlayer;
    this.pendingCommands.push(command);
  }
  
  /**
   * Collecte les commandes pour cette frame.
   */
  private collectCommands(): GameCommand[] {
    const commands = [...this.pendingCommands];
    this.pendingCommands = [];
    
    // En lockstep, les commandes des peers arrivent via le callback onCommand
    // et sont déjà ajoutées à pendingCommands via receiveNetworkCommand()
    // Pas besoin de les récupérer manuellement ici.
    
    return commands;
  }
  
  // ============================================================================
  // Mise à jour des systèmes
  // ============================================================================
  
  /**
   * Met à jour tous les systèmes de jeu.
   */
  private updateSystems(deltaTime: number): void {
    // 1. Mise à jour des unités (mouvement, rotation, régénération)
    updateAllUnits(this.gameState, deltaTime);
    
    // 2. Combat
    const combatLog = processCombat(this.gameState);
    
    // Notifier les destructions
    for (const attack of combatLog.attacks) {
      if (attack.isKill) {
        this.callbacks.onUnitDestroyed?.(attack.targetId, this.gameState);
      }
    }
    
    // 3. Économie
    updateEconomy(this.gameState, deltaTime);
    
    // 4. Nettoyage des unités détruites
    this.cleanupDestroyedUnits();
    
    // 5. Mise à jour des structures
    this.updateStructures(deltaTime);
  }
  
  /**
   * Nettoie les unités détruites.
   */
  private cleanupDestroyedUnits(): void {
    const toRemove: number[] = [];
    
    for (const [id, unit] of this.gameState.units) {
      if (unit.state === 'DESTROYED') {
        toRemove.push(id);
      }
    }
    
    for (const id of toRemove) {
      this.gameState.units.delete(id);
    }
  }
  
  /**
   * Met à jour les structures.
   */
  private updateStructures(deltaTime: number): void {
    for (const structure of this.gameState.structures.values()) {
      // Régénération des boucliers
      const stats = this.getStructureStats(structure.structureType);
      if (stats && structure.shield < stats.maxShield) {
        structure.shield = Math.min(
          stats.maxShield,
          structure.shield + stats.shieldRegen * deltaTime
        );
      }
    }
  }
  
  private getStructureStats(type: string): { maxShield: number; shieldRegen: number } | null {
    // Import dynamique évité, utiliser les stats inline
    const stats: Record<string, { maxShield: number; shieldRegen: number }> = {
      SPACE_STATION: { maxShield: 2000, shieldRegen: 10 },
      SHIPYARD: { maxShield: 500, shieldRegen: 5 },
      RESEARCH_LAB: { maxShield: 300, shieldRegen: 3 },
      DEFENSE_PLATFORM: { maxShield: 800, shieldRegen: 8 },
      REFINERY: { maxShield: 200, shieldRegen: 2 },
      TRADE_HUB: { maxShield: 200, shieldRegen: 2 },
      SENSOR_ARRAY: { maxShield: 100, shieldRegen: 1 },
      JUMP_GATE: { maxShield: 1000, shieldRegen: 5 }
    };
    return stats[type] || null;
  }
  
  // ============================================================================
  // Conditions de victoire
  // ============================================================================
  
  /**
   * Vérifie les conditions de victoire/défaite.
   */
  private checkVictoryConditions(): void {
    // Vérifier chaque joueur
    const activePlayers: PlayerId[] = [];
    
    for (const [playerId] of this.gameState.players) {
      // Un joueur est éliminé s'il n'a plus d'unités ni de structures
      const hasUnits = this.countPlayerUnits(playerId) > 0;
      const hasStructures = this.countPlayerStructures(playerId) > 0;
      
      if (hasUnits || hasStructures) {
        activePlayers.push(playerId);
      }
    }
    
    // S'il ne reste qu'un joueur, il gagne
    if (activePlayers.length === 1) {
      this.callbacks.onGameOver?.(activePlayers[0]);
      this.stop();
    } else if (activePlayers.length === 0) {
      // Match nul
      this.callbacks.onGameOver?.(null);
      this.stop();
    }
  }
  
  private countPlayerUnits(playerId: PlayerId): number {
    let count = 0;
    for (const unit of this.gameState.units.values()) {
      if (unit.ownerId === playerId && unit.state !== 'DESTROYED') {
        count++;
      }
    }
    return count;
  }
  
  private countPlayerStructures(playerId: PlayerId): number {
    let count = 0;
    for (const structure of this.gameState.structures.values()) {
      if (structure.ownerId === playerId && structure.isOperational) {
        count++;
      }
    }
    return count;
  }
  
  // ============================================================================
  // Synchronisation
  // ============================================================================
  
  /**
   * Applique un état de synchronisation reçu.
   */
  private applySyncState(state: Partial<GameState>, frame: number): void {
    this.log(`Sync reçue pour frame ${frame}`);
    
    // Appliquer l'état reçu
    // Note: Implémentation simplifiée, une vraie sync nécessite
    // une sérialisation/désérialisation complète
    
    if (state.currentFrame !== undefined) {
      this.gameState.currentFrame = state.currentFrame;
    }
    
    if (state.gameTime !== undefined) {
      this.gameState.gameTime = state.gameTime;
    }
    
    // Pour les collections, on remplacerait complètement
    // (à implémenter avec la vraie sérialisation)
  }
  
  /**
   * Génère un snapshot de l'état pour synchronisation.
   */
  getSnapshot(): Partial<GameState> {
    // Retourne un sous-ensemble de l'état pour la sync
    return {
      currentFrame: this.gameState.currentFrame,
      gameTime: this.gameState.gameTime,
      // ... autres champs sérialisables
    };
  }
  
  // ============================================================================
  // Callbacks et accès à l'état
  // ============================================================================
  
  /**
   * Enregistre les callbacks.
   */
  setCallbacks(callbacks: GameLoopCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }
  
  /**
   * Récupère l'état du jeu (lecture seule).
   */
  getGameState(): Readonly<GameState> {
    return this.gameState;
  }
  
  /**
   * Récupère les statistiques.
   */
  getStats(): { tickCount: number; averageTickTime: number; frameTime: number } {
    return {
      tickCount: this.tickCount,
      averageTickTime: this.averageTickTime,
      frameTime: this.frameTime
    };
  }
  
  // ============================================================================
  // Utilitaires
  // ============================================================================
  
  private generatePlayerColor(playerId: PlayerId): number {
    // Couleurs prédéfinies pour les joueurs
    const colors = [
      0x3498db, // Bleu
      0xe74c3c, // Rouge
      0x2ecc71, // Vert
      0xf39c12, // Orange
      0x9b59b6, // Violet
      0x1abc9c, // Turquoise
      0xe91e63, // Rose
      0xff9800, // Ambre
    ];
    
    // Hash simple du playerId pour choisir une couleur
    let hash = 0;
    for (let i = 0; i < playerId.length; i++) {
      hash = ((hash << 5) - hash) + playerId.charCodeAt(i);
      hash |= 0;
    }
    
    return colors[Math.abs(hash) % colors.length];
  }
  
  private log(message: string): void {
    if (GAME_LOOP_CONFIG.debugLogs) {
      console.log(`[GameLoop] ${message}`);
    }
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale de la boucle de jeu */
export const gameLoop = new GameLoop();
