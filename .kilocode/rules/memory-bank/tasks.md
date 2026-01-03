# PEEJS — Tasks

## Gestion des unités
**But :** Implémenter la création, la sélection, le déplacement et les comportements de base (attaque/défense) des unités, en gardant la logique découplée du rendu et testable.

**Fichiers à modifier/créer :**
- Logique : `src/game/units/`
- Worker : [`src/core/workers/SimulationWorker.ts`](src/core/workers/SimulationWorker.ts:1)
- Rendu instancié : [`src/entities/UnitManager.ts`](src/entities/UnitManager.ts:8)
- Types : [`src/types/trackable-entity.ts`](src/types/trackable-entity.ts:1), [`src/types/GameState.ts`](src/types/GameState.ts:1)
- UI sélection : [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:1)

**Workflow :**
1. Définir les types d’unités et états dans `trackable-entity.ts` et `GameState.ts`.
2. Implémenter la logique de création/suppression et de sélection dans `src/game/units/`.
3. Étendre le worker pour supporter les nouveaux comportements (déplacement, attaque, etc.).
4. Adapter `UnitManager` pour lire les nouveaux états et afficher les unités.
5. Ajouter la sélection d’unités dans l’UI (CornerUI).
6. Tester la logique indépendamment du rendu.

---

## Économie
**But :** Ajouter la gestion des ressources, la production d’unités/structures et les flux économiques simples.

**Fichiers à modifier/créer :**
- Logique : `src/game/economy/`
- Types : [`src/types/GameState.ts`](src/types/GameState.ts:1)
- UI : [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:1)

**Workflow :**
1. Définir les types de ressources et structures dans `GameState.ts`.
2. Implémenter la logique de collecte, production et consommation dans `src/game/economy/`.
3. Intégrer les changements d’état économique dans l’UI.
4. Tester la logique de flux indépendamment du rendu.

---

## Navigation avancée
**But :** Étendre les ordres pour supporter la navigation multi-systèmes, la priorisation et les transitions complexes.

**Fichiers à modifier/créer :**
- Types d’ordres : [`src/types/commands.ts`](src/types/commands.ts:1)
- Gestionnaires : [`src/core/NavigationManager.ts`](src/core/NavigationManager.ts:1), [`src/core/SceneManager.ts`](src/core/SceneManager.ts:17)

**Workflow :**
1. Étendre la structure des ordres dans `commands.ts` pour supporter la navigation avancée.
2. Adapter `NavigationManager` et `SceneManager` pour traiter les nouveaux ordres et transitions.
3. Tester la propagation des ordres et la robustesse des transitions.

---

## Interaction (UI & réseau)
**But :** Enrichir l’interface de sélection/contextuelle, fournir du feedback visuel sur les ordres, et synchroniser les interactions en P2P.

**Fichiers à modifier/créer :**
- UI : [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:1), nouveaux modules dans `src/ui/`
- Feedback visuel : entités concernées (UnitManager, etc.)
- Réseau : [`src/net/`](src/net/:1)

**Workflow :**
1. Ajouter/étendre les modules d’UI contextuelle pour la sélection et les ordres.
2. Intégrer le feedback visuel sur les entités et la scène.
3. Compléter la couche réseau PeerJS pour la synchronisation des ordres et interactions.
4. Tester la cohérence des interactions locales et synchronisées.

---

## Ajouter un niveau de navigation (GALAXY / SYSTEM / PLANET)
**But :** ajouter ou compléter un niveau de navigation en restant DRY, en s’appuyant sur l’état central [`NavigationState`](src/types/NavigationState.ts:57) et en reliant sélection → caméra lookAt → transitions.

### Fichiers à modifier (selon niveau)
- État et types :
  - [`src/types/NavigationState.ts`](src/types/NavigationState.ts:1)
- Gestionnaire d’état :
  - [`src/core/NavigationManager.ts`](src/core/NavigationManager.ts:1)
- Câblage runtime (entrée/sortie, auto-transitions, raycast) :
  - [`src/core/SceneManager.ts`](src/core/SceneManager.ts:1)
- Caméra / transitions / lookAt :
  - [`src/core/CameraManager.ts`](src/core/CameraManager.ts:1)
- Sélection (si logique dédiée) :
  - [`src/core/SelectionManager.ts`](src/core/SelectionManager.ts:1)
- Entités rendues selon vue :
  - GALAXY : [`src/entities/ClusterGrid.ts`](src/entities/ClusterGrid.ts:1), [`src/entities/StarField.ts`](src/entities/StarField.ts:1)
  - SYSTEM : [`src/entities/SolarSystem.ts`](src/entities/SolarSystem.ts:1)
  - PLANET : [`src/entities/PlanetSurface.ts`](src/entities/PlanetSurface.ts:1)
- Seuils/paramètres :
  - [`src/config.ts`](src/config.ts:1) (notamment [`NAVIGATION_CONFIG`](src/config.ts:69))
- UI (aide/indications) :
  - [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:1)

### Invariants à respecter
- **Source de vérité** : vue et sélection courantes dans [`NavigationState`](src/types/NavigationState.ts:57), mutées via [`NavigationManager`](src/core/NavigationManager.ts:6).
- **Références stables** : privilégier `SystemReference.metadata` (voir commentaires de [`SystemReference`](src/types/NavigationState.ts:13)) ; `sunMesh/pickMesh` sont runtime et peuvent devenir invalides.
- **Contrôles** :
  - **Enter** : entrer (GALAXY→SYSTEM, puis SYSTEM→PLANET si planète sélectionnée).
  - **Escape** : sortir (PLANET→SYSTEM, puis SYSTEM→GALAXY).
  - **Zoom in/out** : molette OrbitControls (cf. [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:105)).
- **Caméra** :
  - La sélection doit alimenter `lookAt` via [`CameraManager.setTarget()`](src/core/CameraManager.ts:236).
  - Les transitions doivent passer par [`CameraManager.flyTo()`](src/core/CameraManager.ts:266) (avec garde-fou [`CameraManager.isTransitioning()`](src/core/CameraManager.ts:179)).

### Workflow (pas à pas)
1. **Définir le nouvel état minimal**
   - Ajouter/valider la vue cible dans [`ViewMode`](src/types/NavigationState.ts:7) et le sous-état requis (ex: `currentPlanet`) dans [`NavigationState`](src/types/NavigationState.ts:57).

2. **Ajouter les transitions d’état**
   - Implémenter (ou compléter) `enterX/exitX` dans [`NavigationManager`](src/core/NavigationManager.ts:6) sur le modèle existant :
     - [`enterSystem()`](src/core/NavigationManager.ts:87) / [`exitSystem()`](src/core/NavigationManager.ts:136)
     - [`enterPlanet()`](src/core/NavigationManager.ts:163) / [`exitPlanet()`](src/core/NavigationManager.ts:191)

3. **Brancher la sélection pour produire une cible de navigation**
   - GALAXY : construire une `SystemReference` via [`ClusterGrid.getSystemReference()`](src/entities/ClusterGrid.ts:173), puis pousser via [`NavigationManager.setGalaxySelection()`](src/core/NavigationManager.ts:40).
   - SYSTEM : utiliser l’identifiant `mesh.userData.planetId` (créé dans [`SolarSystem.generatePlanets()`](src/entities/SolarSystem.ts:103)) pour constituer une `PlanetReference` (structure dans [`src/types/NavigationState.ts`](src/types/NavigationState.ts:33)).

4. **Relier sélection → caméra lookAt**
   - À la sélection, appeler [`CameraManager.setTarget()`](src/core/CameraManager.ts:236) sur la position de l’objet sélectionné (étoile/planète).
   - Conserver l’affichage de sélection existant (anneau) :
     - Soleil galaxie : [`ClusterGrid.selectSun()`](src/entities/ClusterGrid.ts:271) → [`SelectionRing`](src/entities/SelectionRing.ts:3)
     - Système : anneaux dans [`SolarSystem`](src/entities/SolarSystem.ts:16) (même primitive [`SelectionRing`](src/entities/SelectionRing.ts:3))

5. **Rendre la bonne entité selon la vue**
   - Dans [`SceneManager`](src/core/SceneManager.ts:1), afficher/masquer les entités (ou switcher scene graph) en fonction de `NavigationState.currentView`.
   - Éviter la duplication : une seule source de rendu par vue, pas de copies de logique de sélection.

6. **Câbler Enter/Escape**
   - Dans [`SceneManager`](src/core/SceneManager.ts:1), faire pointer Enter/Escape vers les handlers de transition existants (ex: [`SceneManager.handleEnterSystem()`](src/core/SceneManager.ts:364), [`SceneManager.handleExitSystem()`](src/core/SceneManager.ts:448)) et ajouter l’équivalent SYSTEM↔PLANET quand prêt.

7. **Auto-transitions (zoom)**
   - Utiliser [`SceneManager.checkAutoTransitions()`](src/core/SceneManager.ts:479) et les seuils dans [`NAVIGATION_CONFIG`](src/config.ts:69) :
     - entrée système : distance < optimalDistance * factor
     - sortie système : distance > optimalDistance * factor
   - Garder le garde-fou `CameraManager.isTransitioning()` pour éviter les oscillations durant un `flyTo`.

8. **Mettre à jour l’aide UI (si nécessaire)**
   - Ajuster la section navigation dans [`src/ui/CornerUI.ts`](src/ui/CornerUI.ts:105) si un nouveau raccourci ou comportement est ajouté.

### “Done” (critères de fin)
- La sélection met à jour à la fois :
  - la cible de navigation (via [`NavigationManager`](src/core/NavigationManager.ts:6))
  - le lookAt caméra (via [`CameraManager.setTarget()`](src/core/CameraManager.ts:236))
- Enter/Escape déclenchent des transitions cohérentes sans écran de chargement.
- Les auto-transitions par zoom respectent [`NAVIGATION_CONFIG`](src/config.ts:69) et ne s’activent pas pendant un `flyTo`.

## Introduire le P2P (PeerJS) via commandes + snapshots
**But :** prototyper le multi sans coupler réseau ↔ rendu, et garder une simulation scalable.

### Fichiers à créer/modifier (cible)
- Types commandes : [`src/types/commands.ts`](src/types/commands.ts:1)
- Couche réseau : [`src/net/`](src/net/:1) (transport PeerJS + messages)
- Worker protocol (si extension snapshots/ordres) : [`src/types/worker-protocol.ts`](src/types/worker-protocol.ts:1)
- Orchestration runtime (injection commandes) : [`SceneManager`](src/core/SceneManager.ts:1) / [`NavigationManager`](src/core/NavigationManager.ts:1)

### Règles (KISS)
- Le réseau échange des **ordres** (commandes) en priorité, pas des états complets.
- Snapshots uniquement pour bootstrap/re-sync.
- Autorité prototype à choisir (host ou “par système”) avant de coder la synchronisation.