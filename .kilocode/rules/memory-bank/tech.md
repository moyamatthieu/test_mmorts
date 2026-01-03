# PEEJS — Tech

## Stack Frontend
- **Langage** : TypeScript (strict) — [`tsconfig.json`](tsconfig.json:1)
- **Bundler/dev server** : Vite — [`package.json`](package.json:1), [`vite.config.ts`](vite.config.ts:1)
- **Rendu 3D** : Three.js (r167+) — dépendance [`three`](package.json:13)
- **WebGL** : WebGL 2.0
- **Web Workers** : Threading pour simulation

## Stack Networking (Cible)
- **PeerJS** 1.5+ : WebRTC wrapper pour P2P
- **Socket.io** : Signaling server (connexion initiale)
- **MessagePack** : Sérialisation binaire (compact vs JSON)
- **WebRTC Data Channels** : Communication P2P directe
- **Topology** : Mesh (chaque joueur connecté aux autres, max ~8 joueurs)

## Stack Persistence (Cible)
- **IndexedDB** : Stockage local (sauvegarde joueur, galaxie)
- **Firebase** (optionnel) : Synchronisation cloud
- **Protobuf** (optionnel) : Sérialisation de schémas

## Commandes (dev)
Définies dans [`package.json`](package.json:6) :
- Dev server : `npm run dev` (Vite port 5173)
- Build : `npm run build`
- Preview : `npm run preview`
- Lint : `npm run lint`
- Format : `npm run format`

## Outils de Développement (Cible)
- **ESLint** + **Prettier** : Qualité et formatage du code
- **Vitest** : Tests unitaires
- **Playwright** : Tests end-to-end
- **Docker** : Déploiement signaling server

## Contraintes Web Workers + SharedArrayBuffer (COOP/COEP)
- Le projet configure les en-têtes nécessaires à l’isolation cross-origin pour activer `SharedArrayBuffer` :
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
  Voir [`vite.config.ts`](vite.config.ts:16) (section `server.headers`).

## Patterns perfs : simulation vs rendu
- Simulation hors main thread :
  - Worker : [`src/core/workers/SimulationWorker.ts`](src/core/workers/SimulationWorker.ts:1)
  - Protocol minimal : messages `INIT/INIT_ACK/ERROR/...` — [`src/types/worker-protocol.ts`](src/types/worker-protocol.ts:14)
- Mémoire partagée (SoA) :
  - Allocation et exposition des vues typées : [`src/core/MemoryManager.ts`](src/core/MemoryManager.ts:11)
  - Mapping centralisé des vues dans le `SharedArrayBuffer` : [`createViews()`](src/core/workers/SharedMemory.ts:52)
  - Synchronisation minimale via `Atomics` sur une zone `Int32Array` (`SYNC_FLAGS.PHASE`) : [`SYNC_FLAGS`](src/core/workers/SharedMemory.ts:24), usage dans [`SimulationWorker.simulate()`](src/core/workers/SimulationWorker.ts:61)
- Rendu instancié (scalable unités) :
  - Lecture `posX/posY/posZ/active` et mise à jour `THREE.InstancedMesh` : [`src/entities/UnitManager.ts`](src/entities/UnitManager.ts:8)

## Patterns navigation/caméra (runtime)
- Contrôles caméra : `OrbitControls` + déplacements clavier — [`src/core/CameraManager.ts`](src/core/CameraManager.ts:1)
- Transitions caméra (sans chargement) : [`CameraManager.flyTo()`](src/core/CameraManager.ts:266)
- Auto-transitions basées sur la distance (zoom) : [`SceneManager.checkAutoTransitions()`](src/core/SceneManager.ts:479) et config [`NAVIGATION_CONFIG`](src/config.ts:69)

## Géométrie planète : LOD + shader procédural
- LOD `THREE.LOD` + matériau `ShaderMaterial` procédural : [`src/entities/PlanetSurface.ts`](src/entities/PlanetSurface.ts:27)
- **Cohérence CPU/GPU** : Implémentation TypeScript stricte du Simplex Noise 3D (Ashima Arts) et FBM dans [`src/utils/NoiseGenerator.ts`](src/utils/NoiseGenerator.ts:1) pour garantir que la hauteur physique (raycast, placement) correspond exactement au rendu visuel (vertex shader).

## Métriques Performance Cibles
- **FPS** : 60 constant (desktop), 30+ (mobile)
- **Network Latency** : <100ms P2P
- **Max Units** : 500+ simultanées
- **Max Players** : 8-16 par match
- **Galaxy Size** : 1000+ systèmes stellaires
- **Load Time** : <5s initial, <1s transitions

## Optimisations Techniques Prévues
### Rendu
- **Level of Detail (LOD)** : Meshes simplifiés à distance
- **Instancing** : Vaisseaux identiques → un seul draw call
- **Frustum Culling** : Ne rendre que ce qui est visible
- **Octree** : Spatial partitioning pour collisions

### Networking
- **Delta Compression** : Envoyer uniquement les changements
- **Interest Management** : Sync seulement objets proches
- **Prediction + Reconciliation** : Lag compensation
- **Binary Protocol** : MessagePack au lieu de JSON
- **Lockstep** : Synchronisation déterministe (frames)

### Mémoire
- **Object Pooling** : Réutiliser projectiles/effets
- **Web Workers** : Simulation physique hors main thread (déjà implémenté)
- **Lazy Loading** : Charger systèmes solaires à la demande