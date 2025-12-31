import * as THREE from 'three';

/**
 * Crée un repère 3D (axes X, Y, Z) pour aider à l'orientation dans la scène.
 */
export class CoordinateSystem {
    private axesHelper: THREE.AxesHelper;

    /**
     * @param size Taille du repère (longueur des axes).
     */
    constructor(size: number = 5) {
        this.axesHelper = new THREE.AxesHelper(size);
        
        // Personnaliser les couleurs des axes
        // L'AxesHelper contient 3 LineBasicMaterial pour les axes X, Y, Z
        const materials = this.axesHelper.material as THREE.Material[];
        if (materials.length >= 3) {
            (materials[0] as THREE.LineBasicMaterial).color.setHex(0xff0000); // X - Rouge
            (materials[1] as THREE.LineBasicMaterial).color.setHex(0x00ff00); // Y - Vert  
            (materials[2] as THREE.LineBasicMaterial).color.setHex(0x0000ff); // Z - Bleu
            
            // Rendre les axes semi-transparents pour ne pas gêner la visibilité
            (materials[0] as THREE.LineBasicMaterial).transparent = true;
            (materials[1] as THREE.LineBasicMaterial).transparent = true;
            (materials[2] as THREE.LineBasicMaterial).transparent = true;
            (materials[0] as THREE.LineBasicMaterial).opacity = 0.7;
            (materials[1] as THREE.LineBasicMaterial).opacity = 0.7;
            (materials[2] as THREE.LineBasicMaterial).opacity = 0.7;
        }
    }

    /**
     * Retourne le repère 3D.
     */
    public getMesh(): THREE.AxesHelper {
        return this.axesHelper;
    }

    /**
     * Ajuste la visibilité du repère en fonction de la distance de la caméra.
     */
    public update(dt: number, cameraPosition?: THREE.Vector3): void {
        if (!cameraPosition) return;
        const distance = cameraPosition.length();

        // Atténuer la visibilité quand on s'éloigne
        const opacity = Math.max(0.2, Math.min(0.8, 20 / distance));

        const materials = this.axesHelper.material as THREE.Material[];
        if (materials.length >= 3) {
            (materials[0] as THREE.LineBasicMaterial).opacity = opacity;
            (materials[1] as THREE.LineBasicMaterial).opacity = opacity;
            (materials[2] as THREE.LineBasicMaterial).opacity = opacity;
        }
    }

    /**
     * Active/désactive le repère.
     */
    public setVisible(visible: boolean): void {
        this.axesHelper.visible = visible;
    }

    /**
     * Ajuste la position du repère.
     */
    public setPosition(x: number, y: number, z: number): void {
        this.axesHelper.position.set(x, y, z);
    }
}