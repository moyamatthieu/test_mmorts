# Architecture Complète - MMO RTS Spatial (Style Homeworld + Mankind)

## 📋 Vue d'Ensemble du Projet

**Genre**: MMO RTS 3D Spatial
**Technologies**: Three.js, TypeScript, PeerJS (P2P), WebRTC
**Inspiration**: Homeworld (combat spatial 3D) + Mankind (univers persistant MMO)

---

## 🎯 Caractéristiques Clés

### Système de Navigation Multi-Échelle
- **Vue Galaxie** → **Vue Système Solaire** → **Vue Planétaire** → **Vue Surface**
- Transitions fluides basées sur zoom/distance caméra
- Mémoire contextuelle (look-at intelligent sur système source)

### Gameplay Core
- **RTS en 3D complète** (axes X/Y/Z)
- **Formations de flotte** (wedge, sphere, wall, etc.)
- **Ressources**: minage d'astéroïdes, planètes colonisables
- **Mothership mobile** + construction/production de vaisseaux
- **Combat spatial** avec armes variées (beam, projectiles, missiles)
- **Persistance** (MMO): l'univers continue même hors connexion

---

## 🏗️ Architecture Globale

```
┌────────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                          │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │              RENDERING LAYER (Three.js)              │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ SceneManager │  │ CameraManager│  │ Renderer  │ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │  Entities    │  │  Effects     │  │ Particles │ │     │
│  │  │  (Ships/     │  │  (Explosions,│  │ (Engines, │ │     │
│  │  │   Planets)   │  │   Beams)     │  │  Trails)  │ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │          NAVIGATION & CAMERA SYSTEM                   │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ Navigation   │  │Camera        │  │ Transition│ │     │
│  │  │ Manager      │  │Controller    │  │ Manager   │ │     │
│  │  │              │  │              │  │           │ │     │
│  │  │ - States     │  │ - Tracking   │  │ - Smooth  │ │     │
│  │  │ - Transitions│  │ - Look-at    │  │ - Lerp    │ │     │
│  │  │ - History    │  │ - Follow     │  │ - Zoom    │ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │               GAME LOGIC LAYER                        │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ FleetManager │  │ Formation    │  │ AI/       │ │     │
│  │  │              │  │ Manager      │  │ Pathfinding│ │     │
│  │  │ - Units      │  │              │  │           │ │     │
│  │  │ - Selection  │  │ - Wedge      │  │ - A*      │ │     │
│  │  │ - Commands   │  │ - Sphere     │  │ - Flow    │ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ Combat       │  │ Production   │  │ Resource  │ │     │
│  │  │ System       │  │ System       │  │ Manager   │ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │              NETWORKING LAYER (PeerJS)                │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ P2P Manager  │  │ State Sync   │  │ Command   │ │     │
│  │  │              │  │              │  │ Replication│ │     │
│  │  │ - WebRTC     │  │ - Snapshots  │  │           │ │     │
│  │  │ - Discovery  │  │ - Delta      │  │ - Lockstep│ │     │
│  │  │ - Topology   │  │ - Interpolate│  │ - Rollback│ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │                    UI LAYER                           │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │     │
│  │  │ HUD          │  │ Minimap      │  │ Menus     │ │     │
│  │  │              │  │              │  │           │ │     │
│  │  │ - Resources  │  │ - Tactical   │  │ - Build   │ │     │
│  │  │ - Selection  │  │ - Fog of War │  │ - Research│ │     │
│  │  │ - Alerts     │  │ - Radar      │  │ - Diplomat│ │     │
│  │  └──────────────┘  └──────────────┘  └───────────┘ │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
                              ▼ ▲
                        WebRTC / PeerJS
                              ▼ ▲
┌────────────────────────────────────────────────────────────────┐
│                  SIGNALING SERVER (Node.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Peer         │  │ Room         │  │ Initial State    │    │
│  │ Discovery    │  │ Management   │  │ Distribution     │    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
└────────────────────────────────────────────────────────────────┘
                              ▼ ▲
                        (Optional) Database
                              ▼ ▲
┌────────────────────────────────────────────────────────────────┐
│              PERSISTENCE LAYER (IndexedDB + Cloud)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │ Player       │  │ Galaxy       │  │ Fleet            │    │
│  │ Profile      │  │ State        │  │ Configurations   │    │
│  └──────────────┘  └──────────────┘  └──────────────────┘    │
└────────────────────────────────────────────────────────────────┘
```

---

## 📐 SYSTÈME D'ÉCHELLE (NOUVEAU)

### Principe Fondamental

Le jeu utilise des **coordonnées hiérarchiques** : chaque niveau a ses propres unités locales.
On ne mélange JAMAIS les échelles. Pas de coordonnées absolues.

```
src/core/GameScales.ts      → Constantes d'échelle
src/core/CoordinateSystem.ts → Types de coordonnées
src/core/OrbitalGrid.ts      → Grille orbitale (construction en orbite)
src/core/SurfaceGrid.ts      → Grille de surface (construction au sol)
src/core/GameEntity.ts       → Entités du jeu (vaisseaux, structures)
```

### Hiérarchie des Échelles

| Niveau | Taille | Unités | Contenu |
|--------|--------|--------|---------|
| **GALAXIE** | 100×100×100 | unités galaxie | 1000 clusters (10×10×10) |
| **CLUSTER** | 10×10×10 | unités cluster | 5-10 étoiles |
| **SYSTÈME** | rayon 100 | unités système | 1-10 planètes |
| **ORBITE** | 6 anneaux × 12 secteurs | slots | 72 emplacements max |
| **SURFACE** | 32×32 à 256×256 | cases | Grille RTS classique |

### Tailles de Planètes

| Type | Grille Surface | Slots Orbitaux | Équivalent |
|------|----------------|----------------|------------|
| Astéroïde | 32×32 | 6 | Petit avant-poste |
| Petite | 64×64 | 24 | Map StarCraft |
| Moyenne | 128×128 | 48 | Map moyenne |
| Grande | 256×256 | 72 | Map Supreme Commander |
| Géante gazeuse | ∅ | 96 | Orbitale uniquement |

### Vues de Navigation

```
GALAXY ←→ SYSTEM ←→ ORBIT ←→ SURFACE
```

Chaque transition change de référentiel de coordonnées :
- `flyTo()` pour les transitions avec changement de distance
- `panTo()` pour les sélections sans transition

### Types d'Entités

**Vaisseaux** : fighter, corvette, frigate, destroyer, cruiser, battleship, cargo, constructor, harvester

**Structures Orbitales** : station spatiale, chantier naval, entrepôt, défense, porte de saut

**Structures Surface** : QG, mine, raffinerie, usine, générateur, caserne, tourelle, spatioport

---

## 🗂️ Structure des Composants Détaillée

### 1. **Core / Engine**

```
src/core/
├── SceneManager.ts          # Gestion scène 3D principale
├── CameraManager.ts         # Contrôle caméra (orbit, tracking, cinematic)
├── NavigationManager.ts     # États navigation (Galaxy/System/Planet/Surface)
├── TransitionManager.ts     # Transitions fluides entre vues
├── InputManager.ts          # Input clavier/souris
├── SelectionManager.ts      # Sélection unités/bâtiments
├── TimeManager.ts           # Gestion temps (pause, accélération, sync)
└── MemoryManager.ts         # Optimisation mémoire/performances
```

### 2. **Navigation System (Architecture Robuste)**

```typescript
// Système de navigation intelligent multi-niveaux

interface NavigationState {
  currentView: 'GALAXY' | 'SYSTEM' | 'PLANET' | 'SURFACE';
  previousView: NavigationState | null;  // Pour back navigation
  
  // Contexte actuel
  selectedGalaxyObject: GalaxyObject | null;  // Étoile sélectionnée
  currentSystem: SolarSystem | null;          // Système actuel
  currentPlanet: Planet | null;               // Planète actuelle
  
  // Pour look-at intelligent
  exitContext: {
    fromView: ViewMode;
    targetPosition: THREE.Vector3;  // Où regarder au retour
    targetObject: Object3D;          // Objet à tracker
  } | null;
  
  // Historique navigation (pour breadcrumb UI)
  navigationHistory: Array<{
    view: ViewMode;
    object: any;
    cameraState: CameraSnapshot;
  }>;
}

class TransitionManager {
  // Transitions automatiques basées sur distance
  checkAutoTransitions(cameraDistance: number, target: Object3D): void {
    // Entrée dans système si zoom proche
    if (view === 'GALAXY' && distance < SYSTEM_ENTER_THRESHOLD) {
      this.enterSystem(target as Star);
    }
    
    // Sortie système si zoom loin
    if (view === 'SYSTEM' && distance > SYSTEM_EXIT_THRESHOLD) {
      this.exitSystem(/* keep look-at sur système */);
    }
    
    // Similaire pour planètes
  }
  
  // Transitions manuelles (double-clic, Enter)
  enterSystem(star: Star): void {
    // 1. Sauvegarder contexte actuel
    this.saveExitContext();
    
    // 2. Animation caméra smooth
    this.cameraManager.flyTo(star.position, duration);
    
    // 3. Changement de scène (masquer galaxie, afficher système)
    this.sceneManager.transitionToSystemView(star);
    
    // 4. Mise à jour état
    this.navigationState.currentView = 'SYSTEM';
    this.navigationState.currentSystem = star.system;
  }
  
  exitSystem(): void {
    // 1. Récupérer contexte sauvegardé
    const exitCtx = this.navigationState.exitContext;
    
    // 2. Camera look-at sur système qu'on quitte
    this.cameraManager.setTarget(exitCtx.targetPosition);
    
    // 3. Animation sortie smooth
    this.cameraManager.zoomOut(SYSTEM_EXIT_DISTANCE);
    
    // 4. Changement scène
    this.sceneManager.transitionToGalaxyView();
  }
}
```

### 3. **Entities (Objets du jeu)**

```
src/entities/
├── ships/
│   ├── Ship.ts              # Classe de base vaisseau
│   ├── Fighter.ts           # Chasseur léger
│   ├── Corvette.ts          # Corvette
│   ├── Frigate.ts           # Frégate
│   ├── Destroyer.ts         # Destroyer
│   ├── Cruiser.ts           # Croiseur
│   ├── Mothership.ts        # Vaisseau-mère
│   └── specialized/
│       ├── Harvester.ts     # Collecteur de ressources
│       ├── Repair.ts        # Vaisseau de réparation
│       └── Research.ts      # Vaisseau de recherche
├── celestial/
│   ├── Star.ts              # Étoile (soleil)
│   ├── Planet.ts            # Planète
│   ├── Moon.ts              # Lune
│   ├── Asteroid.ts          # Astéroïde
│   └── Nebula.ts            # Nébuleuse
├── structures/
│   ├── SpaceStation.ts      # Station spatiale
│   ├── Shipyard.ts          # Chantier naval
│   ├── ResearchLab.ts       # Labo de recherche
│   └── DefensePlatform.ts   # Plateforme défensive
├── formations/
│   ├── Formation.ts         # Classe de base formation
│   ├── WedgeFormation.ts    # Formation en coin
│   ├── SphereFormation.ts   # Formation sphérique
│   └── WallFormation.ts     # Mur défensif
└── effects/
    ├── Explosion.ts         # Effets d'explosion
    ├── BeamWeapon.ts        # Armes à faisceau
    ├── EngineTrail.ts       # Traînées moteurs
    └── Shield.ts            # Boucliers énergétiques
```

### 4. **Système de Combat**

```typescript
interface WeaponSystem {
  type: 'BEAM' | 'PROJECTILE' | 'MISSILE' | 'PULSE';
  damage: number;
  range: number;
  fireRate: number;  // coups/seconde
  accuracy: number;  // 0-1
  tracking: number;  // capacité à suivre cibles mobiles
  
  fire(target: Ship): void;
}

class CombatManager {
  // Calcul dégâts avec facteurs physique réalistes
  calculateDamage(weapon: Weapon, attacker: Ship, defender: Ship): number {
    // Distance, angle d'attaque, boucliers, armure
    const distanceFactor = weapon.range / attacker.distanceTo(defender);
    const angleFactor = this.calculateAngleFactor(attacker, defender);
    const shieldAbsorb = defender.shields.absorb(weapon.damage);
    const armorReduction = defender.armor.reduce(shieldAbsorb);
    
    return weapon.damage * distanceFactor * angleFactor - armorReduction;
  }
  
  // Système de ciblage intelligent
  autoTarget(unit: Ship, hostiles: Ship[]): Ship | null {
    return hostiles
      .filter(h => unit.canTarget(h))
      .sort((a, b) => this.threatLevel(b) - this.threatLevel(a))[0];
  }
}
```

### 5. **Système de Production & Économie**

```
src/economy/
├── ResourceManager.ts       # Gestion ressources globales
├── ProductionQueue.ts       # File de construction
├── TechnologyTree.ts        # Arbre technologique
├── ResearchManager.ts       # Recherches
└── TradeSystem.ts           # Commerce entre joueurs
```

```typescript
interface Resources {
  credits: number;         // Monnaie
  metal: number;           // Métal (mining)
  crystal: number;         // Cristaux (rare)
  fuel: number;            // Carburant
  population: number;      // Population (planètes)
}

class ProductionQueue {
  queue: Array<ProductionOrder>;
  
  addToQueue(item: BuildableItem, count: number): void {
    // Vérifier ressources disponibles
    // Ajouter à la file
    // Démarrer production si slot disponible
  }
  
  update(deltaTime: number): void {
    // Progression construction
    // Consommation ressources progressive
    // Spawn unité quand terminé
  }
}
```

### 6. **Système de Networking P2P**

```
src/network/
├── P2PManager.ts            # Gestion connexions PeerJS
├── StateSync.ts             # Synchronisation état
├── CommandQueue.ts          # Commandes réseau (lockstep)
├── InterpolationEngine.ts   # Interpolation positions
└── ConflictResolver.ts      # Résolution conflits
```

```typescript
class P2PManager {
  peers: Map<string, PeerConnection>;
  localPlayer: Player;
  
  // Architecture mesh (chaque joueur connecté aux autres)
  connectToRoom(roomId: string): void {
    // 1. Connexion au signaling server
    // 2. Récupération liste peers dans room
    // 3. Établissement connexions WebRTC
    // 4. Synchronisation état initial
  }
  
  broadcastCommand(cmd: GameCommand): void {
    // Envoi commande à tous les peers
    // Timestamping pour synchronisation
    this.peers.forEach(peer => peer.send({
      type: 'COMMAND',
      timestamp: this.timeManager.now(),
      playerId: this.localPlayer.id,
      command: cmd
    }));
  }
  
  // Lockstep pour déterminisme
  processFrame(frameNumber: number): void {
    // Attendre que tous les joueurs aient envoyé commandes
    if (!this.allCommandsReceived(frameNumber)) return;
    
    // Exécuter toutes les commandes dans ordre déterministe
    const commands = this.getCommandsForFrame(frameNumber);
    commands.sort((a, b) => a.playerId.localeCompare(b.playerId));
    commands.forEach(cmd => this.gameLogic.execute(cmd));
  }
}
```

### 7. **UI Système**

```
src/ui/
├── HUD.ts                   # Affichage tête haute
├── Minimap.ts               # Carte tactique
├── SelectionPanel.ts        # Panneau unités sélectionnées
├── BuildMenu.ts             # Menu construction
├── ResearchMenu.ts          # Menu recherche
├── FleetCommander.ts        # Gestion flottes
├── DiplomacyPanel.ts        # Relations diplomatiques
└── GalaxyMap.ts             # Carte galaxie (navigation stratégique)
```

### 8. **Pathfinding & AI**

```
src/ai/
├── Pathfinding3D.ts         # A* en 3D
├── FlowField.ts             # Flow field pour groupes
├── ObstacleAvoidance.ts     # Évitement obstacles
├── FormationAI.ts           # Maintien formations
└── TacticalAI.ts            # IA combat (ennemi)
```

### 9. **Galaxy Generation**

```
src/universe/
├── GalaxyGenerator.ts       # Génération procédurale galaxie
├── StarSystemGenerator.ts   # Génération systèmes solaires
├── PlanetGenerator.ts       # Génération planètes (terrain, climat)
├── AsteroidFieldGenerator.ts# Génération champs d'astéroïdes
└── UniversePersistence.ts   # Sauvegarde/chargement univers
```

---

## 🎮 Gameplay Loops

### Loop Principal (Local Player)
```
1. Input → Commandes joueur
2. Update Logic → Simulation locale
3. Network Sync → Broadcast état/commandes
4. Render → Affichage 3D
5. UI Update → HUD/Minimap
```

### Loop Multijoueur (Lockstep)
```
1. Collect Commands (frame N) → Tous les joueurs
2. Wait Synchronization → Timeout 100ms
3. Execute Commands → Ordre déterministe
4. Update World State → Identique partout
5. Render → Interpolation pour fluidité
```

---

## 📊 Optimisations Techniques

### Performance Rendering
- **Level of Detail (LOD)** : Meshes simplifiés à distance
- **Instancing** : Vaisseaux identiques → un seul draw call
- **Frustum Culling** : Ne render que visible
- **Octree** : Spatial partitioning pour collisions

### Performance Networking
- **Delta Compression** : Envoyer que les changements
- **Interest Management** : Sync seulement objets proches
- **Prediction + Reconciliation** : Lag compensation
- **Binary Protocol** : Compact vs JSON

### Memory Management
- **Object Pooling** : Réutiliser projectiles/effets
- **Web Workers** : Simulation physique hors main thread
- **Lazy Loading** : Charger systèmes solaires à la demande

---

## 🚀 Roadmap Implémentation

### Phase 1: Foundation (4-6 semaines)
- ✅ Système de navigation multi-échelle (Galaxy/System/Planet)
- ✅ Caméra intelligente avec look-at contextuel
- ✅ Sélection et contrôle basique unités
- ✅ Rendering optimisé (instancing, LOD)

### Phase 2: Combat & Economy (6-8 semaines)
- Combat spatial 3D
- Production vaisseaux
- Récolte ressources (mining)
- Arbre technologique basique

### Phase 3: Multiplayer P2P (8-10 semaines)
- PeerJS integration
- Lockstep synchronization
- Lobby system
- Chat & diplomacy

### Phase 4: Advanced Features (10+ semaines)
- Formations avancées
- AI ennemie
- Campagne solo
- Galaxy persistente (cloud save)

### Phase 5: Polish & Balance (ongoing)
- VFX polish (explosions, weapons)
- Sound design
- UI/UX améliorations
- Balance gameplay

---

## 🔧 Stack Technique Détaillée

### Frontend
- **Three.js** (r167+) - Rendu 3D
- **TypeScript** 5.0+ - Typage fort
- **Vite** - Bundler ultra-rapide
- **WebGL 2.0** - Graphics API
- **Web Workers** - Threading

### Networking
- **PeerJS** 1.5+ - WebRTC wrapper
- **Socket.io** (signaling) - Initial connection
- **MessagePack** - Binary serialization
- **WebRTC Data Channels** - P2P communication

### Persistence
- **IndexedDB** - Local storage
- **Firebase** (optionnel) - Cloud sync
- **Protobuf** - Schema serialization

### Tools
- **ESLint** + **Prettier** - Code quality
- **Vitest** - Unit tests
- **Playwright** - E2E tests
- **Docker** - Signaling server deployment

---

## 📈 Métriques Performance Cibles

- **FPS**: 60 constant (desktop), 30+ (mobile)
- **Network Latency**: <100ms P2P
- **Max Units**: 500+ simultaneous
- **Max Players**: 8-16 per match
- **Galaxy Size**: 1000+ star systems
- **Load Time**: <5s initial, <1s transitions

---

## 🎨 Style Visuel

### Inspirations
- **Homeworld**: Aesthetic épuré, sci-fi réaliste
- **Starcraft 2**: UI claire, feedback visuel fort
- **Elite Dangerous**: Sens de l'échelle spatiale

### Direction Art
- **Palette**: Bleus profonds, oranges chauds (étoiles), gris métalliques
- **VFX**: Trails moteurs, explosions volumétriques, shields énergétiques
- **UI**: HUD holographique, transparence, animations fluides

---

## ✅ Next Steps Immédiats

1. **Corriger le bug actuel** (variables clock/transitions manquantes)
2. **Implémenter système look-at intelligent** (garder contexte sortie système)
3. **Smooth transitions** caméra (lerp position + target)
4. **Tester transitions** Galaxy ↔ System avec zoom in/out
5. **Documenter comportements** (tests E2E)

---

Cette architecture est **modulaire**, **scalable** et prête pour un **vrai MMO RTS spatial** à la Homeworld/Mankind !
