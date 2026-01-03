// src/ui/CommandPanel.ts
/**
 * Panel de commandes (build menu, control groups, formations).
 * 
 * Responsabilités:
 * - Afficher/gérer le menu de construction d'unités
 * - Afficher/gérer les groupes de contrôle (1-9)
 * - Afficher/gérer les boutons de formation
 * - Afficher FPS et temps de jeu
 * 
 * KISS: Panels DOM simples avec event listeners.
 */

import type { UnitType } from '../types/GameState';
import type { EntityId } from '../types/commands';
import type { HUDCallbacks } from './HUDTypes';

/**
 * Panel de commandes.
 */
export class CommandPanel {
  private buildMenu: HTMLDivElement;
  private controlGroups: HTMLDivElement;
  private formationsPanel: HTMLDivElement;
  private fpsDisplay: HTMLDivElement;
  private gameTimeDisplay: HTMLDivElement;
  
  private callbacks: HUDCallbacks = {};
  private buildMenuVisible: boolean = false;
  private controlGroupsData: Map<number, EntityId[]> = new Map();
  private gameStartTime: number = Date.now();
  private lastFrameTime: number = 0;
  private frameCount: number = 0;
  private currentFPS: number = 60;

  constructor(parent: HTMLElement) {
    this.buildMenu = this.createBuildMenu();
    this.controlGroups = this.createControlGroups();
    this.formationsPanel = this.createFormations();
    this.fpsDisplay = this.createFPSDisplay();
    this.gameTimeDisplay = this.createGameTimeDisplay();

    parent.appendChild(this.buildMenu);
    parent.appendChild(this.controlGroups);
    parent.appendChild(this.formationsPanel);
    parent.appendChild(this.fpsDisplay);
    parent.appendChild(this.gameTimeDisplay);
  }

  /**
   * Crée le menu de construction.
   */
  private createBuildMenu(): HTMLDivElement {
    const menu = document.createElement('div');
    menu.className = 'hud-build-menu';
    menu.innerHTML = `
      <div class="build-menu-header">Construction</div>
      <div class="build-menu-items">
        <div class="build-item" data-unit="FIGHTER">
          <span class="icon">🚀</span>
          <span class="cost">100💰</span>
        </div>
        <div class="build-item" data-unit="CORVETTE">
          <span class="icon">🛸</span>
          <span class="cost">250💰</span>
        </div>
        <div class="build-item" data-unit="FRIGATE">
          <span class="icon">🚢</span>
          <span class="cost">500💰</span>
        </div>
        <div class="build-item" data-unit="DESTROYER">
          <span class="icon">⚓</span>
          <span class="cost">800💰</span>
        </div>
        <div class="build-item" data-unit="CRUISER">
          <span class="icon">🛳️</span>
          <span class="cost">1200💰</span>
        </div>
        <div class="build-item" data-unit="HARVESTER">
          <span class="icon">⛏️</span>
          <span class="cost">300💰</span>
        </div>
        <div class="build-item" data-unit="REPAIR">
          <span class="icon">🔧</span>
          <span class="cost">400💰</span>
        </div>
        <div class="build-item disabled" data-unit="MOTHERSHIP">
          <span class="icon">🌟</span>
          <span class="cost">5000💰</span>
        </div>
      </div>
    `;

    // Event listeners pour les items de construction
    menu.querySelectorAll('.build-item').forEach(item => {
      item.addEventListener('click', () => {
        const unitType = item.getAttribute('data-unit') as UnitType;
        if (!item.classList.contains('disabled')) {
          this.callbacks.onBuildUnit?.(unitType);
        }
      });
    });

    return menu;
  }

  /**
   * Crée les groupes de contrôle.
   */
  private createControlGroups(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'hud-control-groups';

    for (let i = 1; i <= 9; i++) {
      const group = document.createElement('div');
      group.className = 'control-group';
      group.dataset.group = String(i);
      group.innerHTML = `
        <span>${i}</span>
        <span class="count">0</span>
      `;

      group.addEventListener('click', () => {
        this.callbacks.onGroupSelect?.(i);
      });

      group.addEventListener('dblclick', () => {
        this.callbacks.onGroupCreate?.(i);
      });

      container.appendChild(group);
    }

    return container;
  }

  /**
   * Crée le panel de formations.
   */
  private createFormations(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.className = 'hud-formations';
    panel.innerHTML = `
      <button class="formation-button" data-formation="WEDGE" title="Formation V">
        <span class="icon">▼</span>
        <span>Wedge</span>
      </button>
      <button class="formation-button" data-formation="SPHERE" title="Formation Sphère">
        <span class="icon">⬤</span>
        <span>Sphere</span>
      </button>
      <button class="formation-button" data-formation="WALL" title="Formation Mur">
        <span class="icon">▬</span>
        <span>Wall</span>
      </button>
      <button class="formation-button" data-formation="CLAW" title="Formation Pince">
        <span class="icon">⋔</span>
        <span>Claw</span>
      </button>
      <button class="formation-button" data-formation="COLUMN" title="Formation Colonne">
        <span class="icon">▮</span>
        <span>Column</span>
      </button>
    `;

    panel.querySelectorAll('.formation-button').forEach(btn => {
      btn.addEventListener('click', () => {
        const formation = btn.getAttribute('data-formation');
        if (formation) {
          this.callbacks.onFormation?.(formation);
        }
      });
    });

    return panel;
  }

  /**
   * Crée l'affichage FPS.
   */
  private createFPSDisplay(): HTMLDivElement {
    const display = document.createElement('div');
    display.className = 'hud-fps';
    display.textContent = 'FPS: 60';
    return display;
  }

  /**
   * Crée l'affichage du temps de jeu.
   */
  private createGameTimeDisplay(): HTMLDivElement {
    const display = document.createElement('div');
    display.className = 'hud-game-time';
    display.textContent = '00:00:00';
    return display;
  }

  /**
   * Configure les callbacks.
   */
  setCallbacks(callbacks: HUDCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * Toggle le menu de construction.
   */
  toggleBuildMenu(): void {
    this.buildMenuVisible = !this.buildMenuVisible;
    this.buildMenu.classList.toggle('visible', this.buildMenuVisible);
  }

  /**
   * Met à jour un groupe de contrôle.
   */
  updateControlGroup(groupIndex: number, unitIds: EntityId[]): void {
    this.controlGroupsData.set(groupIndex, unitIds);

    const group = this.controlGroups.querySelector(`[data-group="${groupIndex}"]`);
    if (group) {
      const countEl = group.querySelector('.count');
      if (countEl) {
        countEl.textContent = String(unitIds.length);
      }

      if (unitIds.length > 0) {
        group.classList.add('active');
      } else {
        group.classList.remove('active');
      }
    }
  }

  /**
   * Met à jour le FPS.
   */
  updateFPS(): void {
    const now = performance.now();
    this.frameCount++;

    if (now - this.lastFrameTime >= 1000) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.lastFrameTime = now;

      this.fpsDisplay.textContent = `FPS: ${this.currentFPS}`;
    }
  }

  /**
   * Met à jour le temps de jeu.
   */
  updateGameTime(): void {
    const elapsed = Date.now() - this.gameStartTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);

    this.gameTimeDisplay.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  /**
   * Réinitialise le temps de jeu.
   */
  resetGameTime(): void {
    this.gameStartTime = Date.now();
  }

  /**
   * Détruit le panel.
   */
  dispose(): void {
    this.buildMenu.remove();
    this.controlGroups.remove();
    this.formationsPanel.remove();
    this.fpsDisplay.remove();
    this.gameTimeDisplay.remove();
  }
}
