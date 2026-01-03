/**
 * PEEJS — Game Module Index
 *
 * Point d'export centralisé pour tous les systèmes de gameplay.
 * Facilite les imports et maintient une API publique claire.
 */

// === GAME BOOTSTRAP ===
export { 
  GameBootstrap,
  initializeGame,
  startGame,
  hostGame,
  joinGame,
  getGalaxy,
  getPlayerId,
  isHost,
  isInitialized
} from './GameBootstrap';
export type { BootstrapConfig } from './GameBootstrap';

// === GAME MANAGER & INTEGRATION ===
export { GameManager } from './GameManager';
export { GameLoop, gameLoop, GAME_LOOP_CONFIG } from './GameLoop';
export type { GameLoopCallbacks, GameLoopState } from './GameLoop';
export { GameIntegration, createGameIntegration } from './GameIntegration';
export type { GameIntegrationConfig, GameSession } from './GameIntegration';
export { CommandProcessor, processCommand } from './CommandProcessor';
export type { CommandResult, CommandLog } from './CommandProcessor';

// === COMBAT SYSTEM ===
// Note: CombatSystem exporte des fonctions, pas une classe
export {
  COMBAT_CONFIG,
  calculateRawDamage,
  applyDamage,
  performAttack,
  findBestTarget,
  calculateThreatLevel,
  updateAutoTargeting,
  processCombat,
  areEnemies,
  countUnitsInRadius,
  applyAreaDamage,
} from './combat/CombatSystem';
export type {
  AttackResult,
  CombatLog,
  TargetingStrategy,
} from './combat/CombatSystem';

/**
 * Stub pour compatibilité - définition d'arme.
 */
export interface WeaponDefinition {
  name: string;
  damage: number;
  range: number;
  cooldown: number;
  projectileSpeed?: number;
}

/**
 * Stub pour compatibilité - événement de combat.
 */
export interface CombatEvent {
  type: 'ATTACK' | 'DAMAGE' | 'DESTROY';
  attackerId: number;
  targetId: number;
  damage?: number;
  frame: number;
}

/**
 * Stub pour compatibilité - résultat de dégâts.
 */
export interface DamageResult {
  shieldDamage: number;
  hullDamage: number;
  totalDamage: number;
  isKill: boolean;
}

// === ECONOMY SYSTEM ===
export {
  ECONOMY_CONFIG,
  STRUCTURE_STATS,
  canAfford,
  deductCost,
  addResources,
  calculatePassiveIncome,
  queueProduction,
  updateStructureProduction,
  findNearestResourceSource,
  updateHarvesting,
  depositResources,
  startResearch,
  updateResearch,
  updateEconomy,
  countPlayerStructures,
  getPlayerStructuresInSystem,
  calculateResourceValue,
} from './economy/EconomySystem';
export type { StructureStats } from './economy/EconomySystem';

// ProductionOrder est défini dans GameState.ts, on re-exporte
export type { ProductionOrder } from '../types/GameState';

/**
 * Stub pour compatibilité - élément de file de production.
 */
export interface ProductionQueueItem {
  orderId: string;
  itemType: string;
  progress: number;
  estimatedTime: number;
}

// === UNITS SYSTEM ===
export {
  canAffordUnit,
  deductUnitCost,
  createUnitFromClass,
  spawnUnit,
  spawnUnitFree,
  destroyUnit,
  getPlayerUnits,
  getSystemUnits,
  getPlayerUnitsInSystem,
  getVisibleEnemies,
  distance3D,
  isInCombat,
  canAttack,
  isAlive,
} from './units/UnitFactory';

export {
  updateRotation,
  moveToDestination,
  regenerateShield,
  updateAttackCooldown,
  updateUnitState,
  updateUnit,
  updateAllUnits,
  orderMove,
  orderAttack,
  orderStop,
  orderHoldPosition,
  orderPatrol,
  orderRetreat,
  orderHarvest,
  findNearestEnemy,
  autoEngage,
  updatePatrol,
} from './units/UnitBehavior';

export { UnitController } from './units/UnitController';

/**
 * Stub pour compatibilité - définition d'unité.
 * Les vraies stats sont dans SHIP_STATS de GameState.ts.
 */
export interface UnitDefinition {
  shipClass: string;
  name: string;
  maxHealth: number;
  maxShield: number;
  speed: number;
  attackDamage: number;
  attackRange: number;
}

/**
 * Stub pour compatibilité - coût d'unité.
 * Les vrais coûts sont dans SHIP_STATS[shipClass].cost.
 */
export interface UnitCost {
  credits?: number;
  metal?: number;
  crystal?: number;
  fuel?: number;
}