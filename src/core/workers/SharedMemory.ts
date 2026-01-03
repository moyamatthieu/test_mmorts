/**
 * Helper centralisé pour le mapping du SharedArrayBuffer.
 * Définit l'ordre des vues et expose une fonction utilitaire pour créer les TypedArray.
 *
 * Ajouts :
 * - Zone de contrôle (Int32Array) placée au début du buffer pour la synchronisation
 *   inter-threads (phase, version, etc.).
 * - Export `SYNC_FLAGS` : indices dans la zone de contrôle (ex: PHASE = position 0).
 *
 * Remarque : la zone de contrôle est volontairement minimale (2 Int32) pour garder
 * les allocations faibles et l'alignement correct pour Atomics.
 */

/**
 * Nombre d'éléments Int32 réservés pour la zone de contrôle.
 * Index 0 = PHASE, Index 1 = VERSION (ou usage futur).
 */
export const CONTROL_INT32_LENGTH = 2;

/**
 * Indices (positions) dans la zone de contrôle Int32Array.
 * Utiliser `Atomics` sur la vue `control` avec ces indices.
 */
export const SYNC_FLAGS = {
    PHASE: 0,
    VERSION: 1,
} as const;

export const BYTES_PER_UNIT =
    4 * 3 + // posX,posY,posZ -> 3 * Float32 (3 * 4 bytes)
    4 +     // rotation -> Float32
    1 +     // type -> Uint8
    1 +     // owner -> Uint8
    1;      // active -> Uint8

export type SharedViews = {
    // zone de contrôle (Int32Array) utilisée pour Atomics (phase/version...)
    control: Int32Array;
    posX: Float32Array;
    posY: Float32Array;
    posZ: Float32Array;
    rotation: Float32Array;
    type: Uint8Array;
    owner: Uint8Array;
    active: Uint8Array;
};

/**
 * Mappe le SharedArrayBuffer en vues typées.
 * La zone de contrôle est placée en tout début de buffer (offset 0).
 */
export function createViews(buffer: SharedArrayBuffer, maxUnits: number): SharedViews {
    // control zone at the start (Int32Array)
    const control = new Int32Array(buffer, 0, CONTROL_INT32_LENGTH);

    // offset in bytes after control zone
    let offset = CONTROL_INT32_LENGTH * 4;

    const posX = new Float32Array(buffer, offset, maxUnits);
    offset += maxUnits * 4;

    const posY = new Float32Array(buffer, offset, maxUnits);
    offset += maxUnits * 4;

    const posZ = new Float32Array(buffer, offset, maxUnits);
    offset += maxUnits * 4;

    const rotation = new Float32Array(buffer, offset, maxUnits);
    offset += maxUnits * 4;

    const type = new Uint8Array(buffer, offset, maxUnits);
    offset += maxUnits;

    const owner = new Uint8Array(buffer, offset, maxUnits);
    offset += maxUnits;

    const active = new Uint8Array(buffer, offset, maxUnits);

    return { control, posX, posY, posZ, rotation, type, owner, active };
}
