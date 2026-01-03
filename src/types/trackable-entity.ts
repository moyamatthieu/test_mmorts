// src/types/trackable-entity.ts

import * as THREE from 'three';

/**
 * Interface pour les entités mobiles que la caméra peut suivre.
 * Contrairement aux objets Three.js statiques, ces entités fournissent leur position via callbacks,
 * permettant le suivi d'objets simulés dans le worker (vaisseaux, unités).
 * DRY : on factorise pour que UnitState (GameState) puisse être adapté en TrackableEntity.
 */
export interface TrackableEntity {
  /**
   * Identifiant unique de l'entité (pour mappage avec mémoire partagée worker).
   * Utilisé pour associer une entité visuelle à ses données de simulation.
   */
  readonly id: number;

  /**
   * Retourne la position actuelle de l'entité dans l'espace 3D.
   * Cette position peut être calculée à partir de la mémoire partagée ou d'autres sources.
   */
  getPosition(): THREE.Vector3;

  /**
   * Indique si l'entité est toujours active/valide.
   * Permet de détecter si l'entité a été détruite ou désactivée.
   */
  isActive(): boolean;

  /**
   * Callback optionnel appelé quand l'entité change de position.
   * Utile pour optimisations (éviter recalculs inutiles).
   */
  onPositionChanged?: (newPosition: THREE.Vector3) => void;
}

/**
 * Adaptateur minimaliste pour exposer un UnitState comme TrackableEntity.
 * KISS : pas de classe, simple fonction utilitaire.
 */
import type { UnitState } from './GameState';

export function unitStateToTrackable(u: UnitState): TrackableEntity {
  return {
    id: u.id,
    getPosition: () => new THREE.Vector3(u.position.x, u.position.y, u.position.z),
    isActive: () => u.status !== 'DESTROYED',
    onPositionChanged: undefined,
  };
}

/**
 * Type guard pour vérifier si un objet implémente TrackableEntity.
 */
export function isTrackableEntity(obj: unknown): obj is TrackableEntity {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    typeof (obj as TrackableEntity).id === 'number' &&
    typeof (obj as TrackableEntity).getPosition === 'function' &&
    typeof (obj as TrackableEntity).isActive === 'function'
  );
}