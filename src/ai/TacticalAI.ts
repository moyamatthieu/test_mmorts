// src/ai/TacticalAI.ts
/**
 * Intelligence artificielle tactique pour le combat et les comportements.
 * 
 * Responsabilités:
 * - Ciblage automatique (priorités, menaces)
 * - Comportements de combat (engagement, évasion, poursuite)
 * - Gestion de la formation
 * - Évitement d'obstacles simple
 * 
 * KISS: IA basée sur des règles simples, pas de pathfinding complexe.
 */

import type { EntityId, PlayerId } from '../types/commands';
import type { UnitType } from '../types/GameState';

// ============================================================================
// Configuration IA
// ============================================================================

export const AI_CONFIG = {
  /** Distance max de détection d'ennemis */
  detectionRange: 500,
  
  /** Distance d'engagement automatique */
  autoEngageRange: 300,
  
  /** Distance de fuite (unités endommagées) */
  fleeThreshold: 0.2, // 20% HP
  
  /** Distance de fuite */
  fleeDistance: 200,
  
  /** Intervalle de mise à jour IA (ms) */
  updateInterval: 100,
  
  /** Inertie d'évasion (éviter oscillations) */
  evasionInertia: 0.8,
  
  /** Distance minimale entre unités (évitement) */
  separationDistance: 10,
  
  /** Poids de l'évitement */
  separationWeight: 1.5,
};

// ============================================================================
// Types
// ============================================================================

export type AIBehavior = 
  | 'IDLE'           // En attente
  | 'PATROL'         // Patrouille
  | 'ATTACK'         // Attaque une cible
  | 'DEFEND'         // Défend une position
  | 'FLEE'           // Fuit
  | 'PURSUE'         // Poursuite
  | 'ESCORT'         // Escorte une unité
  | 'MINING'         // Collecte de ressources
  | 'REPAIR'         // Réparation
  | 'FORMATION';     // Maintien de formation

export type ThreatLevel = 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AIState {
  behavior: AIBehavior;
  target: EntityId | null;
  targetPosition: Vector3Data | null;
  patrolPoints: Vector3Data[];
  patrolIndex: number;
  formationOffset: Vector3Data | null;
  threatLevel: ThreatLevel;
  lastUpdate: number;
}

export interface Vector3Data {
  x: number;
  y: number;
  z: number;
}

export interface UnitAIData {
  id: EntityId;
  ownerId: PlayerId;
  unitType: UnitType;
  position: Vector3Data;
  velocity: Vector3Data;
  health: number;
  maxHealth: number;
  range: number;
  damage: number;
  aiState: AIState;
}

export interface ThreatAssessment {
  entityId: EntityId;
  distance: number;
  healthPercent: number;
  damage: number;
  threatScore: number;
}

// ============================================================================
// Fonctions utilitaires
// ============================================================================

function distance3D(a: Vector3Data, b: Vector3Data): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function normalize3D(v: Vector3Data): Vector3Data {
  const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  if (len === 0) return { x: 0, y: 0, z: 0 };
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function subtract3D(a: Vector3Data, b: Vector3Data): Vector3Data {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function add3D(a: Vector3Data, b: Vector3Data): Vector3Data {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function scale3D(v: Vector3Data, s: number): Vector3Data {
  return { x: v.x * s, y: v.y * s, z: v.z * s };
}

// ============================================================================
// Classe TacticalAI
// ============================================================================

/**
 * Gestionnaire d'IA tactique.
 */
export class TacticalAI {
  private localPlayerId: PlayerId = '';
  
  constructor() {}
  
  /**
   * Définit le joueur local (pour identifier les ennemis).
   */
  setLocalPlayer(playerId: PlayerId): void {
    this.localPlayerId = playerId;
  }
  
  // ============================================================================
  // Évaluation des menaces
  // ============================================================================
  
  /**
   * Évalue le niveau de menace d'un ennemi.
   */
  assessThreat(unit: UnitAIData, enemy: UnitAIData): ThreatAssessment {
    const dist = distance3D(unit.position, enemy.position);
    const healthPercent = enemy.health / enemy.maxHealth;
    
    // Score de menace basé sur:
    // - Proximité (plus proche = plus dangereux)
    // - Dégâts potentiels
    // - Santé restante (unité blessée = moins prioritaire)
    
    const proximityScore = 1 - Math.min(dist / AI_CONFIG.detectionRange, 1);
    const damageScore = enemy.damage / 100; // Normaliser
    const healthScore = healthPercent; // Unités en bonne santé = plus dangereuses
    
    const threatScore = 
      proximityScore * 0.4 +
      damageScore * 0.4 +
      healthScore * 0.2;
    
    return {
      entityId: enemy.id,
      distance: dist,
      healthPercent,
      damage: enemy.damage,
      threatScore
    };
  }
  
  /**
   * Trouve les ennemis dans une zone.
   */
  findEnemiesInRange(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    range: number
  ): UnitAIData[] {
    return allUnits.filter(other => {
      if (other.id === unit.id) return false;
      if (other.ownerId === unit.ownerId) return false;
      
      const dist = distance3D(unit.position, other.position);
      return dist <= range;
    });
  }
  
  /**
   * Trouve les alliés dans une zone.
   */
  findAlliesInRange(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    range: number
  ): UnitAIData[] {
    return allUnits.filter(other => {
      if (other.id === unit.id) return false;
      if (other.ownerId !== unit.ownerId) return false;
      
      const dist = distance3D(unit.position, other.position);
      return dist <= range;
    });
  }
  
  /**
   * Sélectionne la meilleure cible.
   */
  selectBestTarget(unit: UnitAIData, enemies: UnitAIData[]): UnitAIData | null {
    if (enemies.length === 0) return null;
    
    // Évaluer toutes les menaces
    const threats = enemies.map(enemy => ({
      enemy,
      assessment: this.assessThreat(unit, enemy)
    }));
    
    // Trier par score de menace
    threats.sort((a, b) => b.assessment.threatScore - a.assessment.threatScore);
    
    // Prendre le plus menaçant à portée
    const inRange = threats.filter(t => t.assessment.distance <= unit.range);
    
    if (inRange.length > 0) {
      return inRange[0].enemy;
    }
    
    // Sinon, le plus proche
    threats.sort((a, b) => a.assessment.distance - b.assessment.distance);
    return threats[0].enemy;
  }
  
  // ============================================================================
  // Comportements
  // ============================================================================
  
  /**
   * Met à jour l'état IA d'une unité.
   */
  updateUnit(unit: UnitAIData, allUnits: UnitAIData[]): AIState {
    const state = { ...unit.aiState };
    const now = Date.now();
    
    // Throttle
    if (now - state.lastUpdate < AI_CONFIG.updateInterval) {
      return state;
    }
    state.lastUpdate = now;
    
    // Calculer le niveau de menace
    state.threatLevel = this.calculateThreatLevel(unit, allUnits);
    
    // Vérifier si on doit fuir
    const healthPercent = unit.health / unit.maxHealth;
    if (healthPercent <= AI_CONFIG.fleeThreshold && state.threatLevel !== 'NONE') {
      return this.behaviorFlee(unit, allUnits, state);
    }
    
    // Comportement selon l'état actuel
    switch (state.behavior) {
      case 'IDLE':
        return this.behaviorIdle(unit, allUnits, state);
      case 'ATTACK':
        return this.behaviorAttack(unit, allUnits, state);
      case 'DEFEND':
        return this.behaviorDefend(unit, allUnits, state);
      case 'PATROL':
        return this.behaviorPatrol(unit, allUnits, state);
      case 'PURSUE':
        return this.behaviorPursue(unit, allUnits, state);
      case 'FLEE':
        return this.behaviorFlee(unit, allUnits, state);
      case 'FORMATION':
        return this.behaviorFormation(unit, allUnits, state);
      default:
        return state;
    }
  }
  
  /**
   * Comportement IDLE: attendre et détecter les ennemis.
   */
  private behaviorIdle(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    // Chercher des ennemis à portée
    const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.autoEngageRange);
    
    if (enemies.length > 0) {
      const target = this.selectBestTarget(unit, enemies);
      if (target) {
        state.behavior = 'ATTACK';
        state.target = target.id;
        state.targetPosition = target.position;
      }
    }
    
    return state;
  }
  
  /**
   * Comportement ATTACK: attaquer la cible.
   */
  private behaviorAttack(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    // Vérifier si la cible existe encore
    const target = allUnits.find(u => u.id === state.target);
    
    if (!target || target.health <= 0) {
      // Cible morte, chercher une nouvelle
      const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.detectionRange);
      const newTarget = this.selectBestTarget(unit, enemies);
      
      if (newTarget) {
        state.target = newTarget.id;
        state.targetPosition = newTarget.position;
      } else {
        state.behavior = 'IDLE';
        state.target = null;
        state.targetPosition = null;
      }
      return state;
    }
    
    // Mettre à jour la position de la cible
    state.targetPosition = target.position;
    
    // Vérifier si on est à portée
    const dist = distance3D(unit.position, target.position);
    
    if (dist > unit.range) {
      // Poursuivre
      state.behavior = 'PURSUE';
    }
    
    return state;
  }
  
  /**
   * Comportement PURSUE: poursuivre la cible.
   */
  private behaviorPursue(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    const target = allUnits.find(u => u.id === state.target);
    
    if (!target || target.health <= 0) {
      state.behavior = 'IDLE';
      state.target = null;
      state.targetPosition = null;
      return state;
    }
    
    state.targetPosition = target.position;
    
    // Si à portée, passer en attaque
    const dist = distance3D(unit.position, target.position);
    if (dist <= unit.range) {
      state.behavior = 'ATTACK';
    }
    
    return state;
  }
  
  /**
   * Comportement DEFEND: défendre une position.
   */
  private behaviorDefend(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    if (!state.targetPosition) {
      state.behavior = 'IDLE';
      return state;
    }
    
    // Chercher des ennemis près de la position à défendre
    const enemies = allUnits.filter(other => {
      if (other.ownerId === unit.ownerId) return false;
      
      const distToDefend = distance3D(other.position, state.targetPosition!);
      return distToDefend <= AI_CONFIG.autoEngageRange;
    });
    
    if (enemies.length > 0) {
      const target = this.selectBestTarget(unit, enemies);
      if (target) {
        state.target = target.id;
        // Ne pas changer de comportement, rester en défense
      }
    } else {
      state.target = null;
    }
    
    return state;
  }
  
  /**
   * Comportement PATROL: patrouiller entre des points.
   */
  private behaviorPatrol(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    if (state.patrolPoints.length === 0) {
      state.behavior = 'IDLE';
      return state;
    }
    
    const currentPoint = state.patrolPoints[state.patrolIndex];
    const dist = distance3D(unit.position, currentPoint);
    
    // Si arrivé au point, passer au suivant
    if (dist < 10) {
      state.patrolIndex = (state.patrolIndex + 1) % state.patrolPoints.length;
    }
    
    state.targetPosition = state.patrolPoints[state.patrolIndex];
    
    // Détecter les ennemis pendant la patrouille
    const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.detectionRange);
    if (enemies.length > 0) {
      const target = this.selectBestTarget(unit, enemies);
      if (target) {
        state.behavior = 'ATTACK';
        state.target = target.id;
        state.targetPosition = target.position;
      }
    }
    
    return state;
  }
  
  /**
   * Comportement FLEE: fuir les ennemis.
   */
  private behaviorFlee(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    state.behavior = 'FLEE';
    state.target = null;
    
    // Trouver les ennemis proches
    const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.detectionRange);
    
    if (enemies.length === 0) {
      state.behavior = 'IDLE';
      state.targetPosition = null;
      return state;
    }
    
    // Calculer le vecteur de fuite (opposé à la moyenne des positions ennemies)
    let avgEnemyPos = { x: 0, y: 0, z: 0 };
    for (const enemy of enemies) {
      avgEnemyPos.x += enemy.position.x;
      avgEnemyPos.y += enemy.position.y;
      avgEnemyPos.z += enemy.position.z;
    }
    avgEnemyPos.x /= enemies.length;
    avgEnemyPos.y /= enemies.length;
    avgEnemyPos.z /= enemies.length;
    
    // Direction opposée
    const fleeDir = normalize3D(subtract3D(unit.position, avgEnemyPos));
    
    state.targetPosition = add3D(unit.position, scale3D(fleeDir, AI_CONFIG.fleeDistance));
    
    return state;
  }
  
  /**
   * Comportement FORMATION: maintenir la position dans la formation.
   */
  private behaviorFormation(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    state: AIState
  ): AIState {
    // La position cible est calculée par le système de formation
    // L'IA ne fait que suivre
    
    // Mais on peut quand même détecter les ennemis
    const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.autoEngageRange);
    
    if (enemies.length > 0) {
      const target = this.selectBestTarget(unit, enemies);
      if (target) {
        state.target = target.id;
        // Rester en formation mais attaquer
      }
    } else {
      state.target = null;
    }
    
    return state;
  }
  
  // ============================================================================
  // Calculs de mouvement
  // ============================================================================
  
  /**
   * Calcule le vecteur de direction souhaité.
   */
  calculateDesiredVelocity(
    unit: UnitAIData,
    allUnits: UnitAIData[],
    maxSpeed: number
  ): Vector3Data {
    const state = unit.aiState;
    
    if (!state.targetPosition) {
      return { x: 0, y: 0, z: 0 };
    }
    
    // Direction vers la cible
    const toTarget = subtract3D(state.targetPosition, unit.position);
    const dist = Math.sqrt(toTarget.x * toTarget.x + toTarget.y * toTarget.y + toTarget.z * toTarget.z);
    
    if (dist < 1) {
      return { x: 0, y: 0, z: 0 };
    }
    
    let desiredDir = normalize3D(toTarget);
    let desiredSpeed = maxSpeed;
    
    // Ralentir à l'approche
    if (dist < 50) {
      desiredSpeed = maxSpeed * (dist / 50);
    }
    
    // Ajouter la séparation pour éviter les collisions
    const separation = this.calculateSeparation(unit, allUnits);
    desiredDir = normalize3D(add3D(
      scale3D(desiredDir, 1),
      scale3D(separation, AI_CONFIG.separationWeight)
    ));
    
    return scale3D(desiredDir, desiredSpeed);
  }
  
  /**
   * Calcule le vecteur de séparation (éviter les autres unités).
   */
  calculateSeparation(unit: UnitAIData, allUnits: UnitAIData[]): Vector3Data {
    let separation = { x: 0, y: 0, z: 0 };
    let count = 0;
    
    for (const other of allUnits) {
      if (other.id === unit.id) continue;
      
      const diff = subtract3D(unit.position, other.position);
      const dist = Math.sqrt(diff.x * diff.x + diff.y * diff.y + diff.z * diff.z);
      
      if (dist > 0 && dist < AI_CONFIG.separationDistance) {
        // Pousser dans la direction opposée, proportionnellement à la proximité
        const force = scale3D(normalize3D(diff), 1 / dist);
        separation = add3D(separation, force);
        count++;
      }
    }
    
    if (count > 0) {
      separation.x /= count;
      separation.y /= count;
      separation.z /= count;
    }
    
    return separation;
  }
  
  /**
   * Calcule le niveau de menace global.
   */
  private calculateThreatLevel(unit: UnitAIData, allUnits: UnitAIData[]): ThreatLevel {
    const enemies = this.findEnemiesInRange(unit, allUnits, AI_CONFIG.detectionRange);
    const allies = this.findAlliesInRange(unit, allUnits, AI_CONFIG.detectionRange);
    
    if (enemies.length === 0) return 'NONE';
    
    const enemyPower = enemies.reduce((sum, e) => sum + e.damage * (e.health / e.maxHealth), 0);
    const allyPower = allies.reduce((sum, a) => sum + a.damage * (a.health / a.maxHealth), 0) +
                      unit.damage * (unit.health / unit.maxHealth);
    
    const ratio = enemyPower / Math.max(allyPower, 1);
    
    if (ratio >= 3) return 'CRITICAL';
    if (ratio >= 2) return 'HIGH';
    if (ratio >= 1) return 'MEDIUM';
    if (ratio >= 0.5) return 'LOW';
    return 'NONE';
  }
  
  // ============================================================================
  // API d'ordres
  // ============================================================================
  
  /**
   * Ordonne à une unité d'attaquer une cible.
   */
  orderAttack(state: AIState, targetId: EntityId): AIState {
    return {
      ...state,
      behavior: 'ATTACK',
      target: targetId,
      targetPosition: null
    };
  }
  
  /**
   * Ordonne à une unité de se déplacer.
   */
  orderMove(state: AIState, position: Vector3Data): AIState {
    return {
      ...state,
      behavior: 'IDLE',
      target: null,
      targetPosition: position
    };
  }
  
  /**
   * Ordonne à une unité de défendre une position.
   */
  orderDefend(state: AIState, position: Vector3Data): AIState {
    return {
      ...state,
      behavior: 'DEFEND',
      target: null,
      targetPosition: position
    };
  }
  
  /**
   * Ordonne à une unité de patrouiller.
   */
  orderPatrol(state: AIState, points: Vector3Data[]): AIState {
    return {
      ...state,
      behavior: 'PATROL',
      target: null,
      targetPosition: points[0] || null,
      patrolPoints: points,
      patrolIndex: 0
    };
  }
  
  /**
   * Ordonne à une unité de maintenir une formation.
   */
  orderFormation(state: AIState, offset: Vector3Data): AIState {
    return {
      ...state,
      behavior: 'FORMATION',
      formationOffset: offset
    };
  }
  
  /**
   * Ordonne à une unité de s'arrêter.
   */
  orderStop(state: AIState): AIState {
    return {
      ...state,
      behavior: 'IDLE',
      target: null,
      targetPosition: null
    };
  }
}

// ============================================================================
// État IA par défaut
// ============================================================================

export function createDefaultAIState(): AIState {
  return {
    behavior: 'IDLE',
    target: null,
    targetPosition: null,
    patrolPoints: [],
    patrolIndex: 0,
    formationOffset: null,
    threatLevel: 'NONE',
    lastUpdate: 0
  };
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale de l'IA tactique */
export const tacticalAI = new TacticalAI();