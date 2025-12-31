import * as THREE from 'three';

/**
 * Gère la création et l'affichage des étoiles en arrière-plan.
 */
export class StarField {
    private points: THREE.Points;
    private rotationSpeed: number = 0.0005;

    constructor(count: number = 5000) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 2000;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.7,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(geometry, material);
    }

    /**
     * Retourne le mesh (Points) du champ d'étoiles.
     */
    public getMesh(): THREE.Points {
        return this.points;
    }

    /** Update minimal pour animer légèrement le champ d'étoiles */
    public update(dt: number): void {
        // Petite rotation lente autour de l'axe Y
        this.points.rotation.y += this.rotationSpeed * dt * 60; // normaliser sur 60fps
    }
}
