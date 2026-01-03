// src/game/economy/EconomySystem.ts
/**
 * Système économique du jeu.
 * 
 * Responsabilités:
 * - Gestion des ressources des joueurs
 * - Files de production
 * - Récolte de ressources (harvesters)
 * - Arbre technologique
 * 
 * KISS: Logique séparée du rendu, fonctions pures autant que possible.
 */

import {
  GameState,
  Player,
  Resources,
  ResourceType,
  Structure,
  StructureType,
  ProductionOrder,
  Unit,
  ShipClass,
  SHIP_STATS,
  ResourceSource,
  Technology,
  TechnologyEffect,
  createUnit,
  createStructure,
  ResearchProgress
} from '../../types/GameState';
import type { EntityId, PlayerId, SystemId, Position3D } from '../../types/commands';
import { distance3D, getPlayerUnitsInSystem } from '../units/UnitFactory';

// ============================================================================
// Configuration économique
// ============================================================================

/**
 * Configuration globale de l'économie.
 */
export const ECONOMY_CONFIG = {
  /** Taux de récolte base (unités/seconde) */
  baseHarvestRate: 5,
  
  /** Bonus de récolte par niveau de tech */
  harvestTechBonus: 0.2,
  
  /** Distance max pour récolter */
  harvestRange: 15,
  
  /** Délai entre dépôts pour harvesters */
  depositCooldown: 2,
  
  /** Revenu passif de crédits par seconde par système contrôlé */
  passiveIncomePerSystem: 1,
  
  /** Production simultanée max par structure */
  maxConcurrentProduction: 2,
  
  /** Multiplicateur de vitesse de recherche par lab */
  researchSpeedPerLab: 0.5,
};

// ============================================================================
// Statistiques des structures
// ============================================================================

export interface StructureStats {
  maxHealth: number;
  maxShield: number;
  shieldRegen: number;
  cost: Partial<Resources>;
  buildTime: number;
  energyProduction: number;
  energyConsumption: number;
}

export const STRUCTURE_STATS: Record<StructureType, StructureStats> = {
  SPACE_STATION: {
    maxHealth: 5000,
    maxShield: 2000,
    shieldRegen: 10,
    cost: { credits: 2000, metal: 1000, crystal: 200 },
    buildTime: 120,
    energyProduction: 100,
    energyConsumption: 0
  },
  SHIPYARD: {
    maxHealth: 2000,
    maxShield: 500,
    shieldRegen: 5,
    cost: { credits: 1000, metal: 500, crystal: 100 },
    buildTime: 60,
    energyProduction: 0,
    energyConsumption: 20
  },
  RESEARCH_LAB: {
    maxHealth: 1000,
    maxShield: 300,
    shieldRegen: 3,
    cost: { credits: 800, metal: 300, crystal: 150 },
    buildTime: 45,
    energyProduction: 0,
    energyConsumption: 30
  },
  DEFENSE_PLATFORM: {
    maxHealth: 1500,
    maxShield: 800,
    shieldRegen: 8,
    cost: { credits: 500, metal: 400, crystal: 50 },
    buildTime: 30,
    energyProduction: 0,
    energyConsumption: 15
  },
  REFINERY: {
    maxHealth: 1200,
    maxShield: 200,
    shieldRegen: 2,
    cost: { credits: 600, metal: 350, crystal: 50 },
    buildTime: 40,
    energyProduction: 0,
    energyConsumption: 25
  },
  TRADE_HUB: {
    maxHealth: 800,
    maxShield: 200,
    shieldRegen: 2,
    cost: { credits: 1200, metal: 200, crystal: 100 },
    buildTime: 50,
    energyProduction: 0,
    energyConsumption: 10
  },
  SENSOR_ARRAY: {
    maxHealth: 500,
    maxShield: 100,
    shieldRegen: 1,
    cost: { credits: 400, metal: 150, crystal: 80 },
    buildTime: 25,
    energyProduction: 0,
    energyConsumption: 15
  },
  JUMP_GATE: {
    maxHealth: 3000,
    maxShield: 1000,
    shieldRegen: 5,
    cost: { credits: 3000, metal: 1500, crystal: 500 },
    buildTime: 180,
    energyProduction: 0,
    energyConsumption: 50
  }
};

// ============================================================================
// Gestion des ressources
// ============================================================================

/**
 * Vérifie si un joueur peut payer un coût.
 */
export function canAfford(player: Player, cost: Partial<Resources>): boolean {
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount && player.resources[resource as ResourceType] < amount) {
      return false;
    }
  }
  return true;
}

/**
 * Déduit un coût des ressources d'un joueur.
 */
export function deductCost(player: Player, cost: Partial<Resources>): void {
  for (const [resource, amount] of Object.entries(cost)) {
    if (amount) {
      player.resources[resource as ResourceType] -= amount;
    }
  }
}

/**
 * Ajoute des ressources à un joueur.
 */
export function addResources(player: Player, resources: Partial<Resources>): void {
  for (const [resource, amount] of Object.entries(resources)) {
    if (amount) {
      player.resources[resource as ResourceType] += amount;
    }
  }
}

/**
 * Calcule le revenu passif d'un joueur.
 */
export function calculatePassiveIncome(player: Player): Partial<Resources> {
  const systemCount = player.controlledSystems.length;
  
  return {
    credits: systemCount * ECONOMY_CONFIG.passiveIncomePerSystem
  };
}

// ============================================================================
// Production
// ============================================================================

/**
 * Ajoute un ordre de production à une structure.
 * Retourne l'ID de l'ordre ou null si impossible.
 */
export function queueProduction(
  state: GameState,
  structure: Structure,
  itemType: ShipClass | StructureType,
  category: 'unit' | 'structure',
  count: number = 1
): string | null {
  const player = state.players.get(structure.ownerId);
  if (!player) return null;
  
  // Vérifier que la structure peut produire ce type
  if (!canStructureProduce(structure.structureType, itemType, category)) {
    console.warn(`[Economy] ${structure.structureType} cannot produce ${itemType}`);
    return null;
  }
  
  // Vérifier les ressources pour le premier item
  const cost = category === 'unit' 
    ? SHIP_STATS[itemType as ShipClass].cost
    : STRUCTURE_STATS[itemType as StructureType].cost;
  
  if (!canAfford(player, cost)) {
    console.warn(`[Economy] Insufficient resources for ${itemType}`);
    return null;
  }
  
  // Créer l'ordre
  const orderId = `${structure.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const order: ProductionOrder = {
    id: orderId,
    itemType,
    category,
    count,
    produced: 0,
    progress: 0,
    resourcesConsumed: {}
  };
  
  structure.productionQueue.push(order);
  
  console.log(`[Economy] Queued ${count}x ${itemType} at structure ${structure.id}`);
  
  return orderId;
}

/**
 * Vérifie si une structure peut produire un type d'item.
 */
function canStructureProduce(
  structureType: StructureType,
  itemType: ShipClass | StructureType,
  category: 'unit' | 'structure'
): boolean {
  if (category === 'unit') {
    // Seuls les chantiers navals produisent des unités
    return structureType === 'SHIPYARD' || structureType === 'SPACE_STATION';
  } else {
    // Les stations spatiales peuvent construire d'autres structures
    return structureType === 'SPACE_STATION';
  }
}

/**
 * Met à jour la production d'une structure.
 */
export function updateStructureProduction(
  state: GameState,
  structure: Structure,
  deltaTime: number
): void {
  if (!structure.isOperational) return;
  if (structure.productionQueue.length === 0) return;
  
  const player = state.players.get(structure.ownerId);
  if (!player) return;
  
  // Traiter les ordres en cours (max concurrent)
  const activeOrders = structure.productionQueue.slice(0, ECONOMY_CONFIG.maxConcurrentProduction);
  
  for (const order of activeOrders) {
    // Calculer le temps de construction
    const buildTime = order.category === 'unit'
      ? SHIP_STATS[order.itemType as ShipClass].buildTime
      : STRUCTURE_STATS[order.itemType as StructureType].buildTime;
    
    // Progression
    const progressIncrement = deltaTime / buildTime;
    order.progress += progressIncrement;
    
    // Consommer les ressources progressivement
    const cost = order.category === 'unit'
      ? SHIP_STATS[order.itemType as ShipClass].cost
      : STRUCTURE_STATS[order.itemType as StructureType].cost;
    
    for (const [resource, totalCost] of Object.entries(cost)) {
      if (!totalCost) continue;
      
      const consumed = order.resourcesConsumed[resource as ResourceType] || 0;
      const toConsume = Math.min(
        totalCost * progressIncrement,
        totalCost - consumed,
        player.resources[resource as ResourceType]
      );
      
      if (toConsume > 0) {
        player.resources[resource as ResourceType] -= toConsume;
        order.resourcesConsumed[resource as ResourceType] = consumed + toConsume;
      }
    }
    
    // Production terminée
    if (order.progress >= 1) {
      completeProduction(state, structure, order);
      order.produced++;
      order.progress = 0;
      order.resourcesConsumed = {};
      
      // Supprimer l'ordre si tout produit
      if (order.produced >= order.count) {
        const index = structure.productionQueue.indexOf(order);
        if (index !== -1) {
          structure.productionQueue.splice(index, 1);
        }
      }
    }
  }
}

/**
 * Complète la production d'un item.
 */
function completeProduction(
  state: GameState,
  structure: Structure,
  order: ProductionOrder
): void {
  if (order.category === 'unit') {
    // Spawn l'unité
    const spawnPos = structure.rallyPoint || {
      x: structure.position.x + 10,
      y: structure.position.y,
      z: structure.position.z
    };
    
    const unit = createUnit(
      state,
      structure.ownerId,
      order.itemType as ShipClass,
      structure.systemId,
      spawnPos
    );
    
    state.units.set(unit.id, unit);
    
    console.log(`[Economy] Produced ${order.itemType} at structure ${structure.id}`);
  } else {
    // Les structures sont construites différemment (placement manuel)
    console.log(`[Economy] Structure ${order.itemType} ready for placement`);
  }
}

// ============================================================================
// Récolte (Harvesters)
// ============================================================================

/**
 * Trouve la source de ressources la plus proche pour un harvester.
 */
export function findNearestResourceSource(
  state: GameState,
  harvester: Unit
): ResourceSource | null {
  let nearest: ResourceSource | null = null;
  let nearestDist = Infinity;
  
  for (const source of state.resourceSources.values()) {
    // Même système
    if (source.systemId !== harvester.systemId) continue;
    
    // Ressource restante
    if (source.remaining <= 0) continue;
    
    // Place disponible
    if (source.assignedHarvesters.length >= source.maxHarvesters) continue;
    
    const dist = distance3D(harvester.position, source.position);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = source;
    }
  }
  
  return nearest;
}

/**
 * Met à jour la récolte d'un harvester.
 */
export function updateHarvesting(
  state: GameState,
  harvester: Unit,
  deltaTime: number
): void {
  if (harvester.shipClass !== 'HARVESTER') return;
  if (harvester.state !== 'HARVESTING') return;
  
  const stats = SHIP_STATS.HARVESTER;
  const player = state.players.get(harvester.ownerId);
  if (!player) return;
  
  // Trouver la source assignée ou en trouver une nouvelle
  // (Simplification: on cherche la plus proche dans le rayon)
  let nearestSource: ResourceSource | null = null;
  
  for (const source of state.resourceSources.values()) {
    if (source.systemId !== harvester.systemId) continue;
    if (source.remaining <= 0) continue;
    
    const dist = distance3D(harvester.position, source.position);
    if (dist <= ECONOMY_CONFIG.harvestRange) {
      nearestSource = source;
      break;
    }
  }
  
  if (!nearestSource) {
    harvester.state = 'IDLE';
    return;
  }
  
  // Calculer le taux de récolte
  const harvestRate = ECONOMY_CONFIG.baseHarvestRate * deltaTime;
  
  // Récolter
  const harvested = Math.min(
    harvestRate,
    nearestSource.remaining,
    stats.cargoCapacity - (harvester.cargo[nearestSource.yields] || 0)
  );
  
  if (harvested > 0) {
    nearestSource.remaining -= harvested;
    harvester.cargo[nearestSource.yields] = 
      (harvester.cargo[nearestSource.yields] || 0) + harvested;
  }
  
  // Cargo plein: retourner au dépôt
  const totalCargo = Object.values(harvester.cargo).reduce((a, b) => a + (b || 0), 0);
  if (totalCargo >= stats.cargoCapacity) {
    // Trouver la station la plus proche pour déposer
    const depot = findNearestDepot(state, harvester);
    if (depot) {
      harvester.destination = { ...depot.position };
      harvester.state = 'MOVING';
      // L'ordre de dépôt sera traité quand l'unité arrive
      harvester.orderQueue.push({
        type: 'DEPOSIT',
        data: { structureId: depot.id }
      });
    }
  }
}

/**
 * Trouve le dépôt (station/raffinerie) le plus proche.
 */
function findNearestDepot(state: GameState, unit: Unit): Structure | null {
  let nearest: Structure | null = null;
  let nearestDist = Infinity;
  
  for (const structure of state.structures.values()) {
    if (structure.ownerId !== unit.ownerId) continue;
    if (structure.systemId !== unit.systemId) continue;
    if (structure.structureType !== 'SPACE_STATION' && 
        structure.structureType !== 'REFINERY') continue;
    if (!structure.isOperational) continue;
    
    const dist = distance3D(unit.position, structure.position);
    if (dist < nearestDist) {
      nearestDist = dist;
      nearest = structure;
    }
  }
  
  return nearest;
}

/**
 * Dépose les ressources d'un harvester.
 */
export function depositResources(
  state: GameState,
  harvester: Unit,
  depot: Structure
): void {
  const player = state.players.get(harvester.ownerId);
  if (!player) return;
  
  // Transférer les ressources
  for (const [resource, amount] of Object.entries(harvester.cargo)) {
    if (amount && amount > 0) {
      player.resources[resource as ResourceType] += amount;
      console.log(`[Economy] Deposited ${amount} ${resource}`);
    }
  }
  
  // Vider le cargo
  harvester.cargo = {};
}

// ============================================================================
// Recherche
// ============================================================================

/**
 * Démarre une recherche pour un joueur.
 */
export function startResearch(
  state: GameState,
  playerId: PlayerId,
  technologyId: string
): boolean {
  const player = state.players.get(playerId);
  if (!player) return false;
  
  // Déjà en recherche
  if (player.currentResearch) {
    console.warn('[Economy] Already researching');
    return false;
  }
  
  // Technologie existe
  const tech = state.technologies.get(technologyId);
  if (!tech) {
    console.warn('[Economy] Technology not found:', technologyId);
    return false;
  }
  
  // Déjà débloquée
  if (player.unlockedTechnologies.includes(technologyId)) {
    console.warn('[Economy] Technology already unlocked');
    return false;
  }
  
  // Prérequis
  for (const prereq of tech.prerequisites) {
    if (!player.unlockedTechnologies.includes(prereq)) {
      console.warn('[Economy] Missing prerequisite:', prereq);
      return false;
    }
  }
  
  // Ressources
  if (!canAfford(player, tech.cost)) {
    console.warn('[Economy] Cannot afford technology');
    return false;
  }
  
  // Démarrer
  deductCost(player, tech.cost);
  
  player.currentResearch = {
    technologyId,
    progress: 0,
    estimatedTimeRemaining: tech.researchTime
  };
  
  console.log(`[Economy] Started research: ${tech.name}`);
  
  return true;
}

/**
 * Met à jour la recherche d'un joueur.
 */
export function updateResearch(
  state: GameState,
  player: Player,
  deltaTime: number
): void {
  if (!player.currentResearch) return;
  
  const tech = state.technologies.get(player.currentResearch.technologyId);
  if (!tech) {
    player.currentResearch = null;
    return;
  }
  
  // Calculer la vitesse de recherche (bonus des labs)
  const labCount = countPlayerStructures(state, player.id, 'RESEARCH_LAB');
  const researchSpeed = 1 + labCount * ECONOMY_CONFIG.researchSpeedPerLab;
  
  // Progresser
  const progressIncrement = (deltaTime / tech.researchTime) * researchSpeed;
  player.currentResearch.progress += progressIncrement;
  player.currentResearch.estimatedTimeRemaining = 
    (1 - player.currentResearch.progress) * tech.researchTime / researchSpeed;
  
  // Terminé
  if (player.currentResearch.progress >= 1) {
    completeResearch(state, player, tech);
    player.currentResearch = null;
  }
}

/**
 * Complète une recherche.
 */
function completeResearch(
  state: GameState,
  player: Player,
  tech: Technology
): void {
  player.unlockedTechnologies.push(tech.id);
  
  // Appliquer les effets
  for (const effect of tech.effects) {
    applyTechnologyEffect(state, player, effect);
  }
  
  console.log(`[Economy] Research complete: ${tech.name}`);
}

/**
 * Applique l'effet d'une technologie.
 */
function applyTechnologyEffect(
  state: GameState,
  player: Player,
  effect: TechnologyEffect
): void {
  // Les effets sont stockés et appliqués lors des calculs
  // (ex: bonus de stats, déblocage d'unités, etc.)
  console.log(`[Economy] Applied effect: ${effect.type} on ${effect.target}`);
}

// ============================================================================
// Mise à jour globale
// ============================================================================

/**
 * Met à jour l'économie pour une frame.
 */
export function updateEconomy(state: GameState, deltaTime: number): void {
  // Revenu passif
  for (const player of state.players.values()) {
    if (!player.isConnected) continue;
    
    const income = calculatePassiveIncome(player);
    addResources(player, income);
    
    // Recherche
    updateResearch(state, player, deltaTime);
  }
  
  // Production des structures
  for (const structure of state.structures.values()) {
    updateStructureProduction(state, structure, deltaTime);
  }
  
  // Régénération des sources de ressources
  for (const source of state.resourceSources.values()) {
    if (source.regenRate > 0 && source.remaining < source.maxAmount) {
      source.remaining = Math.min(
        source.maxAmount,
        source.remaining + source.regenRate * deltaTime
      );
    }
  }
}

// ============================================================================
// Utilitaires
// ============================================================================

/**
 * Compte les structures d'un type pour un joueur.
 */
export function countPlayerStructures(
  state: GameState,
  playerId: PlayerId,
  structureType: StructureType
): number {
  let count = 0;
  
  for (const structure of state.structures.values()) {
    if (structure.ownerId === playerId && 
        structure.structureType === structureType &&
        structure.isOperational) {
      count++;
    }
  }
  
  return count;
}

/**
 * Récupère les structures d'un joueur dans un système.
 */
export function getPlayerStructuresInSystem(
  state: GameState,
  playerId: PlayerId,
  systemId: SystemId
): Structure[] {
  return Array.from(state.structures.values()).filter(
    s => s.ownerId === playerId && s.systemId === systemId
  );
}

/**
 * Calcule la valeur totale des ressources.
 */
export function calculateResourceValue(resources: Partial<Resources>): number {
  let value = 0;
  
  // Valeurs de conversion en crédits
  const exchangeRates: Record<ResourceType, number> = {
    credits: 1,
    metal: 2,
    crystal: 5,
    fuel: 1.5,
    population: 10
  };
  
  for (const [resource, amount] of Object.entries(resources)) {
    if (amount) {
      value += amount * exchangeRates[resource as ResourceType];
    }
  }
  
  return value;
}