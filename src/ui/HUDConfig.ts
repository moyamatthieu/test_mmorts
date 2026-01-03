// src/ui/HUDConfig.ts
/**
 * Configuration du HUD.
 * 
 * Responsabilité unique:
 * - Centraliser toutes les constantes de configuration du HUD
 * 
 * KISS: Un objet simple avec toutes les configurations.
 */

/**
 * Configuration globale du HUD.
 */
export const HUD_CONFIG = {
  /** Durée d'affichage des notifications (ms) */
  notificationDuration: 3000,
  
  /** Nombre max de notifications affichées */
  maxNotifications: 5,
  
  /** Intervalle de mise à jour du HUD (ms) */
  updateInterval: 100,
  
  /** Taille de la minimap (px) */
  minimapSize: 200,
} as const;
