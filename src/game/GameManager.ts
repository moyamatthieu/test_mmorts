// src/game/GameManager.ts
/**
 * Orchestrateur principal de la logique de jeu (combat, économie, unités).
 * Pattern Singleton — une seule instance accessible globalement.
 *
 * Responsabilités:
 * - Gérer l'état du jeu (GameState)
 * - Coordonner les systèmes de jeu (combat, économie, unités, IA, formations)
 * - Traiter les commandes RTS
 * - Émettre des événements de jeu
 *
 * Ne gère PAS:
 * - Le rendu (délégué à SceneManager/ShipRenderer)
 * - La persistance (délégué à GameIntegration)
 * - Le réseau P2P (délégué à GameIntegration)
 * - La génération de galaxie (délégué à GameIntegration)
 *
 * KISS: Logique de jeu pure, appelle les fonctions des modules existants.
 */

import * as THREE from 'three';
import type {
  Unit,
  Player,
  Resources,
  GameState,
  ShipClass,
  DiplomaticStatus,
} from '../types/GameState';
import { createEmptyResources, createStartingResources, createGameState } from '../types/GameState';
import type { GameCommand, Position3D, EntityId, PlayerId } from '../types/commands';

// Fonctions de UnitBehavior
import { updateAllUnits, orderMove, orderAttack, orderStop, orderPatrol } from './units/UnitBehavior';
// Fonctions de UnitFactory
import { spawnUnit, destroyUnit } from './units/UnitFactory';
// Fonctions de CombatSystem
import { processCombat, type CombatLog } from './combat/CombatSystem';
// FormationManager est une classe
import { FormationManager, type FormationType } from '../ai/FormationManager';

// ============================================================================
// Types
// ============================================================================

/** Phase de jeu */
export type GamePhase = 'MENU' | 'LOADING' | 'PLAYING' | 'PAUSED' | 'VICTORY' | 'DEFEAT';

/** Configuration du jeu */
export interface GameConfig {
  maxUnits: number;
  startingResources?: Partial<Resources>;
}

/** Statistiques de jeu */
export interface GameStats {
  unitsCreated: number;
  unitsDestroyed: number;
  resourcesCollected: Resources;
  gameTime: number;
}

/** Types d'événements de jeu */
export type GameEventType =
  | 'unit_created'
  | 'unit_destroyed'
  | 'combat_started'
  | 'combat_ended'
  | 'resources_changed'
  | 'phase_changed'
  | 'player_joined'
  | 'player_left';

/** Événement de jeu */
export interface GameEvent {
  type: GameEventType;
  data: unknown;
  timestamp: number;
}

/** Listener d'événement */
type GameEventListener = (event: GameEvent) => void;

/** Couleurs de joueur par défaut */
const PLAYER_COLORS = [0x4a90d9, 0xd94a4a, 0x4ad94a, 0xd9d94a, 0xd94ad9, 0x4ad9d9];

// ============================================================================
// Classe GameManager (Singleton)
// ============================================================================

export class GameManager {
  // --- Singleton ---
  private static instance: GameManager | null = null;

  /**
   * Récupère l'instance singleton du GameManager.
   * Crée l'instance si elle n'existe pas.
   */
  static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  /**
   * Dispose de l'instance singleton.
   * Nettoie toutes les ressources.
   */
  static dispose(): void {
    if (GameManager.instance) {
      GameManager.instance.cleanup();
      GameManager.instance = null;
    }
  }

  // --- Systèmes de jeu ---
  private formationManager: FormationManager;

  // --- Contexte de rendu (injecté via setRenderContext) ---
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;

  // --- État du jeu ---
  private gameState: GameState;
  private phase: GamePhase = 'MENU';
  private config: GameConfig = { maxUnits: 500 };
  private stats: GameStats;
  private isRunning: boolean = false;

  // --- Événements ---
  private eventListeners: Map<GameEventType, Set<GameEventListener>> = new Map();

  // --- Constructeur privé (Singleton) ---
  private constructor() {
    // Initialiser les systèmes qui sont des classes
    this.formationManager = new FormationManager();

    // Initialiser l'état du jeu via la factory
    this.gameState = createGameState();

    // Initialiser les statistiques
    this.stats = this.createInitialStats();

    console.log('[GameManager] Instance created');
  }

  // ============================================================================
  // Configuration
  // ============================================================================

  /**
   * Connecte le GameManager au contexte de rendu Three.js.
   * Appelé par main.ts ou GameIntegration après création de SceneManager.
   */
  setRenderContext(scene: THREE.Scene, camera: THREE.Camera): void {
    this.scene = scene;
    this.camera = camera;
    console.log('[GameManager] Render context set');
  }

  /**
   * Récupère la scène Three.js (si définie).
   */
  getScene(): THREE.Scene | null {
    return this.scene;
  }

  /**
   * Récupère la caméra Three.js (si définie).
   */
  getCamera(): THREE.Camera | null {
    return this.camera;
  }

  /**
   * Configure le jeu.
   */
  configure(config: Partial<GameConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // ============================================================================
  // Lifecycle
  // ============================================================================

  /**
   * Démarre une nouvelle partie.
   */
  startNewGame(playerName: string = 'Player'): Player {
    this.gameState = createGameState();
    this.stats = this.createInitialStats();

    const player = this.createPlayer(playerName, true);
    this.phase = 'PLAYING';
    this.isRunning = true;

    this.emit('phase_changed', { phase: this.phase });
    console.log('[GameManager] New game started');

    return player;
  }

  /**
   * Charge un état de jeu existant.
   */
  loadState(state: GameState): void {
    this.gameState = state;
    this.phase = state.isPaused ? 'PAUSED' : 'PLAYING';
    this.isRunning = !state.isPaused;
    console.log('[GameManager] State loaded');
  }

  /**
   * Met le jeu en pause.
   */
  pause(): void {
    if (this.phase !== 'PLAYING') return;
    this.phase = 'PAUSED';
    this.isRunning = false;
    this.gameState.isPaused = true;
    this.emit('phase_changed', { phase: this.phase });
  }

  /**
   * Reprend le jeu après une pause.
   */
  resume(): void {
    if (this.phase !== 'PAUSED') return;
    this.phase = 'PLAYING';
    this.isRunning = true;
    this.gameState.isPaused = false;
    this.emit('phase_changed', { phase: this.phase });
  }

  /**
   * Termine la partie.
   */
  endGame(victory: boolean): void {
    this.phase = victory ? 'VICTORY' : 'DEFEAT';
    this.isRunning = false;
    this.emit('phase_changed', { phase: this.phase, victory });
  }

  // ============================================================================
  // Boucle de jeu
  // ============================================================================

  /**
   * Boucle de jeu principale, appelée depuis SceneManager.animate().
   * @param deltaTime - Temps écoulé depuis la dernière frame (en secondes)
   */
  update(deltaTime: number): void {
    if (!this.isRunning || this.phase !== 'PLAYING') return;

    // Mettre à jour le temps de jeu
    this.gameState.gameTime += deltaTime;
    this.stats.gameTime += deltaTime;

    // Incrémenter la frame
    this.gameState.currentFrame++;

    // 1. Mettre à jour les comportements des unités (mouvement, états)
    updateAllUnits(this.gameState, deltaTime);

    // 2. Mettre à jour le système de combat
    const combatLog = this.updateCombat();
    this.processCombatEvents(combatLog);

    // 3. TODO: Mettre à jour l'économie (income passif, production)
    // L'économie utilise EconomySystem qui a sa propre API
  }

  /**
   * Traite le combat pour cette frame.
   */
  private updateCombat(): CombatLog {
    return processCombat(this.gameState);
  }

  /**
   * Traite les événements de combat (destructions, etc.).
   */
  private processCombatEvents(combatLog: CombatLog): void {
    for (const attack of combatLog.attacks) {
      if (attack.isKill) {
        this.handleUnitDestroyed(attack.targetId);
      }
    }
  }

  /**
   * Gère la destruction d'une unité.
   */
  private handleUnitDestroyed(unitId: EntityId): void {
    // Retirer de la sélection
    const selIdx = this.gameState.selectedUnitIds.indexOf(unitId);
    if (selIdx !== -1) {
      this.gameState.selectedUnitIds.splice(selIdx, 1);
    }

    this.stats.unitsDestroyed++;
    const unit = this.gameState.units.get(unitId);
    this.emit('unit_destroyed', { unitId, unit });

    // La suppression effective est gérée par destroyUnit si nécessaire
  }

  // ============================================================================
  // Joueurs
  // ============================================================================

  /**
   * Crée un nouveau joueur.
   */
  createPlayer(name: string, isLocal: boolean = false): Player {
    const id = `player_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const startingResources = createStartingResources();
    if (this.config.startingResources) {
      Object.assign(startingResources, this.config.startingResources);
    }

    const player: Player = {
      id,
      displayName: name,
      color: this.generatePlayerColor(),
      resources: startingResources,
      diplomacy: new Map<PlayerId, DiplomaticStatus>(),
      isConnected: true,
      isAI: !isLocal,
      homeSystemId: 'system_0', // Système de départ par défaut
      controlledSystems: ['system_0'],
      unlockedTechnologies: [],
      currentResearch: null,
      score: 0,
      lastActiveFrame: this.gameState.currentFrame,
    };

    this.gameState.players.set(id, player);

    if (isLocal) {
      this.gameState.localPlayerId = id;
    }

    this.emit('player_joined', { player });
    return player;
  }

  /**
   * Génère une couleur unique pour un joueur.
   */
  private generatePlayerColor(): number {
    const usedColors = new Set([...this.gameState.players.values()].map((p) => p.color));
    return PLAYER_COLORS.find((c) => !usedColors.has(c)) ?? Math.floor(Math.random() * 0xffffff);
  }

  // ============================================================================
  // Unités
  // ============================================================================

  /**
   * Crée une nouvelle unité.
   */
  createUnit(
    shipClass: ShipClass,
    ownerId: PlayerId,
    systemId: string,
    position: Position3D
  ): Unit | null {
    if (this.gameState.units.size >= this.config.maxUnits) {
      console.warn('[GameManager] Max units reached');
      return null;
    }

    const player = this.gameState.players.get(ownerId);
    if (!player) {
      console.error('[GameManager] Player not found:', ownerId);
      return null;
    }

    const unit = spawnUnit(this.gameState, ownerId, shipClass, systemId, position);
    if (!unit) return null;

    this.stats.unitsCreated++;
    this.emit('unit_created', { unit });

    return unit;
  }

  /**
   * Supprime une unité.
   */
  removeUnit(unitId: EntityId): void {
    const unit = this.gameState.units.get(unitId);
    if (!unit) return;

    // Retirer de la sélection
    const selIdx = this.gameState.selectedUnitIds.indexOf(unitId);
    if (selIdx !== -1) {
      this.gameState.selectedUnitIds.splice(selIdx, 1);
    }

    destroyUnit(this.gameState, unitId);
    this.stats.unitsDestroyed++;
    this.emit('unit_destroyed', { unitId, unit });
  }

  // ============================================================================
  // Sélection
  // ============================================================================

  /**
   * Sélectionne des unités.
   */
  selectUnits(unitIds: EntityId[], playerId: PlayerId): void {
    // Filtrer pour ne garder que les unités du joueur
    const validIds = unitIds.filter((id) => {
      const unit = this.gameState.units.get(id);
      return unit && unit.ownerId === playerId;
    });

    this.gameState.selectedUnitIds = validIds;
  }

  /**
   * Récupère les unités sélectionnées.
   */
  getSelectedUnits(): Unit[] {
    return this.gameState.selectedUnitIds
      .map((id) => this.gameState.units.get(id))
      .filter((u): u is Unit => u !== undefined);
  }

  // ============================================================================
  // Commandes
  // ============================================================================

  /**
   * Exécute une commande de jeu.
   */
  executeCommand(command: GameCommand): void {
    switch (command.type) {
      case 'MOVE':
        this.handleMoveCommand(command);
        break;
      case 'ATTACK':
        this.handleAttackCommand(command);
        break;
      case 'STOP':
        this.handleStopCommand(command);
        break;
      case 'PATROL':
        this.handlePatrolCommand(command);
        break;
      case 'SET_FORMATION':
        this.handleFormationCommand(command);
        break;
      case 'BUILD_UNIT':
        this.handleBuildUnitCommand(command);
        break;
      default:
        console.warn('[GameManager] Unknown command type:', (command as GameCommand).type);
    }
  }

  private handleMoveCommand(cmd: GameCommand & { type: 'MOVE' }): void {
    for (const unitId of cmd.unitIds) {
      const unit = this.gameState.units.get(unitId);
      if (unit) {
        orderMove(unit, cmd.target);
      }
    }
  }

  private handleAttackCommand(cmd: GameCommand & { type: 'ATTACK' }): void {
    for (const unitId of cmd.unitIds) {
      const unit = this.gameState.units.get(unitId);
      if (unit) {
        orderAttack(unit, cmd.targetId);
      }
    }
  }

  private handleStopCommand(cmd: GameCommand & { type: 'STOP' }): void {
    for (const unitId of cmd.unitIds) {
      const unit = this.gameState.units.get(unitId);
      if (unit) {
        orderStop(unit);
      }
    }
  }

  private handlePatrolCommand(cmd: GameCommand & { type: 'PATROL' }): void {
    for (const unitId of cmd.unitIds) {
      const unit = this.gameState.units.get(unitId);
      if (unit && cmd.waypoints.length > 0) {
        orderPatrol(unit, cmd.waypoints[0]);
      }
    }
  }

  private handleFormationCommand(cmd: GameCommand & { type: 'SET_FORMATION' }): void {
    const units = cmd.unitIds
      .map((id) => this.gameState.units.get(id))
      .filter((u): u is Unit => u !== undefined);

    if (units.length > 0) {
      // Calculer le centre du groupe d'unités
      const center = this.calculateGroupCenter(units);
      const formationId = `formation_${Date.now()}`;
      this.formationManager.createFormation(
        formationId,
        cmd.formation as FormationType,
        cmd.unitIds,
        center,
        { x: 0, y: 0, z: 1 } // Direction par défaut (avant)
      );
    }
  }

  /**
   * Calcule le centre d'un groupe d'unités.
   */
  private calculateGroupCenter(units: Unit[]): Position3D {
    if (units.length === 0) return { x: 0, y: 0, z: 0 };
    
    const sum = units.reduce(
      (acc, unit) => ({
        x: acc.x + unit.position.x,
        y: acc.y + unit.position.y,
        z: acc.z + unit.position.z,
      }),
      { x: 0, y: 0, z: 0 }
    );
    
    return {
      x: sum.x / units.length,
      y: sum.y / units.length,
      z: sum.z / units.length,
    };
  }

  private handleBuildUnitCommand(cmd: GameCommand & { type: 'BUILD_UNIT' }): void {
    // Pour le prototype, on récupère la structure de production
    // et on crée l'unité à sa position (simplification)
    const structure = this.gameState.structures.get(cmd.structureId);
    if (!structure) {
      console.warn('[GameManager] Structure not found:', cmd.structureId);
      return;
    }
    
    // Créer l'unité à la position de la structure (ou rally point)
    const spawnPosition = structure.rallyPoint ?? structure.position;
    this.createUnit(
      cmd.unitType as ShipClass,
      structure.ownerId,
      structure.systemId,
      spawnPosition
    );
  }

  // ============================================================================
  // Événements
  // ============================================================================

  /**
   * Émet un événement de jeu.
   */
  private emit(type: GameEventType, data: unknown): void {
    const event: GameEvent = {
      type,
      data,
      timestamp: Date.now(),
    };

    const listeners = this.eventListeners.get(type);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(event);
        } catch (e) {
          console.error('[GameManager] Event listener error:', e);
        }
      }
    }
  }

  /**
   * S'abonne à un type d'événement.
   */
  on(type: GameEventType, listener: GameEventListener): () => void {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, new Set());
    }
    this.eventListeners.get(type)!.add(listener);

    // Retourne une fonction de désabonnement
    return () => {
      this.eventListeners.get(type)?.delete(listener);
    };
  }

  // ============================================================================
  // Accesseurs
  // ============================================================================

  /** Récupère l'état complet du jeu */
  getState(): GameState {
    return this.gameState;
  }

  /** Récupère la phase actuelle */
  getPhase(): GamePhase {
    return this.phase;
  }

  /** Récupère les statistiques */
  getStats(): GameStats {
    return { ...this.stats };
  }

  /** Récupère la configuration */
  getConfig(): GameConfig {
    return { ...this.config };
  }

  /** Vérifie si le jeu tourne */
  isGameRunning(): boolean {
    return this.isRunning;
  }

  /** Récupère le joueur local */
  getLocalPlayer(): Player | undefined {
    return this.gameState.players.get(this.gameState.localPlayerId || '');
  }

  /** Récupère les ressources d'un joueur */
  getResources(playerId: PlayerId): Resources | undefined {
    return this.gameState.players.get(playerId)?.resources;
  }

  /** Récupère le FormationManager */
  getFormationManager(): FormationManager {
    return this.formationManager;
  }

  // ============================================================================
  // Helpers privés
  // ============================================================================

  /**
   * Crée les statistiques initiales.
   */
  private createInitialStats(): GameStats {
    return {
      unitsCreated: 0,
      unitsDestroyed: 0,
      resourcesCollected: createEmptyResources(),
      gameTime: 0,
    };
  }

  /**
   * Nettoie les ressources.
   */
  private cleanup(): void {
    this.eventListeners.clear();
    this.gameState = createGameState();
    this.stats = this.createInitialStats();
    this.scene = null;
    this.camera = null;
    this.isRunning = false;
    console.log('[GameManager] Cleaned up');
  }
}