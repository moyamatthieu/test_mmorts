/**
 * PEEJS — Universe Module Index
 *
 * Export centralisé pour la génération procédurale et la persistance.
 */

// === GALAXY GENERATOR ===
export { GalaxyGenerator, GALAXY_CONFIG, galaxyGenerator } from './GalaxyGenerator';
export type {
  StarType,
  PlanetType,
  ResourceType as UniverseResourceType,
  StarData,
  PlanetData,
  MoonData,
  ResourceDeposit,
  AsteroidFieldData,
  SystemData,
  GalaxyData,
} from './GalaxyGenerator';

// === PERSISTENCE ===
export { Persistence, PERSISTENCE_CONFIG, DEFAULT_SETTINGS } from './Persistence';
export type {
  SavedGame,
  PlayerProfile,
  GameSettings,
} from './Persistence';