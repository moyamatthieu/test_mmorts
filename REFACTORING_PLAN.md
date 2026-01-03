# Plan de Refactorisation - Architecture MMO RTS Spatial

## 🎯 Objectif
Simplifier l'architecture du projet selon les principes KISS, en découpant les fichiers trop gros (>500 lignes) et en clarifiant les responsabilités.

## 📊 Fichiers Problématiques Identifiés

### Fichiers Critiques (>700 lignes)
1. **HUD.ts** (1399 lignes) - Trop monolithique
2. **P2PManager.ts** (1040 lignes) - Gère trop de responsabilités
3. **GameState.ts** (998 lignes) - Types + logique mélangés
4. **EffectsManager.ts** (871 lignes) - Géométries + logique ensemble
5. **ShipRenderer.ts** (859 lignes) - Rendu + données mélangés
6. **GalaxyGenerator.ts** (850 lignes) - Génération + types ensemble
7. **SceneManager.ts** (732 lignes) - Orchestrateur trop chargé
8. **EconomySystem.ts** (711 lignes) - Économie + production + recherche
9. **Persistence.ts** (709 lignes) - IndexedDB + sérialisation
10. **TacticalAI.ts** (696 lignes) - IA tactique monolithique

## 🏗️ Architecture Actuelle

```
src/
├── core/          # Managers système (Scene, Input, Camera, Navigation)
├── game/          # Logique de jeu (GameManager, GameLoop, Commands)
├── entities/      # Entités 3D (vaisseaux, planètes, effets)
├── ui/            # Interface utilisateur
├── net/           # Réseau PeerJS
├── ai/            # Intelligence artificielle
├── universe/      # Génération et persistance
└── types/         # Définitions TypeScript
```

## 🎯 Principes de Refactorisation

### 1. **Séparation des Préoccupations**
- **Types** séparés de la **logique**
- **Données** séparées du **comportement**
- **Rendu** séparé de la **simulation**

### 2. **Responsabilité Unique (SRP)**
Chaque fichier = UNE responsabilité claire

### 3. **Taille Maximum**
- Fichier de types : max 200 lignes
- Fichier de logique : max 400 lignes
- Manager/Service : max 500 lignes

## 📋 Plan de Refactorisation Détaillé

### Phase 1: HUD (1399 → ~300 lignes)

**Problème**: HUD gère tout (affichage, événements, sélection, minimap, tooltips)

**Solution**: Découper en composants UI modulaires

```
src/ui/
├── HUD.ts (250 lignes) - Coordinateur principal
├── components/
│   ├── ResourcePanel.ts (80 lignes) - Affichage ressources
│   ├── SelectionPanel.ts (150 lignes) - Infos unités sélectionnées
│   ├── MinimapPanel.ts (200 lignes) - Minimap tactique
│   ├── CommandPanel.ts (120 lignes) - Boutons de commande
│   ├── NotificationPanel.ts (100 lignes) - Messages et alertes
│   └── TooltipManager.ts (80 lignes) - Système de tooltips
└── HUDStyles.ts (50 lignes) - Styles CSS-in-JS
```

**Responsabilités**:
- `HUD.ts` : Coordinateur, création/destruction des panels
- Chaque panel : Rendu et logique de SON composant uniquement

### Phase 2: SceneManager (732 → ~350 lignes)

**Problème**: Gère la scène 3D + transitions + input + entities + worker

**Solution**: Extraire les transitions et l'orchestration

```
src/core/
├── SceneManager.ts (350 lignes) - Setup 3D + boucle animate
├── TransitionManager.ts (200 lignes) - Transitions GALAXY↔SYSTEM↔ORBIT↔SURFACE
└── SceneOrchestrator.ts (180 lignes) - Coordination auto-transitions
```

**Responsabilités**:
- `SceneManager.ts` : Setup Three.js, boucle render, gestion updatables
- `TransitionManager.ts` : Transitions de vues avec animations flyTo
- `SceneOrchestrator.ts` : Auto-transitions basées sur distance caméra

### Phase 3: P2PManager (1040 → ~400 lignes)

**Problème**: Gère connexions + sync + protocole + événements + lobby

**Solution**: Découper selon les responsabilités réseau

```
src/net/
├── P2PManager.ts (250 lignes) - Gestion connexions PeerJS
├── P2PProtocol.ts (150 lignes) - Protocole messages
├── P2PSyncManager.ts (200 lignes) - Synchronisation state
├── P2PLobby.ts (180 lignes) - Gestion lobby/rooms
└── P2PTypes.ts (100 lignes) - Types réseau
```

**Responsabilités**:
- `P2PManager.ts` : Connexions peer-to-peer
- `P2PProtocol.ts` : Encodage/décodage messages
- `P2PSyncManager.ts` : Synchronisation GameState
- `P2PLobby.ts` : Lobby et matchmaking

### Phase 4: GameState.ts (998 → ~300 lignes)

**Problème**: Types + fonctions utilitaires + constantes mélangés

**Solution**: Séparer types et logique

```
src/types/
├── GameState.ts (200 lignes) - Types principaux uniquement
├── GameStateTypes.ts (150 lignes) - Types secondaires (Unit, Player, etc.)
├── GameStateFactory.ts (120 lignes) - Fonctions création (createGameState, etc.)
└── GameConstants.ts (80 lignes) - Constantes (SHIP_STATS, etc.)
```

**Responsabilités**:
- `GameState.ts` : Interface GameState + types immédiats
- `GameStateTypes.ts` : Types détaillés (Unit, Player, Resources...)
- `GameStateFactory.ts` : Fonctions factory
- `GameConstants.ts` : Données statiques (SHIP_STATS, coûts...)

### Phase 5: EffectsManager (871 → ~350 lignes)

**Problème**: Gère création + update + géométries + shaders

**Solution**: Séparer géométries et logique

```
src/entities/effects/
├── EffectsManager.ts (250 lignes) - Gestion pool + update
├── EffectGeometries.ts (200 lignes) - Création géométries
├── EffectShaders.ts (150 lignes) - Shaders GLSL
└── EffectTypes.ts (80 lignes) - Types et enums
```

**Responsabilités**:
- `EffectsManager.ts` : Pool d'effets, update, spawn
- `EffectGeometries.ts` : Factory de géométries Three.js
- `EffectShaders.ts` : Matériaux et shaders
- `EffectTypes.ts` : Types TypeScript

### Phase 6: EconomySystem (711 → ~300 lignes)

**Problème**: Économie + production + recherche + extraction ressources

**Solution**: Séparer les systèmes économiques

```
src/game/economy/
├── EconomySystem.ts (200 lignes) - Coordinateur économique
├── ProductionSystem.ts (180 lignes) - Files production (vaisseaux, bâtiments)
├── ResourceSystem.ts (150 lignes) - Extraction et transfert ressources
└── ResearchSystem.ts (180 lignes) - Technologies et upgrades
```

**Responsabilités**:
- `EconomySystem.ts` : Orchestrateur, update principal
- `ProductionSystem.ts` : Files de production unitaires
- `ResourceSystem.ts` : Extraction, stockage, transfert
- `ResearchSystem.ts` : Arbre technologique

### Phase 7: TacticalAI (696 → ~350 lignes)

**Problème**: Décision + comportements + micro-gestion ensemble

**Solution**: Séparer décision et exécution

```
src/ai/
├── TacticalAI.ts (250 lignes) - Décisions stratégiques
├── UnitAI.ts (180 lignes) - Comportements unitaires (kiting, flanking)
└── AIUtils.ts (120 lignes) - Utilitaires IA (threat assessment, etc.)
```

**Responsabilités**:
- `TacticalAI.ts` : Analyse situation, décisions tactiques
- `UnitAI.ts` : Comportements individuels
- `AIUtils.ts` : Fonctions communes (calculs, évaluations)

## 🔄 Ordre d'Exécution

### Priorité 1 (Critique - affecte toute l'app)
1. **GameState.ts** - Types utilisés partout
2. **SceneManager.ts** - Cœur de l'application

### Priorité 2 (Haute - affecte gameplay)
3. **HUD.ts** - UI critique
4. **EconomySystem.ts** - Gameplay économique
5. **P2PManager.ts** - Multijoueur

### Priorité 3 (Moyenne - améliorations)
6. **EffectsManager.ts** - Visuels
7. **TacticalAI.ts** - IA
8. **GalaxyGenerator.ts** - Génération univers

## ✅ Critères de Validation

Pour chaque refactorisation :
- [ ] Compilation TypeScript sans erreur
- [ ] Imports mis à jour dans tous les fichiers dépendants
- [ ] Responsabilité unique claire par fichier
- [ ] Taille < 500 lignes par fichier
- [ ] Documentation des exports
- [ ] Principe KISS respecté

## 🎮 Architecture Cible MMO RTS Spatial

### Vue d'ensemble
```
GALAXY (vue macro)
  ↓ Zoom sur système
SYSTEM (vue solaire)
  ↓ Sélection planète
ORBIT (vue orbitale - grille construction)
  ↓ Atterrissage
SURFACE (vue planétaire - grille RTS)
```

### Responsabilités par Module

#### 🌌 Universe (Génération & Persistance)
- Génération procédurale galaxie
- Sauvegarde/chargement IndexedDB
- Profils joueurs

#### 🎮 Game (Logique Core)
- GameState management
- Combat, économie, production
- Commandes RTS
- Boucle de simulation

#### 🎨 Core (Système 3D)
- Rendu Three.js
- Navigation multi-échelle
- Input & Camera
- Transitions de vues

#### 🤖 AI
- IA tactique
- Formations
- Pathfinding

#### 🌐 Net
- PeerJS P2P
- Synchronisation
- Lobby

#### 🎬 Entities
- Vaisseaux, planètes, structures
- Effets visuels
- Grilles de construction

#### 🖼️ UI
- HUD modulaire
- Sélection
- Minimap

## 📝 Notes Finales

- **KISS avant tout** : Si c'est trop complexe, simplifier encore
- **DRY** : Factoriser le code dupliqué
- **Types séparés** : Toujours séparer types et implémentation
- **Documentation** : Chaque fichier documente SA responsabilité unique
- **Tests mentaux** : "Si je dois modifier X, je ne touche qu'à ce fichier"
