/**
 * Configuration globale de l'application
 */

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
