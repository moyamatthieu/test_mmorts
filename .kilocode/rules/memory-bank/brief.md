## Brief projet (MMORTS / simulation)

Projet: prototype **MMORTS** (simulation/stratégie temps réel massivement multi‑joueurs) orienté **simulation** (entités, grille/cluster, rendu et UI) avec une architecture front (browser) et du calcul déporté via **Web Workers**.

### Stack

- **TypeScript**
- **Vite** (build + dev server)
- **Three.js** (rendu WebGL)
- Calcul asynchrone via **Workers** (voir `src/core/workers/*`)
- Données partagées via **SharedArrayBuffer** (nécessite COOP/COEP)

### Lancer en local (npm)

```bash
npm install
npm run dev
```

Autres commandes utiles:

```bash
npm run build
npm run preview
```

### Objectifs principaux

- Simuler un grand nombre d’unités/objets et leurs interactions de manière performante.
- Séparer clairement **rendu/scene** (main thread) et **simulation** (worker) pour garder l’UI fluide.
- Contrôler la mémoire/partage de données côté worker (buffers/structures partagées) pour éviter les copies.

### Zones de code (où regarder)

- `src/core/` : orchestration runtime (scène, caméra, boucle d’update, mémoire, etc.)
  - `src/core/SceneManager.ts` : point central d’assemblage/gestion de scène.
  - `src/core/MemoryManager.ts` : gestion mémoire/structures pour la simulation.
  - `src/core/workers/*` : workers et mémoire partagée (simulation).
- `src/entities/` : modèle “jeu” (grilles, champs d’étoiles, unités, coordonnées).
- `src/ui/` : UI (widgets/overlays).
