/**
 * Configuration générale de l'application MMORTS
 */

// Test hot reload - nouvelle constante
export const APP_VERSION = '1.0.0-hot-reload-test';

export const CONFIG = {
    debug: true,
    maxUnits: 1000,
    enableWorkers: true
};

// Configuration de la grille de cubes
export const GRID_CONFIG = {
    /** Nombre de cubes sur l'axe X */
    cubesX: 10,
    /** Nombre de cubes sur l'axe Y (hauteur) */
    cubesY: 1,
    /** Nombre de cubes sur l'axe Z */
    cubesZ: 10,
};

// Configuration du mode debug
export const DEBUG_CONFIG = {
    /** Afficher les pick meshes (cubes de sélection invisibles) */
    showPickMeshes: false,
};

// Configuration du style visuel
export const VISUAL_CONFIG = {
    /** Opacité des cubes non-actifs (0.0 = invisible, 1.0 = opaque) */
    inactiveCubeOpacity: 0.3,
    /** Opacité des cubes actifs (hover ou sélection) */
    activeCubeOpacity: 1.0,
};

// Configuration de la caméra
export const CAMERA_CONFIG = {
    /** Position initiale de la caméra (X, Y, Z) */
    initialPosition: {
        x: -12,
        y: 12,
        z: 0,
    },
    /** Point ciblé par la caméra (X, Y, Z) */
    lookAt: {
        x: 0,
        y: 0,
        z: 0,
    },
    /** Field of view */
    fov: 60,
    /** Distance minimale de zoom */
    minDistance: 0.5,
    /** Distance maximale de zoom */
    maxDistance: 20,
    /** Vitesse de déplacement avec WASD */
    moveSpeed: 0.5,
};

// Configuration de la simulation
export const SIMULATION_CONFIG = {
    /** Nombre maximum d'unités dans la simulation */
    maxUnits: 10000,
};

// Configuration de la navigation par zoom
export const NAVIGATION_CONFIG = {
    /** 
     * Distance d'entrée dans un système solaire (facteur de optimalDistance)
     * Ex: 0.5 = on entre quand distance < 50% de optimalDistance
     */
    systemEnterDistanceFactor: 0.5,
    
    /** 
     * Distance de sortie d'un système solaire (facteur de optimalDistance)
     * Ex: 2.5 = on sort quand distance > 250% de optimalDistance
     */
    systemExitDistanceFactor: 2.5,
    
    /** 
     * Distance d'entrée dans une planète (basée sur le rayon de la planète)
     * Ex: 8.0 = on entre quand distance < 8 * rayon de la planète
     * Note: les planètes ont un rayon de 0.02-0.07, donc seuil = 0.16-0.56 unités
     */
    planetEnterDistanceFactor: 8.0,
    
    /** 
     * Distance de sortie d'une planète (basée sur le rayon de la planète)
     * Ex: 15.0 = on sort quand distance > 15 * rayon de la planète
     */
    planetExitDistanceFactor: 15.0,
    
    /**
     * Délai minimum entre deux transitions automatiques (ms)
     * Évite les oscillations rapides entre états
     */
    transitionCooldown: 500,
    
    /**
     * Distance de la caméra en vue PLANET
     */
    planetViewDistance: 50,
    
    /**
     * Distance de la caméra en vue SYSTEM
     */
    systemViewDistance: 200,
};
