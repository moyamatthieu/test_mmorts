import * as THREE from 'three';

export class SelectionRing {
    private mesh: THREE.Mesh;
    private innerRadius: number;
    private outerRadius: number;
    private color: number;
    private opacity: number;

    /**
     * Crée un anneau de sélection standardisé
     * @param innerRadius Rayon interne de l'anneau (par défaut 1.30)
     * @param thickness Épaisseur de l'anneau (par défaut 0.05)
     * @param color Couleur de l'anneau (par défaut 0xffffff - blanc)
     * @param opacity Opacité de l'anneau (par défaut 1.0)
     */
    constructor(innerRadius: number = 1.30, thickness: number = 0.05, 
                color: number = 0xffffff, opacity: number = 1.0) {
        this.innerRadius = innerRadius;
        this.outerRadius = innerRadius + thickness;
        this.color = color;
        this.opacity = opacity;

        const ringGeometry = new THREE.RingGeometry(innerRadius, this.outerRadius, 32);
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide
        });

        this.mesh = new THREE.Mesh(ringGeometry, ringMaterial);
        this.mesh.rotation.x = -Math.PI / 2; // Position horizontale par défaut
    }

    /**
     * Retourne le mesh de l'anneau
     */
    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    /**
     * Expose les paramètres (debug/inspection). Permet aussi d'éviter des champs "write-only"
     * (TypeScript noUnusedLocals/noUnusedParameters) tout en gardant un API minimal.
     */
    public getParams(): { innerRadius: number; outerRadius: number; color: number; opacity: number } {
        return {
            innerRadius: this.innerRadius,
            outerRadius: this.outerRadius,
            color: this.color,
            opacity: this.opacity
        };
    }

    /**
     * Met à jour la position de l'anneau
     * @param position Position 3D où placer l'anneau
     */
    public setPosition(position: THREE.Vector3): void {
        this.mesh.position.copy(position);
    }

    /**
     * Met à jour la taille de l'anneau
     * @param innerRadius Nouveau rayon interne
     * @param thickness Nouvelle épaisseur
     */
    public setSize(innerRadius: number, thickness: number = 0.05): void {
        this.innerRadius = innerRadius;
        this.outerRadius = innerRadius + thickness;
        
        const ringGeometry = new THREE.RingGeometry(innerRadius, this.outerRadius, 32);
        this.mesh.geometry.dispose();
        this.mesh.geometry = ringGeometry;
    }

    /**
     * Met à jour la couleur et l'opacité de l'anneau
     * @param color Nouvelle couleur
     * @param opacity Nouvelle opacité
     */
    public setAppearance(color: number, opacity: number): void {
        this.color = color;
        this.opacity = opacity;
        (this.mesh.material as THREE.MeshBasicMaterial).color.setHex(color);
        (this.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
    }

    /**
     * Met à jour l'animation de rotation de l'anneau
     * @param dt Delta time pour l'animation
     */
    public updateRotation(dt: number): void {
        this.mesh.rotation.z += dt * 2; // Rotation lente standard
    }

    /**
     * Nettoie les ressources de l'anneau
     */
    public dispose(): void {
        this.mesh.geometry.dispose();
        (this.mesh.material as THREE.Material).dispose();
    }
}