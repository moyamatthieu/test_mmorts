// AUTO: types for worker/main protocol — do not change runtime
# Contrats types (résumé)

Ce court document explique l'intention et l'usage des définitions types-only fournies dans ce dossier.

## But
- Stabiliser le protocole main ↔ worker via des types explicites.
- Permettre au compilateur TypeScript et aux tests types-only d'assurer la conformité sans modifier la logique runtime.

## Fichiers clés
- [`src/types/worker-protocol.ts`](src/types/worker-protocol.ts:1)
  - Déclare `WorkerInMessage`, `WorkerOutMessage`, `WorkerMessageType` et des gardes (`isWorkerInMessage`, `isWorkerOutMessage`).
  - Usage: validation légère des messages postMessage avant consommation.

- [`src/types/memory.ts`](src/types/memory.ts:1)
  - Déclare `SharedMemoryViews`, `MemoryManager` (contrat minimal) et `SYNC_FLAGS`.
  - Usage: fournir un contrat clair pour `MemoryManager` et les helpers qui créent/consomment les vues typées.

## Exemple d'usage (types-only)
```ts
// TypeScript
import type { WorkerInMessage } from './worker-protocol';
import type { SharedMemoryViews } from './memory';

function handle(msg: unknown) {
  if (isWorkerInMessage(msg)) {
    if (msg.type === 'INIT') {
      const { buffer, maxUnits } = msg.data;
      // passer à MemoryManager.createViews(buffer, maxUnits) — types garantis
    }
  }
}
```

## ANNO
- Ces fichiers sont conçus pour être non-invasifs : aucune modification runtime.
- Toute évolution du layout SoA (ordre/typage des vues) doit être synchronisée entre `src/core/workers/SharedMemory.ts` et `src/types/memory.ts`.