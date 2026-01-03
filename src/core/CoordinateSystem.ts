/**
 * CoordinateSystem.ts
 * 
 * Système de coordonnées hiérarchique pour le jeu.
 * Chaque niveau a ses propres coordonnées locales.
 * On ne stocke JAMAIS de position absolue - toujours relative au contexte parent.
 */

import * as THREE from 'three';

// =============================================================================
// TYPES DE COORDONNÉES PAR NIVEAU
// =============================================================================

/**
 * Identifiant d'un cluster dans la galaxie
 */
export interface ClusterId {
    x: number; // 0-9
    y: number; // 0-9
    z: number; // 0-9
}

/**
 * Position dans la galaxie (vue GALAXY)
 */
export interface GalaxyPosition {
    /** Cluster contenant l'entité */
    cluster: ClusterId;
    
    /** Index de l'étoile dans le cluster (-1 si en transit interstellaire) */
    starIndex: number;
    
    /** Position locale dans le cluster (pour le rendu/transit) */
    localPosition: THREE.Vector3;
}

/**
 * Position dans un système solaire (vue SYSTEM)
 */
export interface SystemPosition {
    /** Index de l'orbite planétaire (-1 si proche du soleil ou en transit) */
    orbitIndex: number;
    
    /** Angle sur l'orbite en radians (0 = axe X positif) */
    orbitAngle: number;
    
    /** Distance au centre (pour les positions hors orbite standard) */
    distance: number;
}

/**
 * Position en orbite d'une planète (vue ORBIT)
 */
export interface OrbitPosition {
    /** Index de l'anneau orbital (0 = basse orbite, 5 = haute orbite) */
    ring: number;
    
    /** Index du secteur (0-11, sens horaire depuis axe X) */
    sector: number;
    
    /** Sous-position dans le slot (pour les unités mobiles) */
    offset: THREE.Vector3;
}

/**
 * Position sur la surface d'une planète (vue SURFACE)
 */
export interface SurfacePosition {
    /** Coordonnée X sur la grille */
    x: number;
    
    /** Coordonnée Y sur la grille */
    y: number;
    
    /** Altitude (0 = sol, positif = en vol) */
    altitude: number;
}

// =============================================================================
// POSITION COMPLÈTE D'UNE ENTITÉ
// =============================================================================

/**
 * États de voyage possibles pour une entité
 */
export enum TravelState {
    /** Posé sur une surface */
    LANDED = 'landed',
    
    /** En orbite stationnaire (dans un slot) */
    ORBITING = 'orbiting',
    
    /** En vol dans l'atmosphère/basse orbite */
    ATMOSPHERIC = 'atmospheric',
    
    /** En transit dans le système solaire */
    SYSTEM_TRANSIT = 'system_transit',
    
    /** En transit interstellaire */
    INTERSTELLAR = 'interstellar',
}

/**
 * Position hiérarchique complète d'une entité
 * Permet de localiser n'importe quelle entité dans l'univers
 */
export interface HierarchicalPosition {
    /** Position dans la galaxie */
    galaxy: GalaxyPosition;
    
    /** Position dans le système (null si en transit interstellaire) */
    system: SystemPosition | null;
    
    /** Position en orbite (null si pas en orbite) */
    orbit: OrbitPosition | null;
    
    /** Position au sol (null si pas au sol) */
    surface: SurfacePosition | null;
    
    /** État de voyage actuel */
    travelState: TravelState;
}

// =============================================================================
// CONTEXTE DE VUE (ce que le joueur regarde)
// =============================================================================

/**
 * Contexte de navigation - définit ce que le joueur voit actuellement
 */
export interface ViewContext {
    /** Cluster actuellement visible/sélectionné */
    cluster: ClusterId | null;
    
    /** Index de l'étoile (système) visible */
    starIndex: number | null;
    
    /** Index de la planète visible */
    planetIndex: number | null;
}

// =============================================================================
// FONCTIONS DE CRÉATION
// =============================================================================

/**
 * Crée une position galaxie par défaut (au centre)
 */
export function createDefaultGalaxyPosition(): GalaxyPosition {
    return {
        cluster: { x: 5, y: 5, z: 5 },
        starIndex: -1,
        localPosition: new THREE.Vector3(0, 0, 0),
    };
}

/**
 * Crée une position système par défaut (proche du soleil)
 */
export function createDefaultSystemPosition(): SystemPosition {
    return {
        orbitIndex: -1,
        orbitAngle: 0,
        distance: 10,
    };
}

/**
 * Crée une position orbite par défaut (basse orbite, secteur 0)
 */
export function createDefaultOrbitPosition(): OrbitPosition {
    return {
        ring: 0,
        sector: 0,
        offset: new THREE.Vector3(0, 0, 0),
    };
}

/**
 * Crée une position surface par défaut (centre de la carte)
 */
export function createDefaultSurfacePosition(gridSize: number): SurfacePosition {
    return {
        x: gridSize / 2,
        y: gridSize / 2,
        altitude: 0,
    };
}

/**
 * Crée une position hiérarchique complète pour une entité au sol
 */
export function createGroundedPosition(
    cluster: ClusterId,
    starIndex: number,
    planetOrbitIndex: number,
    surfaceX: number,
    surfaceY: number
): HierarchicalPosition {
    return {
        galaxy: {
            cluster,
            starIndex,
            localPosition: new THREE.Vector3(0, 0, 0),
        },
        system: {
            orbitIndex: planetOrbitIndex,
            orbitAngle: 0, // Sera mis à jour par la simulation
            distance: 0,
        },
        orbit: null,
        surface: {
            x: surfaceX,
            y: surfaceY,
            altitude: 0,
        },
        travelState: TravelState.LANDED,
    };
}

/**
 * Crée une position hiérarchique pour une entité en orbite
 */
export function createOrbitingPosition(
    cluster: ClusterId,
    starIndex: number,
    planetOrbitIndex: number,
    ring: number,
    sector: number
): HierarchicalPosition {
    return {
        galaxy: {
            cluster,
            starIndex,
            localPosition: new THREE.Vector3(0, 0, 0),
        },
        system: {
            orbitIndex: planetOrbitIndex,
            orbitAngle: 0,
            distance: 0,
        },
        orbit: {
            ring,
            sector,
            offset: new THREE.Vector3(0, 0, 0),
        },
        surface: null,
        travelState: TravelState.ORBITING,
    };
}

// =============================================================================
// FONCTIONS DE COMPARAISON
// =============================================================================

/**
 * Vérifie si deux positions sont dans le même cluster
 */
export function isSameCluster(a: ClusterId, b: ClusterId): boolean {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}

/**
 * Vérifie si deux positions sont dans le même système
 */
export function isSameSystem(a: HierarchicalPosition, b: HierarchicalPosition): boolean {
    return isSameCluster(a.galaxy.cluster, b.galaxy.cluster) 
        && a.galaxy.starIndex === b.galaxy.starIndex
        && a.galaxy.starIndex !== -1;
}

/**
 * Vérifie si deux positions sont autour de la même planète
 */
export function isSamePlanet(a: HierarchicalPosition, b: HierarchicalPosition): boolean {
    return isSameSystem(a, b) 
        && a.system?.orbitIndex === b.system?.orbitIndex
        && a.system?.orbitIndex !== -1;
}

// =============================================================================
// FONCTIONS DE CONVERSION (pour le rendu)
// =============================================================================

/**
 * Convertit une position système en Vector3 pour le rendu
 */
export function systemPositionToVector3(pos: SystemPosition): THREE.Vector3 {
    const x = Math.cos(pos.orbitAngle) * pos.distance;
    const z = Math.sin(pos.orbitAngle) * pos.distance;
    return new THREE.Vector3(x, 0, z);
}

/**
 * Convertit une position surface en Vector3 (grille 2D -> 3D)
 */
export function surfacePositionToVector3(pos: SurfacePosition, gridSize: number): THREE.Vector3 {
    // Centre la grille autour de (0,0)
    const halfGrid = gridSize / 2;
    return new THREE.Vector3(
        pos.x - halfGrid,
        pos.altitude,
        pos.y - halfGrid
    );
}

/**
 * Génère une clé unique pour identifier une position (pour le stockage)
 */
export function positionToKey(pos: HierarchicalPosition): string {
    const { cluster, starIndex } = pos.galaxy;
    const clusterKey = `${cluster.x}-${cluster.y}-${cluster.z}`;
    
    if (starIndex === -1) {
        return `galaxy:${clusterKey}`;
    }
    
    if (!pos.system || pos.system.orbitIndex === -1) {
        return `system:${clusterKey}:${starIndex}`;
    }
    
    if (pos.orbit) {
        return `orbit:${clusterKey}:${starIndex}:${pos.system.orbitIndex}:${pos.orbit.ring}-${pos.orbit.sector}`;
    }
    
    if (pos.surface) {
        return `surface:${clusterKey}:${starIndex}:${pos.system.orbitIndex}:${pos.surface.x}-${pos.surface.y}`;
    }
    
    return `planet:${clusterKey}:${starIndex}:${pos.system.orbitIndex}`;
}
