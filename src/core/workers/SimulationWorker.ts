/**
 * Worker de simulation gérant la logique des unités en arrière-plan.
 * Reçoit un SharedArrayBuffer pour manipuler les données directement.
 *
 * Ajouts :
 * - Utilisation d'une zone de contrôle Int32 (views.control) pour signaler
 *   les phases d'écriture via Atomics afin d'éviter les races avec le main thread.
 * - Gestion minimale des erreurs avec postMessage({ type: 'ERROR', message }).
 *
 * Notes:
 * - `requestAnimationFrame` n'est pas garanti dans les workers; on utilise `setInterval`.
 * - Le mapping des vues est centralisé dans `SharedMemory.createViews`.
 */

import { createViews, SYNC_FLAGS } from './SharedMemory';

let buffer: SharedArrayBuffer | null = null;
let maxUnits = 0;
let views: ReturnType<typeof createViews> | null = null;

// Utiliser ReturnType pour gérer la différence Node/Browser
let tickHandle: ReturnType<typeof setInterval> | null = null;

self.onmessage = (e: MessageEvent) => {
    const { type, data } = e.data;
    // eslint-disable-next-line no-console
    console.log('[SimulationWorker] Message reçu:', type);

    if (type === 'INIT') {
        try {
            buffer = data.buffer;
            maxUnits = data.maxUnits;

            if (!buffer || maxUnits <= 0) {
                postMessage({ type: 'ERROR', message: 'Invalid INIT payload' });
                return;
            }

            // Créer les vues en accord avec MemoryManager (inclut `control`)
            views = createViews(buffer as SharedArrayBuffer, maxUnits);

            // Initialiser la zone de contrôle (phase READY = 1)
            // : évite que le main thread interprète des valeurs anciennes
            Atomics.store(views.control, SYNC_FLAGS.PHASE, 1);

            console.log('[SimulationWorker] Initialisé avec', maxUnits, 'unités');

            // Accuser réception de l'init et indiquer que le worker est prêt
            postMessage({ type: 'INIT_ACK', data: { maxUnits } });
            postMessage({ type: 'READY' });

            // Lancement de la boucle de simulation (approximativement 60 FPS)
            if (tickHandle !== null) clearInterval(tickHandle);
            const fps = 60;
            tickHandle = setInterval(() => simulate(1 / fps), Math.floor(1000 / fps));
        } catch (err: any) {
            postMessage({ type: 'ERROR', message: String(err) });
        }
    }
};

function simulate(dt: number) {
    // dt conservé pour future logique de simulation (intégration vitesse / intégration physique).
    void dt;
    if (!views || !maxUnits) return;

    try {
        // Indiquer aux lecteurs qu'on passe en phase d'écriture
        Atomics.store(views.control, SYNC_FLAGS.PHASE, 2); // WRITING

        // Exemple minimal: on parcourt les unités actives.
        const { active } = views;

        for (let i = 0; i < maxUnits; i++) {
            if (active[i] === 1) {
                // TODO: implémenter logique de simulation (mouvement, collisions...)
            }
        }

        // Écriture terminée — passer en phase READY
        Atomics.store(views.control, SYNC_FLAGS.PHASE, 1); // READY
    } catch (err: any) {
        // Signalement d'erreur au main thread
        postMessage({ type: 'ERROR', message: String(err) });
        // Optionnel: stopper la boucle en cas d'erreur critique
        if (tickHandle !== null) {
            clearInterval(tickHandle);
            tickHandle = null;
        }
    }
}

