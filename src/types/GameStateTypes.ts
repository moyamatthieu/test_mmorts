// src/types/GameStateTypes.ts
/**
 * Types détaillés pour le GameState.
 * 
 * Ce fichier contient tous les types secondaires utilisés par GameState :
 * - Units et leurs états
 * - Structures et production
 * - Ressources et sources
 * - Technologies
 * - Combat
 * 
 * Responsabilité : Définitions TypeScript uniquement (pas de logique).
 */

import type { EntityId, PlayerId, SystemId, Position3D, FormationType } from './commands';

// ============================================================================
// Ressources
// ============================================================================

/**
 * Types de ressources disponibles dans le jeu.
 */
export type ResourceType = 'credits' | 'metal' | 'crystal' | 'fuel' | 'population';

/**
 * Stock de ressources d'un joueur.
 */
export interface Resources {
  /** Monnaie universelle */
  credits: number;
  
  /** Métal (récolté sur astéroïdes) */
  metal: number;
  
  /** Cristaux (ressource rare) */
  crystal: number;
  
  /** Carburant (pour déplacements longue distance) */
  fuel: number;
  
  /** Population (pour colonies planétaires) */
  population: number;
}

// ============================================================================
// Types d'unités et structures
// ============================================================================

/**
 * Catégorie de vaisseau (détermine taille et rôle).
 */
export type ShipClass = 
  | 'FIGHTER'      // Chasseur léger
  | 'CORVETTE'     // Corvette polyvalente
  | 'FRIGATE'      // Frégate équilibrée
  | 'DESTROYER'    // Destroyer anti-capital
  | 'CRUISER'      // Croiseur puissant
  | 'BATTLESHIP'   // Cuirassé
  | 'CARRIER'      // Porte-vaisseaux
  | 'MOTHERSHIP'   // Vaisseau-mère
  | 'HARVESTER'    // Récolte ressources
  | 'REPAIR'       // Réparation
  | 'SCOUT'        // Reconnaissance
  | 'RESEARCH'     // Station de recherche
  | 'STATION'      // Station spatiale
  | 'SHIPYARD'     // Chantier naval
  | 'DEFENSE_PLATFORM'; // Plateforme de défense

/**
 * Type de structure constructible.
 */
export type StructureType =
  | 'SPACE_STATION'
  | 'SHIPYARD'
  | 'RESEARCH_LAB'
  | 'DEFENSE_PLATFORM'
  | 'REFINERY'
  | 'TRADE_HUB'
  | 'SENSOR_ARRAY'
  | 'JUMP_GATE';

/**
 * Alias de ShipClass pour compatibilité.
 */
export type UnitType = ShipClass;

// ============================================================================
// États et comportements
// ============================================================================

/**
 * État comportemental d'une unité.
 */
export type UnitState =
  | 'IDLE'
  | 'MOVING'
  | 'ATTACKING'
  | 'HARVESTING'
  | 'DOCKING'
  | 'DOCKED'
  | 'REPAIRING'
  | 'BUILDING'
  | 'PATROLLING'
  | 'DEFENDING'
  | 'RETREATING'
  | 'WARPING'
  | 'DESTROYED';

/**
 * Stance de combat d'une unité.
 */
export type CombatStance =
  | 'AGGRESSIVE'
  | 'DEFENSIVE'
  | 'PASSIVE'
  | 'HOLD_FIRE';

/**
 * Relation diplomatique entre joueurs.
 */
export type DiplomaticStatus = 
  | 'NEUTRAL'
  | 'ALLY'
  | 'ENEMY'
  | 'WAR';

// ============================================================================
// Statistiques
// ============================================================================

/**
 * Statistiques de base d'un type d'unité.
 */
export interface UnitStats {
  maxHealth: number;
  maxShield: number;
  shieldRegen: number;
  armor: number;
  speed: number;
  turnRate: number;
  sensorRange: number;
  attackRange: number;
  attackDamage: number;
  attackSpeed: number;
  cargoCapacity: number;
  cost: Partial<Resources>;
  buildTime: number;
  fuelConsumption: number;
}

// ============================================================================
// Unités
// ============================================================================

/**
 * Ordre en file d'attente pour une unité.
 */
export interface UnitOrder {
  type: string;
  data: unknown;
}

/**
 * Données complètes d'une unité (vaisseau).
 */
export interface Unit {
  id: EntityId;
  ownerId: PlayerId;
  shipClass: ShipClass;
  name?: string;
  
  // Position et mouvement
  systemId: SystemId;
  position: Position3D;
  velocity: Position3D;
  rotation: number;
  destination: Position3D | null;
  
  // Combat et santé
  health: number;
  shield: number;
  targetId: EntityId | null;
  combatStance: CombatStance;
  attackCooldown: number;
  
  // État et comportement
  state: UnitState;
  formation: FormationType;
  formationOffset: Position3D;
  groupLeaderId: EntityId | null;
  
  // Cargo (harvesters)
  cargo: Partial<Resources>;
  
  // File d'ordres
  orderQueue: UnitOrder[];
  
  // Timestamps
  createdAtFrame: number;
  updatedAtFrame: number;
}

// ============================================================================
// Structures
// ============================================================================

/**
 * Ordre de production dans une file.
 */
export interface ProductionOrder {
  id: string;
  itemType: ShipClass | StructureType;
  category: 'unit' | 'structure';
  count: number;
  produced: number;
  progress: number;
  resourcesConsumed: Partial<Resources>;
}

/**
 * Données complètes d'une structure.
 */
export interface Structure {
  id: EntityId;
  ownerId: PlayerId;
  structureType: StructureType;
  name?: string;
  
  // Position
  systemId: SystemId;
  position: Position3D;
  rotation: number;
  
  // Santé
  health: number;
  maxHealth: number;
  shield: number;
  maxShield: number;
  
  // Production
  productionQueue: ProductionOrder[];
  rallyPoint: Position3D | null;
  
  // État
  constructionProgress: number;
  isOperational: boolean;
  energy: number;
  maxEnergy: number;
  
  // Timestamps
  createdAtFrame: number;
  updatedAtFrame: number;
}

// ============================================================================
// Joueurs
// ============================================================================

/**
 * Progression d'une recherche.
 */
export interface ResearchProgress {
  technologyId: string;
  progress: number;
  estimatedTimeRemaining: number;
}

/**
 * Données d'un joueur.
 */
export interface Player {
  id: PlayerId;
  displayName: string;
  color: number;
  resources: Resources;
  unlockedTechnologies: string[];
  currentResearch: ResearchProgress | null;
  diplomacy: Map<PlayerId, DiplomaticStatus>;
  homeSystemId: SystemId;
  controlledSystems: SystemId[];
  score: number;
  isConnected: boolean;
  isAI: boolean;
  lastActiveFrame: number;
}

/**
 * Alias de Player pour compatibilité.
 */
export type PlayerState = Player;

// ============================================================================
// Technologies
// ============================================================================

/**
 * Effet d'une technologie.
 */
export interface TechnologyEffect {
  type: 'UNLOCK_UNIT' | 'UNLOCK_STRUCTURE' | 'STAT_BONUS' | 'RESOURCE_BONUS';
  target: string;
  value: number;
}

/**
 * Définition d'une technologie recherchable.
 */
export interface Technology {
  id: string;
  name: string;
  description: string;
  cost: Partial<Resources>;
  researchTime: number;
  prerequisites: string[];
  effects: TechnologyEffect[];
}

// ============================================================================
// Ressources récoltables
// ============================================================================

/**
 * Type de corps céleste récoltable.
 */
export type CelestialResourceType =
  | 'ASTEROID_METAL'
  | 'ASTEROID_CRYSTAL'
  | 'GAS_CLOUD'
  | 'DEBRIS_FIELD';

/**
 * Source de ressources récoltables.
 */
export interface ResourceSource {
  id: EntityId;
  systemId: SystemId;
  position: Position3D;
  resourceType: CelestialResourceType;
  yields: ResourceType;
  remaining: number;
  maxAmount: number;
  regenRate: number;
  maxHarvesters: number;
  assignedHarvesters: EntityId[];
}

// ============================================================================
// Synchronisation réseau
// ============================================================================

/**
 * État de synchronisation pour le lockstep.
 */
export interface SyncState {
  currentFrame: number;
  stateHash: string;
  confirmedFrame: number;
  pendingCommands: Map<number, unknown[]>;
  syncedPlayers: PlayerId[];
}
