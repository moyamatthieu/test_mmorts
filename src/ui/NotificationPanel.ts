// src/ui/NotificationPanel.ts
/**
 * Panel des notifications.
 * 
 * Responsabilité unique:
 * - Afficher les notifications temporaires
 * - Gérer l'expiration automatique
 * - Limiter le nombre de notifications affichées
 * 
 * KISS: Liste simple avec auto-suppression par timeout.
 */

import { HUD_CONFIG } from './HUDConfig';
import type { Notification, NotificationType } from './HUDTypes';

/**
 * Panel des notifications.
 */
export class NotificationPanel {
  private container: HTMLDivElement;
  private notifications: Notification[] = [];

  constructor(parent: HTMLElement) {
    this.container = document.createElement('div');
    this.container.className = 'hud-notifications';
    this.container.id = 'notifications';
    parent.appendChild(this.container);
  }

  /**
   * Ajoute une notification.
   */
  add(type: NotificationType, message: string): void {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const notification: Notification = {
      id,
      type,
      message,
      timestamp: Date.now()
    };

    this.notifications.push(notification);

    // Limiter le nombre de notifications
    while (this.notifications.length > HUD_CONFIG.maxNotifications) {
      const removed = this.notifications.shift();
      if (removed) {
        document.getElementById(removed.id)?.remove();
      }
    }

    // Afficher la notification
    const el = document.createElement('div');
    el.id = id;
    el.className = `notification ${type}`;
    el.textContent = message;
    this.container.appendChild(el);

    // Supprimer après le délai
    setTimeout(() => {
      el.remove();
      this.notifications = this.notifications.filter(n => n.id !== id);
    }, HUD_CONFIG.notificationDuration);
  }

  /**
   * Alias pour add (compatibilité).
   */
  show(type: NotificationType, message: string): void {
    this.add(type, message);
  }

  /**
   * Détruit le panel.
   */
  dispose(): void {
    this.container.remove();
  }
}
