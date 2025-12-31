/**
 * Worker de simulation gérant la logique des unités en arrière-plan.
 * Reçoit un SharedArrayBuffer pour manipuler les données directement.
 *
 * Notes:
 * - `requestAnimationFrame` n'est pas garanti dans les workers; on utilise `setInterval`.
 * - Le mapping des vues est centralisé dans `SharedMemory.createViews`.
 */

import { createViews, BYTES_PER_UNIT } from './SharedMemory';

let buffer: SharedArrayBuffer | null = null;
let maxUnits = 0;
let views: ReturnType<typeof createViews> | null = null;

let tickHandle: number | null = null;

self.onmessage = (e: MessageEvent) => {
    const { type, data } = e.data;
    // Utiliser postMessage console via main thread pour debug
    // eslint-disable-next-line no-console
    console.log('[SimulationWorker] Message reçu:', type);

    if (type === 'INIT') {
        buffer = data.buffer;
        maxUnits = data.maxUnits;

        if (!buffer || maxUnits <= 0) {
            postMessage({ type: 'ERROR', message: 'Invalid INIT payload' });
            return;
        }

        // Créer les vues en accord avec MemoryManager
        views = createViews(buffer as SharedArrayBuffer, maxUnits);

        console.log('[SimulationWorker] Initialisé avec', maxUnits, 'unités');

        // Accuser réception de l'init
        postMessage({ type: 'INIT_ACK', data: { maxUnits } });

        // Lancement de la boucle de simulation (approximativement 60 FPS)
        if (tickHandle !== null) clearInterval(tickHandle);
        const fps = 60;
        tickHandle = setInterval(() => simulate(1 / fps), Math.floor(1000 / fps));
    }
};

function simulate(dt: number) {
    if (!views || !maxUnits) return;

    // Exemple minimal: on parcourt les unités actives.
    const { active } = views;

    for (let i = 0; i < maxUnits; i++) {
        if (active[i] === 1) {
            // TODO: implémenter logique de simulation (mouvement, collisions...)
        }
    }
}

