// src/ui/HUD.ts
/**
 * HUD (Heads-Up Display) principal du jeu.
 * 
 * Responsabilité unique:
 * - Coordonner tous les panneaux du HUD
 * - Connecter les panneaux à l'EventBus
 * - Fournir une API unifiée pour le reste du jeu
 * 
 * KISS: Coordinateur simple qui délègue aux composants spécialisés.
 */

import type { EntityId } from '../types/commands';
import type { Resources } from '../types/GameState';
import { eventBus } from '../core/EventBus';
import { injectHUDStyles, removeHUDStyles } from './HUDStyles';
import { ResourcePanel } from './ResourcePanel';
import { SelectionPanel } from './SelectionPanel';
import { MinimapPanel } from './MinimapPanel';
import { NotificationPanel } from './NotificationPanel';
import { CommandPanel } from './CommandPanel';

// Re-export des types pour compatibilité
export type { NotificationType, Notification, SelectedUnitInfo, HUDCallbacks } from './HUDTypes';
export { HUD_CONFIG } from './HUDConfig';


/**
 * HUD principal du jeu - Coordinateur.
 */
export class HUD {
  private container: HTMLDivElement;
  private styleElement: HTMLStyleElement;
  
  // Composants du HUD
  private resourcePanel: ResourcePanel;
  private selectionPanel: SelectionPanel;
  private minimapPanel: MinimapPanel;
  private notificationPanel: NotificationPanel;
  private commandPanel: CommandPanel;

  constructor() {
    // Créer le conteneur principal
    this.container = document.createElement('div');
    this.container.className = 'hud-container';
    
    // Ajouter les styles
    this.styleElement = injectHUDStyles();
    
    // Créer les composants
    this.resourcePanel = new ResourcePanel(this.container);
    this.selectionPanel = new SelectionPanel(this.container);
    this.minimapPanel = new MinimapPanel(this.container);
    this.notificationPanel = new NotificationPanel(this.container);
    this.commandPanel = new CommandPanel(this.container);
    
    // Ajouter au DOM
    document.body.appendChild(this.container);
  }

  // ============================================================================
  // API publique - Délégation aux composants
  // ============================================================================
  
  /**
   * Configure les callbacks.
   */
  setCallbacks(callbacks: import('./HUDTypes').HUDCallbacks): void {
    this.selectionPanel.setCallbacks(callbacks);
    this.minimapPanel.setCallbacks(callbacks);
    this.commandPanel.setCallbacks(callbacks);
  }
  
  /**
   * Met à jour les ressources affichées.
   */
  updateResources(resources: Resources): void {
    this.resourcePanel.update(resources);
  }
  
  /**
   * Met à jour les unités sélectionnées.
   */
  updateSelection(units: import('./HUDTypes').SelectedUnitInfo[]): void {
    this.selectionPanel.update(units);
  }
  
  /**
   * Ajoute une notification.
   */
  addNotification(type: import('./HUDTypes').NotificationType, message: string): void {
    this.notificationPanel.add(type, message);
  }
  
  /**
   * Alias pour addNotification (compatibilité).
   */
  showNotification(type: import('./HUDTypes').NotificationType, message: string): void {
    this.notificationPanel.show(type, message);
  }
  
  /**
   * Met à jour la minimap.
   */
  updateMinimap(
    entities: Array<{ x: number; z: number; type: 'friendly' | 'enemy' | 'neutral' | 'resource' }>,
    viewportX: number,
    viewportZ: number,
    viewportWidth: number,
    viewportHeight: number
  ): void {
    this.minimapPanel.update(entities, viewportX, viewportZ, viewportWidth, viewportHeight);
  }
  
  /**
   * Met à jour le groupe de contrôle.
   */
  updateControlGroup(groupIndex: number, unitIds: EntityId[]): void {
    this.commandPanel.updateControlGroup(groupIndex, unitIds);
  }
  
  /**
   * Met à jour le FPS.
   */
  updateFPS(): void {
    this.commandPanel.updateFPS();
  }
  
  /**
   * Met à jour le temps de jeu.
   */
  updateGameTime(): void {
    this.commandPanel.updateGameTime();
  }
  
  /**
   * Toggle le menu de construction.
   */
  toggleBuildMenu(): void {
    this.commandPanel.toggleBuildMenu();
  }

  // ============================================================================
  // Méthodes de compatibilité avec CornerUI (pour SceneManager)
  // ============================================================================
  
  /**
   * Affiche un message de log comme notification.
   */
  logMessage(message: string): void {
    this.addNotification('INFO', message);
  }
  
  /**
   * Met à jour les infos de debug caméra (affiché en bas à gauche).
   */
  updateCameraDebug(pos: { x: number; y: number; z: number }, lookAt: { x: number; y: number; z: number }): void {
    let debugEl = document.getElementById('hud-camera-debug');
    if (!debugEl) {
      debugEl = document.createElement('div');
      debugEl.id = 'hud-camera-debug';
      debugEl.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #00ff00;
        padding: 8px 12px;
        border-radius: 4px;
        font-family: monospace;
        font-size: 10px;
        pointer-events: none;
        z-index: 1001;
      `;
      document.body.appendChild(debugEl);
    }

    const dist = Math.sqrt(
      Math.pow(pos.x - lookAt.x, 2) +
      Math.pow(pos.y - lookAt.y, 2) +
      Math.pow(pos.z - lookAt.z, 2)
    );

    debugEl.innerHTML = `
      📷 Pos: ${pos.x.toFixed(1)}, ${pos.y.toFixed(1)}, ${pos.z.toFixed(1)}<br>
      🎯 Look: ${lookAt.x.toFixed(1)}, ${lookAt.y.toFixed(1)}, ${lookAt.z.toFixed(1)}<br>
      📏 Dist: ${dist.toFixed(1)}
    `;
  }
  
  /**
   * Met à jour les infos du cluster sélectionné.
   */
  updateClusterInfo(info: { clusters: number; cubes: number; size: string }): void {
    console.log('[HUD] Cluster info:', info);
  }
  
  /**
   * Met à jour le soleil sélectionné.
   */
  updateSelectedSun(sunMetadata: any): void {
    if (!sunMetadata) {
      const panel = document.getElementById('hud-sun-panel');
      if (panel) panel.style.display = 'none';
      return;
    }

    let panel = document.getElementById('hud-sun-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'hud-sun-panel';
      panel.style.cssText = `
        position: fixed;
        top: 60px;
        right: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: #ffcc00;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #ffcc00;
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        min-width: 200px;
        pointer-events: auto;
        z-index: 1001;
      `;
      document.body.appendChild(panel);
    }

    panel.style.display = 'block';
    panel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">⭐ ${sunMetadata.name}</div>
      <div style="line-height: 1.6; font-size: 11px;">
        <div>🌡️ Température: <span style="color: #ff6600;">${Math.round(sunMetadata.temperature)}K</span></div>
        <div>📏 Rayon: <span style="color: #ffaa00;">${(sunMetadata.radius * 1000).toFixed(0)} km</span></div>
        <div>⚖️ Masse: <span style="color: #ffaa00;">${sunMetadata.mass?.toFixed(2) || 'N/A'}</span></div>
        <div style="margin-top: 6px; color: #888; font-size: 10px;">Double-clic ou Entrée pour explorer</div>
      </div>
    `;
  }
  
  /**
   * Met à jour le cluster sélectionné.
   */
  updateSelectedCluster(clusterId: string | null, globalCoords?: { gx: number; gz: number } | null): void {
    if (!clusterId) {
      const panel = document.getElementById('hud-cluster-panel');
      if (panel) panel.style.display = 'none';
      return;
    }

    let panel = document.getElementById('hud-cluster-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'hud-cluster-panel';
      panel.style.cssText = `
        position: fixed;
        top: 60px;
        right: 10px;
        background: rgba(0, 0, 0, 0.85);
        color: #00ffff;
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #00ffff;
        font-family: 'Segoe UI', sans-serif;
        font-size: 12px;
        min-width: 180px;
        pointer-events: auto;
        z-index: 1001;
      `;
      document.body.appendChild(panel);
    }

    panel.style.display = 'block';
    const coordsText = globalCoords ? `[${globalCoords.gx}, ${globalCoords.gz}]` : '';
    panel.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 8px;">📦 Cluster ${coordsText}</div>
      <div style="font-size: 11px; color: #888;">ID: ${clusterId}</div>
    `;
  }
  
  /**
   * Affiche/masque le HUD.
   */
  setVisible(visible: boolean): void {
    this.container.style.display = visible ? 'block' : 'none';
  }
  
  /**
   * Connecte le HUD au système d'événements pour mise à jour automatique.
   * S'abonne aux événements de l'EventBus.
   */
  connectToEventBus(): void {
    // Ressources changées
    eventBus.on('resources:changed', (data) => {
      this.updateResources(data.resources as any);
    });

    // Sélection changée
    eventBus.on('selection:changed', (data) => {
      // Convertir les IDs en infos d'unité (simplifié)
      const units: import('./HUDTypes').SelectedUnitInfo[] = data.unitIds.map((id, _idx) => ({
        id,
        type: 'FIGHTER' as any,
        name: `Unit ${id}`,
        health: 100,
        maxHealth: 100,
        shield: 50,
        maxShield: 50
      }));
      this.updateSelection(units);
    });

    // Sélection effacée
    eventBus.on('selection:cleared', () => {
      this.updateSelection([]);
    });

    // Notifications UI
    eventBus.on('ui:notification', (data) => {
      this.showNotification(data.type.toUpperCase() as any, data.message);
    });

    // Unité détruite -> notification
    eventBus.on('unit:destroyed', (data) => {
      this.showNotification('COMBAT', `Unité ${data.unitId} détruite!`);
    });

    // Combat démarré
    eventBus.on('combat:started', (_data) => {
      this.showNotification('COMBAT', 'Combat engagé!');
    });

    // Partie démarrée
    eventBus.on('game:start', (data) => {
      this.showNotification('SUCCESS', `Partie démarrée! Joueur: ${data.playerName}`);
      this.commandPanel.resetGameTime();
    });

    // Joueur rejoint
    eventBus.on('net:player-joined', (data) => {
      this.showNotification('INFO', `${data.playerName} a rejoint la partie`);
    });

    // Joueur parti
    eventBus.on('net:player-left', (data) => {
      this.showNotification('WARNING', `${data.playerId} a quitté la partie`);
    });

    console.log('[HUD] Connected to EventBus');
  }
  
  /**
   * Réinitialise le temps de jeu.
   */
  resetGameTime(): void {
    this.commandPanel.resetGameTime();
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Détruit le HUD.
   */
  dispose(): void {
    this.resourcePanel.dispose();
    this.selectionPanel.dispose();
    this.minimapPanel.dispose();
    this.notificationPanel.dispose();
    this.commandPanel.dispose();
    this.container.remove();
    removeHUDStyles(this.styleElement);
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale du HUD */
export const hud = new HUD();
