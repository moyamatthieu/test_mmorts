/**
 * GameScales.ts
 * 
 * Définit toutes les constantes d'échelle du jeu.
 * Principe: chaque niveau a ses propres unités, on ne mélange JAMAIS les échelles.
 * 
 * Hiérarchie des vues:
 * GALAXY → SYSTEM → ORBIT → SURFACE
 */

// =============================================================================
// ÉCHELLE GALAXIE
// =============================================================================

export const GALAXY_SCALE = {
    /** Nombre de clusters par axe (10×10×10 = 1000 clusters) */
    clustersPerAxis: 10,
    
    /** Taille d'un cube de cluster en unités galaxie */
    clusterSize: 10,
    
    /** Nombre d'étoiles par cluster (min-max) */
    starsPerCluster: { min: 5, max: 10 },
    
    /** Espacement minimum entre étoiles dans un cluster */
    minStarSpacing: 1.5,
} as const;

// =============================================================================
// ÉCHELLE SYSTÈME SOLAIRE
// =============================================================================

export const SYSTEM_SCALE = {
    /** Rayon du système solaire (distance max de l'étoile) */
    systemRadius: 100,
    
    /** Rayon visuel de l'étoile */
    starRadius: 5,
    
    /** Distance orbitale de la première planète */
    firstOrbitDistance: 15,
    
    /** Espacement entre les orbites planétaires */
    orbitSpacing: 10,
    
    /** Nombre de planètes par système (min-max) */
    planetsPerSystem: { min: 1, max: 10 },
} as const;

// =============================================================================
// ÉCHELLE PLANÈTE
// =============================================================================

/**
 * Types de planètes avec leurs caractéristiques
 */
export enum PlanetSize {
    ASTEROID = 'asteroid',
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
    GAS_GIANT = 'gas_giant',
}

export interface PlanetSizeConfig {
    /** Rayon visuel de la planète en unités système */
    visualRadius: number;
    
    /** Taille de la grille de surface (côté du carré) */
    surfaceGridSize: number;
    
    /** Nombre de slots orbitaux disponibles */
    orbitalSlots: number;
    
    /** A une surface constructible? */
    hasSurface: boolean;
    
    /** Multiplicateur de ressources */
    resourceMultiplier: number;
}

export const PLANET_SIZES: Record<PlanetSize, PlanetSizeConfig> = {
    [PlanetSize.ASTEROID]: {
        visualRadius: 1,
        surfaceGridSize: 32,
        orbitalSlots: 6,
        hasSurface: true,
        resourceMultiplier: 0.5,
    },
    [PlanetSize.SMALL]: {
        visualRadius: 2,
        surfaceGridSize: 64,
        orbitalSlots: 24,
        hasSurface: true,
        resourceMultiplier: 1.0,
    },
    [PlanetSize.MEDIUM]: {
        visualRadius: 4,
        surfaceGridSize: 128,
        orbitalSlots: 48,
        hasSurface: true,
        resourceMultiplier: 1.5,
    },
    [PlanetSize.LARGE]: {
        visualRadius: 6,
        surfaceGridSize: 256,
        orbitalSlots: 72,
        hasSurface: true,
        resourceMultiplier: 2.0,
    },
    [PlanetSize.GAS_GIANT]: {
        visualRadius: 10,
        surfaceGridSize: 0, // Pas de surface
        orbitalSlots: 96,
        hasSurface: false,
        resourceMultiplier: 1.0, // Ressources orbitales uniquement
    },
} as const;

// =============================================================================
// ÉCHELLE ORBITE
// =============================================================================

export const ORBIT_SCALE = {
    /** Nombre d'anneaux orbitaux (basse à haute orbite) */
    rings: 6,
    
    /** Nombre de secteurs par anneau */
    sectorsPerRing: 12,
    
    /** Distance du premier anneau (multiplicateur du rayon planète) */
    innerOrbitFactor: 1.3,
    
    /** Distance du dernier anneau (multiplicateur du rayon planète) */
    outerOrbitFactor: 2.5,
    
    /** Taille visuelle d'un slot orbital */
    slotSize: 0.5,
} as const;

/**
 * Calcule la position 3D d'un slot orbital
 * @param ring Index de l'anneau (0 = basse orbite)
 * @param sector Index du secteur (0-11)
 * @param planetRadius Rayon de la planète
 * @returns Position relative à la planète
 */
export function getOrbitalSlotPosition(
    ring: number, 
    sector: number, 
    planetRadius: number
): { x: number; y: number; z: number } {
    const { rings, sectorsPerRing, innerOrbitFactor, outerOrbitFactor } = ORBIT_SCALE;
    
    // Interpolation linéaire entre orbite basse et haute
    const orbitRadius = planetRadius * (
        innerOrbitFactor + (outerOrbitFactor - innerOrbitFactor) * (ring / (rings - 1))
    );
    
    // Angle du secteur
    const angle = (sector / sectorsPerRing) * Math.PI * 2;
    
    // Légère inclinaison par anneau pour éviter les chevauchements visuels
    const tilt = (ring / rings) * 0.2;
    
    return {
        x: Math.cos(angle) * orbitRadius,
        y: Math.sin(tilt * Math.PI) * orbitRadius * 0.1,
        z: Math.sin(angle) * orbitRadius,
    };
}

// =============================================================================
// ÉCHELLE SURFACE
// =============================================================================

export const SURFACE_SCALE = {
    /** Taille d'une case de grille en unités de surface (≈ 10m de gameplay) */
    cellSize: 1,
    
    /** Hauteur maximale du terrain */
    maxTerrainHeight: 20,
    
    /** Taille minimale d'un bâtiment (en cases) */
    minBuildingSize: 1,
    
    /** Taille maximale d'un bâtiment (en cases) */
    maxBuildingSize: 8,
} as const;

// =============================================================================
// ÉCHELLE UNITÉS (vaisseaux, etc.)
// =============================================================================

export const UNIT_SCALE = {
    /** Vitesse de base d'un chasseur (unités/seconde en vue surface) */
    fighterSpeed: 5,
    
    /** Vitesse de base d'un croiseur */
    cruiserSpeed: 2,
    
    /** Vitesse de voyage interplanétaire (unités système/seconde) */
    interplanetarySpeed: 10,
    
    /** Vitesse de voyage interstellaire (unités galaxie/seconde) */
    interstellarSpeed: 0.5,
} as const;

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Détermine la taille d'une planète basée sur son index orbital
 * Les planètes proches sont plus petites/rocheuses, les lointaines plus grandes/gazeuses
 */
export function getPlanetSizeFromOrbit(orbitIndex: number, totalPlanets: number): PlanetSize {
    const relativePosition = orbitIndex / Math.max(1, totalPlanets - 1);
    
    if (relativePosition < 0.2) {
        return Math.random() < 0.5 ? PlanetSize.ASTEROID : PlanetSize.SMALL;
    } else if (relativePosition < 0.5) {
        return Math.random() < 0.7 ? PlanetSize.MEDIUM : PlanetSize.SMALL;
    } else if (relativePosition < 0.8) {
        return Math.random() < 0.6 ? PlanetSize.LARGE : PlanetSize.MEDIUM;
    } else {
        return Math.random() < 0.4 ? PlanetSize.GAS_GIANT : PlanetSize.LARGE;
    }
}

/**
 * Détermine la taille de planète de façon déterministe (avec seed)
 */
export function getPlanetSizeFromSeed(seed: number, orbitIndex: number, totalPlanets: number): PlanetSize {
    // Générateur pseudo-aléatoire simple basé sur le seed
    const hash = (seed * 9301 + 49297) % 233280;
    const random = hash / 233280;
    
    const relativePosition = orbitIndex / Math.max(1, totalPlanets - 1);
    
    if (relativePosition < 0.2) {
        return random < 0.5 ? PlanetSize.ASTEROID : PlanetSize.SMALL;
    } else if (relativePosition < 0.5) {
        return random < 0.7 ? PlanetSize.MEDIUM : PlanetSize.SMALL;
    } else if (relativePosition < 0.8) {
        return random < 0.6 ? PlanetSize.LARGE : PlanetSize.MEDIUM;
    } else {
        return random < 0.4 ? PlanetSize.GAS_GIANT : PlanetSize.LARGE;
    }
}
