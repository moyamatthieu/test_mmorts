// src/game/units/UnitController.ts
/**
 * Contrôleur complet pour la gestion des unités RTS.
 * 
 * Responsabilités:
 * - Création/destruction d'unités
 * - Gestion de la sélection
 * - Commandes de masse (ordre à plusieurs unités)
 * - Groupes et formations
 * - Queries (recherche par position, type, etc.)
 * 
 * KISS : Logique de contrôle pure, pas de rendu.
 */

import type {
  GameState,
  ShipClass,
  Unit
} from '../../types/GameState';
import type { EntityId, PlayerId, SystemId, Position3D } from '../../types/commands';
import { orderMove, orderAttack, orderStop, orderPatrol } from './UnitBehavior';
import type { FormationType } from '../../ai/FormationManager';

/**
 * Paramètres de création d'unité.
 */
export interface CreateUnitParams {
  shipClass: ShipClass;
  position: Position3D;
  ownerId: PlayerId;
  systemId: SystemId;
  name?: string;
}

/**
 * Contrôleur minimaliste pour la gestion des unités (création, suppression, sélection).
 * Découplé du rendu et du worker. KISS : aucune logique de déplacement/attaque ici.
 *
 * Utilise GameState.units (Map<EntityId, Unit>) comme source de vérité.
 */
export class UnitController {
  private state: GameState;

  constructor(state: GameState) {
    this.state = state;
  }

  /**
   * Crée une unité et l'ajoute à l'état global.
   * Utilise la factory createUnit de GameState pour garantir la cohérence.
   */
  createUnit(params: {
    shipClass: ShipClass;
    position: Position3D;
    ownerId: PlayerId;
    systemId: SystemId;
  }): Unit {
    // Génère l'ID et crée l'unité via la factory
    const id = this.state.nextEntityId++;
    
    const unit: Unit = {
      id,
      ownerId: params.ownerId,
      shipClass: params.shipClass,
      
      systemId: params.systemId,
      position: { ...params.position },
      velocity: { x: 0, y: 0, z: 0 },
      rotation: 0,
      destination: null,
      
      health: 100,
      shield: 50,
      targetId: null,
      combatStance: 'DEFENSIVE',
      attackCooldown: 0,
      
      state: 'IDLE',
      formation: 'NONE',
      formationOffset: { x: 0, y: 0, z: 0 },
      groupLeaderId: null,
      
      cargo: {},
      orderQueue: [],
      
      createdAtFrame: this.state.currentFrame,
      updatedAtFrame: this.state.currentFrame
    };
    
    this.state.units.set(id, unit);
    return unit;
  }

  /**
   * Supprime une unité par id.
   * - soft (défaut) : marque state='DESTROYED' pour cleanup différé
   * - hard : retire immédiatement de la Map
   */
  destroyUnit(id: EntityId, hard = false): void {
    const unit = this.state.units.get(id);
    if (!unit) return;
    
    if (hard) {
      this.state.units.delete(id);
    } else {
      unit.state = 'DESTROYED';
      unit.updatedAtFrame = this.state.currentFrame;
    }
  }

  /** Sélectionne/désélectionne une unité en modifiant selectedUnitIds. */
  setSelected(id: EntityId, selected: boolean): void {
    const idx = this.state.selectedUnitIds.indexOf(id);
    
    if (selected && idx === -1) {
      this.state.selectedUnitIds.push(id);
    } else if (!selected && idx !== -1) {
      this.state.selectedUnitIds.splice(idx, 1);
    }
  }

  /** Désélectionne toutes les unités. */
  clearSelection(): void {
    this.state.selectedUnitIds = [];
  }

  /** Retourne les unités sélectionnées (filtre les détruites). */
  getSelectedUnits(): Unit[] {
    return this.state.selectedUnitIds
      .map(id => this.state.units.get(id))
      .filter((u): u is Unit => u !== undefined && u.state !== 'DESTROYED');
  }

  /** Retourne toutes les unités actives (non détruites). */
  getActiveUnits(): Unit[] {
    const active: Unit[] = [];
    for (const unit of this.state.units.values()) {
      if (unit.state !== 'DESTROYED') {
        active.push(unit);
      }
    }
    return active;
  }
  
  /** Retourne une unité par ID, ou undefined si non trouvée. */
  getUnit(id: EntityId): Unit | undefined {
    return this.state.units.get(id);
  }
  
  /** Retourne les unités d'un joueur donné. */
  getPlayerUnits(playerId: PlayerId): Unit[] {
    const units: Unit[] = [];
    for (const unit of this.state.units.values()) {
      if (unit.ownerId === playerId && unit.state !== 'DESTROYED') {
        units.push(unit);
      }
    }
    return units;
  }
  
  // ============================================================================
  // Commandes de masse
  // ============================================================================
  
  /**
   * Ordonne à plusieurs unités de se déplacer vers une position.
   * Calcule automatiquement les offsets pour éviter le chevauchement.
   */
  moveUnits(unitIds: EntityId[], target: Position3D, spread = 2): void {
    const units = unitIds.map(id => this.state.units.get(id)).filter((u): u is Unit => !!u);
    if (units.length === 0) return;
    
    // Calculer les positions avec offset
    const count = units.length;
    const cols = Math.ceil(Math.sqrt(count));
    
    units.forEach((unit, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const offsetX = (col - cols / 2) * spread;
      const offsetZ = (row - Math.ceil(count / cols) / 2) * spread;
      
      orderMove(unit, {
        x: target.x + offsetX,
        y: target.y,
        z: target.z + offsetZ
      });
    });
  }
  
  /**
   * Ordonne à plusieurs unités d'attaquer une cible.
   */
  attackWithUnits(unitIds: EntityId[], targetId: EntityId): void {
    for (const id of unitIds) {
      const unit = this.state.units.get(id);
      if (unit && unit.state !== 'DESTROYED') {
        orderAttack(unit, targetId);
      }
    }
  }
  
  /**
   * Ordonne à plusieurs unités de s'arrêter.
   */
  stopUnits(unitIds: EntityId[]): void {
    for (const id of unitIds) {
      const unit = this.state.units.get(id);
      if (unit) {
        orderStop(unit);
      }
    }
  }
  
  /**
   * Ordonne à plusieurs unités de patrouiller.
   */
  patrolUnits(unitIds: EntityId[], waypoints: Position3D[]): void {
    for (const id of unitIds) {
      const unit = this.state.units.get(id);
      if (unit && unit.state !== 'DESTROYED') {
        orderPatrol(unit, waypoints);
      }
    }
  }
  
  /**
   * Définit la formation pour un groupe d'unités.
   */
  setFormation(unitIds: EntityId[], formation: FormationType): void {
    if (unitIds.length === 0) return;
    
    const leaderId = unitIds[0];
    
    for (const id of unitIds) {
      const unit = this.state.units.get(id);
      if (unit) {
        unit.formation = formation as any;
        unit.groupLeaderId = id === leaderId ? null : leaderId;
      }
    }
  }
  
  // ============================================================================
  // Queries avancées
  // ============================================================================
  
  /**
   * Retourne les unités dans un rayon autour d'une position.
   */
  getUnitsInRadius(center: Position3D, radius: number, playerId?: PlayerId): Unit[] {
    const units: Unit[] = [];
    const radiusSq = radius * radius;
    
    for (const unit of this.state.units.values()) {
      if (unit.state === 'DESTROYED') continue;
      if (playerId && unit.ownerId !== playerId) continue;
      
      const dx = unit.position.x - center.x;
      const dy = unit.position.y - center.y;
      const dz = unit.position.z - center.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      
      if (distSq <= radiusSq) {
        units.push(unit);
      }
    }
    
    return units;
  }
  
  /**
   * Retourne les unités d'un type donné.
   */
  getUnitsByType(shipClass: ShipClass, playerId?: PlayerId): Unit[] {
    const units: Unit[] = [];
    
    for (const unit of this.state.units.values()) {
      if (unit.state === 'DESTROYED') continue;
      if (unit.shipClass !== shipClass) continue;
      if (playerId && unit.ownerId !== playerId) continue;
      
      units.push(unit);
    }
    
    return units;
  }
  
  /**
   * Retourne les unités dans un système donné.
   */
  getUnitsInSystem(systemId: SystemId, playerId?: PlayerId): Unit[] {
    const units: Unit[] = [];
    
    for (const unit of this.state.units.values()) {
      if (unit.state === 'DESTROYED') continue;
      if (unit.systemId !== systemId) continue;
      if (playerId && unit.ownerId !== playerId) continue;
      
      units.push(unit);
    }
    
    return units;
  }
  
  /**
   * Retourne les ennemis visibles pour une unité.
   */
  getVisibleEnemies(unit: Unit): Unit[] {
    const enemies: Unit[] = [];
    // Note: SHIP_STATS serait importé du GameState
    const sensorRange = 100; // Valeur par défaut
    
    for (const other of this.state.units.values()) {
      if (other.id === unit.id) continue;
      if (other.ownerId === unit.ownerId) continue;
      if (other.state === 'DESTROYED') continue;
      if (other.systemId !== unit.systemId) continue;
      
      const dx = other.position.x - unit.position.x;
      const dy = other.position.y - unit.position.y;
      const dz = other.position.z - unit.position.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      if (dist <= sensorRange) {
        enemies.push(other);
      }
    }
    
    return enemies;
  }
  
  // ============================================================================
  // Statistiques
  // ============================================================================
  
  /**
   * Retourne le nombre d'unités par type pour un joueur.
   */
  getUnitCounts(playerId: PlayerId): Map<ShipClass, number> {
    const counts = new Map<ShipClass, number>();
    
    for (const unit of this.state.units.values()) {
      if (unit.ownerId !== playerId) continue;
      if (unit.state === 'DESTROYED') continue;
      
      const current = counts.get(unit.shipClass) ?? 0;
      counts.set(unit.shipClass, current + 1);
    }
    
    return counts;
  }
  
  /**
   * Retourne la valeur totale de la flotte d'un joueur.
   */
  getFleetValue(playerId: PlayerId): number {
    let total = 0;
    
    for (const unit of this.state.units.values()) {
      if (unit.ownerId !== playerId) continue;
      if (unit.state === 'DESTROYED') continue;
      
      // Valeur basée sur les stats (à implémenter avec SHIP_STATS)
      total += 100; // Placeholder
    }
    
    return total;
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Supprime les unités détruites de la Map.
   * Appelé périodiquement pour libérer la mémoire.
   */
  cleanupDestroyedUnits(): number {
    let cleaned = 0;
    
    for (const [id, unit] of this.state.units.entries()) {
      if (unit.state === 'DESTROYED') {
        this.state.units.delete(id);
        cleaned++;
      }
    }
    
    return cleaned;
  }
}
