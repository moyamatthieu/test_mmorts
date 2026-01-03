/**
 * PEEJS — Effects Module Index
 *
 * Export centralisé pour les effets visuels.
 */

// === EFFECTS MANAGER ===
export { EffectsManager } from './EffectsManager';
export type {
  EffectType,
  Effect,
  ExplosionConfig,
  BeamConfig,
  ProjectileConfig,
  TrailConfig,
} from './EffectsManager';

/**
 * EffectConfig — Union de toutes les configurations d'effets possibles
 */
export type EffectConfig =
  | import('./EffectsManager').ExplosionConfig
  | import('./EffectsManager').BeamConfig
  | import('./EffectsManager').ProjectileConfig
  | import('./EffectsManager').TrailConfig;

/**
 * ActiveEffect — Alias vers Effect (effets actifs dans la scène)
 * @deprecated Utiliser Effect directement
 */
export type ActiveEffect = import('./EffectsManager').Effect;