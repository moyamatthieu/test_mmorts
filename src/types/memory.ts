// AUTO: types for worker/main protocol — do not change runtime
/**
 * Définitions types pour la mémoire partagée (SharedArrayBuffer) et le contrat minimal
 * attendu par MemoryManager / SharedMemory helpers.
 *
 * Ce fichier est "types-only" : aucune logique runtime, uniquement interfaces/constantes.
 */

/**
 * Vues typées exposées par createViews(buffer, maxUnits).
 * Doivent correspondre exactement aux vues créées dans src/core/workers/SharedMemory.ts
 */
export interface SharedMemoryViews {
    posX: Float32Array;
    posY: Float32Array;
    posZ: Float32Array;
    rotation: Float32Array;
    type: Uint8Array;
    owner: Uint8Array;
    active: Uint8Array;
}

/**
 * Contrat public minimal pour un gestionnaire de mémoire partagé.
 * Implémentation concrète (MemoryManager) respecte ce contrat.
 */
export interface MemoryManager {
    /**
     * Taille maximale d'unités supportées.
     */
    readonly maxUnits: number;

    /**
     * Buffer alloué (SharedArrayBuffer) — peut être null avant createBuffer.
     */
    readonly buffer: SharedArrayBuffer | null;

    /**
     * Crée et retourne un SharedArrayBuffer dimensionné pour `maxUnits`.
     * Doit être appelé avant createViews.
     */
    createBuffer(maxUnits: number): SharedArrayBuffer;

    /**
     * Mappe `buffer` et renvoie les vues typées (SharedMemoryViews).
     * Appel idempotent possible si la même paire (buffer,maxUnits) est fournie.
     */
    createViews(buffer: SharedArrayBuffer, maxUnits: number): SharedMemoryViews;

    /**
     * Lecture atomique/instantanée des indices d'unités actives.
     * Retourne un tableau de nombres représentant les indices actifs au moment de l'appel.
     * Utilisé par le main thread pour itérer uniquement sur les unités visibles.
     */
    snapshotActiveIndices(): number[];

    /**
     * Libère/cleanup toute ressource si nécessaire.
     */
    dispose(): void;
}

/**
 * Flags de synchronisation simples utilisables dans une zone dédiée du SAB
 * (ex: première cellule d'un Int32Array de contrôle). Valeurs pensées pour Atomics.
 */
export const SYNC_FLAGS = {
    NONE: 0 as const,
    INIT: 1 as const,
    READY: 2 as const,
    ERROR: 4 as const,
} as const;