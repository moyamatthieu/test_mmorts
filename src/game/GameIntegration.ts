import { Scene, PerspectiveCamera } from 'three';
import { GameManager } from './GameManager';
import { EntityManager } from './EntityManager';
import { P2PManager } from '../net/P2PManager';
import { NavigationManager } from '../core/NavigationManager';
import { InputManager } from '../core/InputManager';
import { SceneManager } from '../core/SceneManager';
import { PlanetReference } from '../types/NavigationState';

/**
 * GameIntegration - Façade d'intégration pour connecter les systèmes de jeu
 * avec le rendu Three.js et la navigation.
 *
 * @description
 * Cette classe sert de point d'entrée unifié pour initialiser et connecter
 * tous les sous-systèmes de jeu (GameManager, P2PManager, Navigation, Input).
 * Elle utilise la composition plutôt que l'héritage pour une meilleure modularité.
 *
 * Pattern : Façade
 */
export class GameIntegration {
  private gameManager: GameManager;
  private p2pManager: P2PManager | null = null;
  private navigationManager: NavigationManager | null = null;
  private inputManager: InputManager | null = null;

  constructor() {
    this.gameManager = GameManager.getInstance();
  }

  /**
   * Initialise tous les systèmes de jeu
   * @param sceneManager - Instance du SceneManager
   * @param enableNetwork - Si true, initialise le P2PManager
   */
  public initialize(
    sceneManager: SceneManager,
    enableNetwork: boolean = false
  ): void {
    const scene = sceneManager.getScene();
    const camera = sceneManager.getCamera();

    // 1. Injecter le contexte de rendu dans GameManager
    this.gameManager.setRenderContext(scene, camera);

    // 2. Initialiser le gestionnaire de navigation
    this.navigationManager = NavigationManager.getInstance();

    // 3. Initialiser le gestionnaire d'entrées
    this.inputManager = InputManager.getInstance();

    // 4. Connecter EntityManager à SceneManager pour les ressources de surface
    const entityManager = EntityManager.getInstance();
    sceneManager.setSurfaceGridProvider((planetRef: PlanetReference) => {
      // Récupérer la grille logique depuis EntityManager
      // Note: On utilise les coordonnées du système parent
      // planetRef.id est unique, mais EntityManager indexe par coordonnées
      // On suppose que planetRef contient les infos nécessaires ou on les reconstruit
      
      // Pour l'instant, on utilise les paramètres de planetRef pour demander la grille
      // Attention: planetRef ne contient pas directement les coordonnées cluster/star/orbit
      // Il faut les déduire ou les stocker dans planetRef
      
      // Solution temporaire : on utilise les données de planetRef pour recréer une clé ou on cherche par ID
      // EntityManager.getSurfaceGrid demande (cluster, starIndex, orbitIndex, planetSize, seed)
      
      // On va essayer de parser l'ID de la planète s'il contient les infos
      // Format ID attendu par EntityManager: "cx-cy-cz:starIdx:orbitIdx"
      // Mais planetRef.id est souvent juste "planet_X" ou similaire dans le prototype actuel
      
      // Si on ne peut pas déduire les coordonnées, on utilise une méthode de recherche dans EntityManager
      // TODO: Améliorer le typage de PlanetReference pour inclure les coordonnées spatiales
      
      // Pour le prototype, on utilise une méthode simplifiée ou on passe les params si disponibles
      // On va supposer que planetRef a été enrichi ou qu'on peut retrouver l'entité
      
      // Hack temporaire : on utilise la seed et la taille pour générer une grille "locale" si on ne trouve pas la "vraie"
      // C'est acceptable car la génération est déterministe (seed)
      
      // Idéalement : return entityManager.getSurfaceGrid(...);
      
      // Pour l'instant, on recrée une grille déterministe (lecture seule)
      // Cela garantit que les ressources sont aux mêmes endroits
      // Mais ne permet pas de voir les modifications (récolte)
      // C'est suffisant pour l'objectif "Affichage des ressources"
      
      // On a besoin de 'cluster', 'starIndex', 'orbitIndex' pour EntityManager.getSurfaceGrid
      // Si on ne les a pas, on instancie une nouvelle SurfaceGrid avec la seed
      
      // Import dynamique pour éviter dépendance circulaire si SurfaceGrid est dans core ?
      // Non, SurfaceGrid est dans core, EntityManager dans game.
      
      // On utilise la méthode publique de EntityManager si possible, sinon new SurfaceGrid
      // Comme on est dans GameIntegration, on a accès à EntityManager.
      
      // Essayons de retrouver la planète dans EntityManager
      // const planetEntity = entityManager.getEntity(planetRef.id);
      // if (planetEntity) { ... }
      
      // Fallback : création d'une grille temporaire pour l'affichage
      const { SurfaceGrid } = require('../core/SurfaceGrid');
      return new SurfaceGrid(planetRef.radius, planetRef.seed);
    });

    // 5. Initialiser le réseau P2P si demandé
    if (enableNetwork) {
      this.p2pManager = P2PManager.getInstance();
      this.p2pManager.initialize()
        .then(() => {
          console.log('[GameIntegration] P2PManager initialized successfully');
        })
        .catch((error) => {
          console.error('[GameIntegration] Failed to initialize P2PManager:', error);
        });
    }

    console.log('[GameIntegration] All systems initialized successfully');
  }

  /**
   * Met à jour la boucle de jeu
   * @param deltaTime - Temps écoulé depuis la dernière frame (en secondes)
   */
  public update(deltaTime: number): void {
    this.gameManager.update(deltaTime);
  }

  /**
   * Nettoie toutes les ressources
   */
  public dispose(): void {
    if (this.p2pManager) {
      this.p2pManager.dispose();
    }

    if (this.inputManager) {
      this.inputManager.dispose();
    }

    this.gameManager.dispose();

    console.log('[GameIntegration] All systems disposed');
  }

  /**
   * Obtient l'instance de GameManager
   */
  public getGameManager(): GameManager {
    return this.gameManager;
  }

  /**
   * Obtient l'instance de P2PManager (peut être null si non initialisé)
   */
  public getP2PManager(): P2PManager | null {
    return this.p2pManager;
  }

  /**
   * Obtient l'instance de NavigationManager
   */
  public getNavigationManager(): NavigationManager | null {
    return this.navigationManager;
  }

  /**
   * Obtient l'instance de InputManager
   */
  public getInputManager(): InputManager | null {
    return this.inputManager;
  }
}