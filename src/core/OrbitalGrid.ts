/**
 * OrbitalGrid.ts
 * 
 * Grille sphérique de slots constructibles autour d'une planète.
 * Structure: Anneaux × Secteurs = Slots disponibles
 * 
 * Visualisation (vue de dessus):
 * 
 *         Anneau 2 (haute orbite)
 *        ╱ ╲
 *       ●───●───●───●  (secteurs 0-11)
 *      ╱             ╲
 *     ●  Anneau 1     ●
 *     │   ╱ ╲         │
 *     ●  ●─🌍─●       ●
 *     │   ╲ ╱         │
 *     ●  Anneau 0     ●
 *      ╲ (basse)     ╱
 *       ●───●───●───●
 *        ╲ ╱
 */

import * as THREE from 'three';
import { ORBIT_SCALE, PLANET_SIZES, PlanetSize } from './GameScales';
import { OrbitPosition } from './CoordinateSystem';

// =============================================================================
// TYPES
// =============================================================================

/**
 * État d'un slot orbital
 */
export enum OrbitalSlotState {
    /** Slot vide, constructible */
    EMPTY = 'empty',
    
    /** Slot occupé par une structure */
    OCCUPIED = 'occupied',
    
    /** Slot réservé (construction en cours) */
    RESERVED = 'reserved',
    
    /** Slot bloqué (trop proche d'une structure large) */
    BLOCKED = 'blocked',
}

/**
 * Représente un slot dans la grille orbitale
 */
export interface OrbitalSlot {
    /** Position dans la grille */
    position: OrbitPosition;
    
    /** État du slot */
    state: OrbitalSlotState;
    
    /** ID de la structure occupante (si occupé) */
    structureId: string | null;
    
    /** Position 3D relative à la planète (pour le rendu) */
    worldOffset: THREE.Vector3;
}

/**
 * Clé unique pour identifier un slot
 */
export type SlotKey = `${number}-${number}`; // "ring-sector"

// =============================================================================
// CLASSE PRINCIPALE
// =============================================================================

/**
 * Gère la grille orbitale d'une planète
 */
export class OrbitalGrid {
    /** Taille de la planète */
    private planetSize: PlanetSize;
    
    /** Rayon visuel de la planète */
    private planetRadius: number;
    
    /** Nombre d'anneaux disponibles */
    private ringCount: number;
    
    /** Nombre de secteurs par anneau */
    private sectorCount: number;
    
    /** Map des slots par clé */
    private slots: Map<SlotKey, OrbitalSlot>;
    
    /** Groupe Three.js pour le rendu des slots */
    private visualGroup: THREE.Group | null = null;

    constructor(planetSize: PlanetSize) {
        this.planetSize = planetSize;
        const config = PLANET_SIZES[planetSize];
        
        this.planetRadius = config.visualRadius;
        this.sectorCount = ORBIT_SCALE.sectorsPerRing;
        
        // Nombre d'anneaux proportionnel aux slots disponibles
        this.ringCount = Math.ceil(config.orbitalSlots / this.sectorCount);
        
        this.slots = new Map();
        this.initializeSlots();
    }

    // =========================================================================
    // INITIALISATION
    // =========================================================================

    /**
     * Initialise tous les slots de la grille
     */
    private initializeSlots(): void {
        for (let ring = 0; ring < this.ringCount; ring++) {
            for (let sector = 0; sector < this.sectorCount; sector++) {
                const key = this.getSlotKey(ring, sector);
                const worldOffset = this.calculateSlotPosition(ring, sector);
                
                this.slots.set(key, {
                    position: {
                        ring,
                        sector,
                        offset: new THREE.Vector3(0, 0, 0),
                    },
                    state: OrbitalSlotState.EMPTY,
                    structureId: null,
                    worldOffset,
                });
            }
        }
    }

    /**
     * Calcule la position 3D d'un slot
     */
    private calculateSlotPosition(ring: number, sector: number): THREE.Vector3 {
        const { innerOrbitFactor, outerOrbitFactor } = ORBIT_SCALE;
        
        // Rayon de l'anneau
        const t = this.ringCount > 1 ? ring / (this.ringCount - 1) : 0;
        const orbitRadius = this.planetRadius * (innerOrbitFactor + (outerOrbitFactor - innerOrbitFactor) * t);
        
        // Angle du secteur
        const angle = (sector / this.sectorCount) * Math.PI * 2;
        
        // Position sur le plan orbital (légère inclinaison par anneau)
        const tilt = (ring / this.ringCount) * 0.15;
        
        return new THREE.Vector3(
            Math.cos(angle) * orbitRadius,
            Math.sin(tilt * Math.PI) * orbitRadius * 0.1,
            Math.sin(angle) * orbitRadius
        );
    }

    // =========================================================================
    // API PUBLIQUE
    // =========================================================================

    /**
     * Génère la clé unique d'un slot
     */
    getSlotKey(ring: number, sector: number): SlotKey {
        return `${ring}-${sector}`;
    }

    /**
     * Retourne un slot par sa clé
     */
    getSlot(key: SlotKey): OrbitalSlot | undefined {
        return this.slots.get(key);
    }

    /**
     * Retourne un slot par coordonnées
     */
    getSlotAt(ring: number, sector: number): OrbitalSlot | undefined {
        return this.slots.get(this.getSlotKey(ring, sector));
    }

    /**
     * Retourne tous les slots
     */
    getAllSlots(): OrbitalSlot[] {
        return Array.from(this.slots.values());
    }

    /**
     * Retourne tous les slots vides
     */
    getEmptySlots(): OrbitalSlot[] {
        return this.getAllSlots().filter(s => s.state === OrbitalSlotState.EMPTY);
    }

    /**
     * Vérifie si un slot est constructible
     */
    isSlotBuildable(ring: number, sector: number): boolean {
        const slot = this.getSlotAt(ring, sector);
        return slot?.state === OrbitalSlotState.EMPTY;
    }

    /**
     * Réserve un slot pour construction
     */
    reserveSlot(ring: number, sector: number): boolean {
        const key = this.getSlotKey(ring, sector);
        const slot = this.slots.get(key);
        
        if (!slot || slot.state !== OrbitalSlotState.EMPTY) {
            return false;
        }
        
        slot.state = OrbitalSlotState.RESERVED;
        return true;
    }

    /**
     * Occupe un slot avec une structure
     */
    occupySlot(ring: number, sector: number, structureId: string): boolean {
        const key = this.getSlotKey(ring, sector);
        const slot = this.slots.get(key);
        
        if (!slot || (slot.state !== OrbitalSlotState.EMPTY && slot.state !== OrbitalSlotState.RESERVED)) {
            return false;
        }
        
        slot.state = OrbitalSlotState.OCCUPIED;
        slot.structureId = structureId;
        return true;
    }

    /**
     * Libère un slot
     */
    freeSlot(ring: number, sector: number): boolean {
        const key = this.getSlotKey(ring, sector);
        const slot = this.slots.get(key);
        
        if (!slot) {
            return false;
        }
        
        slot.state = OrbitalSlotState.EMPTY;
        slot.structureId = null;
        return true;
    }

    /**
     * Trouve le slot vide le plus proche d'un anneau donné
     */
    findNearestEmptySlot(preferredRing: number): OrbitalSlot | null {
        // Cherche d'abord dans l'anneau préféré
        for (let sector = 0; sector < this.sectorCount; sector++) {
            const slot = this.getSlotAt(preferredRing, sector);
            if (slot?.state === OrbitalSlotState.EMPTY) {
                return slot;
            }
        }
        
        // Sinon, cherche dans les anneaux adjacents
        for (let offset = 1; offset < this.ringCount; offset++) {
            for (const delta of [-offset, offset]) {
                const ring = preferredRing + delta;
                if (ring < 0 || ring >= this.ringCount) continue;
                
                for (let sector = 0; sector < this.sectorCount; sector++) {
                    const slot = this.getSlotAt(ring, sector);
                    if (slot?.state === OrbitalSlotState.EMPTY) {
                        return slot;
                    }
                }
            }
        }
        
        return null;
    }

    // =========================================================================
    // RENDU (Three.js)
    // =========================================================================

    /**
     * Crée le groupe visuel pour afficher les slots
     */
    createVisualGroup(): THREE.Group {
        if (this.visualGroup) {
            return this.visualGroup;
        }
        
        this.visualGroup = new THREE.Group();
        this.visualGroup.name = 'OrbitalGrid';
        
        // Géométrie partagée pour les slots
        const slotGeometry = new THREE.SphereGeometry(ORBIT_SCALE.slotSize * 0.3, 8, 8);
        
        // Matériaux par état
        const materials = {
            [OrbitalSlotState.EMPTY]: new THREE.MeshBasicMaterial({ 
                color: 0x00ff00, 
                transparent: true, 
                opacity: 0.3 
            }),
            [OrbitalSlotState.OCCUPIED]: new THREE.MeshBasicMaterial({ 
                color: 0x0088ff, 
                transparent: true, 
                opacity: 0.6 
            }),
            [OrbitalSlotState.RESERVED]: new THREE.MeshBasicMaterial({ 
                color: 0xffff00, 
                transparent: true, 
                opacity: 0.5 
            }),
            [OrbitalSlotState.BLOCKED]: new THREE.MeshBasicMaterial({ 
                color: 0xff0000, 
                transparent: true, 
                opacity: 0.2 
            }),
        };
        
        // Créer les anneaux visuels
        for (let ring = 0; ring < this.ringCount; ring++) {
            const t = this.ringCount > 1 ? ring / (this.ringCount - 1) : 0;
            const orbitRadius = this.planetRadius * (
                ORBIT_SCALE.innerOrbitFactor + 
                (ORBIT_SCALE.outerOrbitFactor - ORBIT_SCALE.innerOrbitFactor) * t
            );
            
            // Cercle de l'anneau
            const ringGeometry = new THREE.RingGeometry(orbitRadius - 0.05, orbitRadius + 0.05, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x444444, 
                transparent: true, 
                opacity: 0.3,
                side: THREE.DoubleSide 
            });
            const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
            ringMesh.rotation.x = -Math.PI / 2;
            this.visualGroup.add(ringMesh);
        }
        
        // Créer les slots
        for (const slot of this.slots.values()) {
            const mesh = new THREE.Mesh(slotGeometry, materials[slot.state]);
            mesh.position.copy(slot.worldOffset);
            mesh.userData = { 
                slotKey: this.getSlotKey(slot.position.ring, slot.position.sector),
                type: 'orbital-slot'
            };
            this.visualGroup.add(mesh);
        }
        
        return this.visualGroup;
    }

    /**
     * Met à jour le visuel des slots (après changement d'état)
     */
    updateVisuals(): void {
        if (!this.visualGroup) return;
        
        // TODO: Mettre à jour les couleurs des meshes selon l'état des slots
    }

    /**
     * Dispose des ressources Three.js
     */
    dispose(): void {
        if (this.visualGroup) {
            this.visualGroup.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (child.material instanceof THREE.Material) {
                        child.material.dispose();
                    }
                }
            });
            this.visualGroup = null;
        }
    }

    // =========================================================================
    // SERIALISATION (pour persistance)
    // =========================================================================

    /**
     * Sérialise la grille pour sauvegarde
     */
    serialize(): object {
        const occupiedSlots: Array<{ ring: number; sector: number; structureId: string }> = [];
        
        for (const slot of this.slots.values()) {
            if (slot.state === OrbitalSlotState.OCCUPIED && slot.structureId) {
                occupiedSlots.push({
                    ring: slot.position.ring,
                    sector: slot.position.sector,
                    structureId: slot.structureId,
                });
            }
        }
        
        return {
            planetSize: this.planetSize,
            occupiedSlots,
        };
    }

    /**
     * Charge l'état depuis une sauvegarde
     */
    static deserialize(data: { planetSize: PlanetSize; occupiedSlots: Array<{ ring: number; sector: number; structureId: string }> }): OrbitalGrid {
        const grid = new OrbitalGrid(data.planetSize);
        
        for (const { ring, sector, structureId } of data.occupiedSlots) {
            grid.occupySlot(ring, sector, structureId);
        }
        
        return grid;
    }
}
