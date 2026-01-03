# PEEJS — Context

## Focus actuel
Refactorisation de l'architecture pour une meilleure maintenabilité. Le focus est sur :
- Finaliser le câblage de [`GameManager`](src/game/GameManager.ts:1) avec [`SceneManager`](src/core/SceneManager.ts:1)
- Corriger les erreurs de types dans les fichiers d'intégration (`GameIntegration`, `GameLoop`, `UnitController`)
- Tests et validation de l'intégration complète

## Changements récents (implémentation complète du jeu)

### Phase 1 : Types et structures de données ✅
- [`src/types/GameState.ts`](src/types/GameState.ts:1) : Types enrichis (Resources, Unit avec stats complètes, Player, GameState)
- [`src/types/commands.ts`](src/types/commands.ts:1) : Système de commandes RTS complet (MOVE, ATTACK, PATROL, MINE, BUILD, STOP, FORMATION, CANCEL, WARP)

### Phase 2 : Système d'unités ✅
- [`src/game/units/UnitFactory.ts`](src/game/units/UnitFactory.ts:1) : Factory pattern avec configurations de vaisseaux et coûts de production
- [`src/game/units/UnitBehavior.ts`](src/game/units/UnitBehavior.ts:1) : Machine à états pour comportements (déplacement, attaque, mining, patrol)
- [`src/game/units/UnitController.ts`](src/game/units/UnitController.ts:1) : Orchestrateur existant adapté

### Phase 3 : Économie ✅
- [`src/game/economy/EconomySystem.ts`](src/game/economy/EconomySystem.ts:1) : Gestion ressources, files de production, income passif

### Phase 4 : Combat ✅
- [`src/game/combat/CombatSystem.ts`](src/game/combat/CombatSystem.ts:1) : Système d'armes (BEAM/PROJECTILE/MISSILE), ciblage, dégâts, boucliers

### Phase 5 : Interface utilisateur ✅
- [`src/ui/HUD.ts`](src/ui/HUD.ts:1) : HUD complet (ressources, sélection, minimap, notifications, ordres)
- [`src/ui/SelectionBox.ts`](src/ui/SelectionBox.ts:1) : Box selection avec shift+clic

### Phase 6 : Réseau P2P ✅
- [`src/net/P2PManager.ts`](src/net/P2PManager.ts:1) : Gestionnaire PeerJS avec synchronisation lockstep

### Phase 7 : IA et formations ✅
- [`src/ai/TacticalAI.ts`](src/ai/TacticalAI.ts:1) : IA tactique pour flottes ennemies
- [`src/ai/FormationManager.ts`](src/ai/FormationManager.ts:1) : Formations de flotte (wedge, sphere, wall, claw)

### Phase 8 : Génération procédurale et persistance ✅
- [`src/universe/GalaxyGenerator.ts`](src/universe/GalaxyGenerator.ts:1) : Génération seedée de galaxies (systèmes, planètes, astéroïdes)
- [`src/universe/Persistence.ts`](src/universe/Persistence.ts:1) : Sauvegarde/chargement IndexedDB

### Phase 9 : Rendu ✅
- [`src/entities/ships/ShipRenderer.ts`](src/entities/ships/ShipRenderer.ts:1) : Rendu instancié des vaisseaux par type
- [`src/entities/effects/EffectsManager.ts`](src/entities/effects/EffectsManager.ts:1) : Object pooling pour effets visuels (explosions, lasers, trails)

### Phase 10 : Intégration ✅
- [`src/game/GameManager.ts`](src/game/GameManager.ts:1) : Orchestrateur principal de la boucle de jeu
- [`src/game/GameIntegration.ts`](src/game/GameIntegration.ts:1) : Point d'entrée unifié pour l'intégration

### Phase 11 : Structure du projet ✅

### Phase 12 : Refactorisation Architecture (en cours)
- ✅ [`src/core/InputManager.ts`](src/core/InputManager.ts:1) : Centralise clavier/souris
- ✅ [`src/core/ViewEntitiesManager.ts`](src/core/ViewEntitiesManager.ts:1) : Gère SolarSystem/PlanetSurface selon la vue
- ✅ [`src/core/SceneManager.ts`](src/core/SceneManager.ts:1) : Refactorisé (817 → 482 lignes)
- ✅ [`src/game/GameManager.ts`](src/game/GameManager.ts:1) : Pattern Singleton explicite (~380 lignes)
  - `getInstance()` / `dispose()` pour accès global
  - `setRenderContext(scene, camera)` pour injection du contexte Three.js
  - `update(deltaTime)` propre, appelée depuis SceneManager
  - Suppression duplications (pas de gestion input, pas de boucle animation)
- ✅ [`src/core/SurfaceGrid.ts`](src/core/SurfaceGrid.ts:1) : Grille de construction sphérique
  - Discrétisation Latitude/Longitude
  - Conversion `worldToGrid` / `gridToWorld` avec hauteur physique (`NoiseGenerator`)
  - Gestion occupation et snapping
- ⏳ Corrections types restantes dans `GameIntegration`, `GameLoop`, `UnitController`
- Fichiers index créés pour tous les modules (`src/game/`, `src/ai/`, `src/net/`, `src/ui/`, `src/universe/`, `src/entities/effects/`, `src/entities/ships/`, `src/types/`)

## Structure des modules

```
src/
├── game/
│   ├── units/          # UnitFactory, UnitBehavior, UnitController
│   ├── economy/        # EconomySystem
│   ├── combat/         # CombatSystem
│   ├── GameManager.ts  # Orchestrateur principal
│   ├── GameIntegration.ts
│   └── index.ts
├── ai/
│   ├── TacticalAI.ts
│   ├── FormationManager.ts
│   └── index.ts
├── net/
│   ├── P2PManager.ts
│   └── index.ts
├── ui/
│   ├── HUD.ts
│   ├── SelectionBox.ts
│   ├── CornerUI.ts
│   └── index.ts
├── universe/
│   ├── GalaxyGenerator.ts
│   ├── Persistence.ts
│   └── index.ts
├── entities/
│   ├── ships/          # ShipRenderer
│   └── effects/        # EffectsManager
└── types/
    ├── GameState.ts
    ├── commands.ts
    └── index.ts
```

## Prochaines étapes (concrètes)

### Priorité 1 : Corriger les erreurs de types
1. Corriger [`src/game/GameIntegration.ts`](src/game/GameIntegration.ts:1) pour utiliser les nouvelles API
2. Corriger [`src/game/GameLoop.ts`](src/game/GameLoop.ts:1) pour les types P2PManager
3. Corriger [`src/game/units/UnitController.ts`](src/game/units/UnitController.ts:1) pour utiliser les bons types

### Priorité 2 : Intégration finale
1. Câbler [`GameManager.getInstance()`](src/game/GameManager.ts:1) dans [`src/main.ts`](src/main.ts:1)
2. Appeler `GameManager.getInstance().setRenderContext(scene, camera)` après création SceneManager
3. Appeler `GameManager.getInstance().update(deltaTime)` dans la boucle d'animation

### Priorité 2 : Tests et validation
1. Tester le cycle complet création → sélection → ordres → combat
2. Valider la synchronisation P2P avec plusieurs onglets
3. Vérifier les performances avec 500+ unités

### Priorité 3 : Polish
1. Affiner les effets visuels
2. Améliorer le feedback UI
3. Équilibrer les stats de combat/économie