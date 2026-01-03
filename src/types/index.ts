/**
 * PEEJS — Types Module Index
 *
 * Export centralisé pour tous les types du jeu.
 */

// === GAME STATE ===
export type {
  Resources,
  Unit,
  UnitType,
  UnitState,
  Player,
  PlayerState,
  GameState,
  ShipClass,
  StructureType,
  CombatStance,
  UnitStats,
  Structure,
  ProductionOrder,
  DiplomaticStatus,
  ResearchProgress,
  Technology,
  TechnologyEffect,
  CelestialResourceType,
  ResourceSource,
  SyncState,
  UnitOrder,
  ResourceType,
} from './GameState';

export {
  createEmptyResources,
  createStartingResources,
  createInitialGameState,
  createGameState,
  createDefaultGameState,
  generateEntityId,
  createUnit,
  createStructure,
  createPlayer,
  SHIP_STATS,
} from './GameState';

// === COMMANDS ===
export type {
  CommandType,
  EntityId,
  PlayerId,
  SystemId,
  Timestamp,
  FrameNumber,
  Position3D,
  MoveCommand,
  MoveToSystemCommand,
  AttackCommand,
  AttackMoveCommand,
  HoldPositionCommand,
  DefendCommand,
  PatrolCommand,
  BuildUnitCommand,
  BuildStructureCommand,
  CancelBuildCommand,
  SetRallyCommand,
  HarvestCommand,
  DockCommand,
  UndockCommand,
  TransferCommand,
  FormationType,
  SetFormationCommand,
  AbilityCommand,
  SelfDestructCommand,
  StopCommand,
  GameCommand,
  NetworkCommand,
} from './commands';

export {
  createMoveCommand,
  createAttackCommand,
  createBuildUnitCommand,
  generateCommandId,
  wrapCommand,
} from './commands';

// Alias pour compatibilité avec noms attendus
/** @deprecated Utiliser HarvestCommand */
export type MineCommand = import('./commands').HarvestCommand;
/** @deprecated Utiliser SetFormationCommand */
export type FormationCommand = import('./commands').SetFormationCommand;
/** @deprecated Utiliser BuildUnitCommand ou BuildStructureCommand */
export type BuildCommand = import('./commands').BuildUnitCommand;
/** @deprecated Utiliser CancelBuildCommand */
export type CancelCommand = import('./commands').CancelBuildCommand;

// === NAVIGATION STATE ===
export type {
  ViewMode,
  SystemReference,
  PlanetReference,
  NavigationState,
} from './NavigationState';

// === TRACKABLE ENTITY ===
export type { TrackableEntity } from './trackable-entity';

// EntityPosition est Position3D de commands.ts
export type EntityPosition = import('./commands').Position3D;

// === MEMORY ===
export type { SharedMemoryViews, MemoryManager } from './memory';

// Alias pour compatibilité
export type MemoryViews = import('./memory').SharedMemoryViews;

/**
 * Layout de la mémoire partagée.
 */
export interface MemoryLayout {
  /** Offset pour les positions X */
  posXOffset: number;
  /** Offset pour les positions Y */
  posYOffset: number;
  /** Offset pour les positions Z */
  posZOffset: number;
  /** Offset pour les rotations */
  rotationOffset: number;
  /** Offset pour les types */
  typeOffset: number;
  /** Offset pour les owners */
  ownerOffset: number;
  /** Offset pour les flags actifs */
  activeOffset: number;
  /** Taille totale en bytes */
  totalSize: number;
}

// === WORKER PROTOCOL ===
export type {
  WorkerMessageType,
  InitPayload,
  WorkerInMessage,
  WorkerOutMessage,
} from './worker-protocol';

export {
  isWorkerInMessage,
  isWorkerOutMessage,
} from './worker-protocol';

// Alias pour compatibilité avec noms attendus
/** Message INIT envoyé au worker */
export type InitMessage = Extract<import('./worker-protocol').WorkerInMessage, { type: 'INIT' }>;
/** Message INIT_ACK reçu du worker */
export type InitAckMessage = Extract<import('./worker-protocol').WorkerOutMessage, { type: 'INIT_ACK' }>;
/** Message ERROR reçu du worker */
export type ErrorMessage = Extract<import('./worker-protocol').WorkerOutMessage, { type: 'ERROR' }>;
/** Union de tous les messages worker */
export type WorkerMessage = import('./worker-protocol').WorkerInMessage | import('./worker-protocol').WorkerOutMessage;