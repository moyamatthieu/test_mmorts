// src/ui/HUDStyles.ts
/**
 * Styles CSS pour le HUD.
 * 
 * Responsabilité unique:
 * - Centraliser tous les styles CSS-in-JS du HUD
 * - Fournir une fonction d'injection des styles dans le DOM
 * 
 * KISS: Un seul fichier pour tous les styles, pas de duplication.
 */

import { HUD_CONFIG } from './HUDConfig';

/**
 * Styles CSS complets pour le HUD.
 */
export const HUD_STYLES = `
  .hud-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #fff;
    z-index: 1000;
  }
  
  .hud-container * {
    box-sizing: border-box;
  }
  
  /* Top bar - Resources */
  .hud-topbar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4));
    display: flex;
    align-items: center;
    padding: 0 20px;
    gap: 30px;
    pointer-events: auto;
  }
  
  .resource-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .resource-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  
  .resource-value {
    font-size: 14px;
    font-weight: bold;
    min-width: 60px;
  }
  
  .resource-label {
    font-size: 11px;
    opacity: 0.7;
    text-transform: uppercase;
  }
  
  /* Bottom panel - Selection */
  .hud-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6));
    display: flex;
    pointer-events: auto;
  }
  
  /* Selection panel */
  .selection-panel {
    flex: 1;
    padding: 10px;
    display: flex;
    gap: 10px;
  }
  
  .selected-unit {
    width: 60px;
    height: 60px;
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .selected-unit:hover {
    border-color: #4fc3f7;
    background: rgba(79,195,247,0.2);
  }
  
  .selected-unit.primary {
    border-color: #4caf50;
    background: rgba(76,175,80,0.2);
  }
  
  .unit-icon {
    font-size: 24px;
  }
  
  .unit-health-bar {
    width: 50px;
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    margin-top: 4px;
    overflow: hidden;
  }
  
  .unit-health-fill {
    height: 100%;
    background: linear-gradient(to right, #4caf50, #8bc34a);
    transition: width 0.3s;
  }
  
  .unit-health-fill.low {
    background: linear-gradient(to right, #ff5722, #ff9800);
  }
  
  .unit-health-fill.critical {
    background: linear-gradient(to right, #f44336, #e91e63);
  }
  
  /* Unit info panel */
  .unit-info-panel {
    width: 200px;
    padding: 10px;
    border-left: 1px solid rgba(255,255,255,0.2);
  }
  
  .unit-info-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .unit-info-type {
    font-size: 12px;
    opacity: 0.7;
    margin-bottom: 10px;
  }
  
  .unit-stat {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 3px;
  }
  
  .unit-stat-label {
    opacity: 0.7;
  }
  
  /* Orders panel */
  .orders-panel {
    width: 180px;
    padding: 10px;
    border-left: 1px solid rgba(255,255,255,0.2);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
  }
  
  .order-button {
    width: 50px;
    height: 50px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 10px;
    transition: all 0.2s;
  }
  
  .order-button:hover {
    background: rgba(79,195,247,0.3);
    border-color: #4fc3f7;
  }
  
  .order-button:active {
    transform: scale(0.95);
  }
  
  .order-button .icon {
    font-size: 18px;
    margin-bottom: 2px;
  }
  
  /* Minimap */
  .hud-minimap {
    position: absolute;
    bottom: 160px;
    right: 10px;
    width: ${HUD_CONFIG.minimapSize}px;
    height: ${HUD_CONFIG.minimapSize}px;
    background: rgba(0,0,0,0.8);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    pointer-events: auto;
    overflow: hidden;
  }
  
  .minimap-canvas {
    width: 100%;
    height: 100%;
  }
  
  .minimap-viewport {
    position: absolute;
    border: 1px solid #4fc3f7;
    background: rgba(79,195,247,0.1);
    pointer-events: none;
  }
  
  /* Notifications */
  .hud-notifications {
    position: absolute;
    top: 50px;
    right: 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    pointer-events: none;
  }
  
  .notification {
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 13px;
    animation: notificationSlide 0.3s ease-out;
    pointer-events: auto;
  }
  
  @keyframes notificationSlide {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification.INFO {
    background: rgba(33,150,243,0.9);
    border-left: 4px solid #2196f3;
  }
  
  .notification.WARNING {
    background: rgba(255,152,0,0.9);
    border-left: 4px solid #ff9800;
  }
  
  .notification.ERROR {
    background: rgba(244,67,54,0.9);
    border-left: 4px solid #f44336;
  }
  
  .notification.SUCCESS {
    background: rgba(76,175,80,0.9);
    border-left: 4px solid #4caf50;
  }
  
  .notification.COMBAT {
    background: rgba(156,39,176,0.9);
    border-left: 4px solid #9c27b0;
  }
  
  /* Build menu */
  .hud-build-menu {
    position: absolute;
    bottom: 160px;
    left: 10px;
    width: 250px;
    background: rgba(0,0,0,0.9);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    pointer-events: auto;
    display: none;
  }
  
  .hud-build-menu.visible {
    display: block;
  }
  
  .build-menu-header {
    padding: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    font-weight: bold;
    font-size: 14px;
  }
  
  .build-menu-items {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
  }
  
  .build-item {
    width: 50px;
    height: 60px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .build-item:hover {
    background: rgba(79,195,247,0.3);
    border-color: #4fc3f7;
  }
  
  .build-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .build-item .icon {
    font-size: 24px;
  }
  
  .build-item .cost {
    font-size: 10px;
    opacity: 0.7;
  }
  
  /* Control groups */
  .hud-control-groups {
    position: absolute;
    top: 50px;
    left: 10px;
    display: flex;
    gap: 5px;
    pointer-events: auto;
  }
  
  .control-group {
    width: 40px;
    height: 40px;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  
  .control-group:hover {
    border-color: #4fc3f7;
  }
  
  .control-group.active {
    border-color: #4caf50;
    background: rgba(76,175,80,0.3);
  }
  
  .control-group .count {
    font-size: 10px;
    opacity: 0.7;
  }
  
  /* Formation buttons */
  .hud-formations {
    position: absolute;
    top: 100px;
    left: 10px;
    display: flex;
    gap: 5px;
    pointer-events: auto;
  }
  
  .formation-button {
    width: 50px;
    height: 40px;
    background: rgba(0,0,0,0.7);
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 10px;
    transition: all 0.2s;
  }
  
  .formation-button:hover {
    border-color: #4fc3f7;
    background: rgba(79,195,247,0.2);
  }
  
  .formation-button .icon {
    font-size: 16px;
    margin-bottom: 2px;
  }
  
  /* Game time */
  .hud-game-time {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 12px;
    opacity: 0.7;
  }
  
  /* FPS counter */
  .hud-fps {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 12px;
    opacity: 0.7;
  }
`;

/**
 * Injecte les styles du HUD dans le DOM.
 * @returns L'élément <style> créé.
 */
export function injectHUDStyles(): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.textContent = HUD_STYLES;
  document.head.appendChild(styleElement);
  return styleElement;
}

/**
 * Supprime les styles du HUD du DOM.
 * @param styleElement L'élément <style> à supprimer.
 */
export function removeHUDStyles(styleElement: HTMLStyleElement): void {
  styleElement.remove();
}
