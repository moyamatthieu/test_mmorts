// src/game/units/UnitFactory.ts
/**
 * Factory pour la création d'unités (vaisseaux).
 * 
 * Responsabilités:
 * - Créer des unités avec les stats appropriées
 * - Valider les ressources disponibles
 * - Générer les IDs uniques
 * - Initialiser l'état des unités
 * 
 * KISS: Pas de patterns complexes, juste des fonctions pures.
 */

import {
  GameState,
  Unit,
  ShipClass,
  SHIP_STATS,
  Resources,
  generateEntityId,
  CombatStance,
  UnitState
} from '../../types/GameState';
import type { EntityId, PlayerId, SystemId, Position3D } from '../../types/commands';

// ============================================================================
// Validation
// ============================================================================

/**
 * Vérifie si un joueur a les ressources nécessaires pour construire une unité.
 * 
 * @param playerResources - Ressources actuelles du joueur
 * @param shipClass - Classe de vaisseau à construire
 * @returns true si les ressources sont suffisantes
 */
export function canAffordUnit(
  playerResources: Resources,
  shipClass: ShipClass
): boolean {
  const cost = SHIP_STATS[shipClass].cost;
  
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount && playerResources[resource as keyof Resources] < amount) {
      return false;
    }
  }
  
  return true;
}

/**
 * Déduit le coût d'une unité des ressources du joueur.
 * Modifie playerResources en place.
 * 
 * @param playerResources - Ressources du joueur (mutées)
 * @param shipClass - Classe de vaisseau
 */
export function deductUnitCost(
  playerResources: Resources,
  shipClass: ShipClass
): void {
  const cost = SHIP_STATS[shipClass].cost;
  
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount) {
      playerResources[resource as keyof Resources] -= amount;
    }
  }
}

// ============================================================================
// Création d'unités
// ============================================================================

/**
 * Crée une nouvelle unité avec les stats de base.
 * N'ajoute PAS l'unité au GameState (responsabilité de l'appelant).
 * 
 * @param state - État du jeu (pour générer l'ID)
 * @param ownerId - ID du joueur propriétaire
 * @param shipClass - Classe de vaisseau
 * @param systemId - Système solaire où spawn l'unité
 * @param position - Position de spawn
 * @param name - Nom personnalisé optionnel
 * @returns Nouvelle unité initialisée
 */
export function createUnitFromClass(
  state: GameState,
  ownerId: PlayerId,
  shipClass: ShipClass,
  systemId: SystemId,
  position: Position3D,
  name?: string
): Unit {
  const id = generateEntityId(state);
  const stats = SHIP_STATS[shipClass];
  
  const unit: Unit = {
    id,
    ownerId,
    shipClass,
    name,
    
    // Position et mouvement
    systemId,
    position: { ...position },
    velocity: { x: 0, y: 0, z: 0 },
    rotation: 0,
    destination: null,
    
    // Combat et santé (initialisés aux valeurs max)
    health: stats.maxHealth,
    shield: stats.maxShield,
    targetId: null,
    combatStance: 'DEFENSIVE',
    attackCooldown: 0,
    
    // État et comportement
    state: 'IDLE',
    formation: 'NONE',
    formationOffset: { x: 0, y: 0, z: 0 },
    groupLeaderId: null,
    
    // Cargo (vide par défaut)
    cargo: {},
    orderQueue: [],
    
    // Timestamps
    createdAtFrame: state.currentFrame,
    updatedAtFrame: state.currentFrame
  };
  
  return unit;
}

/**
 * Spawn une unité complète dans le jeu.
 * Vérifie les ressources, les déduit, crée l'unité et l'ajoute au state.
 * 
 * @param state - État du jeu (muté)
 * @param ownerId - ID du joueur
 * @param shipClass - Classe de vaisseau
 * @param systemId - Système de spawn
 * @param position - Position de spawn
 * @returns L'unité créée, ou null si ressources insuffisantes
 */
export function spawnUnit(
  state: GameState,
  ownerId: PlayerId,
  shipClass: ShipClass,
  systemId: SystemId,
  position: Position3D
): Unit | null {
  const player = state.players.get(ownerId);
  if (!player) {
    console.warn(`[UnitFactory] Player not found: ${ownerId}`);
    return null;
  }
  
  // Vérifier les ressources
  if (!canAffordUnit(player.resources, shipClass)) {
    console.warn(`[UnitFactory] Insufficient resources for ${shipClass}`);
    return null;
  }
  
  // Déduire le coût
  deductUnitCost(player.resources, shipClass);
  
  // Créer l'unité
  const unit = createUnitFromClass(
    state,
    ownerId,
    shipClass,
    systemId,
    position
  );
  
  // Ajouter au state
  state.units.set(unit.id, unit);
  
  console.log(`[UnitFactory] Spawned ${shipClass} (ID: ${unit.id}) for player ${ownerId}`);
  
  return unit;
}

/**
 * Spawn une unité gratuite (pour tests ou événements spéciaux).
 * Ne vérifie pas les ressources.
 */
export function spawnUnitFree(
  state: GameState,
  ownerId: PlayerId,
  shipClass: ShipClass,
  systemId: SystemId,
  position: Position3D,
  name?: string
): Unit {
  const unit = createUnitFromClass(state, ownerId, shipClass, systemId, position, name);
  state.units.set(unit.id, unit);
  return unit;
}

// ============================================================================
// Suppression d'unités
// ============================================================================

/**
 * Détruit une unité et la retire du jeu.
 * 
 * @param state - État du jeu
 * @param unitId - ID de l'unité à détruire
 * @returns true si l'unité a été supprimée
 */
export function destroyUnit(state: GameState, unitId: EntityId): boolean {
  const unit = state.units.get(unitId);
  if (!unit) return false;
  
  // Marquer comme détruite avant suppression (pour événements)
  unit.state = 'DESTROYED';
  unit.updatedAtFrame = state.currentFrame;
  
  // Nettoyer les références
  // - Retirer des cibles d'autres unités
  for (const otherUnit of state.units.values()) {
    if (otherUnit.targetId === unitId) {
      otherUnit.targetId = null;
    }
    if (otherUnit.groupLeaderId === unitId) {
      otherUnit.groupLeaderId = null;
    }
  }
  
  // Supprimer du state
  state.units.delete(unitId);
  
  console.log(`[UnitFactory] Destroyed unit ${unitId}`);
  
  return true;
}

// ============================================================================
// Requêtes
// ============================================================================

/**
 * Récupère toutes les unités d'un joueur.
 */
export function getPlayerUnits(state: GameState, playerId: PlayerId): Unit[] {
  return Array.from(state.units.values()).filter(u => u.ownerId === playerId);
}

/**
 * Récupère toutes les unités dans un système.
 */
export function getSystemUnits(state: GameState, systemId: SystemId): Unit[] {
  return Array.from(state.units.values()).filter(u => u.systemId === systemId);
}

/**
 * Récupère les unités d'un joueur dans un système spécifique.
 */
export function getPlayerUnitsInSystem(
  state: GameState,
  playerId: PlayerId,
  systemId: SystemId
): Unit[] {
  return Array.from(state.units.values()).filter(
    u => u.ownerId === playerId && u.systemId === systemId
  );
}

/**
 * Récupère les unités ennemies visibles depuis une position.
 */
export function getVisibleEnemies(
  state: GameState,
  playerId: PlayerId,
  systemId: SystemId,
  position: Position3D,
  sensorRange: number
): Unit[] {
  const player = state.players.get(playerId);
  if (!player) return [];
  
  return Array.from(state.units.values()).filter(unit => {
    // Même système
    if (unit.systemId !== systemId) return false;
    
    // Pas le même joueur
    if (unit.ownerId === playerId) return false;
    
    // Vérifier relation diplomatique (ennemi ou en guerre)
    const relation = player.diplomacy.get(unit.ownerId);
    if (relation !== 'ENEMY' && relation !== 'WAR') return false;
    
    // À portée de détection
    const dx = unit.position.x - position.x;
    const dy = unit.position.y - position.y;
    const dz = unit.position.z - position.z;
    const distSq = dx * dx + dy * dy + dz * dz;
    
    return distSq <= sensorRange * sensorRange;
  });
}

// ============================================================================
// Utilitaires
// ============================================================================

/**
 * Calcule la distance entre deux positions.
 */
export function distance3D(a: Position3D, b: Position3D): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Vérifie si une unité est en combat (attaque ou est attaquée).
 */
export function isInCombat(unit: Unit): boolean {
  return unit.state === 'ATTACKING' || unit.targetId !== null;
}

/**
 * Vérifie si une unité peut attaquer.
 */
export function canAttack(unit: Unit): boolean {
  const stats = SHIP_STATS[unit.shipClass];
  return stats.attackDamage > 0 && unit.attackCooldown <= 0;
}

/**
 * Vérifie si une unité est vivante.
 */
export function isAlive(unit: Unit): boolean {
  return unit.health > 0 && unit.state !== 'DESTROYED';
}