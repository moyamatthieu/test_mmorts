// src/ai/FormationManager.ts
/**
 * Gestionnaire de formations pour les flottes.
 * 
 * Responsabilités:
 * - Calculer les positions de formation
 * - Gérer les transitions entre formations
 * - Adapter les formations à la taille du groupe
 * 
 * Types de formations (inspiré Homeworld):
 * - WEDGE: Formation en V (attaque)
 * - SPHERE: Formation sphérique (défense)
 * - WALL: Ligne/mur (barrière)
 * - CLAW: Pince (encerclement)
 * - COLUMN: Colonne (déplacement)
 * - CUSTOM: Formation personnalisée
 * 
 * KISS: Calculs géométriques simples, pas de collision complexe.
 */

import type { EntityId } from '../types/commands';

// ============================================================================
// Types
// ============================================================================

export type FormationType = 
  | 'WEDGE'     // V shape (attack)
  | 'SPHERE'    // Sphere (defense)
  | 'WALL'      // Line/wall (barrier)
  | 'CLAW'      // Pincer (encirclement)
  | 'COLUMN'    // Column (movement)
  | 'DELTA'     // Delta/triangle
  | 'CUSTOM';   // Custom positions

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface FormationSlot {
  /** Position relative au leader (offset) */
  offset: Vector3;
  /** Priorité (0 = leader) */
  priority: number;
  /** Rôle optionnel (avant, flanc, arrière) */
  role: 'leader' | 'front' | 'flank_left' | 'flank_right' | 'rear' | 'support';
}

export interface Formation {
  type: FormationType;
  /** ID des unités dans la formation (ordre = position) */
  units: EntityId[];
  /** Position centrale de la formation */
  center: Vector3;
  /** Direction de la formation (avant) */
  direction: Vector3;
  /** Espacement entre les unités */
  spacing: number;
  /** Échelle de la formation */
  scale: number;
}

export interface FormationConfig {
  spacing: number;      // Distance entre unités
  depthSpacing: number; // Distance entre rangs
  scale: number;        // Multiplicateur global
}

// ============================================================================
// Configuration
// ============================================================================

export const FORMATION_CONFIG: FormationConfig = {
  spacing: 15,
  depthSpacing: 20,
  scale: 1.0
};

// ============================================================================
// Classe FormationManager
// ============================================================================

/**
 * Gestionnaire de formations.
 */
export class FormationManager {
  private formations: Map<string, Formation> = new Map();
  private config: FormationConfig;
  
  constructor(config: Partial<FormationConfig> = {}) {
    this.config = { ...FORMATION_CONFIG, ...config };
  }
  
  // ============================================================================
  // Création de formations
  // ============================================================================
  
  /**
   * Crée une nouvelle formation.
   */
  createFormation(
    id: string,
    type: FormationType,
    units: EntityId[],
    center: Vector3,
    direction: Vector3
  ): Formation {
    const formation: Formation = {
      type,
      units: [...units],
      center: { ...center },
      direction: this.normalize(direction),
      spacing: this.config.spacing,
      scale: this.config.scale
    };
    
    this.formations.set(id, formation);
    return formation;
  }
  
  /**
   * Supprime une formation.
   */
  removeFormation(id: string): void {
    this.formations.delete(id);
  }
  
  /**
   * Récupère une formation.
   */
  getFormation(id: string): Formation | undefined {
    return this.formations.get(id);
  }
  
  // ============================================================================
  // Calcul des positions
  // ============================================================================
  
  /**
   * Calcule les positions de tous les slots d'une formation.
   */
  calculateSlotPositions(formation: Formation): Map<EntityId, Vector3> {
    const slots = this.generateSlots(formation.type, formation.units.length);
    const positions = new Map<EntityId, Vector3>();
    
    // Calculer les vecteurs de base
    const forward = formation.direction;
    const up = { x: 0, y: 1, z: 0 };
    const right = this.cross(forward, up);
    const adjustedUp = this.cross(right, forward);
    
    for (let i = 0; i < formation.units.length; i++) {
      const unitId = formation.units[i];
      const slot = slots[i];
      
      if (!slot) continue;
      
      // Transformer l'offset local en position mondiale
      const worldOffset: Vector3 = {
        x: right.x * slot.offset.x + adjustedUp.x * slot.offset.y + forward.x * slot.offset.z,
        y: right.y * slot.offset.x + adjustedUp.y * slot.offset.y + forward.y * slot.offset.z,
        z: right.z * slot.offset.x + adjustedUp.z * slot.offset.y + forward.z * slot.offset.z
      };
      
      // Appliquer l'échelle et l'espacement
      const scaledOffset: Vector3 = {
        x: worldOffset.x * formation.spacing * formation.scale,
        y: worldOffset.y * formation.spacing * formation.scale,
        z: worldOffset.z * formation.spacing * formation.scale
      };
      
      // Position finale
      positions.set(unitId, {
        x: formation.center.x + scaledOffset.x,
        y: formation.center.y + scaledOffset.y,
        z: formation.center.z + scaledOffset.z
      });
    }
    
    return positions;
  }
  
  /**
   * Génère les slots pour un type de formation.
   */
  private generateSlots(type: FormationType, count: number): FormationSlot[] {
    switch (type) {
      case 'WEDGE':
        return this.generateWedgeSlots(count);
      case 'SPHERE':
        return this.generateSphereSlots(count);
      case 'WALL':
        return this.generateWallSlots(count);
      case 'CLAW':
        return this.generateClawSlots(count);
      case 'COLUMN':
        return this.generateColumnSlots(count);
      case 'DELTA':
        return this.generateDeltaSlots(count);
      default:
        return this.generateWedgeSlots(count);
    }
  }
  
  // ============================================================================
  // Générateurs de formations
  // ============================================================================
  
  /**
   * Formation en V (Wedge) - idéale pour l'attaque.
   * Le leader est à la pointe, les autres s'étalent en V.
   */
  private generateWedgeSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    // Leader à la pointe
    slots.push({
      offset: { x: 0, y: 0, z: 0 },
      priority: 0,
      role: 'leader'
    });
    
    // Les autres en V derrière
    for (let i = 1; i < count; i++) {
      const row = Math.ceil(i / 2);
      const side = i % 2 === 1 ? -1 : 1;
      
      slots.push({
        offset: {
          x: side * row,
          y: 0,
          z: -row * 1.5
        },
        priority: i,
        role: side === -1 ? 'flank_left' : 'flank_right'
      });
    }
    
    return slots;
  }
  
  /**
   * Formation sphérique - idéale pour la défense.
   * Les unités forment une sphère autour du centre.
   */
  private generateSphereSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    if (count === 0) return slots;
    
    // Centre
    slots.push({
      offset: { x: 0, y: 0, z: 0 },
      priority: 0,
      role: 'leader'
    });
    
    if (count === 1) return slots;
    
    // Distribution sphérique (Fibonacci sphere)
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 1; i < count; i++) {
      const t = i / (count - 1);
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = 2 * Math.PI * i / goldenRatio;
      
      const radius = Math.cbrt(i / count) * 2; // Rayon variable
      
      slots.push({
        offset: {
          x: radius * Math.sin(inclination) * Math.cos(azimuth),
          y: radius * Math.sin(inclination) * Math.sin(azimuth),
          z: radius * Math.cos(inclination)
        },
        priority: i,
        role: 'support'
      });
    }
    
    return slots;
  }
  
  /**
   * Formation en mur - idéale pour bloquer.
   * Une ligne horizontale face à l'ennemi.
   */
  private generateWallSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    const halfWidth = (count - 1) / 2;
    
    for (let i = 0; i < count; i++) {
      const xOffset = i - halfWidth;
      
      slots.push({
        offset: { x: xOffset, y: 0, z: 0 },
        priority: Math.abs(xOffset),
        role: i === Math.floor(count / 2) ? 'leader' : 'front'
      });
    }
    
    return slots;
  }
  
  /**
   * Formation en pince (Claw) - idéale pour encercler.
   * Deux branches qui s'avancent pour encercler.
   */
  private generateClawSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    // Leader au centre arrière
    slots.push({
      offset: { x: 0, y: 0, z: -2 },
      priority: 0,
      role: 'leader'
    });
    
    if (count === 1) return slots;
    
    // Répartir les unités sur deux branches
    const leftBranch: number[] = [];
    const rightBranch: number[] = [];
    
    for (let i = 1; i < count; i++) {
      if (i % 2 === 1) {
        leftBranch.push(i);
      } else {
        rightBranch.push(i);
      }
    }
    
    // Branche gauche
    for (let i = 0; i < leftBranch.length; i++) {
      const progress = (i + 1) / (leftBranch.length + 1);
      const angle = progress * Math.PI * 0.4; // Arc de 72°
      
      slots.push({
        offset: {
          x: -Math.sin(angle) * (2 + i * 0.5),
          y: 0,
          z: Math.cos(angle) * (1 + i * 0.3)
        },
        priority: leftBranch[i],
        role: 'flank_left'
      });
    }
    
    // Branche droite
    for (let i = 0; i < rightBranch.length; i++) {
      const progress = (i + 1) / (rightBranch.length + 1);
      const angle = progress * Math.PI * 0.4;
      
      slots.push({
        offset: {
          x: Math.sin(angle) * (2 + i * 0.5),
          y: 0,
          z: Math.cos(angle) * (1 + i * 0.3)
        },
        priority: rightBranch[i],
        role: 'flank_right'
      });
    }
    
    return slots;
  }
  
  /**
   * Formation en colonne - idéale pour le déplacement.
   * Une ligne derrière le leader.
   */
  private generateColumnSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    for (let i = 0; i < count; i++) {
      slots.push({
        offset: { x: 0, y: 0, z: -i },
        priority: i,
        role: i === 0 ? 'leader' : 'rear'
      });
    }
    
    return slots;
  }
  
  /**
   * Formation delta/triangle - compact et polyvalent.
   */
  private generateDeltaSlots(count: number): FormationSlot[] {
    const slots: FormationSlot[] = [];
    
    // Construire un triangle
    let row = 0;
    let col = 0;
    let rowSize = 1;
    
    for (let i = 0; i < count; i++) {
      const xOffset = col - (rowSize - 1) / 2;
      const zOffset = -row;
      
      slots.push({
        offset: { x: xOffset, y: 0, z: zOffset },
        priority: row,
        role: row === 0 ? 'leader' : (col === 0 || col === rowSize - 1 ? 'flank_left' : 'front')
      });
      
      col++;
      if (col >= rowSize) {
        row++;
        rowSize++;
        col = 0;
      }
    }
    
    return slots;
  }
  
  // ============================================================================
  // Mise à jour de formation
  // ============================================================================
  
  /**
   * Déplace le centre de la formation.
   */
  moveFormation(id: string, newCenter: Vector3): void {
    const formation = this.formations.get(id);
    if (formation) {
      formation.center = { ...newCenter };
    }
  }
  
  /**
   * Tourne la formation.
   */
  rotateFormation(id: string, newDirection: Vector3): void {
    const formation = this.formations.get(id);
    if (formation) {
      formation.direction = this.normalize(newDirection);
    }
  }
  
  /**
   * Change le type de formation.
   */
  changeFormationType(id: string, newType: FormationType): void {
    const formation = this.formations.get(id);
    if (formation) {
      formation.type = newType;
    }
  }
  
  /**
   * Ajoute une unité à la formation.
   */
  addUnitToFormation(formationId: string, unitId: EntityId): void {
    const formation = this.formations.get(formationId);
    if (formation && !formation.units.includes(unitId)) {
      formation.units.push(unitId);
    }
  }
  
  /**
   * Retire une unité de la formation.
   */
  removeUnitFromFormation(formationId: string, unitId: EntityId): void {
    const formation = this.formations.get(formationId);
    if (formation) {
      const index = formation.units.indexOf(unitId);
      if (index !== -1) {
        formation.units.splice(index, 1);
      }
    }
  }
  
  /**
   * Met à jour l'espacement de la formation.
   */
  setFormationSpacing(id: string, spacing: number): void {
    const formation = this.formations.get(id);
    if (formation) {
      formation.spacing = spacing;
    }
  }
  
  // ============================================================================
  // Utilitaires mathématiques
  // ============================================================================
  
  private normalize(v: Vector3): Vector3 {
    const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    if (len === 0) return { x: 0, y: 0, z: 1 };
    return { x: v.x / len, y: v.y / len, z: v.z / len };
  }
  
  private cross(a: Vector3, b: Vector3): Vector3 {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    };
  }
  
  // ============================================================================
  // Requêtes
  // ============================================================================
  
  /**
   * Trouve la formation contenant une unité.
   */
  findFormationByUnit(unitId: EntityId): Formation | undefined {
    for (const formation of this.formations.values()) {
      if (formation.units.includes(unitId)) {
        return formation;
      }
    }
    return undefined;
  }
  
  /**
   * Récupère toutes les formations.
   */
  getAllFormations(): Formation[] {
    return Array.from(this.formations.values());
  }
  
  /**
   * Récupère le nombre de formations.
   */
  get count(): number {
    return this.formations.size;
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale du gestionnaire de formations */
export const formationManager = new FormationManager();