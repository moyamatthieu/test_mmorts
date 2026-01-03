/**
 * GameEntity.ts
 * 
 * Interface de base pour toutes les entités du jeu (vaisseaux, structures, unités).
 * Chaque entité porte une position hiérarchique et peut exister à différentes échelles.
 */

import { HierarchicalPosition } from './CoordinateSystem';

// =============================================================================
// TYPES D'ENTITÉS
// =============================================================================

/**
 * Catégories principales d'entités
 */
export enum EntityCategory {
    /** Unité mobile (vaisseau, véhicule, infanterie) */
    UNIT = 'unit',
    
    /** Structure fixe (bâtiment, station) */
    STRUCTURE = 'structure',
    
    /** Ressource collectible */
    RESOURCE = 'resource',
    
    /** Projectile/effet temporaire */
    PROJECTILE = 'projectile',
}

/**
 * Types de vaisseaux
 */
export enum ShipType {
    /** Chasseur léger - rapide, fragile */
    FIGHTER = 'fighter',
    
    /** Corvette - polyvalente */
    CORVETTE = 'corvette',
    
    /** Frégate - équilibrée */
    FRIGATE = 'frigate',
    
    /** Destroyer - anti-chasseur */
    DESTROYER = 'destroyer',
    
    /** Croiseur - puissant */
    CRUISER = 'cruiser',
    
    /** Cuirassé - très puissant, lent */
    BATTLESHIP = 'battleship',
    
    /** Cargo - transport de ressources */
    CARGO = 'cargo',
    
    /** Constructeur - construit des structures */
    CONSTRUCTOR = 'constructor',
    
    /** Collecteur - récolte les ressources */
    HARVESTER = 'harvester',
}

/**
 * Types de structures
 */
export enum StructureType {
    // === STRUCTURES ORBITALES ===
    /** Station spatiale - hub principal en orbite */
    SPACE_STATION = 'space_station',
    
    /** Chantier naval - construit des vaisseaux */
    SHIPYARD = 'shipyard',
    
    /** Entrepôt orbital - stockage */
    ORBITAL_DEPOT = 'orbital_depot',
    
    /** Défense orbitale - tourelle */
    ORBITAL_DEFENSE = 'orbital_defense',
    
    /** Porte de saut - voyage interstellaire */
    JUMP_GATE = 'jump_gate',
    
    // === STRUCTURES DE SURFACE ===
    /** Quartier général - bâtiment principal */
    HEADQUARTERS = 'headquarters',
    
    /** Mine - extraction de ressources */
    MINE = 'mine',
    
    /** Raffinerie - traitement des ressources */
    REFINERY = 'refinery',
    
    /** Usine - production */
    FACTORY = 'factory',
    
    /** Générateur - production d'énergie */
    POWER_PLANT = 'power_plant',
    
    /** Caserne - production d'unités terrestres */
    BARRACKS = 'barracks',
    
    /** Tourelle défensive */
    TURRET = 'turret',
    
    /** Spatioport - lancement de vaisseaux depuis la surface */
    SPACEPORT = 'spaceport',
}

// =============================================================================
// INTERFACE PRINCIPALE
// =============================================================================

/**
 * Interface de base pour toutes les entités du jeu
 */
export interface GameEntity {
    /** ID unique global */
    id: string;
    
    /** Catégorie d'entité */
    category: EntityCategory;
    
    /** Type spécifique (ShipType ou StructureType) */
    type: ShipType | StructureType;
    
    /** Nom affiché */
    name: string;
    
    /** ID du joueur propriétaire */
    ownerId: string;
    
    /** Position hiérarchique dans l'univers */
    position: HierarchicalPosition;
    
    /** Points de vie actuels */
    health: number;
    
    /** Points de vie maximum */
    maxHealth: number;
    
    /** Timestamp de création (pour persistance) */
    createdAt: number;
    
    /** Timestamp de dernière mise à jour */
    updatedAt: number;
}

// =============================================================================
// ENTITÉS SPÉCIALISÉES
// =============================================================================

/**
 * Vaisseau / Unité mobile
 */
export interface ShipEntity extends GameEntity {
    category: EntityCategory.UNIT;
    type: ShipType;
    
    /** Vitesse de déplacement (unités/seconde dans l'échelle actuelle) */
    speed: number;
    
    /** Capacité de cargo */
    cargoCapacity: number;
    
    /** Contenu du cargo */
    cargo: Map<string, number>;
    
    /** Destination actuelle (null si stationnaire) */
    destination: HierarchicalPosition | null;
    
    /** ID de la flotte (-1 si solo) */
    fleetId: string | null;
    
    /** Ordres en attente */
    orderQueue: ShipOrder[];
}

/**
 * Types d'ordres pour les vaisseaux
 */
export type ShipOrder = 
    | { type: 'move'; destination: HierarchicalPosition }
    | { type: 'attack'; targetId: string }
    | { type: 'harvest'; resourceId: string }
    | { type: 'build'; structureType: StructureType; location: HierarchicalPosition }
    | { type: 'dock'; stationId: string }
    | { type: 'patrol'; waypoints: HierarchicalPosition[] }
    | { type: 'follow'; targetId: string };

/**
 * Structure fixe
 */
export interface StructureEntity extends GameEntity {
    category: EntityCategory.STRUCTURE;
    type: StructureType;
    
    /** Taille en cases (pour structures de surface) */
    size: { width: number; height: number };
    
    /** Niveau d'amélioration */
    level: number;
    
    /** File de production */
    productionQueue: ProductionItem[];
    
    /** Ressources stockées (pour dépôts/entrepôts) */
    storage: Map<string, number>;
    
    /** Capacité de stockage max */
    storageCapacity: number;
    
    /** Est en construction? */
    isUnderConstruction: boolean;
    
    /** Progression de construction (0-1) */
    constructionProgress: number;
}

/**
 * Item en production
 */
export interface ProductionItem {
    /** Type à produire */
    type: ShipType | StructureType;
    
    /** Temps restant (secondes) */
    remainingTime: number;
    
    /** Temps total */
    totalTime: number;
}

// =============================================================================
// FONCTIONS DE CRÉATION
// =============================================================================

/**
 * Génère un ID unique pour une entité
 */
export function generateEntityId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Crée un vaisseau de base
 */
export function createShip(
    type: ShipType,
    ownerId: string,
    position: HierarchicalPosition,
    name?: string
): ShipEntity {
    const stats = SHIP_STATS[type];
    
    return {
        id: generateEntityId(),
        category: EntityCategory.UNIT,
        type,
        name: name || `${type}-${Date.now() % 1000}`,
        ownerId,
        position,
        health: stats.maxHealth,
        maxHealth: stats.maxHealth,
        speed: stats.speed,
        cargoCapacity: stats.cargoCapacity,
        cargo: new Map(),
        destination: null,
        fleetId: null,
        orderQueue: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

/**
 * Crée une structure de base
 */
export function createStructure(
    type: StructureType,
    ownerId: string,
    position: HierarchicalPosition,
    name?: string
): StructureEntity {
    const stats = STRUCTURE_STATS[type];
    
    return {
        id: generateEntityId(),
        category: EntityCategory.STRUCTURE,
        type,
        name: name || `${type}-${Date.now() % 1000}`,
        ownerId,
        position,
        health: stats.maxHealth,
        maxHealth: stats.maxHealth,
        size: stats.size,
        level: 1,
        productionQueue: [],
        storage: new Map(),
        storageCapacity: stats.storageCapacity,
        isUnderConstruction: true,
        constructionProgress: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

// =============================================================================
// STATISTIQUES PAR TYPE
// =============================================================================

interface ShipStats {
    maxHealth: number;
    speed: number;
    cargoCapacity: number;
    buildTime: number; // secondes
}

export const SHIP_STATS: Record<ShipType, ShipStats> = {
    [ShipType.FIGHTER]: { maxHealth: 50, speed: 10, cargoCapacity: 0, buildTime: 10 },
    [ShipType.CORVETTE]: { maxHealth: 100, speed: 8, cargoCapacity: 10, buildTime: 20 },
    [ShipType.FRIGATE]: { maxHealth: 200, speed: 6, cargoCapacity: 50, buildTime: 40 },
    [ShipType.DESTROYER]: { maxHealth: 300, speed: 5, cargoCapacity: 20, buildTime: 60 },
    [ShipType.CRUISER]: { maxHealth: 500, speed: 4, cargoCapacity: 100, buildTime: 90 },
    [ShipType.BATTLESHIP]: { maxHealth: 1000, speed: 2, cargoCapacity: 200, buildTime: 180 },
    [ShipType.CARGO]: { maxHealth: 150, speed: 4, cargoCapacity: 500, buildTime: 30 },
    [ShipType.CONSTRUCTOR]: { maxHealth: 200, speed: 3, cargoCapacity: 100, buildTime: 45 },
    [ShipType.HARVESTER]: { maxHealth: 100, speed: 5, cargoCapacity: 200, buildTime: 25 },
};

interface StructureStats {
    maxHealth: number;
    size: { width: number; height: number };
    storageCapacity: number;
    buildTime: number; // secondes
    isOrbital: boolean;
}

export const STRUCTURE_STATS: Record<StructureType, StructureStats> = {
    // Orbitales
    [StructureType.SPACE_STATION]: { maxHealth: 2000, size: { width: 1, height: 1 }, storageCapacity: 1000, buildTime: 120, isOrbital: true },
    [StructureType.SHIPYARD]: { maxHealth: 1500, size: { width: 1, height: 1 }, storageCapacity: 500, buildTime: 90, isOrbital: true },
    [StructureType.ORBITAL_DEPOT]: { maxHealth: 500, size: { width: 1, height: 1 }, storageCapacity: 2000, buildTime: 45, isOrbital: true },
    [StructureType.ORBITAL_DEFENSE]: { maxHealth: 300, size: { width: 1, height: 1 }, storageCapacity: 0, buildTime: 30, isOrbital: true },
    [StructureType.JUMP_GATE]: { maxHealth: 3000, size: { width: 1, height: 1 }, storageCapacity: 0, buildTime: 300, isOrbital: true },
    
    // Surface
    [StructureType.HEADQUARTERS]: { maxHealth: 3000, size: { width: 4, height: 4 }, storageCapacity: 500, buildTime: 0, isOrbital: false }, // Gratuit au départ
    [StructureType.MINE]: { maxHealth: 500, size: { width: 2, height: 2 }, storageCapacity: 100, buildTime: 30, isOrbital: false },
    [StructureType.REFINERY]: { maxHealth: 800, size: { width: 3, height: 3 }, storageCapacity: 300, buildTime: 60, isOrbital: false },
    [StructureType.FACTORY]: { maxHealth: 1000, size: { width: 3, height: 3 }, storageCapacity: 200, buildTime: 75, isOrbital: false },
    [StructureType.POWER_PLANT]: { maxHealth: 600, size: { width: 2, height: 2 }, storageCapacity: 0, buildTime: 45, isOrbital: false },
    [StructureType.BARRACKS]: { maxHealth: 500, size: { width: 2, height: 2 }, storageCapacity: 50, buildTime: 40, isOrbital: false },
    [StructureType.TURRET]: { maxHealth: 200, size: { width: 1, height: 1 }, storageCapacity: 0, buildTime: 15, isOrbital: false },
    [StructureType.SPACEPORT]: { maxHealth: 1500, size: { width: 4, height: 4 }, storageCapacity: 200, buildTime: 90, isOrbital: false },
};

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Vérifie si une structure est orbitale
 */
export function isOrbitalStructure(type: StructureType): boolean {
    return STRUCTURE_STATS[type].isOrbital;
}

/**
 * Vérifie si une entité peut voyager entre les systèmes
 */
export function canTravelInterstellar(entity: GameEntity): boolean {
    if (entity.category !== EntityCategory.UNIT) return false;
    const ship = entity as ShipEntity;
    // Seuls certains types peuvent voyager entre systèmes
    return [ShipType.FRIGATE, ShipType.CRUISER, ShipType.BATTLESHIP, ShipType.CARGO].includes(ship.type);
}

/**
 * Vérifie si un vaisseau peut atterrir sur une surface
 */
export function canLandOnSurface(shipType: ShipType): boolean {
    return [ShipType.FIGHTER, ShipType.CORVETTE, ShipType.HARVESTER, ShipType.CONSTRUCTOR].includes(shipType);
}
