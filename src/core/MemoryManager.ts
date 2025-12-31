/**
 * Gère la mémoire partagée pour les unités en utilisant une structure SoA (Structure of Arrays).
 * Cette approche est optimisée pour le cache CPU et facilite le traitement parallèle via WebWorkers.
 */
import { BYTES_PER_UNIT, createViews } from './workers/SharedMemory';

export class MemoryManager {
    public readonly buffer: SharedArrayBuffer;
    public readonly maxUnits: number;

    // Vues typées pour accéder aux données
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
        
        // Calcul de la taille totale nécessaire
        const totalSize = maxUnits * BYTES_PER_UNIT;
        try {
            this.buffer = new SharedArrayBuffer(totalSize);
            console.log('[MemoryManager] SharedArrayBuffer créé avec succès. Taille:', totalSize);
        } catch (e) {
            console.error('[MemoryManager] Erreur lors de la création de SharedArrayBuffer:', e);
            throw e;
        }

        // Créer les vues via le helper centralisé
        const views = createViews(this.buffer, maxUnits);
        this.posX = views.posX;
        this.posY = views.posY;
        this.posZ = views.posZ;
        this.rotation = views.rotation;
        this.type = views.type;
        this.owner = views.owner;
        this.active = views.active;
    }
}
