// src/game/combat/CombatSystem.ts
/**
 * Système de combat spatial.
 * 
 * Responsabilités:
 * - Calcul des dégâts
 * - Gestion des attaques
 * - Ciblage automatique
 * - Application des dégâts
 * 
 * KISS: Logique simple et déterministe pour le lockstep.
 */

import { GameState, Unit, SHIP_STATS } from '../../types/GameState';
import type { EntityId, Position3D, PlayerId } from '../../types/commands';
import { distance3D, isAlive, canAttack, getVisibleEnemies } from '../units/UnitFactory';

// ============================================================================
// Configuration du combat
// ============================================================================

/**
 * Configuration globale du combat.
 */
export const COMBAT_CONFIG = {
  /** Facteur de dégâts à distance (1 = pas de pénalité) */
  distanceDamageFalloff: 0.5,
  
  /** Distance en dessous de laquelle pas de falloff */
  minFalloffDistance: 10,
  
  /** Multiplicateur de dégâts critiques */
  criticalMultiplier: 2.0,
  
  /** Chance de critique (0-1) */
  criticalChance: 0.1,
  
  /** Dégâts minimum (même avec armure/bouclier) */
  minimumDamage: 1,
  
  /** Absorption bouclier (% des dégâts absorbés) */
  shieldAbsorption: 0.8,
};

// ============================================================================
// Types de combat
// ============================================================================

/**
 * Résultat d'une attaque.
 */
export interface AttackResult {
  /** Attaquant */
  attackerId: EntityId;
  
  /** Défenseur */
  targetId: EntityId;
  
  /** Dégâts bruts (avant défenses) */
  rawDamage: number;
  
  /** Dégâts aux boucliers */
  shieldDamage: number;
  
  /** Dégâts à la coque */
  hullDamage: number;
  
  /** Coup critique */
  isCritical: boolean;
  
  /** Cible détruite */
  isKill: boolean;
  
  /** Frame de l'attaque */
  frame: number;
}

/**
 * Log de combat (pour replay/debug).
 */
export interface CombatLog {
  attacks: AttackResult[];
  frame: number;
}

// ============================================================================
// Calcul des dégâts
// ============================================================================

/**
 * Calcule les dégâts bruts d'une attaque.
 */
export function calculateRawDamage(
  attacker: Unit,
  target: Unit,
  seed: number
): { damage: number; isCritical: boolean } {
  const stats = SHIP_STATS[attacker.shipClass];
  let damage = stats.attackDamage;
  
  // Facteur de distance
  const dist = distance3D(attacker.position, target.position);
  if (dist > COMBAT_CONFIG.minFalloffDistance) {
    const falloffRange = stats.attackRange - COMBAT_CONFIG.minFalloffDistance;
    const falloffDist = dist - COMBAT_CONFIG.minFalloffDistance;
    const falloffFactor = 1 - (falloffDist / falloffRange) * COMBAT_CONFIG.distanceDamageFalloff;
    damage *= Math.max(0.2, falloffFactor);
  }
  
  // Critique (déterministe basé sur seed)
  const critRoll = seededRandom(seed);
  const isCritical = critRoll < COMBAT_CONFIG.criticalChance;
  if (isCritical) {
    damage *= COMBAT_CONFIG.criticalMultiplier;
  }
  
  return { damage, isCritical };
}

/**
 * Générateur de nombre aléatoire déterministe (pour lockstep).
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * Applique les dégâts à une unité (bouclier puis coque).
 * Retourne les dégâts effectifs.
 */
export function applyDamage(
  target: Unit,
  rawDamage: number
): { shieldDamage: number; hullDamage: number } {
  const stats = SHIP_STATS[target.shipClass];
  
  // Réduction par armure
  const damageAfterArmor = Math.max(
    COMBAT_CONFIG.minimumDamage,
    rawDamage - stats.armor
  );
  
  // Absorption bouclier
  let shieldDamage = 0;
  let remainingDamage = damageAfterArmor;
  
  if (target.shield > 0) {
    const shieldAbsorb = remainingDamage * COMBAT_CONFIG.shieldAbsorption;
    shieldDamage = Math.min(target.shield, shieldAbsorb);
    target.shield -= shieldDamage;
    remainingDamage -= shieldDamage;
  }
  
  // Dégâts à la coque
  const hullDamage = Math.min(target.health, remainingDamage);
  target.health -= hullDamage;
  
  return { shieldDamage, hullDamage };
}

// ============================================================================
// Exécution des attaques
// ============================================================================

/**
 * Effectue une attaque d'une unité sur sa cible.
 * Retourne null si l'attaque n'est pas possible.
 */
export function performAttack(
  attacker: Unit,
  state: GameState
): AttackResult | null {
  // Vérifications de base
  if (!isAlive(attacker)) return null;
  if (!canAttack(attacker)) return null;
  if (attacker.targetId === null) return null;
  
  const target = state.units.get(attacker.targetId);
  if (!target || !isAlive(target)) {
    attacker.targetId = null;
    return null;
  }
  
  // Vérifier portée
  const stats = SHIP_STATS[attacker.shipClass];
  const dist = distance3D(attacker.position, target.position);
  if (dist > stats.attackRange) {
    return null;
  }
  
  // Seed déterministe pour le combat
  const seed = state.currentFrame * 1000 + attacker.id * 100 + target.id;
  
  // Calculer dégâts
  const { damage, isCritical } = calculateRawDamage(attacker, target, seed);
  
  // Appliquer dégâts
  const { shieldDamage, hullDamage } = applyDamage(target, damage);
  
  // Mettre cooldown
  attacker.attackCooldown = 1 / stats.attackSpeed;
  
  // Vérifier si tué
  const isKill = target.health <= 0;
  if (isKill) {
    target.state = 'DESTROYED';
    attacker.targetId = null;
  }
  
  return {
    attackerId: attacker.id,
    targetId: target.id,
    rawDamage: damage,
    shieldDamage,
    hullDamage,
    isCritical,
    isKill,
    frame: state.currentFrame
  };
}

// ============================================================================
// Ciblage automatique
// ============================================================================

/**
 * Stratégie de ciblage.
 */
export type TargetingStrategy = 
  | 'CLOSEST'         // Plus proche
  | 'WEAKEST'         // Plus faible (HP)
  | 'STRONGEST'       // Plus fort (menace)
  | 'LOWEST_SHIELD';  // Bouclier le plus bas

/**
 * Trouve la meilleure cible pour une unité selon sa stratégie.
 */
export function findBestTarget(
  unit: Unit,
  state: GameState,
  strategy: TargetingStrategy = 'CLOSEST'
): Unit | null {
  const stats = SHIP_STATS[unit.shipClass];
  
  // Pas d'armes = pas de ciblage
  if (stats.attackDamage <= 0) return null;
  
  // Trouver les ennemis visibles
  const enemies = getVisibleEnemies(
    state,
    unit.ownerId,
    unit.systemId,
    unit.position,
    stats.sensorRange
  );
  
  if (enemies.length === 0) return null;
  
  // Filtrer par portée d'attaque
  const inRange = enemies.filter(e => 
    distance3D(unit.position, e.position) <= stats.attackRange
  );
  
  // Si aucun à portée, prendre le plus proche des visibles
  const candidates = inRange.length > 0 ? inRange : enemies;
  
  // Trier selon la stratégie
  switch (strategy) {
    case 'CLOSEST':
      candidates.sort((a, b) => 
        distance3D(unit.position, a.position) - 
        distance3D(unit.position, b.position)
      );
      break;
      
    case 'WEAKEST':
      candidates.sort((a, b) => 
        (a.health + a.shield) - (b.health + b.shield)
      );
      break;
      
    case 'STRONGEST':
      candidates.sort((a, b) => {
        const threatA = calculateThreatLevel(a);
        const threatB = calculateThreatLevel(b);
        return threatB - threatA;
      });
      break;
      
    case 'LOWEST_SHIELD':
      candidates.sort((a, b) => a.shield - b.shield);
      break;
  }
  
  return candidates[0];
}

/**
 * Calcule le niveau de menace d'une unité.
 * Utilisé pour prioriser les cibles dangereuses.
 */
export function calculateThreatLevel(unit: Unit): number {
  const stats = SHIP_STATS[unit.shipClass];
  
  // DPS potentiel
  const dps = stats.attackDamage * stats.attackSpeed;
  
  // Facteur de survie
  const survivability = stats.maxHealth + stats.maxShield + stats.armor * 10;
  
  // Menace = DPS pondéré par survie
  return dps * (1 + survivability / 1000);
}

/**
 * Met à jour le ciblage automatique d'une unité.
 * Appelé chaque frame pour les unités en mode offensif.
 */
export function updateAutoTargeting(unit: Unit, state: GameState): void {
  // Skip si stance passive
  if (unit.combatStance === 'PASSIVE' || unit.combatStance === 'HOLD_FIRE') {
    return;
  }
  
  // Skip si déjà une cible valide
  if (unit.targetId !== null) {
    const currentTarget = state.units.get(unit.targetId);
    if (currentTarget && isAlive(currentTarget)) {
      // Vérifier si toujours à portée de détection
      const stats = SHIP_STATS[unit.shipClass];
      const dist = distance3D(unit.position, currentTarget.position);
      if (dist <= stats.sensorRange) {
        return; // Garder la cible actuelle
      }
    }
    // Cible invalide, chercher nouvelle
    unit.targetId = null;
  }
  
  // Chercher nouvelle cible
  const strategy: TargetingStrategy = 
    unit.combatStance === 'AGGRESSIVE' ? 'CLOSEST' : 'CLOSEST';
  
  const newTarget = findBestTarget(unit, state, strategy);
  if (newTarget) {
    unit.targetId = newTarget.id;
  }
}

// ============================================================================
// Combat système principal
// ============================================================================

/**
 * Traite le combat pour toutes les unités.
 * Retourne les logs de combat de cette frame.
 */
export function processCombat(state: GameState): CombatLog {
  const attacks: AttackResult[] = [];
  
  for (const unit of state.units.values()) {
    if (!isAlive(unit)) continue;
    if (unit.state !== 'ATTACKING') continue;
    
    // Mise à jour ciblage auto
    updateAutoTargeting(unit, state);
    
    // Tenter une attaque
    const result = performAttack(unit, state);
    if (result) {
      attacks.push(result);
    }
  }
  
  return {
    attacks,
    frame: state.currentFrame
  };
}

// ============================================================================
// Utilitaires de combat
// ============================================================================

/**
 * Vérifie si deux unités sont ennemies.
 */
export function areEnemies(
  state: GameState,
  unitA: Unit,
  unitB: Unit
): boolean {
  if (unitA.ownerId === unitB.ownerId) return false;
  
  const playerA = state.players.get(unitA.ownerId);
  if (!playerA) return false;
  
  const relation = playerA.diplomacy.get(unitB.ownerId);
  return relation === 'ENEMY' || relation === 'WAR';
}

/**
 * Compte les unités dans un rayon.
 */
export function countUnitsInRadius(
  state: GameState,
  center: Position3D,
  radius: number,
  filter?: (unit: Unit) => boolean
): number {
  let count = 0;
  
  for (const unit of state.units.values()) {
    if (!isAlive(unit)) continue;
    if (filter && !filter(unit)) continue;
    
    const dist = distance3D(center, unit.position);
    if (dist <= radius) {
      count++;
    }
  }
  
  return count;
}

/**
 * Inflige des dégâts de zone (explosions, etc.).
 */
export function applyAreaDamage(
  state: GameState,
  center: Position3D,
  radius: number,
  damage: number,
  sourcePlayerId: PlayerId,
  systemId: number
): AttackResult[] {
  const results: AttackResult[] = [];
  
  for (const unit of state.units.values()) {
    if (!isAlive(unit)) continue;
    if (unit.systemId !== systemId) continue;
    if (unit.ownerId === sourcePlayerId) continue; // Pas de friendly fire
    
    const dist = distance3D(center, unit.position);
    if (dist > radius) continue;
    
    // Dégâts décroissants avec la distance
    const falloff = 1 - (dist / radius);
    const actualDamage = damage * falloff;
    
    const { shieldDamage, hullDamage } = applyDamage(unit, actualDamage);
    const isKill = unit.health <= 0;
    
    if (isKill) {
      unit.state = 'DESTROYED';
    }
    
    results.push({
      attackerId: 0, // Dégâts de zone
      targetId: unit.id,
      rawDamage: actualDamage,
      shieldDamage,
      hullDamage,
      isCritical: false,
      isKill,
      frame: state.currentFrame
    });
  }
  
  return results;
}