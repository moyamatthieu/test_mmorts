# Audit Navigation Multi-Échelle PEEJS

## [Memory Bank: Active]

## 1. État Actuel (Analyse Fichiers Clés)

### NavigationState.ts
- [`ViewMode`](src/types/NavigationState.ts:14) : `'GALAXY' | 'SYSTEM' | 'PLANET'` → **Incomplet** (manque `'ORBIT' | 'SURFACE'` utilisés dans code).
- Interfaces : `SystemReference`, `PlanetReference`, `NavigationState` OK (currentOptimalDistance présent).
- **Problème** : Incohérence types/code ; étendre ViewMode.

### NavigationManager.ts
- Support complet : `setGalaxySelection`, `enterSystem/exitSystem`, `enterOrbit/exitOrbit`, `enterSurface/exitSurface`, `setSystemSelection`.
- currentOptimalDistance mise à jour par vue (système, orbite=4*radius, surface=1.5*radius).
- Notifications `onViewChange`.
- **État** : ✅ Fonctionnel pour 5 vues.

### SceneManager.ts
- Input : Enter/Escape → `handleEnter/handleEscape` dispatch vers `enterSystem/enterOrbit/enterSurface` etc.
- Raycast/clic : GALAXY (`ClusterGrid`), SYSTEM (`SolarSystem` planètes avec `planetId`).
- Dblclick : Entrée directe (sélection + enter).
- `TransitionManager` pour flyTo, `ViewEntitiesManager` pour switch entités.
- Boucle : `sceneOrchestrator.update()` (auto-transitions).
- **Problème** : Pas de raycast ORBIT/SURFACE ; trackPlanet seulement SYSTEM.

### ViewEntitiesManager.ts
- `setView(view, navState)` : Visibilité + lazy loading/dispose.
  - GALAXY : galaxyGroup.
  - SYSTEM : SolarSystem.
  - ORBIT : OrbitView + SolarSystem bg.
  - SURFACE : PlanetSurface + SolarSystem bg.
- `prepareSolarSystem` pour preview.
- **État** : ✅ Complet, sphérique stricte, LOD PlanetSurface.

### TransitionManager.ts
- flyTo + callbacks pour **toutes** transitions (GALAXY↔SYSTEM↔ORBIT↔SURFACE).
- Cooldown 1s anti-oscillation.
- Utilise `NAVIGATION_CONFIG.systemEnter/ExitDistanceFactor`.
- **Problème** : Seuils ORBIT/SURFACE à ajouter/ajuster.

### CameraManager.ts
- `flyTo(target, distance)`, `panTo(target)`, `setTarget`, `trackPlanet(callback)`.
- `isTransitioning()` garde-fou.
- OrbitControls + ZQSD.
- **État** : ✅ Robuste.

### Entités
- [`ClusterGrid`](src/entities/ClusterGrid.ts) : Sélection soleils/cubes, `getSystemReference`.
- [`SolarSystem`](src/entities/SolarSystem.ts) : Planètes orbitantes, `planetId`, selectPlanet(anneau).
- [`PlanetSurface`](src/entities/PlanetSurface.ts) : LOD shader procédural sphérique.
- [`OrbitView`](src/views/OrbitView.ts) : Planète + [`OrbitalGrid`](src/core/OrbitalGrid.ts) slots.
- [`SurfaceGrid`](src/core/SurfaceGrid.ts) : Grille 2D RTS terrain procédural.

## 2. Problèmes Précis Identifiés

1. **Types** : ViewMode incomplet → Erreurs TS potentielles.
2. **Raycast ORBIT/SURFACE** : Absent dans SceneManager.onClick (seulement GALAXY/SYSTEM).
3. **Auto-transitions** : Seuils ORBIT→SURFACE, SURFACE→ORBIT à définir (SceneOrchestrator non lu, mais via currentOptimalDistance).
4. **Sélection ORBIT/SURFACE** : Pas de lookAt/setTarget ; pas de règles métier (slots OrbitalGrid/SurfaceGrid).
5. **NAVIGATION_CONFIG** : Seuils système OK, ajouter orbitEnter/Exit, surfaceEnter/Exit factors + cooldowns.
6. **Intégration UI** : HUD log messages OK, mais minimap/zoom indicators à adapter.
7. **Robustesse** : Handles Three.js optionnels (metadata prioritaire) respectés.

## 3. Diagramme Flux Navigation Complet

```mermaid
flowchart TD
    GALAXY[Vue GALAXY<br/>ClusterGrid + StarField] -->|Enter / Dblclick Soleil| SYSTEM[Vue SYSTEM<br/>SolarSystem]
    SYSTEM -->|Enter / Dblclick Planète| ORBIT[Vue ORBIT<br/>OrbitView + SolarSystem bg]
    ORBIT -->|Enter| SURFACE[Vue SURFACE<br/>PlanetSurface + SolarSystem bg]
    
    SURFACE -->|Escape| ORBIT
    ORBIT -->|Escape| SYSTEM
    SYSTEM -->|Escape| GALAXY
    
    subgraph Sélection
        GALAXY_click[Clic Soleil/Cube] --> setGalaxySelection
        SYSTEM_click[Clic Planète] --> setSystemSelection + trackPlanet
    end
    
    subgraph Transitions
        flyTo[CameraManager.flyTo<br/>+ TransitionManager]
        autoZoom[Auto-transitions<br/>SceneOrchestrator]
    end
    
    setGalaxySelection --> flyTo
    setSystemSelection --> flyTo
    NAV_Zoom[Zoom < optimalDist] --> autoZoom
```

## 4. Fichiers à Modifier + Changements

| Fichier | Changements |
|---------|-------------|
| [`src/types/NavigationState.ts`](src/types/NavigationState.ts:14) | Étendre `ViewMode` : `| 'ORBIT' | 'SURFACE'`. |
| [`src/core/SceneManager.ts`](src/core/SceneManager.ts:342) | Ajouter raycast ORBIT (`OrbitView.getSlotMeshes()`) / SURFACE (`SurfaceGrid`).<br/>handleClick pour sélection slots/cases + setTarget. |
| [`src/core/SceneOrchestrator.ts`](src/core/SceneOrchestrator.ts) | Ajouter seuils ORBIT/SURFACE dans `checkAutoTransitions` (lire fichier si besoin). |
| [`src/config.ts`](src/config.ts:69) | Ajouter `orbitEnterDistanceFactor: 0.8`, `orbitExit: 1.2`, `surfaceEnter: 0.7`, `surfaceExit: 1.3`. |
| [`src/ui/HUD.ts`](src/ui/HUD.ts) | Messages contextualisés par vue (ex: \"Sélectionnez slot orbital\"). |
| [`src/core/ViewEntitiesManager.ts`](src/core/ViewEntitiesManager.ts:76) | Intégrer SurfaceGrid dans SURFACE (lazy). |

## 5. Séquence d'Implémentation (Ordre Logique)

1. **Types** : Étendre ViewMode.
2. **Config** : Ajouter seuils ORBIT/SURFACE.
3. **Raycast** : Ajouter branches ORBIT/SURFACE dans SceneManager.handleClick (sélection → setTarget + setSystemSelection?).
4. **Auto-transitions** : Implémenter seuils dans SceneOrchestrator (basé currentOptimalDistance).
5. **UI** : Adapter HUD aides/indicateurs.
6. **Tests** : Valider cycle GALAXY→SYSTEM→ORBIT→SURFACE→retour, zoom auto, dblclick.

## 6. Seuils NAVIGATION_CONFIG Proposés

```typescript
export const NAVIGATION_CONFIG = {
  // Système existant
  systemEnterDistanceFactor: 0.8,
  systemExitDistanceFactor: 1.2,
  
  // Nouveaux : ORBIT/SURFACE
  orbitEnterDistanceFactor: 0.75,   // Zoom < 75% dist orbitale → SURFACE
  orbitExitDistanceFactor: 1.25,    // Zoom > 125% → SYSTEM
  surfaceEnterDistanceFactor: 0.0,  // Pas d'auto depuis SURFACE (manuel)
  surfaceExitDistanceFactor: 1.5,   // Zoom > 150% dist surf → ORBIT
  
  transitionCooldown: 1500,         // ms anti-oscillation
};
```

## Critères \"Done\"
- Cycle complet Enter/Escape fluide 5 vues.
- Raycast/sélection/tout niveaux.
- Auto-zoom ORBIT↔SURFACE sans oscillation.
- Types TS propres, pas de warnings.
- Performances LOD SURFACE stables.

**Plan prêt pour implémentation (mode code).**