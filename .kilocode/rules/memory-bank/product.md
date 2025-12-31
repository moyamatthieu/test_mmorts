# Product

## Pourquoi ce projet existe
Prototype de **MMORTS** orienté **simulation** : valider une architecture capable de simuler un grand nombre d'entités (unités, objets) tout en conservant un rendu et une UI fluides dans le navigateur.

## Problème résolu
- Éviter que la simulation (CPU) ne bloque le **main thread** (rendu + interactions).
- Structurer les données de simulation de façon **cache-friendly** et partageable entre threads (TypedArrays sur mémoire partagée).
- Poser une base technique pour étendre progressivement la simulation (spawn, mouvement, interactions, sélection, etc.).

## UX / objectifs d'expérience
- Rendu temps réel fluide (Three.js) et interaction immédiate (survol/sélection).
- Feedback visuel clair (grille de clusters, anneau de sélection, panels UI).
- Débogage facile via logs et overlays UI, sans compromettre la stabilité.

