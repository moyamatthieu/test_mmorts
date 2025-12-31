/**
 * Helper centralisé pour le mapping du SharedArrayBuffer.
 * Définit l'ordre des vues et expose une fonction utilitaire pour créer les TypedArray.
 */
export const BYTES_PER_UNIT =
    4 * 3 + // posX,posY,posZ -> 3 * Float32
    4 +     // rotation -> Float32
    1 +     // type -> Uint8
    1 +     // owner -> Uint8
    1;      // active -> Uint8

export type SharedViews = {
    posX: Float32Array;
    posY: Float32Array;
    posZ: Float32Array;
    rotation: Float32Array;
    type: Uint8Array;
    owner: Uint8Array;
    active: Uint8Array;
};

export function createViews(buffer: SharedArrayBuffer, maxUnits: number): SharedViews {
    let offset = 0;

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

    return { posX, posY, posZ, rotation, type, owner, active };
}
