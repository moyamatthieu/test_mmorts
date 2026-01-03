// src/types/GameState.ts
/**
 * État global du jeu - Source de vérité centralisée.
 * 
 * Ce fichier définit l'interface GameState principale et réexporte
 * tous les types et fonctions associés depuis les modules spécialisés.
 * 
 * Architecture:
 * - GameStateTypes.ts : Types détaillés (Unit, Player, Resources, etc.)
 * - GameConstants.ts : Données statiques (SHIP_STATS, coûts)
 * - GameStateFactory.ts : Fonctions de création (createUnit, createPlayer, etc.)
 * - GameState.ts (ce fichier) : Interface principale + réexports
 * 
 * Responsabilité : Définir GameState et servir de point d'entrée unique.
 */

import type { 
  Unit, 
  Structure, 
  Player, 
  Technology,
  ResourceSource,
  SyncState,
  
  // Types de base
  Resources,
  ShipClass,
  StructureType,
  UnitState,
  CombatStance,
  DiplomaticStatus,
  ResourceType,
  CelestialResourceType,
  UnitStats,
  UnitOrder,
  ProductionOrder,
  ResearchProgress,
  TechnologyEffect,
  
  // Alias
  UnitType,
  PlayerState
} from './GameStateTypes';

import type { EntityId, PlayerId } from './commands';

// ============================================================================
// GameState Principal
// ============================================================================

/**
 * État complet du jeu.
 * Sérialisable pour sauvegarde et réseau.
 */
export interface GameState {
  // --- Méta ---
  
  /** Version du format d'état (pour migrations) */
  version: number;
  
  /** ID de la partie */
  gameId: string;
  
  /** Seed pour génération procédurale */
  seed: number;
  
  /** Timestamp de création */
  createdAt: number;
  
  // --- Temps de simulation ---
  
  /** Frame actuelle */
  currentFrame: number;
  
  /** Temps écoulé en jeu (secondes) */
  gameTime: number;
  
  /** Vitesse de simulation (1.0 = normal) */
  simulationSpeed: number;
  
  /** Pause */
  isPaused: boolean;
  
  /** Timestamp du dernier tick de simulation */
  lastTick: number;
  
  /** Compteur de ticks de simulation */
  tickCount: number;
  
  // --- Entités ---
  
  /** Toutes les unités par ID */
  units: Map<EntityId, Unit>;
  
  /** Toutes les structures par ID */
  structures: Map<EntityId, Structure>;
  
  /** Sources de ressources */
  resourceSources: Map<EntityId, ResourceSource>;
  
  // --- Joueurs ---
  
  /** Tous les joueurs */
  players: Map<PlayerId, Player>;
  
  /** ID du joueur local (client-side) */
  localPlayerId: PlayerId | null;
  
  // --- Sélection ---
  
  /** IDs des unités actuellement sélectionnées */
  selectedUnitIds: EntityId[];
  
  // --- Technologie ---
  
  /** Arbre technologique (définitions) */
  technologies: Map<string, Technology>;
  
  // --- Réseau ---
  
  /** État de synchronisation */
  sync: SyncState;
  
  // --- Compteurs (pour génération d'IDs) ---
  
  /** Prochain ID d'entité */
  nextEntityId: EntityId;
}

// ============================================================================
// Réexports
// ============================================================================

// Types détaillés
export type {
  Unit,
  Structure,
  Player,
  Technology,
  ResourceSource,
  SyncState,
  Resources,
  ShipClass,
  StructureType,
  UnitState,
  CombatStance,
  DiplomaticStatus,
  ResourceType,
  CelestialResourceType,
  UnitStats,
  UnitOrder,
  ProductionOrder,
  ResearchProgress,
  TechnologyEffect,
  UnitType,
  PlayerState
};

// Constantes
export { SHIP_STATS } from './GameConstants';

// Fonctions factory
export {
  createEmptyResources,
  createStartingResources,
  createInitialGameState,
  createGameState,
  createDefaultGameState,
  generateEntityId,
  createUnit,
  createStructure,
  createPlayer
} from './GameStateFactory';
