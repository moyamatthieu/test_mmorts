/**
 * Gère la mémoire partagée pour les unités en utilisant une structure SoA (Structure of Arrays).
 * Cette approche est optimisée pour le cache CPU et facilite le traitement parallèle via WebWorkers.
 *
 * Modification : réserve une zone de contrôle (Int32Array) au début du SAB pour la
 * synchronisation atomique entre main thread et worker.
 */

import { BYTES_PER_UNIT, createViews, CONTROL_INT32_LENGTH } from './workers/SharedMemory';

export class MemoryManager {
    public readonly buffer: SharedArrayBuffer;
    public readonly maxUnits: number;

    // Zone de contrôle exposée (Int32Array) et vues typées pour accéder aux données
    public readonly control: Int32Array;
    public readonly posX: Float32Array;
    public readonly posY: Float32Array;
    public readonly posZ: Float32Array;
    public readonly rotation: Float32Array;
    public readonly type: Uint8Array;
    public readonly owner: Uint8Array;
    public readonly active: Uint8Array;

    constructor(maxUnits: number = 10000) {
        console.log('[MemoryManager] Initialisation...');
        this.maxUnits = maxUnits;

        // Réserver la zone de contrôle (taille alignée Int32)
        const controlBytes = CONTROL_INT32_LENGTH * 4;

        // Calcul de la taille totale nécessaire (contrôle + données par unité)
        const totalSize = controlBytes + maxUnits * BYTES_PER_UNIT;
        try {
            this.buffer = new SharedArrayBuffer(totalSize);
            console.log('[MemoryManager] SharedArrayBuffer créé avec succès. Taille:', totalSize);
        } catch (e) {
            console.error('[MemoryManager] Erreur lors de la création de SharedArrayBuffer:', e);
            throw e;
        }

        // Créer les vues via le helper centralisé (inclut maintenant `control`)
        const views = createViews(this.buffer, maxUnits);
        this.control = views.control;
        this.posX = views.posX;
        this.posY = views.posY;
        this.posZ = views.posZ;
        this.rotation = views.rotation;
        this.type = views.type;
        this.owner = views.owner;
        this.active = views.active;
    }
}
