import * as THREE from 'three';
import { MemoryManager } from '../core/MemoryManager';

/**
 * UnitManager : lit les positions depuis la MemoryManager (SharedArrayBuffer)
 * et met à jour un InstancedMesh pour le rendu efficace de milliers d'unités.
 */
export class UnitManager {
    private memory: MemoryManager;
    private mesh: THREE.InstancedMesh;
    private tempObj: THREE.Object3D;

    constructor(memory: MemoryManager) {
        this.memory = memory;

        const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ffcc });

        // Créer l'InstancedMesh avec la capacité maximale
        this.mesh = new THREE.InstancedMesh(geometry, material, this.memory.maxUnits);
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

        // Par défaut, on ne dessine aucune instance (count contrôlera les instances visibles)
        this.mesh.count = 0;

        this.tempObj = new THREE.Object3D();
    }

    /** Retourne le mesh à ajouter à la scène */
    public getMesh(): THREE.InstancedMesh {
        return this.mesh;
    }

    /** Met à jour les matrices d'instances à partir du SharedArrayBuffer */
    public update(dt?: number): void {
        const { posX, posY, posZ, active } = this.memory;
        let visible = 0;

        for (let i = 0; i < this.memory.maxUnits; i++) {
            if (active[i] === 1) {
                this.tempObj.position.set(posX[i], posY[i], posZ[i]);
                this.tempObj.rotation.set(0, 0, 0);
                this.tempObj.updateMatrix();
                this.mesh.setMatrixAt(visible, this.tempObj.matrix);
                visible++;
            }
        }

        // Mettre à jour le nombre d'instances visibles
        this.mesh.count = visible;
        this.mesh.instanceMatrix.needsUpdate = true;
    }

    public dispose(): void {
        this.mesh.geometry.dispose();
        if (Array.isArray(this.mesh.material)) {
            this.mesh.material.forEach(m => m.dispose());
        } else {
            this.mesh.material.dispose();
        }
    }
}
