# Audit Architectural - MMORTS Spatial

## 1. Points forts de l'architecture actuelle ✅

### Architecture générale
- **Séparation des responsabilités** : SceneManager, NavigationManager, ViewEntitiesManager, GameManager
- **Pattern Singleton** approprié pour GameManager (état global du jeu)
- **Types TypeScript solides** : NavigationState, SystemReference, PlanetReference
- **Configuration centralisée** dans `config.ts`

### Rendu Three.js
- **Lazy loading** des entités (SolarSystem créé à la demande)
- **Dispose propre** des ressources GPU
- **OrbitControls** bien intégré avec transitions flyTo/panTo

### Navigation
- **État centralisé** (NavigationState comme source de vérité)
- **Historique de navigation** pour les retours
- **Auto-transitions par zoom** bien pensées

---

## 2. Points d'attention / Risques 🟡

### A. SceneManager trop gros (~700 lignes)
C'est le "God Object" classique. Il gère :
- Setup Three.js
- Input handling
- Transitions caméra
- Raycasting
- Auto-transitions
- Boucle animate

**Risque** : Difficile à maintenir et tester.

### B. Mélange références Three.js et données
`SystemReference` contient à la fois `metadata` (stable) ET `sunMesh` (runtime).

**Risque** : Désynchronisation quand les objets Three.js sont détruits/recréés.

### C. Pas de vrai système de LOD (Level of Detail)
Actuellement : 1 cluster = 10×10 cubes fixes.

**Risque** : Ne scale pas pour une vraie galaxie (des milliers de systèmes).

---

## 3. Architecture cible recommandée

### 3 couches découplées

```
┌─────────────────────────────────────────────────────────┐
│                    PRÉSENTATION                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐│
│  │ GalaxyView  │ │ SystemView  │ │    PlanetView       ││
│  │ (Three.js)  │ │ (Three.js)  │ │    (Three.js)       ││
│  └─────────────┘ └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          ▲ observe
┌─────────────────────────────────────────────────────────┐
│                    ÉTAT / LOGIQUE                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │              UniverseStore (état pur)               ││
│  │  - galaxyData: Map<ClusterId, ClusterData>          ││
│  │  - systemsData: Map<SystemId, SystemData>           ││
│  │  - planetsData: Map<PlanetId, PlanetData>           ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                          ▲ requêtes
┌─────────────────────────────────────────────────────────┐
│                    DONNÉES                               │
│  ┌─────────────────────────────────────────────────────┐│
│  │         UniverseGenerator (procédural)              ││
│  │  - generateCluster(cx, cz) → ClusterData            ││
│  │  - generateSystem(systemId) → SystemData            ││
│  │  - generatePlanet(planetId) → PlanetData            ││
│  │  (tout est déterministe via seed)                   ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### Principes clés

1. **Données pures sans Three.js** - Les données sont sérialisables et testables
2. **Génération procédurale paresseuse avec cache** - LRU cache pour les systèmes générés
3. **Vues indépendantes** - Chaque niveau de zoom est une View complètement indépendante
4. **LOD dynamique** - Charger/décharger les clusters selon la position caméra

---

## 4. Priorités de refactoring

| Priorité | Refactoring | Effort | Quand |
|----------|-------------|--------|-------|
| **1** | Séparer données pures de Three.js | Moyen | Avant multijoueur |
| **2** | Découper SceneManager en sous-managers | Moyen | Quand >1000 lignes |
| **3** | Ajouter LOD pour la galaxie | Élevé | Quand >100 systèmes |
| **4** | Worker pour génération procédurale | Moyen | Si lag génération |

---

## 5. Recommandation

**Continuer avec l'architecture actuelle** pour :
1. Finir la surface planétaire
2. Ajouter la construction/gameplay de base
3. Valider que le concept de jeu est fun

**Puis refactorer** quand ces limites sont atteintes :
- Performance (trop d'objets Three.js)
- Complexité (SceneManager devient ingérable)
- Multijoueur (besoin de sérialiser l'état)

L'architecture actuelle est **suffisamment bonne** pour un prototype jouable.

---

## 6. Persistance procédurale

### Principe fondamental
- La galaxie est générée **une seule fois** au début de la partie
- Chaque élément (système, planète, relief) utilise un **seed déterministe**
- Le seed global de la partie + l'ID de l'élément = génération identique à chaque fois

### Stockage
```typescript
interface GameSave {
  galaxySeed: number;           // Seed global de la galaxie
  playerBuildings: Building[];  // Ce que les joueurs ont construit
  playerUnits: Unit[];          // Unités des joueurs
  // Les planètes/systèmes ne sont PAS stockés - régénérés via seed
}
```

### Avantages
- Fichiers de sauvegarde légers (pas besoin de stocker la géométrie)
- Univers infini possible
- Cohérence garantie entre les sessions
