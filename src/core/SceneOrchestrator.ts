/**
 * SceneOrchestrator.ts
 * Gère les transitions automatiques SYSTEM ↔ ORBIT ↔ SURFACE basées sur la distance caméra.
 */

import { NavigationManager } from './NavigationManager';
import { CameraManager } from './CameraManager';
import { TransitionManager } from './TransitionManager';
import type { ViewMode } from '../types/NavigationState';

export class SceneOrchestrator {
  private navigationManager: NavigationManager;
  private cameraManager: CameraManager;
  private transitionManager: TransitionManager;
  private lastTransitionTime = 0;
  private transitionCooldown = 2000; // 2 secondes de cooldown

  // Seuils de distance pour transitions automatiques (en unités Three.js)
  private readonly ORBIT_ENTER_DISTANCE = 5.0;
  private readonly ORBIT_EXIT_DISTANCE = 10.0;
  private readonly SURFACE_ENTER_DISTANCE = 1.5;
  private readonly SURFACE_EXIT_DISTANCE = 3.0;

  constructor(
    navigationManager: NavigationManager,
    cameraManager: CameraManager,
    transitionManager: TransitionManager,
  ) {
    this.navigationManager = navigationManager;
    this.cameraManager = cameraManager;
    this.transitionManager = transitionManager;
  }

  /**
   * Vérifie et déclenche les transitions automatiques basées sur la distance caméra
   * Appelé à chaque frame depuis SceneManager
   */
  public update(): void {
    // Ne pas déclencher de transition si une est déjà en cours
    if (this.cameraManager.isTransitioning()) {
      return;
    }

    // Ne pas déclencher de transition si le cooldown n'est pas écoulé
    const now = Date.now();
    if (now - this.lastTransitionTime < this.transitionCooldown) {
      return;
    }

    const currentView = this.navigationManager.getState().currentView;
    const distance = this.cameraManager.getDistance();

    // SYSTEM ↔ ORBIT transitions
    if (currentView === 'SYSTEM') {
      // Transition automatique SYSTEM → ORBIT si on zoom assez près
      if (distance < this.ORBIT_ENTER_DISTANCE) {
        const planet = this.navigationManager.getState().currentPlanet;
        if (planet) {
          console.log(
            `[SceneOrchestrator] Auto-transition SYSTEM → ORBIT (distance: ${distance.toFixed(2)})`,
          );
          this.transitionManager.enterOrbit();
          this.lastTransitionTime = now;
        }
      }
    } else if (currentView === 'ORBIT') {
      // Transition automatique ORBIT → SYSTEM si on zoom trop loin
      if (distance > this.ORBIT_EXIT_DISTANCE) {
        console.log(
          `[SceneOrchestrator] Auto-transition ORBIT → SYSTEM (distance: ${distance.toFixed(2)})`,
        );
        this.transitionManager.exitOrbit();
        this.lastTransitionTime = now;
      }
      // Transition automatique ORBIT → SURFACE si on zoom très près
      else if (distance < this.SURFACE_ENTER_DISTANCE) {
        console.log(
          `[SceneOrchestrator] Auto-transition ORBIT → SURFACE (distance: ${distance.toFixed(2)})`,
        );
        this.transitionManager.enterSurface();
        this.lastTransitionTime = now;
      }
    } else if (currentView === 'SURFACE') {
      // Transition automatique SURFACE → ORBIT si on zoom assez loin
      if (distance > this.SURFACE_EXIT_DISTANCE) {
        console.log(
          `[SceneOrchestrator] Auto-transition SURFACE → ORBIT (distance: ${distance.toFixed(2)})`,
        );
        this.transitionManager.exitSurface();
        this.lastTransitionTime = now;
      }
    }
  }

  /**
   * Réinitialise le cooldown (utile après une transition manuelle)
   */
  public resetCooldown(): void {
    this.lastTransitionTime = Date.now();
  }

  /**
   * Configure les seuils de distance (pour tests/debug)
   */
  public setThresholds(config: {
    orbitEnter?: number;
    orbitExit?: number;
    surfaceEnter?: number;
    surfaceExit?: number;
  }): void {
    if (config.orbitEnter !== undefined)
      (this as any).ORBIT_ENTER_DISTANCE = config.orbitEnter;
    if (config.orbitExit !== undefined)
      (this as any).ORBIT_EXIT_DISTANCE = config.orbitExit;
    if (config.surfaceEnter !== undefined)
      (this as any).SURFACE_ENTER_DISTANCE = config.surfaceEnter;
    if (config.surfaceExit !== undefined)
      (this as any).SURFACE_EXIT_DISTANCE = config.surfaceExit;
  }
}