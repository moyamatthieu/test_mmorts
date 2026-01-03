/**
 * PEEJS — AI Module Index
 *
 * Export centralisé pour l'intelligence artificielle et les formations.
 */

// === TACTICAL AI ===
export {
  TacticalAI,
  tacticalAI,
  createDefaultAIState,
  AI_CONFIG,
} from './TacticalAI';
export type {
  ThreatAssessment,
  AIBehavior,
  ThreatLevel,
  AIState,
  Vector3Data,
  UnitAIData,
} from './TacticalAI';

/**
 * Alias pour compatibilité — TacticalDecision représente une décision IA
 * @deprecated Utiliser AIState directement
 */
export type TacticalDecision = import('./TacticalAI').AIState;

// === FORMATION MANAGER ===
export {
  FormationManager,
  formationManager,
  FORMATION_CONFIG,
} from './FormationManager';
export type {
  FormationType,
  Vector3 as FormationVector3,
  FormationSlot,
  Formation,
  FormationConfig,
} from './FormationManager';

/**
 * Alias pour compatibilité — FormationInstance est équivalent à Formation
 * @deprecated Utiliser Formation directement
 */
export type FormationInstance = import('./FormationManager').Formation;