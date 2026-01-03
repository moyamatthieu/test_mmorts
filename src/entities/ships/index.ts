/**
 * PEEJS — Ships Module Index
 *
 * Export centralisé pour le rendu des vaisseaux.
 */

// === SHIP RENDERER ===
export { ShipRenderer } from './ShipRenderer';
export type { ShipModel } from './ShipRenderer';

/**
 * ShipRenderConfig — Configuration pour le rendu d'un type de vaisseau
 */
export interface ShipRenderConfig {
  /** Type de vaisseau */
  type: import('../../types/GameState').UnitType;
  /** Couleur de base */
  color?: number;
  /** Échelle */
  scale?: number;
  /** Nombre max d'instances */
  maxInstances?: number;
}

/**
 * ShipInstance — Données d'une instance de vaisseau à rendre
 */
export interface ShipInstance {
  /** ID unique */
  id: string;
  /** Type de vaisseau */
  type: import('../../types/GameState').UnitType;
  /** Position 3D */
  position: { x: number; y: number; z: number };
  /** Rotation/direction */
  rotation?: { x: number; y: number; z: number };
  /** Couleur du joueur */
  playerColor?: number;
}