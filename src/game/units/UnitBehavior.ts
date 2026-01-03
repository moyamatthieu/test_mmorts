// src/game/units/UnitBehavior.ts
/**
 * Logique de comportement des unités.
 * 
 * Responsabilités:
 * - Déplacement vers destination
 * - Rotation vers cible
 * - Régénération boucliers
 * - Gestion des états (idle, moving, attacking, etc.)
 * 
 * KISS: Fonctions pures, pas de dépendances sur Three.js.
 */

import { Unit, UnitState, SHIP_STATS, GameState } from '../../types/GameState';
import type { Position3D, EntityId } from '../../types/commands';
import { distance3D, isAlive } from './UnitFactory';

// ============================================================================
// Constantes de comportement
// ============================================================================

/** Distance minimale pour considérer qu'une destination est atteinte */
const ARRIVAL_THRESHOLD = 0.5;

/** Facteur de friction pour ralentir progressivement */
const FRICTION = 0.95;

/** Seuil d'angle pour considérer qu'on fait face à la cible (radians) */
const FACING_THRESHOLD = 0.1;

// ============================================================================
// Mouvement
// ============================================================================

/**
 * Normalise un vecteur 3D.
 */
function normalize(v: Position3D): Position3D {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

/**
 * Calcule l'angle vers une cible (Y axis).
 */
function angleToTarget(from: Position3D, to: Position3D): number {
  const dx = to.x - from.x;
  const dz = to.z - from.z;
  return Math.atan2(dx, dz);
}

/**
 * Normalise un angle entre -PI et PI.
 */
function normalizeAngle(angle: number): number {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

/**
 * Met à jour la rotation d'une unité pour faire face à sa destination.
 * Retourne true si l'unité fait face à la cible (dans le seuil).
 */
export function updateRotation(unit: Unit, target: Position3D, deltaTime: number): boolean {
  const stats = SHIP_STATS[unit.shipClass];
  const targetAngle = angleToTarget(unit.position, target);
  const angleDiff = normalizeAngle(targetAngle - unit.rotation);
  
  // Vitesse de rotation limitée
  const maxRotation = stats.turnRate * deltaTime;
  
  if (Math.abs(angleDiff) <= maxRotation) {
    unit.rotation = targetAngle;
    return true;
  }
  
  // Rotation progressive
  unit.rotation += Math.sign(angleDiff) * maxRotation;
  unit.rotation = normalizeAngle(unit.rotation);
  
  return Math.abs(angleDiff) <= FACING_THRESHOLD;
}

/**
 * Déplace une unité vers sa destination.
 * Gère accélération, décélération et arrivée.
 * 
 * @returns true si l'unité a atteint sa destination
 */
export function moveToDestination(unit: Unit, deltaTime: number): boolean {
  if (!unit.destination) {
    // Pas de destination, appliquer friction
    unit.velocity.x *= FRICTION;
    unit.velocity.y *= FRICTION;
    unit.velocity.z *= FRICTION;
    return true;
  }
  
  const stats = SHIP_STATS[unit.shipClass];
  const distToTarget = distance3D(unit.position, unit.destination);
  
  // Arrivée à destination
  if (distToTarget < ARRIVAL_THRESHOLD) {
    unit.destination = null;
    unit.velocity = { x: 0, y: 0, z: 0 };
    return true;
  }
  
  // Faire face à la destination
  const isFacing = updateRotation(unit, unit.destination, deltaTime);
  
  // Ne se déplace que si fait face (comportement réaliste)
  if (isFacing) {
    // Direction vers destination
    const direction = normalize({
      x: unit.destination.x - unit.position.x,
      y: unit.destination.y - unit.position.y,
      z: unit.destination.z - unit.position.z
    });
    
    // Décélération à l'approche
    const decelerationDist = stats.speed * 2; // Distance pour commencer à freiner
    const speedFactor = distToTarget < decelerationDist 
      ? distToTarget / decelerationDist 
      : 1;
    
    // Appliquer vélocité
    const targetSpeed = stats.speed * speedFactor;
    unit.velocity.x = direction.x * targetSpeed;
    unit.velocity.y = direction.y * targetSpeed;
    unit.velocity.z = direction.z * targetSpeed;
  } else {
    // Ralentir si on tourne
    unit.velocity.x *= 0.9;
    unit.velocity.y *= 0.9;
    unit.velocity.z *= 0.9;
  }
  
  // Appliquer mouvement
  unit.position.x += unit.velocity.x * deltaTime;
  unit.position.y += unit.velocity.y * deltaTime;
  unit.position.z += unit.velocity.z * deltaTime;
  
  return false;
}

// ============================================================================
// Régénération
// ============================================================================

/**
 * Régénère les boucliers d'une unité.
 */
export function regenerateShield(unit: Unit, deltaTime: number): void {
  const stats = SHIP_STATS[unit.shipClass];
  
  if (unit.shield < stats.maxShield) {
    unit.shield = Math.min(
      stats.maxShield,
      unit.shield + stats.shieldRegen * deltaTime
    );
  }
}

/**
 * Réduit le cooldown d'attaque.
 */
export function updateAttackCooldown(unit: Unit, deltaTime: number): void {
  if (unit.attackCooldown > 0) {
    unit.attackCooldown = Math.max(0, unit.attackCooldown - deltaTime);
  }
}

// ============================================================================
// Gestion d'état
// ============================================================================

/**
 * Transitions d'état automatiques basées sur les conditions.
 * Appelé chaque frame pour mettre à jour l'état de l'unité.
 */
export function updateUnitState(unit: Unit, state: GameState, deltaTime: number): void {
  // Unité morte
  if (unit.health <= 0) {
    unit.state = 'DESTROYED';
    return;
  }
  
  // Machine à états simple
  switch (unit.state) {
    case 'IDLE':
      // Transition vers MOVING si destination définie
      if (unit.destination) {
        unit.state = 'MOVING';
      }
      // Transition vers ATTACKING si cible définie
      else if (unit.targetId !== null) {
        unit.state = 'ATTACKING';
      }
      break;
      
    case 'MOVING':
      // Vérifier si on a une cible à attaquer en route
      if (unit.targetId !== null && unit.combatStance !== 'HOLD_FIRE') {
        const target = state.units.get(unit.targetId);
        if (target && isAlive(target)) {
          const stats = SHIP_STATS[unit.shipClass];
          const dist = distance3D(unit.position, target.position);
          if (dist <= stats.attackRange) {
            unit.state = 'ATTACKING';
            break;
          }
        }
      }
      
      // Arrivée à destination
      if (!unit.destination) {
        unit.state = 'IDLE';
      }
      break;
      
    case 'ATTACKING':
      // Vérifier si la cible est toujours valide
      if (unit.targetId === null) {
        unit.state = unit.destination ? 'MOVING' : 'IDLE';
        break;
      }
      
      const target = state.units.get(unit.targetId);
      if (!target || !isAlive(target)) {
        unit.targetId = null;
        unit.state = unit.destination ? 'MOVING' : 'IDLE';
        break;
      }
      
      // Vérifier portée
      const stats = SHIP_STATS[unit.shipClass];
      const dist = distance3D(unit.position, target.position);
      if (dist > stats.attackRange) {
        // Poursuivre la cible
        unit.destination = { ...target.position };
        unit.state = 'MOVING';
      }
      break;
      
    case 'HARVESTING':
      // TODO: Implémenter la logique de récolte
      break;
      
    case 'DOCKING':
      // TODO: Implémenter la logique d'amarrage
      break;
      
    case 'REPAIRING':
      // TODO: Implémenter la logique de réparation
      break;
      
    case 'PATROLLING':
      // TODO: Implémenter la logique de patrouille
      break;
      
    case 'DEFENDING':
      // TODO: Implémenter la logique de défense
      break;
      
    case 'RETREATING':
      // Continuer à fuir jusqu'à destination atteinte
      if (!unit.destination) {
        unit.state = 'IDLE';
      }
      break;
      
    case 'WARPING':
      // Voyage inter-système (géré ailleurs)
      break;
      
    case 'DESTROYED':
      // État terminal
      break;
  }
}

// ============================================================================
// Update principal
// ============================================================================

/**
 * Met à jour une unité pour une frame.
 * Fonction principale appelée par le système de simulation.
 */
export function updateUnit(unit: Unit, state: GameState, deltaTime: number): void {
  // Skip si détruite
  if (unit.state === 'DESTROYED') return;
  
  // Régénération passive
  regenerateShield(unit, deltaTime);
  updateAttackCooldown(unit, deltaTime);
  
  // Mouvement
  if (unit.state === 'MOVING' || unit.state === 'RETREATING') {
    moveToDestination(unit, deltaTime);
  }
  
  // Si en attaque et pas de destination, tourner vers la cible
  if (unit.state === 'ATTACKING' && unit.targetId !== null) {
    const target = state.units.get(unit.targetId);
    if (target) {
      updateRotation(unit, target.position, deltaTime);
    }
  }
  
  // Mise à jour de l'état
  updateUnitState(unit, state, deltaTime);
  
  // Timestamp
  unit.updatedAtFrame = state.currentFrame;
}

/**
 * Met à jour toutes les unités du jeu.
 */
export function updateAllUnits(state: GameState, deltaTime: number): void {
  for (const unit of state.units.values()) {
    updateUnit(unit, state, deltaTime);
  }
}

// ============================================================================
// Ordres et commandes
// ============================================================================

/**
 * Ordonne à une unité de se déplacer vers une position.
 */
export function orderMove(unit: Unit, destination: Position3D): void {
  unit.destination = { ...destination };
  unit.state = 'MOVING';
  // Clear la cible d'attaque sauf si stance agressive
  if (unit.combatStance !== 'AGGRESSIVE') {
    unit.targetId = null;
  }
}

/**
 * Ordonne à une unité d'attaquer une cible.
 */
export function orderAttack(unit: Unit, targetId: EntityId): void {
  unit.targetId = targetId;
  unit.state = 'ATTACKING';
}

/**
 * Ordonne à une unité de s'arrêter.
 */
export function orderStop(unit: Unit): void {
  unit.destination = null;
  unit.targetId = null;
  unit.state = 'IDLE';
  unit.velocity = { x: 0, y: 0, z: 0 };
}

/**
 * Ordonne à une unité de tenir position.
 */
export function orderHoldPosition(unit: Unit): void {
  unit.destination = null;
  unit.state = 'DEFENDING';
}

/**
 * Ordonne à une unité de patrouiller entre plusieurs waypoints.
 */
export function orderPatrol(unit: Unit, waypoints: Position3D[]): void {
  if (waypoints.length === 0) return;
  
  // Sauvegarder les waypoints dans l'ordre queue
  unit.orderQueue = waypoints.map((wp, idx) => ({
    type: 'PATROL_POINT',
    data: { ...wp },
    index: idx
  }));
  
  // Commencer par le premier waypoint
  unit.destination = { ...waypoints[0] };
  unit.state = 'PATROLLING';
  
  // Stocker l'index courant dans userData
  (unit as any).patrolIndex = 0;
}

/**
 * Ordonne à une unité de fuir vers une position.
 */
export function orderRetreat(unit: Unit, safePosition: Position3D): void {
  unit.destination = { ...safePosition };
  unit.targetId = null;
  unit.state = 'RETREATING';
}

// ============================================================================
// Ciblage automatique
// ============================================================================

/**
 * Trouve la cible la plus proche dans la portée d'attaque.
 */
export function findNearestEnemy(
  unit: Unit,
  state: GameState,
  maxRange?: number
): Unit | null {
  const stats = SHIP_STATS[unit.shipClass];
  const range = maxRange ?? stats.sensorRange;
  
  let nearest: Unit | null = null;
  let nearestDist = Infinity;
  
  for (const other of state.units.values()) {
    // Skip soi-même, alliés, et unités mortes
    if (other.id === unit.id) continue;
    if (other.ownerId === unit.ownerId) continue;
    if (!isAlive(other)) continue;
    
    const dist = distance3D(unit.position, other.position);
    if (dist < range && dist < nearestDist) {
      nearest = other;
      nearestDist = dist;
    }
  }
  
  return nearest;
}

/**
 * Engagement automatique basé sur la stance de combat.
 */
export function autoEngage(unit: Unit, state: GameState): void {
  if (unit.combatStance === 'PASSIVE' || unit.combatStance === 'HOLD_FIRE') {
    return;
  }
  
  // Ne pas changer de cible si on en a déjà une valide
  if (unit.targetId !== null) {
    const currentTarget = state.units.get(unit.targetId);
    if (currentTarget && isAlive(currentTarget)) {
      const stats = SHIP_STATS[unit.shipClass];
      const dist = distance3D(unit.position, currentTarget.position);
      if (dist <= stats.attackRange * 1.5) {
        return; // Garder la cible actuelle
      }
    }
  }
  
  // Chercher une nouvelle cible
  const stats = SHIP_STATS[unit.shipClass];
  const searchRange = unit.combatStance === 'AGGRESSIVE' 
    ? stats.sensorRange 
    : stats.attackRange;
  
  const enemy = findNearestEnemy(unit, state, searchRange);
  if (enemy) {
    unit.targetId = enemy.id;
    
    // En mode agressif, poursuivre la cible
    if (unit.combatStance === 'AGGRESSIVE' && unit.state !== 'ATTACKING') {
      unit.state = 'ATTACKING';
    }
  }
}

// ============================================================================
// Logique de patrouille
// ============================================================================

/**
 * Met à jour le comportement de patrouille.
 */
export function updatePatrol(unit: Unit, deltaTime: number): void {
  if (unit.state !== 'PATROLLING') return;
  if (unit.orderQueue.length < 2) {
    unit.state = 'IDLE';
    return;
  }
  
  // Mouvement vers waypoint actuel
  const arrived = moveToDestination(unit, deltaTime);
  
  if (arrived) {
    // Passer au waypoint suivant
    const patrolIndex = ((unit as any).patrolIndex ?? 0) + 1;
    const nextIndex = patrolIndex % unit.orderQueue.length;
    (unit as any).patrolIndex = nextIndex;
    
    const nextWaypoint = unit.orderQueue[nextIndex]?.data;
    if (nextWaypoint) {
      unit.destination = { ...nextWaypoint };
    }
  }
}

// ============================================================================
// Logique de récolte
// ============================================================================

/**
 * Ordonne à un harvester de récolter une source.
 */
export function orderHarvest(unit: Unit, sourceId: EntityId): void {
  if (unit.shipClass !== 'HARVESTER') {
    console.warn('[UnitBehavior] Only harvesters can harvest');
    return;
  }
  
  unit.targetId = sourceId;
  unit.state = 'HARVESTING';
}

/**
 * Met à jour le comportement de récolte.
 */
export function updateHarvesting(
  unit: Unit,
  state: GameState,
  deltaTime: number
): { harvested: number; resourceType: string } | null {
  if (unit.state !== 'HARVESTING') return null;
  if (unit.shipClass !== 'HARVESTER') return null;
  
  const stats = SHIP_STATS[unit.shipClass];
  const harvestRange = 15; // Distance de récolte
  const harvestRate = 5; // Ressources par seconde
  
  // Vérifier si on a une cible
  if (unit.targetId === null) {
    unit.state = 'IDLE';
    return null;
  }
  
  const source = state.resourceSources?.get(unit.targetId);
  if (!source) {
    unit.targetId = null;
    unit.state = 'IDLE';
    return null;
  }
  
  const dist = distance3D(unit.position, source.position);
  
  if (dist > harvestRange) {
    // Se déplacer vers la source
    unit.destination = { ...source.position };
    moveToDestination(unit, deltaTime);
    return null;
  }
  
  // Récolter
  const cargoSpace = stats.cargoCapacity - (unit.cargo?.amount ?? 0);
  if (cargoSpace <= 0) {
    // Cargo plein, retourner à la base
    unit.state = 'DOCKING';
    return null;
  }
  
  const amount = Math.min(harvestRate * deltaTime, cargoSpace, source.amount);
  source.amount -= amount;
  
  if (!unit.cargo) {
    unit.cargo = { type: source.type, amount: 0 };
  }
  unit.cargo.amount += amount;
  
  return { harvested: amount, resourceType: source.type };
}