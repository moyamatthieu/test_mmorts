// src/ui/SelectionPanel.ts
/**
 * Panel d'affichage de la sélection d'unités (bottom panel).
 * 
 * Responsabilités:
 * - Afficher les unités sélectionnées avec icônes et barres de santé
 * - Afficher les détails de l'unité principale
 * - Afficher les boutons de commande
 * 
 * KISS: Manipulation DOM directe, pas de framework.
 */

import type { UnitType } from '../types/GameState';
import type { SelectedUnitInfo, HUDCallbacks } from './HUDTypes';

/**
 * Panel de sélection d'unités.
 */
export class SelectionPanel {
  private container: HTMLDivElement;
  private selectionPanel: HTMLDivElement;
  private unitInfoPanel: HTMLDivElement;
  private ordersPanel: HTMLDivElement;
  private callbacks: HUDCallbacks = {};

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'hud-bottom';

    // Panel de sélection
    this.selectionPanel = document.createElement('div');
    this.selectionPanel.className = 'selection-panel';
    this.selectionPanel.id = 'selection-panel';

    // Info panel
    this.unitInfoPanel = document.createElement('div');
    this.unitInfoPanel.className = 'unit-info-panel';
    this.unitInfoPanel.id = 'unit-info-panel';
    this.unitInfoPanel.innerHTML = `
      <div class="unit-info-name">Aucune sélection</div>
      <div class="unit-info-type">-</div>
    `;

    // Orders panel
    this.ordersPanel = document.createElement('div');
    this.ordersPanel.className = 'orders-panel';
    this.buildOrdersPanel();

    this.container.appendChild(this.selectionPanel);
    this.container.appendChild(this.unitInfoPanel);
    this.container.appendChild(this.ordersPanel);
    parent.appendChild(this.container);
  }

  /**
   * Construit le panel d'ordres avec event listeners.
   */
  private buildOrdersPanel(): void {
    this.ordersPanel.innerHTML = `
      <button class="order-button" id="order-move" title="Déplacer (M)">
        <span class="icon">➡️</span>
        <span>Move</span>
      </button>
      <button class="order-button" id="order-attack" title="Attaquer (A)">
        <span class="icon">⚔️</span>
        <span>Attack</span>
      </button>
      <button class="order-button" id="order-stop" title="Stop (S)">
        <span class="icon">🛑</span>
        <span>Stop</span>
      </button>
      <button class="order-button" id="order-patrol" title="Patrouiller (P)">
        <span class="icon">🔄</span>
        <span>Patrol</span>
      </button>
      <button class="order-button" id="order-defend" title="Défendre (D)">
        <span class="icon">🛡️</span>
        <span>Defend</span>
      </button>
      <button class="order-button" id="order-build" title="Construire (B)">
        <span class="icon">🏗️</span>
        <span>Build</span>
      </button>
    `;

    // Event listeners
    this.ordersPanel.querySelector('#order-move')?.addEventListener('click', () => {
      this.callbacks.onOrderMove?.();
    });
    this.ordersPanel.querySelector('#order-attack')?.addEventListener('click', () => {
      this.callbacks.onOrderAttack?.();
    });
    this.ordersPanel.querySelector('#order-stop')?.addEventListener('click', () => {
      this.callbacks.onOrderStop?.();
    });
    this.ordersPanel.querySelector('#order-patrol')?.addEventListener('click', () => {
      this.callbacks.onOrderPatrol?.();
    });
  }

  /**
   * Configure les callbacks.
   */
  setCallbacks(callbacks: HUDCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * Met à jour les unités sélectionnées.
   */
  update(units: SelectedUnitInfo[]): void {
    // Vider le panel de sélection
    this.selectionPanel.innerHTML = '';

    // Ajouter les unités sélectionnées (max 15)
    units.slice(0, 15).forEach((unit, index) => {
      const el = document.createElement('div');
      el.className = `selected-unit ${index === 0 ? 'primary' : ''}`;

      const healthPercent = unit.health / unit.maxHealth;
      let healthClass = '';
      if (healthPercent <= 0.25) healthClass = 'critical';
      else if (healthPercent <= 0.5) healthClass = 'low';

      el.innerHTML = `
        <span class="unit-icon">${this.getUnitIcon(unit.type)}</span>
        <div class="unit-health-bar">
          <div class="unit-health-fill ${healthClass}" style="width: ${healthPercent * 100}%"></div>
        </div>
      `;

      this.selectionPanel.appendChild(el);
    });

    // Mettre à jour le panel d'info
    if (units.length > 0) {
      const primary = units[0];
      this.unitInfoPanel.innerHTML = `
        <div class="unit-info-name">${primary.name}</div>
        <div class="unit-info-type">${primary.type}</div>
        <div class="unit-stat">
          <span class="unit-stat-label">Santé</span>
          <span>${primary.health}/${primary.maxHealth}</span>
        </div>
        ${primary.shield !== undefined ? `
          <div class="unit-stat">
            <span class="unit-stat-label">Bouclier</span>
            <span>${primary.shield}/${primary.maxShield}</span>
          </div>
        ` : ''}
        ${units.length > 1 ? `
          <div class="unit-stat">
            <span class="unit-stat-label">Total sélectionné</span>
            <span>${units.length} unités</span>
          </div>
        ` : ''}
      `;
    } else {
      this.unitInfoPanel.innerHTML = `
        <div class="unit-info-name">Aucune sélection</div>
        <div class="unit-info-type">-</div>
      `;
    }
  }

  /**
   * Retourne l'icône emoji pour un type d'unité.
   */
  private getUnitIcon(type: UnitType): string {
    const icons: Record<UnitType, string> = {
      FIGHTER: '🚀',
      CORVETTE: '🛸',
      FRIGATE: '🚢',
      DESTROYER: '⚓',
      CRUISER: '🛳️',
      MOTHERSHIP: '🌟',
      HARVESTER: '⛏️',
      REPAIR: '🔧',
      RESEARCH: '🔬'
    };
    return icons[type] || '❓';
  }

  /**
   * Détruit le panel.
   */
  dispose(): void {
    this.container.remove();
  }
}
