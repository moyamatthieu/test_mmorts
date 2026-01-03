// src/game/GameBootstrap.ts
/**
 * Bootstrap de l'initialisation du jeu.
 * 
 * Responsabilités:
 * - Connecter tous les systèmes au démarrage
 * - Initialiser le HUD et l'EventBus
 * - Configurer les callbacks réseau
 * - Préparer la galaxie procédurale
 * 
 * KISS: Un seul point d'entrée pour l'initialisation complète.
 */

import { eventBus } from '../core/EventBus';
import { GameManager } from './GameManager';
import { GameIntegration } from './GameIntegration';
import { hud } from '../ui/HUD';
import { galaxyGenerator } from '../universe/GalaxyGenerator';
import { p2pManager } from '../net/P2PManager';
import type { GalaxyData } from '../universe/GalaxyGenerator';
import type { PlayerId } from '../types/commands';

// ============================================================================
// Configuration du Bootstrap
// ============================================================================

export interface BootstrapConfig {
  /** Nom du joueur */
  playerName: string;
  
  /** Seed de la galaxie (optionnel, génère aléatoire si absent) */
  galaxySeed?: number;
  
  /** Nombre de clusters en X */
  clustersX?: number;
  
  /** Nombre de clusters en Z */
  clustersZ?: number;
  
  /** Taille de chaque cluster */
  clusterSize?: number;
  
  /** Mode multijoueur actif */
  multiplayerEnabled?: boolean;
  
  /** ID de la room à rejoindre (si mode join) */
  roomToJoin?: string;
}

const DEFAULT_CONFIG: Required<BootstrapConfig> = {
  playerName: 'Commander',
  galaxySeed: Date.now(),
  clustersX: 3,
  clustersZ: 3,
  clusterSize: 5,
  multiplayerEnabled: false,
  roomToJoin: ''
};

// ============================================================================
// État du Bootstrap
// ============================================================================

interface BootstrapState {
  initialized: boolean;
  galaxy: GalaxyData | null;
  playerId: PlayerId;
  isHost: boolean;
}

const state: BootstrapState = {
  initialized: false,
  galaxy: null,
  playerId: '',
  isHost: false
};

// ============================================================================
// Fonctions d'initialisation
// ============================================================================

/**
 * Initialise tous les systèmes du jeu.
 * Doit être appelé une seule fois au démarrage.
 */
export async function initializeGame(userConfig: Partial<BootstrapConfig> = {}): Promise<boolean> {
  if (state.initialized) {
    console.warn('[GameBootstrap] Déjà initialisé');
    return true;
  }
  
  const config = { ...DEFAULT_CONFIG, ...userConfig };
  
  console.log('[GameBootstrap] Initialisation...', config);
  
  try {
    // 1. Connecter le HUD à l'EventBus
    hud.connectToEventBus();
    hud.showNotification('INFO', 'Initialisation du jeu...');
    
    // 2. Générer la galaxie
    const generator = new (galaxyGenerator.constructor as new (seed: number) => typeof galaxyGenerator)(config.galaxySeed);
    state.galaxy = generator.generateGalaxy(config.clustersX, config.clustersZ, config.clusterSize);
    
    console.log(`[GameBootstrap] Galaxie générée: ${state.galaxy.name}`, {
      systems: state.galaxy.systems.size,
      seed: state.galaxy.seed
    });
    
    // 3. Initialiser le GameManager avec la galaxie
    const gameManager = GameManager.getInstance();
    
    // Émettre l'événement de navigation initiale
    eventBus.emit('navigation:changed', {
      from: 'GALAXY',
      to: 'GALAXY',
      systemId: undefined
    });
    
    // 4. Configurer le réseau si multijoueur activé
    if (config.multiplayerEnabled) {
      await setupMultiplayer(config);
    }
    
    // 5. Marquer comme initialisé
    state.initialized = true;
    state.playerId = p2pManager.playerId || `local-${Date.now()}`;
    
    hud.showNotification('SUCCESS', `Bienvenue, ${config.playerName}!`);
    
    // 6. Émettre l'événement de démarrage
    eventBus.emit('game:start', {
      playerId: state.playerId,
      playerName: config.playerName
    });
    
    console.log('[GameBootstrap] Initialisation terminée');
    return true;
    
  } catch (error) {
    console.error('[GameBootstrap] Erreur d\'initialisation:', error);
    hud.showNotification('ERROR', 'Erreur d\'initialisation du jeu');
    return false;
  }
}

/**
 * Configure le mode multijoueur.
 */
async function setupMultiplayer(config: Required<BootstrapConfig>): Promise<void> {
  p2pManager.setPlayerName(config.playerName);
  
  // Connecter au serveur PeerJS
  const connected = await p2pManager.connect();
  
  if (!connected) {
    console.warn('[GameBootstrap] Connexion P2P échouée, mode solo');
    hud.showNotification('WARNING', 'Mode solo (connexion P2P échouée)');
    return;
  }
  
  if (config.roomToJoin) {
    // Rejoindre une room existante
    const joined = await p2pManager.joinRoom(config.roomToJoin);
    if (joined) {
      state.isHost = false;
      hud.showNotification('INFO', `Rejoint la room ${config.roomToJoin}`);
    } else {
      hud.showNotification('ERROR', 'Impossible de rejoindre la room');
    }
  } else {
    // Créer une nouvelle room
    const room = p2pManager.createRoom();
    state.isHost = true;
    hud.showNotification('INFO', `Room créée: ${room.roomId}`);
  }
}

/**
 * Lance la partie (pour le mode multijoueur, après que tous les joueurs sont prêts).
 */
export function startGame(): void {
  if (!state.initialized) {
    console.error('[GameBootstrap] Jeu non initialisé');
    return;
  }
  
  const integration = GameIntegration.getInstance();
  integration.startGame();
  
  hud.showNotification('SUCCESS', 'Partie lancée!');
}

/**
 * Héberge une nouvelle partie multijoueur.
 */
export async function hostGame(playerName: string): Promise<string | null> {
  const integration = GameIntegration.getInstance();
  return integration.hostGame(playerName);
}

/**
 * Rejoint une partie multijoueur existante.
 */
export async function joinGame(roomId: string, playerName: string): Promise<boolean> {
  const integration = GameIntegration.getInstance();
  return integration.joinGame(roomId, playerName);
}

// ============================================================================
// Getters
// ============================================================================

/**
 * Retourne les données de la galaxie générée.
 */
export function getGalaxy(): GalaxyData | null {
  return state.galaxy;
}

/**
 * Retourne l'ID du joueur local.
 */
export function getPlayerId(): PlayerId {
  return state.playerId;
}

/**
 * Retourne si le joueur est l'hôte de la partie.
 */
export function isHost(): boolean {
  return state.isHost;
}

/**
 * Retourne si le jeu est initialisé.
 */
export function isInitialized(): boolean {
  return state.initialized;
}

// ============================================================================
// Export par défaut
// ============================================================================

export const GameBootstrap = {
  initialize: initializeGame,
  start: startGame,
  host: hostGame,
  join: joinGame,
  getGalaxy,
  getPlayerId,
  isHost,
  isInitialized
};
