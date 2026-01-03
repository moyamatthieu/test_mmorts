/**
 * SurfaceGrid.ts
 * 
 * Grille de construction sur la surface sphérique d'une planète.
 * Utilise une discrétisation latitude/longitude pour mapper la sphère.
 * 
 * Note: Cette approche crée une distorsion aux pôles (cellules plus petites).
 * Pour un MVP, c'est acceptable. Une future itération pourrait utiliser
 * une grille géodésique ou CubeSphere.
 */

import * as THREE from 'three';
import { PLANET_SIZES, PlanetSize } from './GameScales';
import { SurfacePosition } from './CoordinateSystem';
import { NoiseGenerator } from '../utils/NoiseGenerator';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Type de terrain d'une case
 */
export enum TerrainType {
    /** Sol plat, constructible */
    FLAT = 'flat',
    
    /** Pente douce, partiellement constructible */
    SLOPE = 'slope',
    
    /** Falaise/montagne, non constructible */
    CLIFF = 'cliff',
    
    /** Eau/liquide, non constructible (sans tech spéciale) */
    LIQUID = 'liquid',
    
    /** Zone de ressources */
    RESOURCE = 'resource',
}

/**
 * État d'une case de la grille
 */
export enum CellState {
    /** Case libre */
    FREE = 'free',
    
    /** Occupée par un bâtiment */
    BUILDING = 'building',
    
    /** Occupée par une unité */
    UNIT = 'unit',
    
    /** Réservée (construction en cours) */
    RESERVED = 'reserved',
    
    /** Bloquée par le terrain */
    BLOCKED = 'blocked',
}

/**
 * Une case de la grille de surface
 */
export interface SurfaceCell {
    /** Index Longitude (0 à gridSize-1) */
    x: number;
    /** Index Latitude (0 à gridSize/2-1) */
    y: number;
    
    /** Type de terrain */
    terrain: TerrainType;
    
    /** Hauteur absolue (distance au centre) */
    height: number;
    
    /** État de la case */
    state: CellState;
    
    /** ID de l'entité occupante */
    entityId: string | null;

    /** Position centrale en coordonnées monde (cache) */
    worldPosition: THREE.Vector3;
}

/**
 * Zone de ressources sur la surface
 */
export interface ResourceDeposit {
    /** Position centrale (coordonnées grille) */
    gridX: number;
    gridY: number;
    
    /** Position monde */
    worldPosition: THREE.Vector3;
    
    /** Type de ressource */
    resourceType: 'metal' | 'crystal' | 'gas' | 'rare';
    
    /** Quantité restante */
    amount: number;
    
    /** Rayon de la zone (en cellules) */
    radius: number;
}

// =============================================================================
// CLASSE PRINCIPALE
// =============================================================================

/**
 * Gère la grille de surface sphérique d'une planète
 */
export class SurfaceGrid {
    /** Taille de la planète */
    private planetSize: PlanetSize;
    
    /** Rayon de base de la planète */
    private planetRadius: number;

    /** Taille de la grille (divisions en longitude) */
    private gridSize: number;
    
    /** Seed pour la génération procédurale */
    private seed: number;
    
    /** Cases de la grille [y][x] (Latitude, Longitude) */
    private cells: SurfaceCell[][];
    
    /** Dépôts de ressources */
    private resources: ResourceDeposit[];
    
    /** Groupe Three.js pour le debug visuel */
    private visualGroup: THREE.Group | null = null;

    constructor(planetSize: PlanetSize, seed: number) {
        this.planetSize = planetSize;
        this.seed = seed;
        
        const config = PLANET_SIZES[planetSize];
        this.gridSize = config.surfaceGridSize;
        this.planetRadius = config.visualRadius;
        
        this.cells = [];
        this.resources = [];
        
        if (this.gridSize > 0) {
            this.generateTerrain();
            this.generateResources();
        }
    }

    // =========================================================================
    // GÉNÉRATION PROCÉDURALE
    // =========================================================================

    /**
     * Génère le terrain de façon procédurale sur la sphère
     */
    private generateTerrain(): void {
        const latDivisions = Math.floor(this.gridSize / 2);
        
        for (let y = 0; y < latDivisions; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.gridSize; x++) {
                // Calculer la position monde pour cette cellule
                const worldPos = this.calculateWorldPosition(x, y);
                
                // Obtenir la hauteur exacte via NoiseGenerator (cohérence physique/visuelle)
                // Note: getSurfaceHeight retourne la distance au centre (rayon + relief)
                const height = NoiseGenerator.getSurfaceHeight(worldPos, this.planetRadius, this.seed);
                
                // Mettre à jour la position avec la hauteur exacte
                worldPos.setLength(height);

                // Déterminer le type de terrain basé sur la hauteur relative
                // Hauteur relative = (height - radius) / displacementScale
                const displacementScale = this.planetRadius * 0.05;
                const relativeHeight = (height - this.planetRadius) / displacementScale; // approx 0-1
                
                const terrain = this.heightToTerrain(relativeHeight);
                
                this.cells[y][x] = {
                    x,
                    y,
                    terrain,
                    height,
                    state: terrain === TerrainType.FLAT ? CellState.FREE : CellState.BLOCKED,
                    entityId: null,
                    worldPosition: worldPos
                };
            }
        }
    }

    /**
     * Calcule la position 3D théorique (sur la sphère de base) pour une cellule
     */
    private calculateWorldPosition(x: number, y: number): THREE.Vector3 {
        const latDivisions = Math.floor(this.gridSize / 2);
        
        // Longitude (Theta): 0 à 2PI
        const u = x / this.gridSize;
        const theta = u * Math.PI * 2;
        
        // Latitude (Phi): -PI/2 à PI/2
        // On évite les pôles exacts pour éviter les singularités
        const v = (y + 0.5) / latDivisions; 
        const phi = v * Math.PI - Math.PI / 2;
        
        // Conversion Sphérique -> Cartésien (Y up)
        // x = r * cos(phi) * cos(theta)
        // y = r * sin(phi)
        // z = r * cos(phi) * sin(theta)
        
        const cosPhi = Math.cos(phi);
        const sinPhi = Math.sin(phi);
        const cosTheta = Math.cos(theta);
        const sinTheta = Math.sin(theta);
        
        return new THREE.Vector3(
            this.planetRadius * cosPhi * cosTheta,
            this.planetRadius * sinPhi,
            this.planetRadius * cosPhi * sinTheta
        );
    }

    /**
     * Générateur pseudo-aléatoire seedé
     */
    private createSeededRandom(seed: number): () => number {
        let s = seed;
        return () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
    }

    /**
     * Convertit une hauteur relative en type de terrain
     */
    private heightToTerrain(relativeHeight: number): TerrainType {
        // Normaliser approximativement entre 0 et 1 (le noise peut dépasser)
        const h = Math.max(0, Math.min(1, (relativeHeight + 0.2) / 1.4));
        
        if (h < 0.3) return TerrainType.LIQUID; // Océans
        if (h < 0.6) return TerrainType.FLAT;   // Plaines
        if (h < 0.8) return TerrainType.SLOPE;  // Collines
        return TerrainType.CLIFF;               // Montagnes
    }

    /**
     * Génère les dépôts de ressources
     */
    private generateResources(): void {
        const random = this.createSeededRandom(this.seed * 31);
        const latDivisions = Math.floor(this.gridSize / 2);
        const resourceCount = Math.floor(this.gridSize / 4); 
        
        const resourceTypes: Array<'metal' | 'crystal' | 'gas' | 'rare'> = ['metal', 'crystal', 'gas', 'rare'];
        const resourceWeights = [0.4, 0.3, 0.2, 0.1];
        
        for (let i = 0; i < resourceCount; i++) {
            const x = Math.floor(random() * this.gridSize);
            const y = Math.floor(random() * latDivisions);
            
            // Vérifie que c'est sur terrain plat
            if (this.cells[y]?.[x]?.terrain !== TerrainType.FLAT) continue;
            
            // Choix du type
            const roll = random();
            let cumulative = 0;
            let type: 'metal' | 'crystal' | 'gas' | 'rare' = 'metal';
            for (let j = 0; j < resourceTypes.length; j++) {
                cumulative += resourceWeights[j];
                if (roll < cumulative) {
                    type = resourceTypes[j];
                    break;
                }
            }
            
            const cell = this.cells[y][x];
            
            this.resources.push({
                gridX: x,
                gridY: y,
                worldPosition: cell.worldPosition.clone(),
                resourceType: type,
                amount: Math.floor(random() * 5000 + 1000),
                radius: Math.floor(random() * 2 + 1),
            });
            
            // Marque les cases
            // Note: Sur une sphère, la distance "grille" est approximative
            // Pour un MVP, on marque juste la case centrale
            cell.terrain = TerrainType.RESOURCE;
        }
    }

    // =========================================================================
    // API PUBLIQUE
    // =========================================================================

    /**
     * Retourne la taille de la grille (longitude)
     */
    getGridSize(): number {
        return this.gridSize;
    }

    /**
     * Retourne la liste des ressources
     */
    getResources(): ResourceDeposit[] {
        return this.resources;
    }

    /**
     * Retourne une case par coordonnées
     */
    getCell(x: number, y: number): SurfaceCell | null {
        const latDivisions = Math.floor(this.gridSize / 2);
        
        // Gestion du wrapping longitude
        let wrappedX = x % this.gridSize;
        if (wrappedX < 0) wrappedX += this.gridSize;
        
        if (y < 0 || y >= latDivisions) {
            return null; // Hors limites latitude (pôles)
        }
        
        return this.cells[y]?.[wrappedX] ?? null;
    }

    /**
     * Vérifie si une case est constructible
     */
    isBuildable(x: number, y: number): boolean {
        const cell = this.getCell(x, y);
        return cell !== null 
            && (cell.terrain === TerrainType.FLAT || cell.terrain === TerrainType.RESOURCE)
            && cell.state === CellState.FREE;
    }

    /**
     * Vérifie si une zone est constructible
     * Note: Sur une sphère, "width/height" en cases est une approximation locale
     */
    isAreaBuildable(centerX: number, centerY: number, size: number): boolean {
        const radius = Math.floor(size / 2);
        
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                if (!this.isBuildable(centerX + dx, centerY + dy)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Réserve une zone pour construction
     */
    reserveArea(centerX: number, centerY: number, size: number): boolean {
        if (!this.isAreaBuildable(centerX, centerY, size)) {
            return false;
        }
        
        const radius = Math.floor(size / 2);
        
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const cell = this.getCell(centerX + dx, centerY + dy);
                if (cell) cell.state = CellState.RESERVED;
            }
        }
        return true;
    }

    /**
     * Place un bâtiment sur une zone
     */
    placeBuilding(centerX: number, centerY: number, size: number, buildingId: string): boolean {
        const radius = Math.floor(size / 2);
        
        // Vérification
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const cell = this.getCell(centerX + dx, centerY + dy);
                if (!cell || (cell.state !== CellState.FREE && cell.state !== CellState.RESERVED)) {
                    return false;
                }
            }
        }
        
        // Placement
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                const cell = this.getCell(centerX + dx, centerY + dy);
                if (cell) {
                    cell.state = CellState.BUILDING;
                    cell.entityId = buildingId;
                }
            }
        }
        return true;
    }

    /**
     * Retire un bâtiment
     */
    removeBuilding(buildingId: string): void {
        const latDivisions = Math.floor(this.gridSize / 2);
        for (let y = 0; y < latDivisions; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = this.cells[y][x];
                if (cell.entityId === buildingId) {
                    cell.state = CellState.FREE;
                    cell.entityId = null;
                }
            }
        }
    }

    /**
     * Trouve une position constructible proche d'un point
     */
    findNearestBuildableSpot(x: number, y: number, size: number): { x: number, y: number } | null {
        const maxSearchRadius = Math.min(32, this.gridSize / 4);
        
        // Test du centre d'abord
        if (this.isAreaBuildable(x, y, size)) return { x, y };

        for (let radius = 1; radius < maxSearchRadius; radius++) {
            // Spirale carrée simple (approximation sur sphère)
            for (let i = -radius; i <= radius; i++) {
                // Top & Bottom rows
                if (this.isAreaBuildable(x + i, y - radius, size)) return { x: x + i, y: y - radius };
                if (this.isAreaBuildable(x + i, y + radius, size)) return { x: x + i, y: y + radius };
                // Left & Right columns (excluding corners already checked)
                if (i > -radius && i < radius) {
                    if (this.isAreaBuildable(x - radius, y + i, size)) return { x: x - radius, y: y + i };
                    if (this.isAreaBuildable(x + radius, y + i, size)) return { x: x + radius, y: y + i };
                }
            }
        }
        
        return null;
    }

    // =========================================================================
    // CONVERSION COORDONNÉES
    // =========================================================================

    /**
     * Convertit des coordonnées de grille en position 3D exacte (sur la surface)
     */
    gridToWorld(x: number, y: number): THREE.Vector3 | null {
        const cell = this.getCell(x, y);
        return cell ? cell.worldPosition.clone() : null;
    }

    /**
     * Convertit une position 3D en coordonnées de grille
     * Projette la position sur la sphère unitaire pour trouver lat/long
     */
    worldToGrid(worldPos: THREE.Vector3): { x: number; y: number } {
        // Normaliser pour avoir la direction depuis le centre
        const dir = worldPos.clone().normalize();
        
        // Calculer Lat/Long
        // y = sin(phi) => phi = asin(y)
        const phi = Math.asin(dir.y);
        
        // z = cos(phi) * sin(theta), x = cos(phi) * cos(theta)
        // tan(theta) = z / x => theta = atan2(z, x)
        const theta = Math.atan2(dir.z, dir.x);
        
        // Mapper vers indices grille
        // Theta [-PI, PI] -> [0, 2PI] -> [0, gridSize]
        let u = theta / (Math.PI * 2);
        if (u < 0) u += 1;
        const x = Math.floor(u * this.gridSize) % this.gridSize;
        
        // Phi [-PI/2, PI/2] -> [0, 1] -> [0, latDivisions]
        const latDivisions = Math.floor(this.gridSize / 2);
        const v = (phi + Math.PI / 2) / Math.PI;
        const y = Math.floor(v * latDivisions);
        
        // Clamp y pour rester dans les limites (cas extrêmes pôles)
        const clampedY = Math.max(0, Math.min(latDivisions - 1, y));
        
        return { x, y: clampedY };
    }

    /**
     * "Snap" une position 3D vers le centre de la cellule la plus proche
     */
    snapToGrid(position: THREE.Vector3): THREE.Vector3 {
        const gridPos = this.worldToGrid(position);
        const snapped = this.gridToWorld(gridPos.x, gridPos.y);
        return snapped || position; // Fallback si hors grille (ne devrait pas arriver sur sphère)
    }

    // =========================================================================
    // SERIALISATION
    // =========================================================================

    /**
     * Sérialise la grille (uniquement les modifications)
     */
    serialize(): object {
        const buildings: Array<{ x: number; y: number; entityId: string }> = [];
        const latDivisions = Math.floor(this.gridSize / 2);
        
        for (let y = 0; y < latDivisions; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = this.cells[y][x];
                if (cell.state === CellState.BUILDING && cell.entityId) {
                    // On ne stocke que le coin supérieur gauche (ou centre) de chaque bâtiment
                    // Simplification: on stocke toutes les cellules occupées pour l'instant
                    // Une optimisation serait de ne stocker que l'origine du bâtiment
                    const isOrigin = !buildings.some(b => b.entityId === cell.entityId);
                    if (isOrigin) {
                        buildings.push({ x, y, entityId: cell.entityId });
                    }
                }
            }
        }
        
        return {
            planetSize: this.planetSize,
            seed: this.seed,
            buildings,
            resources: this.resources.map(r => ({
                gridX: r.gridX,
                gridY: r.gridY,
                type: r.resourceType,
                amount: r.amount,
            })),
        };
    }

    /**
     * Dispose des ressources
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
        // Clear arrays
        this.cells = [];
        this.resources = [];
    }
}
