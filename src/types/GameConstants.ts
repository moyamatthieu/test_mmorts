// src/types/GameConstants.ts
/**
 * Constantes de jeu (stats, coûts, équilibrage).
 * 
 * Ce fichier contient toutes les données statiques du jeu :
 * - SHIP_STATS : Statistiques de tous les vaisseaux
 * - Autres constantes d'équilibrage
 * 
 * Responsabilité : Données de configuration uniquement (pas de logique).
 */

import type { ShipClass, UnitStats } from './GameStateTypes';

// ============================================================================
// Statistiques des vaisseaux
// ============================================================================

/**
 * Statistiques par classe de vaisseau.
 * Valeurs équilibrées pour le gameplay.
 */
export const SHIP_STATS: Record<ShipClass, UnitStats> = {
  FIGHTER: {
    maxHealth: 50,
    maxShield: 20,
    shieldRegen: 2,
    armor: 1,
    speed: 15,
    turnRate: 4,
    sensorRange: 50,
    attackRange: 20,
    attackDamage: 8,
    attackSpeed: 2,
    cargoCapacity: 0,
    cost: { credits: 50, metal: 30 },
    buildTime: 5,
    fuelConsumption: 1
  },
  
  CORVETTE: {
    maxHealth: 120,
    maxShield: 50,
    shieldRegen: 3,
    armor: 3,
    speed: 12,
    turnRate: 3,
    sensorRange: 60,
    attackRange: 30,
    attackDamage: 15,
    attackSpeed: 1.5,
    cargoCapacity: 0,
    cost: { credits: 100, metal: 60 },
    buildTime: 10,
    fuelConsumption: 2
  },
  
  FRIGATE: {
    maxHealth: 250,
    maxShield: 100,
    shieldRegen: 5,
    armor: 5,
    speed: 8,
    turnRate: 2,
    sensorRange: 80,
    attackRange: 50,
    attackDamage: 25,
    attackSpeed: 1,
    cargoCapacity: 0,
    cost: { credits: 200, metal: 120, crystal: 20 },
    buildTime: 20,
    fuelConsumption: 3
  },
  
  DESTROYER: {
    maxHealth: 400,
    maxShield: 150,
    shieldRegen: 6,
    armor: 8,
    speed: 6,
    turnRate: 1.5,
    sensorRange: 100,
    attackRange: 70,
    attackDamage: 50,
    attackSpeed: 0.8,
    cargoCapacity: 0,
    cost: { credits: 400, metal: 250, crystal: 50 },
    buildTime: 35,
    fuelConsumption: 5
  },
  
  CRUISER: {
    maxHealth: 800,
    maxShield: 300,
    shieldRegen: 8,
    armor: 12,
    speed: 5,
    turnRate: 1,
    sensorRange: 120,
    attackRange: 100,
    attackDamage: 80,
    attackSpeed: 0.6,
    cargoCapacity: 0,
    cost: { credits: 800, metal: 500, crystal: 100 },
    buildTime: 60,
    fuelConsumption: 8
  },
  
  BATTLESHIP: {
    maxHealth: 1500,
    maxShield: 500,
    shieldRegen: 10,
    armor: 20,
    speed: 3,
    turnRate: 0.5,
    sensorRange: 150,
    attackRange: 150,
    attackDamage: 150,
    attackSpeed: 0.4,
    cargoCapacity: 0,
    cost: { credits: 1500, metal: 1000, crystal: 200 },
    buildTime: 120,
    fuelConsumption: 15
  },
  
  CARRIER: {
    maxHealth: 1000,
    maxShield: 400,
    shieldRegen: 8,
    armor: 15,
    speed: 4,
    turnRate: 0.3,
    sensorRange: 200,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 50,
    cost: { credits: 2000, metal: 1200, crystal: 300 },
    buildTime: 150,
    fuelConsumption: 20
  },
  
  MOTHERSHIP: {
    maxHealth: 3000,
    maxShield: 1000,
    shieldRegen: 15,
    armor: 30,
    speed: 2,
    turnRate: 0.2,
    sensorRange: 300,
    attackRange: 200,
    attackDamage: 100,
    attackSpeed: 0.3,
    cargoCapacity: 200,
    cost: { credits: 5000, metal: 3000, crystal: 500, fuel: 500 },
    buildTime: 300,
    fuelConsumption: 50
  },
  
  HARVESTER: {
    maxHealth: 150,
    maxShield: 30,
    shieldRegen: 2,
    armor: 5,
    speed: 6,
    turnRate: 1.5,
    sensorRange: 40,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 100,
    cost: { credits: 150, metal: 80 },
    buildTime: 15,
    fuelConsumption: 2
  },
  
  REPAIR: {
    maxHealth: 100,
    maxShield: 40,
    shieldRegen: 3,
    armor: 3,
    speed: 8,
    turnRate: 2,
    sensorRange: 60,
    attackRange: 30,
    attackDamage: -20, // Négatif = heal
    attackSpeed: 1,
    cargoCapacity: 0,
    cost: { credits: 200, metal: 100, crystal: 30 },
    buildTime: 20,
    fuelConsumption: 2
  },
  
  SCOUT: {
    maxHealth: 30,
    maxShield: 10,
    shieldRegen: 1,
    armor: 0,
    speed: 20,
    turnRate: 5,
    sensorRange: 200,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 0,
    cost: { credits: 30, metal: 15 },
    buildTime: 3,
    fuelConsumption: 0.5
  },
  
  // Structures (stats minimaux car principalement statiques)
  RESEARCH: {
    maxHealth: 1500,
    maxShield: 500,
    shieldRegen: 5,
    armor: 20,
    speed: 0,
    turnRate: 0,
    sensorRange: 100,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 0,
    cost: { credits: 2000, metal: 1000, crystal: 500 },
    buildTime: 120,
    fuelConsumption: 0
  },
  
  STATION: {
    maxHealth: 5000,
    maxShield: 2000,
    shieldRegen: 10,
    armor: 50,
    speed: 0,
    turnRate: 0,
    sensorRange: 200,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 500,
    cost: { credits: 5000, metal: 3000, crystal: 1000 },
    buildTime: 300,
    fuelConsumption: 0
  },
  
  SHIPYARD: {
    maxHealth: 3000,
    maxShield: 1000,
    shieldRegen: 8,
    armor: 30,
    speed: 0,
    turnRate: 0,
    sensorRange: 150,
    attackRange: 0,
    attackDamage: 0,
    attackSpeed: 0,
    cargoCapacity: 200,
    cost: { credits: 3000, metal: 2000, crystal: 500 },
    buildTime: 180,
    fuelConsumption: 0
  },
  
  DEFENSE_PLATFORM: {
    maxHealth: 2000,
    maxShield: 1000,
    shieldRegen: 10,
    armor: 40,
    speed: 0,
    turnRate: 1,
    sensorRange: 300,
    attackRange: 200,
    attackDamage: 100,
    attackSpeed: 1,
    cargoCapacity: 0,
    cost: { credits: 2500, metal: 1500, crystal: 300 },
    buildTime: 150,
    fuelConsumption: 0
  }
};
