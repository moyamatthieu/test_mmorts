# PEEJS — Product

## Pourquoi ce projet existe
PEEJS est un prototype de **MMO RTS spatial 3D** centré sur une expérience de **navigation spatiale fluide** (galaxie → système solaire → planète), sans écrans de chargement, et conçu pour rester compatible avec des contraintes MMO (grand nombre de joueurs et d'unités).

**Inspirations** :
- **Homeworld** : tactique 3D, flottes/formations, lisibilité des combats, gestion de la distance
- **Mankind** : progression/économie/contrôle de zones, montée en puissance, univers persistant

Objectifs principaux :
- Permettre d'explorer une **galaxie** structurée (grille/regions) et de sélectionner un **système solaire** (étoile).
- Entrer dans un système solaire puis viser une planète, et **entrer/sortir** de manière instantanée et cohérente (navigation multi-niveaux).
- Maintenir une continuité visuelle (pas de "loading screen") via transitions caméra + niveaux de détail (LOD) et/ou changement de référentiel.
- Supporter le **multijoueur P2P** (8-16 joueurs) avec synchronisation déterministe (lockstep).
- Gérer 500+ unités simultanées via simulation asynchrone (Web Worker).

## Expérience joueur (boucle principale)

### Navigation Spatiale Multi-Échelle
1. **Vue GALAXY**
   - Le joueur voit une galaxie sous forme de grille de clusters (cubes) et des étoiles sélectionnables.
   - Le joueur sélectionne une étoile (système cible).
   - Le joueur peut voir d'autres joueurs dans la galaxie (flottes, territoires contrôlés).

2. **Entrée SYSTEM**
   - Le joueur "zoom"/entre dans le système solaire sélectionné (transition caméra fluide), pour voir soleil + planètes en orbite.
   - Affichage des vaisseaux, stations spatiales, champs d'astéroïdes.
   - Possibilité d'engager le combat ou de miner des ressources.

3. **Entrée ORBIT**
   - Depuis le système, le joueur peut entrer en orbite autour d'une planète.
   - Vue orbitale pour construction de stations spatiales, défenses orbitales, combat local.

4. **Entrée SURFACE**
   - Depuis l'orbite, le joueur peut descendre sur la surface planétaire.
   - Vue terrain avec LOD pour RTS au sol : coloniser, construire, gérer des bases.

5. **Sortie**
   - Retour SURFACE → ORBIT → SYSTEM → GALAXY, transitions fluides et instantanées.
   - Conservation de la cible caméra cohérente (lookAt) tout au long des transitions.

### Gameplay RTS
1. **Gestion de flotte**
   - Sélectionner des vaisseaux individuels ou par groupes.
   - Ordonner déplacements, attaques, formations (wedge, sphere, wall).
   - Gérer différents types de vaisseaux (chasseurs, corvettes, frégates, mothership).

2. **Combat spatial 3D**
   - Combat tactique avec liberté de mouvement 3D complète.
   - Systèmes d'armes variés (beams, projectiles, missiles).
   - Systèmes de défense (boucliers, armure, point defense).
   - Ciblage intelligent et prédiction de trajectoire.

3. **Économie & Production**
   - Récolter des ressources (mining astéroïdes, exploitation planètes).
   - Construire des vaisseaux via files de production.
   - Rechercher des technologies pour débloquer nouvelles unités/améliorations.
   - Gérer plusieurs bases/stations simultanément.

4. **Multijoueur & Diplomatie**
   - Jouer avec/contre 8-16 joueurs en P2P.
   - Alliances, commerce, conflits territoriaux.
   - Chat et communication inter-joueurs.
   - Conquête de systèmes et contrôle de zones.

## Contrôles (cibles de design)
- **Zoom in/out** : molette (OrbitControls).
- **Sélection** : clic sur l'entité (étoile/planète/vaisseau) ; la sélection alimente la cible de caméra (lookAt).
- **Sélection multiple** : drag pour box selection, shift+clic pour ajouter.
- **Entrer** : touche **Enter**
  - GALAXY → SYSTEM (sur le système sélectionné)
  - SYSTEM → ORBIT (si une planète est sélectionnée)
  - ORBIT → SURFACE (descente au sol)
- **Sortir** : touche **Escape**
  - SURFACE → ORBIT
  - ORBIT → SYSTEM
  - SYSTEM → GALAXY
- **Ordres** : clic droit pour déplacer/attaquer, touches pour formations.
- **Déplacement caméra** : W/A/S/D + clic molette pour pan.

## Objectif "sans temps de chargement"
Principe : la navigation ne doit pas bloquer le rendu.
- Transitions réalisées par mouvement caméra (fly/zoom) et bascule d'état de navigation.
- Réduction de coût visuel par niveaux de détail (ex: LOD planète) pour rester fluide pendant les transitions.
- Lazy loading des systèmes solaires à la demande (génération procédurale).

## Scalabilité (contraintes MMO visées)
- **Simulation** : Un grand nombre d'unités (500+) via calcul asynchrone (worker) et partage mémoire (SharedArrayBuffer), afin de conserver un main thread principalement orienté rendu.
- **Rendu** : Instancing (InstancedMesh) pour afficher de grandes quantités d'objets sans overhead.
- **Networking** : Architecture P2P mesh (8-16 joueurs), synchronisation lockstep déterministe, delta compression pour bandwidth.
- **Persistance** : Sauvegarde locale (IndexedDB) + sync cloud optionnelle (Firebase).

## Ce qui est "dans le scope strict" actuel (MVP)
- Navigation et états : GALAXY / SYSTEM / ORBIT / SURFACE avec transitions fluides.
- Sélection + caméra "look at".
- Entrée/sortie (Enter/Escape) + zoom in/out.
- Gestion basique d'unités : création, sélection, déplacement, combat simple.
- Réseau P2P : échange d'ordres (commandes) + snapshots ponctuels (prototype).
- Économie minimale : ressources, production de vaisseaux.

## Hors scope immédiat (future)
- Anti-triche "sérieuse", authoritative server, persistance serveur centralisée.
- Diplomatie complexe, marché inter-joueurs, crafting avancé.
- Campagne scénarisée solo détaillée.
- Terrain planétaire jouable (RTS au sol) avec unités terrestres complexes.

## Axes de gameplay identifiés (prioritaires)

Les axes suivants renforcent la boucle RTS et l'expérience MMO :

- **Gestion des unités** : création, sélection, déplacement de groupes, comportements de base (attaque/défense), gestion de la vie et de l'état, formations tactiques.

- **Économie** : collecte et gestion de ressources, production d'unités ou de structures, flux économiques simples pour soutenir l'expansion, recherche technologique.

- **Navigation avancée** : ordres de déplacement multi-systèmes, gestion des transitions entre zones, priorisation des cibles, pathfinding 3D intelligent.

- **Interaction** : interface de sélection/contextuelle, feedback visuel sur les ordres (trajectoires, cibles), interactions multi-joueurs (P2P), chat et diplomatie basique.

- **Combat spatial** : systèmes d'armes variés, formations de flotte, IA tactique, destruction et effets visuels.

Chaque axe est conçu pour rester minimaliste (KISS/YAGNI), en s'appuyant sur les abstractions existantes et en évitant toute duplication ou sur-spécialisation.

## Métriques de succès (cibles)
- **Performance** : 60 FPS constant sur desktop avec 500+ unités
- **Latency** : <100ms en P2P pour synchronisation fluide
- **Load Times** : <5s initial, <1s pour transitions entre vues
- **Capacité** : 8-16 joueurs simultanés par partie
- **Galaxie** : 1000+ systèmes stellaires générés procéduralement
- **Engagement** : Boucle gameplay claire (exploration → expansion → combat)
