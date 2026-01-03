# PEEJS — Brief

## Vision (1 phrase)
Prototype de **MMO RTS spatial** en TypeScript/Three.js, avec **navigation fluide sans chargement** (GALAXY → SYSTEM → ORBIT → SURFACE) et **scalabilité** (beaucoup d'unités) via simulation asynchrone.

## Objectifs produit (priorité)
1. Navigation multi-échelle continue (pas d’écran de chargement).
2. RTS lisible : sélection, ordres, déplacement de groupes, combat simple.
3. Multi en **peer-to-peer** (PeerJS) pour prototyper vite la boucle “exploration → expansion → conflit”.
4. Performance : rendu instancié + simulation hors main thread.

## Inspirations (guidelines, pas de copie)
- Homeworld : tactique 3D, flottes/formations, lisibilité des combats, gestion de la distance.
- “Mankind” (référence macro) : progression/économie/contrôle de zones, montée en puissance.

## Scope strict (MVP)
- Vues : GALAXY / SYSTEM / ORBIT / SURFACE + transitions (Enter/Escape + zoom).
- Sélection : système (GALAXY), planète/fleet (SYSTEM), cible caméra (lookAt).
- Unités : déplacement + combat minimal + rendu instancié.
- Réseau P2P : échange d'ordres (commandes) + snapshots ponctuels (prototype).

## Hors scope (pour l’instant)
- Anti-triche “sérieuse”, authoritative server, persistance serveur.
- Diplomatie complexe, marché, crafting, campagne scénarisée.
- Terrain planétaire jouable (RTS au sol) détaillé.

## Contraintes techniques / principes
- KISS/YAGNI : architecture minimale, lisible, sans duplication.
- Source de vérité navigation : `NavigationState` ; ne pas dépendre de handles Three.js instables.
- Simulation hors thread principal quand possible (worker + SharedArrayBuffer).
- Rendu : Three.js via Vite, TypeScript strict.

## Ancrage code existant (référence)
- Runtime + boucle : `SceneManager` / `IUpdatable`.
- Navigation : `NavigationState` / `NavigationManager`.
- Caméra : `CameraManager` (OrbitControls + `flyTo`).
- GALAXY : `ClusterGrid` + `StarField`.
- SYSTEM : `SolarSystem`.
- ORBIT : `ViewEntitiesManager` (construction orbitale).
- SURFACE : `PlanetSurface` (LOD + shader).
- MMO perf : `SimulationWorker` + `MemoryManager` + `UnitManager`.