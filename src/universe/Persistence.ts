// src/universe/Persistence.ts
/**
 * Système de persistance utilisant IndexedDB.
 * 
 * Responsabilités:
 * - Sauvegarder l'état du jeu
 * - Charger l'état du jeu
 * - Gérer les profils joueur
 * - Sauvegarder la galaxie générée
 * 
 * KISS: Wrapper simple autour de IndexedDB, pas d'ORM complexe.
 */

import type { GalaxyData, SystemData } from './GalaxyGenerator';
import type { GameState, PlayerState } from '../types/GameState';

// ============================================================================
// Configuration
// ============================================================================

export const PERSISTENCE_CONFIG = {
  /** Nom de la base de données */
  dbName: 'peejs-game',
  
  /** Version de la base de données */
  dbVersion: 2,  // Incrémenté pour ajout du store entities
  
  /** Stores (tables) */
  stores: {
    gameState: 'game-state',
    galaxies: 'galaxies',
    systems: 'systems',
    players: 'players',
    settings: 'settings',
    entities: 'entities',       // NOUVEAU: vaisseaux et structures
    orbitalGrids: 'orbital-grids', // NOUVEAU: grilles orbitales
    surfaceGrids: 'surface-grids'  // NOUVEAU: grilles de surface
  },
  
  /** Intervalle d'auto-save (ms) */
  autoSaveInterval: 60000,
};

// ============================================================================
// Types
// ============================================================================

export interface SavedGame {
  id: string;
  name: string;
  timestamp: number;
  galaxySeed: number;
  playerCount: number;
  gameTime: number;
  preview?: string;  // Screenshot base64
}

export interface PlayerProfile {
  id: string;
  name: string;
  color: number;
  createdAt: number;
  stats: {
    gamesPlayed: number;
    victories: number;
    unitsBuilt: number;
    unitsDestroyed: number;
    resourcesCollected: number;
  };
}

export interface GameSettings {
  musicVolume: number;
  sfxVolume: number;
  graphicsQuality: 'low' | 'medium' | 'high' | 'ultra';
  showFPS: boolean;
  showMinimap: boolean;
  autoSave: boolean;
  cameraSpeed: number;
  zoomSpeed: number;
}

export const DEFAULT_SETTINGS: GameSettings = {
  musicVolume: 0.7,
  sfxVolume: 0.8,
  graphicsQuality: 'high',
  showFPS: true,
  showMinimap: true,
  autoSave: true,
  cameraSpeed: 1.0,
  zoomSpeed: 1.0
};

// ============================================================================
// Classe Persistence
// ============================================================================

/**
 * Gestionnaire de persistance via IndexedDB.
 */
export class Persistence {
  private db: IDBDatabase | null = null;
  private dbReady: Promise<boolean>;
  private autoSaveTimer: number | null = null;
  
  constructor() {
    this.dbReady = this.initDatabase();
  }
  
  // ============================================================================
  // Initialisation
  // ============================================================================
  
  /**
   * Initialise la base de données IndexedDB.
   */
  private async initDatabase(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        console.warn('[Persistence] IndexedDB non supporté');
        resolve(false);
        return;
      }
      
      const request = indexedDB.open(
        PERSISTENCE_CONFIG.dbName,
        PERSISTENCE_CONFIG.dbVersion
      );
      
      request.onerror = () => {
        console.error('[Persistence] Erreur ouverture DB:', request.error);
        reject(request.error);
      };
      
      request.onsuccess = () => {
        this.db = request.result;
        console.log('[Persistence] Base de données ouverte');
        resolve(true);
      };
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createStores(db);
      };
    });
  }
  
  /**
   * Crée les object stores nécessaires.
   */
  private createStores(db: IDBDatabase): void {
    const stores = PERSISTENCE_CONFIG.stores;
    
    // Game state store
    if (!db.objectStoreNames.contains(stores.gameState)) {
      const gameStore = db.createObjectStore(stores.gameState, { keyPath: 'id' });
      gameStore.createIndex('timestamp', 'timestamp', { unique: false });
    }
    
    // Galaxies store
    if (!db.objectStoreNames.contains(stores.galaxies)) {
      const galaxyStore = db.createObjectStore(stores.galaxies, { keyPath: 'seed' });
      galaxyStore.createIndex('name', 'name', { unique: false });
    }
    
    // Systems store (pour lazy loading)
    if (!db.objectStoreNames.contains(stores.systems)) {
      const systemStore = db.createObjectStore(stores.systems, { keyPath: 'id' });
      systemStore.createIndex('seed', 'seed', { unique: false });
      systemStore.createIndex('cluster', ['clusterX', 'clusterZ'], { unique: false });
    }
    
    // Players store
    if (!db.objectStoreNames.contains(stores.players)) {
      const playerStore = db.createObjectStore(stores.players, { keyPath: 'id' });
      playerStore.createIndex('name', 'name', { unique: false });
    }
    
    // Settings store
    if (!db.objectStoreNames.contains(stores.settings)) {
      db.createObjectStore(stores.settings, { keyPath: 'key' });
    }
    
    // Entities store (vaisseaux, structures)
    if (!db.objectStoreNames.contains(stores.entities)) {
      const entityStore = db.createObjectStore(stores.entities, { keyPath: 'id' });
      entityStore.createIndex('ownerId', 'ownerId', { unique: false });
      entityStore.createIndex('type', 'type', { unique: false });
      entityStore.createIndex('category', 'category', { unique: false });
    }
    
    // Orbital grids store (construction orbitale)
    if (!db.objectStoreNames.contains(stores.orbitalGrids)) {
      db.createObjectStore(stores.orbitalGrids, { keyPath: 'planetKey' });
    }
    
    // Surface grids store (construction au sol)
    if (!db.objectStoreNames.contains(stores.surfaceGrids)) {
      db.createObjectStore(stores.surfaceGrids, { keyPath: 'planetKey' });
    }
    
    console.log('[Persistence] Stores créés');
  }
  
  /**
   * Attend que la DB soit prête.
   */
  async waitReady(): Promise<boolean> {
    return this.dbReady;
  }
  
  // ============================================================================
  // Opérations génériques
  // ============================================================================
  
  /**
   * Exécute une transaction sur un store.
   */
  private async transaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    await this.dbReady;
    
    if (!this.db) {
      throw new Error('Base de données non initialisée');
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = operation(store);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Récupère toutes les entrées d'un store.
   */
  private async getAll<T>(storeName: string): Promise<T[]> {
    return this.transaction(storeName, 'readonly', (store) => store.getAll());
  }
  
  /**
   * Récupère une entrée par clé.
   */
  private async get<T>(storeName: string, key: IDBValidKey): Promise<T | undefined> {
    return this.transaction(storeName, 'readonly', (store) => store.get(key));
  }
  
  /**
   * Ajoute ou met à jour une entrée.
   */
  private async put<T>(storeName: string, value: T): Promise<IDBValidKey> {
    return this.transaction(storeName, 'readwrite', (store) => store.put(value));
  }
  
  /**
   * Supprime une entrée.
   */
  private async delete(storeName: string, key: IDBValidKey): Promise<void> {
    await this.transaction(storeName, 'readwrite', (store) => store.delete(key));
  }
  
  // ============================================================================
  // Sauvegarde de partie
  // ============================================================================
  
  /**
   * Sauvegarde l'état du jeu.
   */
  async saveGame(
    saveId: string,
    saveName: string,
    gameState: GameState,
    galaxyData: GalaxyData,
    preview?: string
  ): Promise<void> {
    const stores = PERSISTENCE_CONFIG.stores;
    
    // Sauvegarder les métadonnées de la sauvegarde
    const savedGame: SavedGame = {
      id: saveId,
      name: saveName,
      timestamp: Date.now(),
      galaxySeed: galaxyData.seed,
      playerCount: gameState.players.size,
      gameTime: gameState.gameTime,
      preview
    };
    
    await this.put(stores.gameState, savedGame);
    
    // Sauvegarder la galaxie (sans les systèmes détaillés)
    const galaxyMeta = {
      seed: galaxyData.seed,
      name: galaxyData.name,
      clusterSize: galaxyData.clusterSize,
      clustersX: galaxyData.clustersX,
      clustersZ: galaxyData.clustersZ
    };
    
    await this.put(stores.galaxies, galaxyMeta);
    
    // Sauvegarder les systèmes modifiés (découverts ou avec changements)
    for (const system of galaxyData.systems.values()) {
      if (system.discovered || system.ownerId) {
        await this.put(stores.systems, system);
      }
    }
    
    // Sauvegarder les joueurs
    for (const player of gameState.players.values()) {
      await this.put(stores.players, player);
    }
    
    console.log(`[Persistence] Partie sauvegardée: ${saveName}`);
  }
  
  /**
   * Charge une partie sauvegardée.
   */
  async loadGame(saveId: string): Promise<{
    savedGame: SavedGame;
    galaxyData: Partial<GalaxyData>;
    systems: SystemData[];
    players: PlayerState[];
  } | null> {
    const stores = PERSISTENCE_CONFIG.stores;
    
    // Charger les métadonnées
    const savedGame = await this.get<SavedGame>(stores.gameState, saveId);
    if (!savedGame) {
      console.warn(`[Persistence] Sauvegarde non trouvée: ${saveId}`);
      return null;
    }
    
    // Charger la galaxie
    const galaxyData = await this.get<Partial<GalaxyData>>(stores.galaxies, savedGame.galaxySeed);
    if (!galaxyData) {
      console.warn(`[Persistence] Galaxie non trouvée: ${savedGame.galaxySeed}`);
      return null;
    }
    
    // Charger les systèmes modifiés
    const allSystems = await this.getAll<SystemData>(stores.systems);
    const systems = allSystems.filter(s => s.seed.toString().startsWith(savedGame.galaxySeed.toString()));
    
    // Charger les joueurs
    const players = await this.getAll<PlayerState>(stores.players);
    
    console.log(`[Persistence] Partie chargée: ${savedGame.name}`);
    
    return { savedGame, galaxyData, systems, players };
  }
  
  /**
   * Supprime une sauvegarde.
   */
  async deleteGame(saveId: string): Promise<void> {
    const stores = PERSISTENCE_CONFIG.stores;
    await this.delete(stores.gameState, saveId);
    console.log(`[Persistence] Sauvegarde supprimée: ${saveId}`);
  }
  
  /**
   * Liste toutes les sauvegardes.
   */
  async listSaves(): Promise<SavedGame[]> {
    const saves = await this.getAll<SavedGame>(PERSISTENCE_CONFIG.stores.gameState);
    return saves.sort((a, b) => b.timestamp - a.timestamp);
  }
  
  // ============================================================================
  // Auto-save
  // ============================================================================
  
  /**
   * Démarre l'auto-save.
   */
  startAutoSave(
    getGameState: () => GameState,
    getGalaxyData: () => GalaxyData
  ): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
    
    this.autoSaveTimer = window.setInterval(async () => {
      try {
        const gameState = getGameState();
        const galaxyData = getGalaxyData();
        
        await this.saveGame(
          'autosave',
          'Auto-save',
          gameState,
          galaxyData
        );
        
        console.log('[Persistence] Auto-save effectué');
      } catch (error) {
        console.error('[Persistence] Erreur auto-save:', error);
      }
    }, PERSISTENCE_CONFIG.autoSaveInterval);
  }
  
  /**
   * Arrête l'auto-save.
   */
  stopAutoSave(): void {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }
  
  // ============================================================================
  // Profils joueur
  // ============================================================================
  
  /**
   * Crée un nouveau profil joueur.
   */
  async createPlayerProfile(name: string, color: number): Promise<PlayerProfile> {
    const profile: PlayerProfile = {
      id: `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      color,
      createdAt: Date.now(),
      stats: {
        gamesPlayed: 0,
        victories: 0,
        unitsBuilt: 0,
        unitsDestroyed: 0,
        resourcesCollected: 0
      }
    };
    
    await this.put(PERSISTENCE_CONFIG.stores.players, profile);
    return profile;
  }
  
  /**
   * Met à jour un profil joueur.
   */
  async updatePlayerProfile(profile: PlayerProfile): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.players, profile);
  }
  
  /**
   * Récupère un profil joueur.
   */
  async getPlayerProfile(playerId: string): Promise<PlayerProfile | undefined> {
    return this.get<PlayerProfile>(PERSISTENCE_CONFIG.stores.players, playerId);
  }
  
  /**
   * Liste tous les profils.
   */
  async listPlayerProfiles(): Promise<PlayerProfile[]> {
    return this.getAll<PlayerProfile>(PERSISTENCE_CONFIG.stores.players);
  }
  
  // ============================================================================
  // Paramètres
  // ============================================================================
  
  /**
   * Sauvegarde les paramètres.
   */
  async saveSettings(settings: GameSettings): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.settings, {
      key: 'game-settings',
      ...settings
    });
  }
  
  /**
   * Charge les paramètres.
   */
  async loadSettings(): Promise<GameSettings> {
    const stored = await this.get<GameSettings & { key: string }>(
      PERSISTENCE_CONFIG.stores.settings,
      'game-settings'
    );
    
    if (!stored) {
      return { ...DEFAULT_SETTINGS };
    }
    
    // Fusionner avec les defaults (pour nouvelles options)
    const { key: _, ...settings } = stored;
    return { ...DEFAULT_SETTINGS, ...settings };
  }
  
  // ============================================================================
  // Systèmes (lazy loading)
  // ============================================================================
  
  /**
   * Sauvegarde un système.
   */
  async saveSystem(system: SystemData): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.systems, system);
  }
  
  /**
   * Charge un système par ID.
   */
  async loadSystem(systemId: string): Promise<SystemData | undefined> {
    return this.get<SystemData>(PERSISTENCE_CONFIG.stores.systems, systemId);
  }
  
  /**
   * Charge les systèmes d'un cluster.
   */
  async loadClusterSystems(clusterX: number, clusterZ: number): Promise<SystemData[]> {
    await this.dbReady;
    
    if (!this.db) {
      return [];
    }
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(PERSISTENCE_CONFIG.stores.systems, 'readonly');
      const store = transaction.objectStore(PERSISTENCE_CONFIG.stores.systems);
      const index = store.index('cluster');
      const request = index.getAll([clusterX, clusterZ]);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  // ============================================================================
  // Entités (vaisseaux, structures)
  // ============================================================================
  
  /**
   * Sauvegarde une entité
   */
  async saveEntity(entity: object): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.entities, entity);
  }
  
  /**
   * Sauvegarde plusieurs entités
   */
  async saveEntities(entities: object[]): Promise<void> {
    for (const entity of entities) {
      await this.put(PERSISTENCE_CONFIG.stores.entities, entity);
    }
  }
  
  /**
   * Charge toutes les entités
   */
  async loadAllEntities(): Promise<object[]> {
    return this.getAll(PERSISTENCE_CONFIG.stores.entities);
  }
  
  /**
   * Charge les entités d'un joueur
   */
  async loadPlayerEntities(ownerId: string): Promise<object[]> {
    await this.dbReady;
    
    if (!this.db) return [];
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(PERSISTENCE_CONFIG.stores.entities, 'readonly');
      const store = transaction.objectStore(PERSISTENCE_CONFIG.stores.entities);
      const index = store.index('ownerId');
      const request = index.getAll(ownerId);
      
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  /**
   * Supprime une entité
   */
  async deleteEntity(entityId: string): Promise<void> {
    await this.delete(PERSISTENCE_CONFIG.stores.entities, entityId);
  }
  
  // ============================================================================
  // Grilles (orbitales et surface)
  // ============================================================================
  
  /**
   * Sauvegarde une grille orbitale
   */
  async saveOrbitalGrid(planetKey: string, gridData: object): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.orbitalGrids, { planetKey, ...gridData });
  }
  
  /**
   * Charge une grille orbitale
   */
  async loadOrbitalGrid(planetKey: string): Promise<object | undefined> {
    return this.get(PERSISTENCE_CONFIG.stores.orbitalGrids, planetKey);
  }
  
  /**
   * Sauvegarde une grille de surface
   */
  async saveSurfaceGrid(planetKey: string, gridData: object): Promise<void> {
    await this.put(PERSISTENCE_CONFIG.stores.surfaceGrids, { planetKey, ...gridData });
  }
  
  /**
   * Charge une grille de surface
   */
  async loadSurfaceGrid(planetKey: string): Promise<object | undefined> {
    return this.get(PERSISTENCE_CONFIG.stores.surfaceGrids, planetKey);
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Vide toutes les données.
   */
  async clearAll(): Promise<void> {
    const stores = Object.values(PERSISTENCE_CONFIG.stores);
    
    for (const storeName of stores) {
      await this.transaction(storeName, 'readwrite', (store) => store.clear());
    }
    
    console.log('[Persistence] Toutes les données effacées');
  }
  
  /**
   * Ferme la connexion à la DB.
   */
  close(): void {
    this.stopAutoSave();
    
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
  
  // ============================================================================
  // Export / Import
  // ============================================================================
  
  /**
   * Exporte toutes les données en JSON.
   */
  async exportData(): Promise<string> {
    const stores = PERSISTENCE_CONFIG.stores;
    
    const data = {
      version: PERSISTENCE_CONFIG.dbVersion,
      timestamp: Date.now(),
      gameStates: await this.getAll(stores.gameState),
      galaxies: await this.getAll(stores.galaxies),
      systems: await this.getAll(stores.systems),
      players: await this.getAll(stores.players),
      settings: await this.loadSettings(),
      entities: await this.getAll(stores.entities),
      orbitalGrids: await this.getAll(stores.orbitalGrids),
      surfaceGrids: await this.getAll(stores.surfaceGrids)
    };
    
    return JSON.stringify(data, null, 2);
  }
  
  /**
   * Importe des données depuis JSON.
   */
  async importData(jsonData: string): Promise<void> {
    const data = JSON.parse(jsonData);
    const stores = PERSISTENCE_CONFIG.stores;
    
    // Vérifier la version
    if (data.version !== PERSISTENCE_CONFIG.dbVersion) {
      console.warn(`[Persistence] Version différente: ${data.version} vs ${PERSISTENCE_CONFIG.dbVersion}`);
    }
    
    // Importer chaque store
    for (const item of data.gameStates || []) {
      await this.put(stores.gameState, item);
    }
    
    for (const item of data.galaxies || []) {
      await this.put(stores.galaxies, item);
    }
    
    for (const item of data.systems || []) {
      await this.put(stores.systems, item);
    }
    
    for (const item of data.players || []) {
      await this.put(stores.players, item);
    }
    
    if (data.settings) {
      await this.saveSettings(data.settings);
    }
    
    console.log('[Persistence] Données importées');
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale du gestionnaire de persistance */
export const persistence = new Persistence();