// src/ui/ResourcePanel.ts
/**
 * Panel d'affichage des ressources (topbar).
 * 
 * Responsabilité unique:
 * - Afficher les ressources du joueur en haut de l'écran
 * - Mettre à jour l'affichage quand les ressources changent
 * 
 * KISS: Création/mise à jour DOM simple sans framework.
 */

import type { Resources } from '../types/GameState';

/**
 * Panel des ressources du joueur.
 */
export class ResourcePanel {
  private container: HTMLDivElement;

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'hud-topbar';
    this.build();
    parent.appendChild(this.container);
  }

  /**
   * Construit le HTML du panel des ressources.
   */
  private build(): void {
    this.container.innerHTML = `
      <div class="resource-item">
        <div class="resource-icon">💰</div>
        <div>
          <div class="resource-value" id="res-credits">1000</div>
          <div class="resource-label">Crédits</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">🔩</div>
        <div>
          <div class="resource-value" id="res-metal">500</div>
          <div class="resource-label">Métal</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">💎</div>
        <div>
          <div class="resource-value" id="res-crystal">100</div>
          <div class="resource-label">Cristaux</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">⛽</div>
        <div>
          <div class="resource-value" id="res-fuel">200</div>
          <div class="resource-label">Carburant</div>
        </div>
      </div>
      <div class="resource-item">
        <div class="resource-icon">👥</div>
        <div>
          <div class="resource-value" id="res-population">0/100</div>
          <div class="resource-label">Population</div>
        </div>
      </div>
    `;
  }

  /**
   * Met à jour les ressources affichées.
   */
  update(resources: Resources): void {
    const credits = document.getElementById('res-credits');
    const metal = document.getElementById('res-metal');
    const crystal = document.getElementById('res-crystal');
    const fuel = document.getElementById('res-fuel');
    const population = document.getElementById('res-population');

    if (credits) credits.textContent = String(resources.credits);
    if (metal) metal.textContent = String(resources.metal);
    if (crystal) crystal.textContent = String(resources.crystal);
    if (fuel) fuel.textContent = String(resources.fuel);
    if (population) population.textContent = `${resources.population}/100`;
  }

  /**
   * Détruit le panel.
   */
  dispose(): void {
    this.container.remove();
  }
}
