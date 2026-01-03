// AUTO: types for worker/main protocol — do not change runtime
/**
 * Contrats types pour les messages échangés entre le main thread et le worker.
 * Fichier strictement "types-only" + guards minimaux pour faciliter la validation lors du développement.
 *
 * Export named:
 * - WorkerMessageType
 * - WorkerInMessage
 * - WorkerOutMessage
 * - isWorkerInMessage
 * - isWorkerOutMessage
 */

export type WorkerMessageType =
    | 'INIT'
    | 'INIT_ACK'
    | 'ERROR'
    | 'START'
    | 'STOP'
    | 'PING'
    | 'DEBUG';

/**
 * Payload envoyé avec le message `INIT` depuis le main thread vers le worker.
 * Le buffer est un SharedArrayBuffer alloué par MemoryManager.
 */
export interface InitPayload {
    buffer: SharedArrayBuffer;
    maxUnits: number;
}

/**
 * Messages adressés AU WORKER (incoming).
 * - `INIT` : initialisation (buffer + taille maximale)
 * - `START`/`STOP` : contrôle simple de la boucle de simulation
 * - `PING` : ping de debug/santé
 */
export type WorkerInMessage =
    | { type: 'INIT'; data: InitPayload }
    | { type: 'START' }
    | { type: 'STOP' }
    | { type: 'PING' };

/**
 * Messages émis PAR LE WORKER (outgoing).
 * - `INIT_ACK` : accusé d'initialisation
 * - `ERROR` : erreur fatale/validation
 * - `DEBUG` : messages courts de debug (non critiques)
 */
export type WorkerOutMessage =
    | { type: 'INIT_ACK'; data: { maxUnits: number } }
    | { type: 'ERROR'; message: string }
    | { type: 'DEBUG'; message: string };

/**
 * Type guard basique pour WorkerInMessage.
 * Ces guards sont volontairement conservateurs (éviter throw) et ne remplacent pas des validations approfondies.
 */
export function isWorkerInMessage(v: unknown): v is WorkerInMessage {
    if (!v || typeof v !== 'object') return false;
    const t = (v as any).type;
    if (t === 'INIT') {
        const data = (v as any).data;
        return (
            !!data &&
            typeof data.maxUnits === 'number' &&
            // SharedArrayBuffer may not exist in some test envs; check existence first
            (typeof SharedArrayBuffer === 'function'
                ? data.buffer instanceof SharedArrayBuffer
                : !!data.buffer)
        );
    }
    return t === 'START' || t === 'STOP' || t === 'PING';
}

/**
 * Type guard pour WorkerOutMessage.
 */
export function isWorkerOutMessage(v: unknown): v is WorkerOutMessage {
    if (!v || typeof v !== 'object') return false;
    const t = (v as any).type;
    if (t === 'INIT_ACK') {
        const data = (v as any).data;
        return !!data && typeof data.maxUnits === 'number';
    }
    if (t === 'ERROR' || t === 'DEBUG') {
        return typeof (v as any).message === 'string';
    }
    return false;
}