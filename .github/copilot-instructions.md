# Copilot instructions — test_mmorts

Résumé rapide
- Projet TypeScript + Vite + Three.js (webgl) pour un prototype MMORTS.
- Dev: `npm run dev` (exécute `dev.sh`, nettoie le port 5173 puis lance Vite).
- Important: Vite est configuré pour COOP/COEP (SharedArrayBuffer support) — voir `vite.config.ts`.
- Note: Ne pas lancer `npm run dev` manuellement, un serveur tourne déjà en arrière-plan.

Principes et architecture essentiels

Terminologie projet (importante) :
- Les "cubes" visibles dans la grille représentent des *clusters d'étoiles*.
- L'ensemble de ces clusters constitue la *galaxie* (la grille globale).

Adopte une approche de développement pragmatique et minimaliste. Privilégie la simplicité dans l'architecture et l'implémentation en évitant toute forme de sur-ingénierie ou de complexification inutile. Intègre la documentation directement dans le code source sous forme de commentaires pertinents et de docstrings clairs plutôt que de créer une multitude de fichiers de documentation externes. Lorsque de la documentation existe déjà, mets-la à jour et enrichis-la au lieu de générer de nouveaux documents redondants. Chaque décision technique doit viser l'efficacité et la maintenabilité sans sacrifier la clarté. On ne fait jamais de code rustine, on corrige en profondeur la logique pour que tout soit bien logique et bien construit

## Bonnes pratiques d'interface utilisateur

### Effet de focus professionnel pour hover/sélection
Pour améliorer la visibilité des éléments actifs (hover, sélection) dans une grille d'objets 3D :

- **Atténuation des éléments adjacents** : Utilise l'opacité réduite (ex: 15%) pour les éléments non-actifs plutôt que d'épaissir les lignes ou changer drastiquement les couleurs
- **Configuration centralisée** : Définit les valeurs d'opacité dans un fichier de config dédié (`VISUAL_CONFIG`) pour faciliter l'ajustement
- **Matériaux transparents** : Configure `transparent: true` et `opacity` sur les matériaux Three.js pour permettre l'effet de focus
- **Priorité visuelle** : Sélection > Hover > État par défaut

Cette approche crée un effet "spotlight" professionnel similaire aux applications modernes (Figma, Blender, Adobe XD) et évite les limitations WebGL des lignes épaisses.

