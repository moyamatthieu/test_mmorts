// src/types/GameStateFactory.ts
/**
 * Factory functions pour créer des instances de GameState et ses composants.
 * 
 * Responsabilités :
 * - Créer des instances valides de GameState, Unit, Player, etc.
 * - Initialiser avec valeurs par défaut
 * - Générer des IDs uniques
 * 
 * Principe KISS : Fonctions pures, pas d'état global.
 */

import type { 
  Resources, 
  Unit, 
  Structure, 
  Player,
  ShipClass, 
  StructureType 
} from './GameStateTypes';
import type { GameState } from './GameState';
import type { EntityId, PlayerId, SystemId, Position3D } from './commands';

// ============================================================================
// Resources
// ============================================================================

/**
 * Crée un stock de ressources vide.
 */
export function createEmptyResources(): Resources {
  return {
    credits: 0,
    metal: 0,
    crystal: 0,
    fuel: 0,
    population: 0
  };
}

/**
 * Ressources de départ pour un nouveau joueur.
 */
export function createStartingResources(): Resources {
  return {
    credits: 1000,
    metal: 500,
    crystal: 100,
    fuel: 200,
    population: 0
  };
}

// ============================================================================
// GameState
// ============================================================================

/**
 * Crée un état de jeu initial vide.
 */
export function createInitialGameState(gameId: string, seed: number): GameState {
  return {
    version: 1,
    gameId,
    seed,
    createdAt: Date.now(),
    
    currentFrame: 0,
    gameTime: 0,
    simulationSpeed: 1.0,
    isPaused: false,
    lastTick: Date.now(),
    tickCount: 0,
    
    units: new Map(),
    structures: new Map(),
    resourceSources: new Map(),
    
    players: new Map(),
    localPlayerId: null,
    selectedUnitIds: [],
    
    technologies: new Map(),
    
    sync: {
      currentFrame: 0,
      stateHash: '',
      confirmedFrame: 0,
      pendingCommands: new Map(),
      syncedPlayers: []
    },
    
    nextEntityId: 1
  };
}

/**
 * Crée un état de jeu par défaut.
 * Génère automatiquement un gameId et seed.
 */
export function createGameState(): GameState {
  const gameId = `game-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const seed = Date.now();
  return createInitialGameState(gameId, seed);
}

/**
 * Alias de createGameState pour compatibilité.
 */
export const createDefaultGameState = createGameState;

// ============================================================================
// Entity ID generation
// ============================================================================

/**
 * Génère le prochain ID d'entité.
 * ⚠️ Mutation: incrémente nextEntityId dans le state.
 */
export function generateEntityId(state: GameState): EntityId {
  const id = state.nextEntityId;
  state.nextEntityId++;
  return id;
}

// ============================================================================
// Units
// ============================================================================

/**
 * Crée une nouvelle unité avec valeurs par défaut.
 */
export function createUnit(
  state: GameState,
  ownerId: PlayerId,
  shipClass: ShipClass,
  systemId: SystemId,
  position: Position3D
): Unit {
  const id = generateEntityId(state);
  
  return {
    id,
    ownerId,
    shipClass,
    
    systemId,
    position: { ...position },
    velocity: { x: 0, y: 0, z: 0 },
    rotation: 0,
    destination: null,
    
    health: 100,  // À remplacer par SHIP_STATS[shipClass].maxHealth
    shield: 50,
    targetId: null,
    combatStance: 'DEFENSIVE',
    attackCooldown: 0,
    
    state: 'IDLE',
    formation: 'NONE',
    formationOffset: { x: 0, y: 0, z: 0 },
    groupLeaderId: null,
    
    cargo: {},
    orderQueue: [],
    
    createdAtFrame: state.currentFrame,
    updatedAtFrame: state.currentFrame
  };
}

// ============================================================================
// Structures
// ============================================================================

/**
 * Crée une nouvelle structure avec valeurs par défaut.
 */
export function createStructure(
  state: GameState,
  ownerId: PlayerId,
  structureType: StructureType,
  systemId: SystemId,
  position: Position3D
): Structure {
  const id = generateEntityId(state);
  
  return {
    id,
    ownerId,
    structureType,
    
    systemId,
    position: { ...position },
    rotation: 0,
    
    health: 1000,
    maxHealth: 1000,
    shield: 500,
    maxShield: 500,
    
    productionQueue: [],
    rallyPoint: null,
    
    constructionProgress: 1.0,
    isOperational: true,
    energy: 100,
    maxEnergy: 100,
    
    createdAtFrame: state.currentFrame,
    updatedAtFrame: state.currentFrame
  };
}

// ============================================================================
// Players
// ============================================================================

/**
 * Crée un nouveau joueur.
 */
export function createPlayer(
  id: PlayerId,
  displayName: string,
  color: number,
  homeSystemId: SystemId,
  isAI = false
): Player {
  return {
    id,
    displayName,
    color,
    resources: createStartingResources(),
    unlockedTechnologies: [],
    currentResearch: null,
    diplomacy: new Map(),
    homeSystemId,
    controlledSystems: [homeSystemId],
    score: 0,
    isConnected: true,
    isAI,
    lastActiveFrame: 0
  };
}
