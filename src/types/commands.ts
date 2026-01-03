// src/types/commands.ts
/**
 * Système de commandes RTS - Types centralisés pour tous les ordres de jeu.
 * 
 * Architecture:
 * - Les commandes sont des objets sérialisables (JSON/MessagePack)
 * - Chaque commande a un type discriminant et un payload typé
 * - Les commandes sont horodatées pour le lockstep P2P
 * - Le playerId identifie l'émetteur pour le déterminisme
 * 
 * KISS: Structure plate, pas de hiérarchie de classes complexe.
 */

// ============================================================================
// Types de base
// ============================================================================

/** Identifiant unique d'une entité (unité, structure, etc.) */
export type EntityId = number;

/** Identifiant d'un joueur */
export type PlayerId = string;

/** Identifiant d'un système solaire */
export type SystemId = string;

/** Horodatage en millisecondes (performance.now() ou Date.now()) */
export type Timestamp = number;

/** Frame de simulation (lockstep) */
export type FrameNumber = number;

/** Position 3D */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

// ============================================================================
// Types de commandes
// ============================================================================

/**
 * Propriétés communes à toutes les commandes (pour lockstep P2P)
 */
export interface BaseCommand {
  /** ID du joueur émetteur (pour validation et déterminisme) */
  playerId: PlayerId;
  /** Horodatage de la commande (pour tri et synchronisation) */
  timestamp: Timestamp;
  /** Frame de simulation (optionnel, pour lockstep strict) */
  frame?: FrameNumber;
}

export type CommandType =
  // Navigation
  | 'MOVE'           // Déplacer unités vers position
  | 'MOVE_TO_SYSTEM' // Déplacer vers un autre système
  | 'STOP'           // Arrêter le mouvement
  | 'PATROL'         // Patrouille entre points
  
  // Combat
  | 'ATTACK'         // Attaquer une cible
  | 'ATTACK_MOVE'    // Déplacer en attaquant les ennemis
  | 'HOLD_POSITION'  // Maintenir position, attaquer si ennemi proche
  | 'DEFEND'         // Défendre une cible alliée
  
  // Production
  | 'BUILD_UNIT'     // Construire une unité
  | 'BUILD_STRUCTURE'// Construire une structure
  | 'CANCEL_BUILD'   // Annuler construction
  | 'SET_RALLY'      // Définir point de ralliement
  
  // Économie
  | 'HARVEST'        // Récolter ressources
  | 'DOCK'           // S'amarrer à une station
  | 'UNDOCK'         // Quitter l'amarrage
  | 'TRANSFER'       // Transférer ressources
  
  // Formations
  | 'SET_FORMATION'  // Changer formation du groupe
  
  // Spécial
  | 'ABILITY'        // Activer une capacité spéciale
  | 'SELF_DESTRUCT'; // Auto-destruction

// ============================================================================
// Commandes individuelles (payloads)
// ============================================================================

/** Commande de déplacement vers une position */
export interface MoveCommand extends BaseCommand {
  type: 'MOVE';
  unitIds: EntityId[];
  target: Position3D;
  queue: boolean;  // Ajouter à la file d'ordres (shift+click)
}

/** Commande de déplacement vers un autre système */
export interface MoveToSystemCommand extends BaseCommand {
  type: 'MOVE_TO_SYSTEM';
  unitIds: EntityId[];
  targetSystemId: SystemId;
  targetPosition?: Position3D; // Position dans le système cible
  queue: boolean;
}

/** Commande d'arrêt */
export interface StopCommand extends BaseCommand {
  type: 'STOP';
  unitIds: EntityId[];
}

/** Commande de patrouille */
export interface PatrolCommand extends BaseCommand {
  type: 'PATROL';
  unitIds: EntityId[];
  waypoints: Position3D[];
}

/** Commande d'attaque d'une cible */
export interface AttackCommand extends BaseCommand {
  type: 'ATTACK';
  unitIds: EntityId[];
  targetId: EntityId;
  queue: boolean;
}

/** Commande de déplacement offensif (attack-move) */
export interface AttackMoveCommand extends BaseCommand {
  type: 'ATTACK_MOVE';
  unitIds: EntityId[];
  target: Position3D;
  queue: boolean;
}

/** Commande de maintien de position */
export interface HoldPositionCommand extends BaseCommand {
  type: 'HOLD_POSITION';
  unitIds: EntityId[];
}

/** Commande de défense d'une cible alliée */
export interface DefendCommand extends BaseCommand {
  type: 'DEFEND';
  unitIds: EntityId[];
  targetId: EntityId;
}

/** Commande de construction d'unité */
export interface BuildUnitCommand extends BaseCommand {
  type: 'BUILD_UNIT';
  structureId: EntityId;  // Structure qui construit (chantier naval, etc.)
  unitType: string;       // Type d'unité à construire
  count: number;          // Nombre à construire
}

/** Commande de construction de structure */
export interface BuildStructureCommand extends BaseCommand {
  type: 'BUILD_STRUCTURE';
  builderId: EntityId;    // Unité/structure qui construit
  structureType: string;  // Type de structure
  position: Position3D;   // Position de construction
}

/** Commande d'annulation de construction */
export interface CancelBuildCommand extends BaseCommand {
  type: 'CANCEL_BUILD';
  structureId: EntityId;
  queueIndex?: number;    // Index dans la file (optionnel, sinon dernier)
}

/** Commande de définition du point de ralliement */
export interface SetRallyCommand extends BaseCommand {
  type: 'SET_RALLY';
  structureId: EntityId;
  rallyPoint: Position3D;
}

/** Commande de récolte de ressources */
export interface HarvestCommand extends BaseCommand {
  type: 'HARVEST';
  unitIds: EntityId[];
  targetId: EntityId;     // Astéroïde, gisement, etc.
}

/** Commande d'amarrage */
export interface DockCommand extends BaseCommand {
  type: 'DOCK';
  unitIds: EntityId[];
  stationId: EntityId;
}

/** Commande de désamarrage */
export interface UndockCommand extends BaseCommand {
  type: 'UNDOCK';
  unitIds: EntityId[];
}

/** Commande de transfert de ressources */
export interface TransferCommand extends BaseCommand {
  type: 'TRANSFER';
  sourceId: EntityId;
  targetId: EntityId;
  resourceType: string;
  amount: number;
}

/** Types de formations */
export type FormationType = 
  | 'NONE'      // Pas de formation
  | 'WEDGE'     // Formation en coin (offensive)
  | 'SPHERE'    // Formation sphérique (défensive)
  | 'WALL'      // Mur (ligne défensive)
  | 'CLAW'      // Pince (encerclement)
  | 'COLUMN';   // Colonne (déplacement)

/** Commande de changement de formation */
export interface SetFormationCommand extends BaseCommand {
  type: 'SET_FORMATION';
  unitIds: EntityId[];
  formation: FormationType;
}

/** Commande d'activation de capacité spéciale */
export interface AbilityCommand extends BaseCommand {
  type: 'ABILITY';
  unitId: EntityId;
  abilityId: string;
  targetId?: EntityId;
  targetPosition?: Position3D;
}

/** Commande d'auto-destruction */
export interface SelfDestructCommand extends BaseCommand {
  type: 'SELF_DESTRUCT';
  unitIds: EntityId[];
}

// ============================================================================
// Union de toutes les commandes
// ============================================================================

export type GameCommand =
  | MoveCommand
  | MoveToSystemCommand
  | StopCommand
  | PatrolCommand
  | AttackCommand
  | AttackMoveCommand
  | HoldPositionCommand
  | DefendCommand
  | BuildUnitCommand
  | BuildStructureCommand
  | CancelBuildCommand
  | SetRallyCommand
  | HarvestCommand
  | DockCommand
  | UndockCommand
  | TransferCommand
  | SetFormationCommand
  | AbilityCommand
  | SelfDestructCommand;

// ============================================================================
// Enveloppe réseau (pour P2P lockstep)
// ============================================================================

/**
 * Message de commande complet avec métadonnées réseau.
 * Utilisé pour la synchronisation lockstep P2P.
 */
export interface NetworkCommand {
  /** Frame de simulation où la commande doit être exécutée */
  frame: FrameNumber;
  
  /** Horodatage d'émission (pour debug/latence) */
  timestamp: Timestamp;
  
  /** Joueur émetteur */
  playerId: PlayerId;
  
  /** Commande à exécuter */
  command: GameCommand;
  
  /** Identifiant unique de la commande (pour déduplication) */
  commandId: string;
}

// ============================================================================
// Helpers
// ============================================================================

/**
 * Crée une commande de déplacement simple.
 */
export function createMoveCommand(
  unitIds: EntityId[],
  target: Position3D,
  queue = false
): MoveCommand {
  return { type: 'MOVE', unitIds, target, queue };
}

/**
 * Crée une commande d'attaque.
 */
export function createAttackCommand(
  unitIds: EntityId[],
  targetId: EntityId,
  queue = false
): AttackCommand {
  return { type: 'ATTACK', unitIds, targetId, queue };
}

/**
 * Crée une commande de construction d'unité.
 */
export function createBuildUnitCommand(
  structureId: EntityId,
  unitType: string,
  count = 1
): BuildUnitCommand {
  return { type: 'BUILD_UNIT', structureId, unitType, count };
}

/**
 * Génère un ID unique pour une commande.
 */
export function generateCommandId(): string {
  return `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Crée une enveloppe réseau pour une commande.
 */
export function wrapCommand(
  command: GameCommand,
  playerId: PlayerId,
  frame: FrameNumber
): NetworkCommand {
  return {
    frame,
    timestamp: performance.now(),
    playerId,
    command,
    commandId: generateCommandId()
  };
}