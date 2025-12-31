import * as THREE from 'three';

/**
 * Interface simple pour les objets pouvant être mis à jour chaque frame.
 * `dt` est le delta-time en secondes. `cameraPosition` est optionnel.
 */
export interface IUpdatable {
    update(dt: number, cameraPosition?: THREE.Vector3): void;
}
