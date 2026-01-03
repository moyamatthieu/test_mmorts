# Architecture Gameplay Surface (RTS Planétaire)

## 1. Vue d'ensemble
Ce document définit l'architecture technique pour le gameplay RTS à la surface des planètes. L'objectif est de permettre la construction de bases, le déplacement d'unités et la récolte de ressources sur une sphère procédurale, en garantissant une cohérence parfaite entre le rendu visuel (GPU) et la logique de simulation (CPU/Worker).

### Contraintes Clés
*   **Sphéricité** : Le gameplay se déroule sur une sphère, pas sur un plan projeté.
*   **Cohérence** : Le relief vu par le joueur (Shader) doit correspondre exactement au relief physique (Collisions/Hauteur).
*   **Performance** : La simulation (500+ unités) tourne dans un Web Worker et ne doit pas faire d'aller-retours coûteux avec le GPU.

## 2. Cohérence Terrain (CPU/GPU)

### Problème
Actuellement, le terrain est généré exclusivement dans le Vertex Shader (`PlanetSurface.ts`) via une fonction de bruit GLSL (`NoiseGenerator.ts`). Le CPU (et donc le Worker de simulation) n'a aucune connaissance de la topographie.

### Solution : Portage Isomorphe du Bruit
Nous allons implémenter l'algorithme de bruit (Simplex Noise 3D + FBM) en TypeScript pur, strictement identique à l'implémentation GLSL.

*   **Composant** : `src/utils/NoiseGenerator.ts` sera étendu.
*   **Méthode** : `getSurfaceHeight(position: Vector3, planetRef: PlanetReference): number`
*   **Algorithme** :
    *   Simplex Noise 3D (portage de `webgl-noise` d'Ashima Arts).
    *   FBM (Fractional Brownian Motion) avec les mêmes paramètres (octaves, lacunarity, gain) que le shader.
    *   Displacement : `radius + noise * displacementScale`.

### Flux de Données
1.  **Initialisation** : Le `SimulationWorker` reçoit la `seed` et le `radius` de la planète.
2.  **Simulation (Tick)** : Pour chaque unité au sol, le worker calcule `getSurfaceHeight(unit.position)` localement.
3.  **Rendu** : Le GPU calcule indépendamment la même hauteur dans le Vertex Shader.

## 3. Système de Coordonnées & Construction

### Positionnement
*   **Position** : Stockée en `Vector3` (x, y, z) dans l'espace monde.
*   **Normalisation** : Les positions sont toujours relatives au centre de la planète (0,0,0 dans le référentiel local de la planète).
*   **Hauteur** : La distance au centre est déterminée par le relief : `pos = normalize(pos) * getSurfaceHeight(pos)`.

### Construction (Bâtiments)
Pour le MVP, nous évitons la complexité d'une grille géodésique globale.
*   **Placement** : Libre (coordonnées sphériques continues).
*   **Validation** :
    *   Raycast depuis la caméra pour obtenir le point sur la sphère.
    *   Vérification de collision (sphère/boîte) avec les bâtiments existants.
    *   Vérification de la pente (calculée via la normale du terrain).
*   **Orientation** : Le bâtiment est orienté selon la normale du terrain (vecteur UP) et une rotation autour de cet axe.

## 4. Unités au Sol (Simulation)

### Adaptation du Worker
Le `SimulationWorker` doit distinguer les unités spatiales (vol libre) des unités terrestres (collées au sol).

*   **État** : Ajout d'un flag ou type `movementType: 'SPACE' | 'GROUND'`.
*   **Mouvement Sol** :
    1.  Calcul du vecteur de déplacement tangentiel.
    2.  Application du déplacement : `newPos = currentPos + velocity * dt`.
    3.  **Projection** : `newPos = normalize(newPos)`.
    4.  **Application Hauteur** : `newPos *= getSurfaceHeight(newPos)`.
*   **Orientation** :
    *   `UP` : Normale du terrain (approximée par `normalize(position)` pour le MVP, ou gradient du bruit pour plus de précision).
    *   `FORWARD` : Direction du mouvement projetée sur le plan tangent.

## 5. Ressources

### Entités ResourceNode
Les ressources au sol sont des entités statiques.
*   **Données** : `type` (Metal, Crystal), `amount`, `position` (Vector3).
*   **Génération** : Lors de la génération du système, des nœuds de ressources sont placés sur la surface en utilisant le bruit pour déterminer les zones riches (ex: biomes rocheux).
*   **Persistance** : Stockées dans `SystemReference.metadata` ou une structure dédiée `PlanetData`.

## 6. Plan d'Implémentation

### Étape 1 : Moteur de Bruit CPU
*   Modifier `src/utils/NoiseGenerator.ts` pour inclure l'implémentation TS du Simplex Noise 3D.
*   Ajouter la fonction `fbm()` en TS.
*   Créer des tests unitaires pour vérifier la cohérence des valeurs (approximative) ou visuelle.

### Étape 2 : Adaptation SimulationWorker
*   Injecter les données planétaires (seed, radius) dans le worker lors de l'initialisation ou de l'entrée sur la planète.
*   Implémenter la logique de contrainte au sol (`clampToSurface`) dans la boucle de simulation.

### Étape 3 : Unités Terrestres
*   Créer un nouveau type d'unité (ex: `ROVER` ou `TANK`) dans `UnitFactory`.
*   Adapter `UnitBehavior` pour gérer le mouvement au sol (rotation quaternionique pour suivre la courbure).

### Étape 4 : Interaction & Construction
*   Mettre à jour le Raycaster pour détecter le point précis sur le terrain (déjà partiellement géré par le mesh, mais besoin de précision pour la hauteur logique).
*   Implémenter le "Ghost Building" qui suit la souris et s'oriente selon la normale.
