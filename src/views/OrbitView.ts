/**
 * OrbitView.ts
 * 
 * Vue orbitale d'une planète.
 * Affiche la planète au centre avec sa grille de construction orbitale.
 * 
 * Responsabilités:
 * - Rendu de la planète (sphère avec shader procédural)
 * - Rendu de la grille orbitale (anneaux + slots)
 * - Gestion de la sélection des slots
 * - Animation de rotation de la planète
 */

import * as THREE from 'three';
import { OrbitalGrid, OrbitalSlot, OrbitalSlotState } from '../core/OrbitalGrid';
import { PLANET_SIZES, PlanetSize, ORBIT_SCALE } from '../core/GameScales';
import type { PlanetReference } from '../types/NavigationState';
import type { IUpdatable } from '../core/IUpdatable';

// =============================================================================
// TYPES
// =============================================================================

export interface OrbitViewConfig {
    /** Référence de la planète */
    planetRef: PlanetReference;
    
    /** Taille de la planète (pour la grille) */
    planetSize: PlanetSize;
}

// =============================================================================
// CLASSE PRINCIPALE
// =============================================================================

export class OrbitView implements IUpdatable {
    /** Groupe racine contenant tout l'OrbitView */
    private group: THREE.Group;
    
    /** Mesh de la planète (sphère avec shader) */
    private planetMesh: THREE.Mesh;
    
    /** Grille orbitale (logique) */
    private orbitalGrid: OrbitalGrid;
    
    /** Groupe contenant les visuels de la grille */
    private gridGroup: THREE.Group;
    
    /** Référence de la planète */
    private planetRef: PlanetReference;
    
    /** Taille de la planète */
    private planetSize: PlanetSize;
    
    /** Slot actuellement sélectionné */
    private selectedSlot: OrbitalSlot | null = null;
    
    /** Meshes des slots pour raycasting */
    private slotMeshes: Map<string, THREE.Mesh> = new Map();
    
    /** Vitesse de rotation de la planète */
    private rotationSpeed: number = 0.02;

    constructor(config: OrbitViewConfig) {
        this.planetRef = config.planetRef;
        this.planetSize = config.planetSize;
        
        this.group = new THREE.Group();
        this.group.name = 'OrbitView';
        
        // Créer la grille orbitale (logique)
        this.orbitalGrid = new OrbitalGrid(this.planetSize);
        
        // Créer le mesh de la planète
        this.planetMesh = this.createPlanetMesh();
        this.group.add(this.planetMesh);
        
        // Créer les visuels de la grille
        this.gridGroup = this.createGridVisuals();
        this.group.add(this.gridGroup);
        
        // Ajouter une lumière directionnelle pour éclairer la planète
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 3, 5);
        this.group.add(light);
        
        // Lumière ambiante
        const ambient = new THREE.AmbientLight(0x404040, 0.5);
        this.group.add(ambient);
    }

    // =========================================================================
    // CRÉATION DES ÉLÉMENTS VISUELS
    // =========================================================================

    /**
     * Crée le mesh de la planète
     */
    private createPlanetMesh(): THREE.Mesh {
        const config = PLANET_SIZES[this.planetSize];
        const radius = config.visualRadius;
        
        // Couleur basée sur le type de planète
        const colors: Record<string, number> = {
            'telluric': 0x4a90d9,
            'desert': 0xd4a574,
            'ice': 0xaaddff,
            'gas': 0xffaa55,
        };
        const color = colors[this.planetRef.type] || 0x888888;
        
        // Géométrie sphérique avec bonne résolution
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        
        // Matériau avec un peu de relief visuel
        const material = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.8,
            metalness: 0.1,
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = 'OrbitViewPlanet';
        mesh.userData = { type: 'planet', planetId: this.planetRef.id };
        
        return mesh;
    }

    /**
     * Crée les visuels de la grille orbitale
     */
    private createGridVisuals(): THREE.Group {
        const gridGroup = new THREE.Group();
        gridGroup.name = 'OrbitalGridVisuals';
        
        const config = PLANET_SIZES[this.planetSize];
        const planetRadius = config.visualRadius;
        
        // Calculer le nombre d'anneaux
        const ringCount = Math.ceil(config.orbitalSlots / ORBIT_SCALE.sectorsPerRing);
        
        // Créer les cercles d'anneaux
        for (let ring = 0; ring < ringCount; ring++) {
            const t = ringCount > 1 ? ring / (ringCount - 1) : 0;
            const orbitRadius = planetRadius * (
                ORBIT_SCALE.innerOrbitFactor + 
                (ORBIT_SCALE.outerOrbitFactor - ORBIT_SCALE.innerOrbitFactor) * t
            );
            
            // Cercle de l'anneau
            const ringGeometry = new THREE.RingGeometry(orbitRadius - 0.03, orbitRadius + 0.03, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x446688,
                transparent: true,
                opacity: 0.4,
                side: THREE.DoubleSide,
            });
            const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
            ringMesh.rotation.x = -Math.PI / 2;
            gridGroup.add(ringMesh);
        }
        
        // Créer les slots
        const slotGeometry = new THREE.SphereGeometry(ORBIT_SCALE.slotSize * 0.4, 12, 12);
        
        for (const slot of this.orbitalGrid.getAllSlots()) {
            const material = this.getSlotMaterial(slot.state);
            const slotMesh = new THREE.Mesh(slotGeometry.clone(), material);
            slotMesh.position.copy(slot.worldOffset);
            slotMesh.name = `slot-${slot.position.ring}-${slot.position.sector}`;
            slotMesh.userData = {
                type: 'orbital-slot',
                ring: slot.position.ring,
                sector: slot.position.sector,
            };
            
            gridGroup.add(slotMesh);
            this.slotMeshes.set(this.orbitalGrid.getSlotKey(slot.position.ring, slot.position.sector), slotMesh);
        }
        
        return gridGroup;
    }

    /**
     * Retourne le matériau approprié pour un état de slot
     */
    private getSlotMaterial(state: OrbitalSlotState): THREE.MeshBasicMaterial {
        const configs: Record<OrbitalSlotState, { color: number; opacity: number }> = {
            [OrbitalSlotState.EMPTY]: { color: 0x00ff00, opacity: 0.4 },
            [OrbitalSlotState.OCCUPIED]: { color: 0x0088ff, opacity: 0.7 },
            [OrbitalSlotState.RESERVED]: { color: 0xffff00, opacity: 0.6 },
            [OrbitalSlotState.BLOCKED]: { color: 0xff0000, opacity: 0.3 },
        };
        
        const config = configs[state];
        return new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: config.opacity,
        });
    }

    // =========================================================================
    // API PUBLIQUE
    // =========================================================================

    /**
     * Retourne le groupe Three.js
     */
    getGroup(): THREE.Group {
        return this.group;
    }

    /**
     * Retourne la grille orbitale
     */
    getOrbitalGrid(): OrbitalGrid {
        return this.orbitalGrid;
    }

    /**
     * Retourne la référence de la planète
     */
    getPlanetRef(): PlanetReference {
        return this.planetRef;
    }

    /**
     * Retourne les meshes des slots pour raycasting
     */
    getSlotMeshes(): THREE.Mesh[] {
        return Array.from(this.slotMeshes.values());
    }

    /**
     * Sélectionne un slot par ses coordonnées
     */
    selectSlot(ring: number, sector: number): boolean {
        const slot = this.orbitalGrid.getSlotAt(ring, sector);
        if (!slot) return false;
        
        // Désélectionner l'ancien slot
        if (this.selectedSlot) {
            const oldKey = this.orbitalGrid.getSlotKey(
                this.selectedSlot.position.ring,
                this.selectedSlot.position.sector
            );
            const oldMesh = this.slotMeshes.get(oldKey);
            if (oldMesh) {
                (oldMesh.material as THREE.MeshBasicMaterial).color.setHex(
                    this.getSlotMaterial(this.selectedSlot.state).color.getHex()
                );
            }
        }
        
        // Sélectionner le nouveau
        this.selectedSlot = slot;
        const key = this.orbitalGrid.getSlotKey(ring, sector);
        const mesh = this.slotMeshes.get(key);
        if (mesh) {
            (mesh.material as THREE.MeshBasicMaterial).color.setHex(0xffffff);
        }
        
        return true;
    }

    /**
     * Désélectionne le slot actuel
     */
    deselectSlot(): void {
        if (this.selectedSlot) {
            const key = this.orbitalGrid.getSlotKey(
                this.selectedSlot.position.ring,
                this.selectedSlot.position.sector
            );
            const mesh = this.slotMeshes.get(key);
            if (mesh) {
                (mesh.material as THREE.MeshBasicMaterial).color.setHex(
                    this.getSlotMaterial(this.selectedSlot.state).color.getHex()
                );
            }
            this.selectedSlot = null;
        }
    }

    /**
     * Retourne le slot sélectionné
     */
    getSelectedSlot(): OrbitalSlot | null {
        return this.selectedSlot;
    }

    /**
     * Calcule la distance de vue optimale pour cette vue
     */
    getViewDistance(): number {
        const config = PLANET_SIZES[this.planetSize];
        const outerRadius = config.visualRadius * ORBIT_SCALE.outerOrbitFactor;
        return outerRadius * 2.5; // Assez loin pour voir toute la grille
    }

    /**
     * Met à jour un slot après changement d'état
     */
    updateSlotVisual(ring: number, sector: number): void {
        const slot = this.orbitalGrid.getSlotAt(ring, sector);
        if (!slot) return;
        
        const key = this.orbitalGrid.getSlotKey(ring, sector);
        const mesh = this.slotMeshes.get(key);
        if (mesh) {
            const newMaterial = this.getSlotMaterial(slot.state);
            (mesh.material as THREE.MeshBasicMaterial).color.copy(newMaterial.color);
            (mesh.material as THREE.MeshBasicMaterial).opacity = newMaterial.opacity;
        }
    }

    // =========================================================================
    // UPDATE (IUpdatable)
    // =========================================================================

    update(deltaTime: number): void {
        // Rotation lente de la planète
        this.planetMesh.rotation.y += this.rotationSpeed * deltaTime;
        
        // La grille orbitale reste fixe (ne tourne pas avec la planète)
    }

    // =========================================================================
    // DISPOSE
    // =========================================================================

    dispose(): void {
        // Dispose des meshes
        this.group.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                if (child.material instanceof THREE.Material) {
                    child.material.dispose();
                }
            }
        });
        
        // Clear references
        this.slotMeshes.clear();
        this.orbitalGrid.dispose();
        
        console.log('[OrbitView] Disposed');
    }
}
