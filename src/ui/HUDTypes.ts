// src/ui/HUDTypes.ts
/**
 * Types pour le système HUD.
 * 
 * Responsabilité unique:
 * - Définir les types et interfaces pour le HUD
 * 
 * KISS: Types simples et clairs.
 */

import type { EntityId } from '../types/commands';
import type { UnitType } from '../types/GameState';

/**
 * Type de notification.
 */
export type NotificationType = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'COMBAT';

/**
 * Notification affichée dans le HUD.
 */
export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: number;
}

/**
 * Informations d'une unité sélectionnée.
 */
export interface SelectedUnitInfo {
  id: EntityId;
  type: UnitType;
  name: string;
  health: number;
  maxHealth: number;
  shield?: number;
  maxShield?: number;
}

/**
 * Callbacks pour les actions du HUD.
 */
export interface HUDCallbacks {
  onBuildUnit?: (unitType: UnitType) => void;
  onFormation?: (type: string) => void;
  onOrderAttack?: () => void;
  onOrderMove?: () => void;
  onOrderStop?: () => void;
  onOrderPatrol?: () => void;
  onGroupCreate?: (groupIndex: number) => void;
  onGroupSelect?: (groupIndex: number) => void;
  onMinimapClick?: (x: number, y: number) => void;
}
