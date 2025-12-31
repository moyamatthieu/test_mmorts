# Tech

## Technologies
- TypeScript (mode strict) : [`tsconfig.json`](tsconfig.json:1)
- Vite (dev server / build) : [`vite.config.ts`](vite.config.ts:1)
- Three.js (rendu WebGL) : dépendance `three` dans [`package.json`](package.json:1)
- Web Workers (simulation) : [`src/core/workers/SimulationWorker.ts`](src/core/workers/SimulationWorker.ts:1)
- Mémoire partagée via `SharedArrayBuffer` + `TypedArray` : [`src/core/MemoryManager.ts`](src/core/MemoryManager.ts:1)

## Scripts npm
Définis dans [`package.json`](package.json:1) :
- `npm run dev` : lance [`dev.sh`](dev.sh:1) (wrapper bash pour le dev server)
- `npm run build` : `vite build`
- `npm run preview` : `vite preview`

## Contraintes et pratiques de performance
- Réduire les copies entre threads : partager un buffer et ne transférer que des messages de contrôle (INIT/ACK/erreurs).
- Layout **SoA** (Structure of Arrays) pour la locality cache et un parcours efficace côté worker.
- Rendu de masse via `InstancedMesh` et mise à jour incrémentale des matrices.
- `SharedArrayBuffer` impose COOP/COEP (déjà configuré) : [`vite.config.ts`](vite.config.ts:1).

## Conventions utiles (constaté)
- Le mapping des vues est centralisé (éviter les offsets divergents) : `createViews` dans [`src/core/workers/SharedMemory.ts`](src/core/workers/SharedMemory.ts:1).

