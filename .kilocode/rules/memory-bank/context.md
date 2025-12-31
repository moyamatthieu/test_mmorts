# Context

## Focus actuel
Initialisation de la **Memory Bank** terminée (documents factuels alignés avec le code).

## État du prototype (constaté)
- Le rendu (Three.js) est orchestré par le main thread, avec une boucle d'animation.
- La simulation est déportée dans un Worker et s'appuie sur un `SharedArrayBuffer` partagé.
- Les unités sont rendues via `InstancedMesh` en lisant la mémoire partagée.

## Prochaines étapes (courtes)
1. Implémenter une logique de simulation minimale côté worker (spawn/activation, mouvement simple, règles déterministes).
2. Stabiliser le protocole main thread ↔ worker (types de messages, gestion start/stop, erreurs).
3. Étendre la représentation du monde (grille/cluster) et brancher des données de simulation sur les éléments rendus.
4. Mettre en place des garde-fous perf (profiling, budgets, réduction des allocations/copies).

