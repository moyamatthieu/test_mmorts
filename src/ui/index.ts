/**
 * PEEJS — UI Module Index
 *
 * Export centralisé pour l'interface utilisateur.
 */

// === HUD ===
export { HUD, HUD_CONFIG, hud } from './HUD';
export type {
  NotificationType,
  Notification,
  SelectedUnitInfo,
  HUDCallbacks
} from './HUD';

// === SELECTION BOX ===
export { SelectionBox } from './SelectionBox';

// === CORNER UI (existant) ===
export { CornerUI } from './CornerUI';