// src/ui/MinimapPanel.ts
/**
 * Panel de minimap tactique.
 * 
 * Responsabilité unique:
 * - Afficher une minimap tactique avec canvas
 * - Afficher les entités (amis, ennemis, ressources)
 * - Afficher le viewport de la caméra
 * - Gérer les clics pour navigation rapide
 * 
 * KISS: Canvas 2D simple, pas de complexité inutile.
 */

import { HUD_CONFIG } from './HUDConfig';
import type { HUDCallbacks } from './HUDTypes';

/**
 * Type d'entité sur la minimap.
 */
export type MinimapEntityType = 'friendly' | 'enemy' | 'neutral' | 'resource';

/**
 * Entité affichée sur la minimap.
 */
export interface MinimapEntity {
  x: number;
  z: number;
  type: MinimapEntityType;
}

/**
 * Panel de minimap tactique.
 */
export class MinimapPanel {
  private container: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private viewportIndicator: HTMLDivElement;
  private callbacks: HUDCallbacks = {};

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'hud-minimap';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'minimap-canvas';
    this.canvas.width = HUD_CONFIG.minimapSize;
    this.canvas.height = HUD_CONFIG.minimapSize;
    
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context for minimap canvas');
    }
    this.ctx = ctx;

    // Viewport indicator
    this.viewportIndicator = document.createElement('div');
    this.viewportIndicator.className = 'minimap-viewport';
    this.viewportIndicator.id = 'minimap-viewport';

    // Click handler
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      this.callbacks.onMinimapClick?.(x, y);
    });

    this.container.appendChild(this.canvas);
    this.container.appendChild(this.viewportIndicator);
    parent.appendChild(this.container);
  }

  /**
   * Configure les callbacks.
   */
  setCallbacks(callbacks: HUDCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }

  /**
   * Met à jour la minimap avec les entités et le viewport.
   */
  update(
    entities: MinimapEntity[],
    viewportX: number,
    viewportZ: number,
    viewportWidth: number,
    viewportHeight: number
  ): void {
    const size = HUD_CONFIG.minimapSize;

    // Clear
    this.ctx.fillStyle = 'rgba(0, 30, 60, 0.9)';
    this.ctx.fillRect(0, 0, size, size);

    // Grid
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i < 10; i++) {
      const pos = (i / 10) * size;
      this.ctx.beginPath();
      this.ctx.moveTo(pos, 0);
      this.ctx.lineTo(pos, size);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(0, pos);
      this.ctx.lineTo(size, pos);
      this.ctx.stroke();
    }

    // Entities
    for (const entity of entities) {
      const x = ((entity.x + 500) / 1000) * size; // Normaliser
      const z = ((entity.z + 500) / 1000) * size;

      switch (entity.type) {
        case 'friendly':
          this.ctx.fillStyle = '#4caf50';
          break;
        case 'enemy':
          this.ctx.fillStyle = '#f44336';
          break;
        case 'neutral':
          this.ctx.fillStyle = '#9e9e9e';
          break;
        case 'resource':
          this.ctx.fillStyle = '#ffeb3b';
          break;
      }

      this.ctx.beginPath();
      this.ctx.arc(x, z, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Viewport indicator
    const vpX = ((viewportX + 500) / 1000) * size;
    const vpZ = ((viewportZ + 500) / 1000) * size;
    const vpW = (viewportWidth / 1000) * size;
    const vpH = (viewportHeight / 1000) * size;

    this.viewportIndicator.style.left = `${vpX}px`;
    this.viewportIndicator.style.top = `${vpZ}px`;
    this.viewportIndicator.style.width = `${vpW}px`;
    this.viewportIndicator.style.height = `${vpH}px`;
  }

  /**
   * Détruit le panel.
   */
  dispose(): void {
    this.container.remove();
  }
}
