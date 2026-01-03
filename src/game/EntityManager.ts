/**
 * EntityManager.ts
 * 
 * Gestionnaire central des entités du jeu (vaisseaux, structures).
 * Connecté au système de persistance pour sauvegarde/chargement.
 * 
 * Responsabilités:
 * - CRUD des entités (create, read, update, delete)
 * - Indexation par position (pour requêtes spatiales)
 * - Synchronisation avec la persistance
 * - Notifications aux systèmes de rendu
 */

import { 
    GameEntity, 
    ShipEntity, 
    StructureEntity, 
    EntityCategory,
    ShipType,
    StructureType,
    createShip,
    createStructure
} from '../core/GameEntity';
import { 
    HierarchicalPosition, 
    ClusterId
} from '../core/CoordinateSystem';
import { OrbitalGrid } from '../core/OrbitalGrid';
import { SurfaceGrid } from '../core/SurfaceGrid';
import { PlanetSize } from '../core/GameScales';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Clé unique pour identifier une planète (cluster + star + orbit)
 */
type PlanetKey = string; // Format: "cx-cy-cz:starIdx:orbitIdx"

/**
 * Événements émis par l'EntityManager
 */
export type EntityEventType = 
    | 'entity-created'
    | 'entity-updated'
    | 'entity-deleted'
    | 'entity-moved';

export interface EntityEvent {
    type: EntityEventType;
    entity: GameEntity;
    previousPosition?: HierarchicalPosition;
}

type EntityEventCallback = (event: EntityEvent) => void;

// =============================================================================
// CLASSE PRINCIPALE
// =============================================================================

export class EntityManager {
    /** Toutes les entités par ID */
    private entities: Map<string, GameEntity> = new Map();
    
    /** Index spatial: entités par cluster */
    private byCluster: Map<string, Set<string>> = new Map();
    
    /** Index spatial: entités par système */
    private bySystem: Map<string, Set<string>> = new Map();
    
    /** Index spatial: entités par planète */
    private byPlanet: Map<string, Set<string>> = new Map();
    
    /** Index par propriétaire */
    private byOwner: Map<string, Set<string>> = new Map();
    
    /** Grilles orbitales par planète */
    private orbitalGrids: Map<PlanetKey, OrbitalGrid> = new Map();
    
    /** Grilles de surface par planète */
    private surfaceGrids: Map<PlanetKey, SurfaceGrid> = new Map();
    
    /** Callbacks d'événements */
    private eventListeners: EntityEventCallback[] = [];
    
    /** Singleton instance */
    private static instance: EntityManager | null = null;

    private constructor() {
        console.log('[EntityManager] Initialized');
    }

    /**
     * Retourne l'instance singleton
     */
    public static getInstance(): EntityManager {
        if (!EntityManager.instance) {
            EntityManager.instance = new EntityManager();
        }
        return EntityManager.instance;
    }

    // =========================================================================
    // CRÉATION D'ENTITÉS
    // =========================================================================

    /**
     * Crée un nouveau vaisseau
     */
    createShip(
        type: ShipType,
        ownerId: string,
        position: HierarchicalPosition,
        name?: string
    ): ShipEntity {
        const ship = createShip(type, ownerId, position, name);
        this.addEntity(ship);
        return ship;
    }

    /**
     * Crée une nouvelle structure
     */
    createStructure(
        type: StructureType,
        ownerId: string,
        position: HierarchicalPosition,
        name?: string
    ): StructureEntity {
        const structure = createStructure(type, ownerId, position, name);
        this.addEntity(structure);
        return structure;
    }

    /**
     * Ajoute une entité au manager
     */
    addEntity(entity: GameEntity): void {
        // Stocker l'entité
        this.entities.set(entity.id, entity);
        
        // Indexer par position
        this.indexByPosition(entity);
        
        // Indexer par propriétaire
        this.indexByOwner(entity);
        
        // Émettre l'événement
        this.emit({ type: 'entity-created', entity });
        
        console.log(`[EntityManager] Entity created: ${entity.type} (${entity.id})`);
    }

    // =========================================================================
    // LECTURE D'ENTITÉS
    // =========================================================================

    /**
     * Récupère une entité par ID
     */
    getEntity(id: string): GameEntity | undefined {
        return this.entities.get(id);
    }

    /**
     * Récupère toutes les entités
     */
    getAllEntities(): GameEntity[] {
        return Array.from(this.entities.values());
    }

    /**
     * Récupère les entités d'un joueur
     */
    getEntitiesByOwner(ownerId: string): GameEntity[] {
        const ids = this.byOwner.get(ownerId);
        if (!ids) return [];
        return Array.from(ids).map(id => this.entities.get(id)!).filter(e => e);
    }

    /**
     * Récupère les entités dans un cluster
     */
    getEntitiesInCluster(cluster: ClusterId): GameEntity[] {
        const key = `${cluster.x}-${cluster.y}-${cluster.z}`;
        const ids = this.byCluster.get(key);
        if (!ids) return [];
        return Array.from(ids).map(id => this.entities.get(id)!).filter(e => e);
    }

    /**
     * Récupère les entités dans un système
     */
    getEntitiesInSystem(cluster: ClusterId, starIndex: number): GameEntity[] {
        const key = `${cluster.x}-${cluster.y}-${cluster.z}:${starIndex}`;
        const ids = this.bySystem.get(key);
        if (!ids) return [];
        return Array.from(ids).map(id => this.entities.get(id)!).filter(e => e);
    }

    /**
     * Récupère les entités autour d'une planète (orbite + surface)
     */
    getEntitiesAtPlanet(cluster: ClusterId, starIndex: number, orbitIndex: number): GameEntity[] {
        const key = `${cluster.x}-${cluster.y}-${cluster.z}:${starIndex}:${orbitIndex}`;
        const ids = this.byPlanet.get(key);
        if (!ids) return [];
        return Array.from(ids).map(id => this.entities.get(id)!).filter(e => e);
    }

    // =========================================================================
    // MISE À JOUR D'ENTITÉS
    // =========================================================================

    /**
     * Déplace une entité vers une nouvelle position
     */
    moveEntity(entityId: string, newPosition: HierarchicalPosition): boolean {
        const entity = this.entities.get(entityId);
        if (!entity) return false;
        
        const previousPosition = { ...entity.position };
        
        // Retirer des anciens index
        this.removeFromPositionIndex(entity);
        
        // Mettre à jour la position
        entity.position = newPosition;
        entity.updatedAt = Date.now();
        
        // Ajouter aux nouveaux index
        this.indexByPosition(entity);
        
        // Émettre l'événement
        this.emit({ type: 'entity-moved', entity, previousPosition });
        
        return true;
    }

    /**
     * Met à jour une entité
     */
    updateEntity(entityId: string, updates: Partial<GameEntity>): boolean {
        const entity = this.entities.get(entityId);
        if (!entity) return false;
        
        // Appliquer les mises à jour (sauf id et category)
        Object.assign(entity, updates, { 
            id: entity.id, 
            category: entity.category,
            updatedAt: Date.now() 
        });
        
        this.emit({ type: 'entity-updated', entity });
        return true;
    }

    // =========================================================================
    // SUPPRESSION D'ENTITÉS
    // =========================================================================

    /**
     * Supprime une entité
     */
    deleteEntity(entityId: string): boolean {
        const entity = this.entities.get(entityId);
        if (!entity) return false;
        
        // Retirer des index
        this.removeFromPositionIndex(entity);
        this.removeFromOwnerIndex(entity);
        
        // Supprimer l'entité
        this.entities.delete(entityId);
        
        // Émettre l'événement
        this.emit({ type: 'entity-deleted', entity });
        
        console.log(`[EntityManager] Entity deleted: ${entity.type} (${entity.id})`);
        return true;
    }

    // =========================================================================
    // GRILLES (ORBITAL & SURFACE)
    // =========================================================================

    /**
     * Récupère ou crée la grille orbitale d'une planète
     */
    getOrbitalGrid(cluster: ClusterId, starIndex: number, orbitIndex: number, planetSize: PlanetSize): OrbitalGrid {
        const key = `${cluster.x}-${cluster.y}-${cluster.z}:${starIndex}:${orbitIndex}`;
        
        let grid = this.orbitalGrids.get(key);
        if (!grid) {
            grid = new OrbitalGrid(planetSize);
            this.orbitalGrids.set(key, grid);
            console.log(`[EntityManager] Created OrbitalGrid for ${key}`);
        }
        
        return grid;
    }

    /**
     * Récupère ou crée la grille de surface d'une planète
     */
    getSurfaceGrid(cluster: ClusterId, starIndex: number, orbitIndex: number, planetSize: PlanetSize, seed: number): SurfaceGrid {
        const key = `${cluster.x}-${cluster.y}-${cluster.z}:${starIndex}:${orbitIndex}`;
        
        let grid = this.surfaceGrids.get(key);
        if (!grid) {
            grid = new SurfaceGrid(planetSize, seed);
            this.surfaceGrids.set(key, grid);
            console.log(`[EntityManager] Created SurfaceGrid for ${key}`);
        }
        
        return grid;
    }

    // =========================================================================
    // INDEXATION
    // =========================================================================

    private indexByPosition(entity: GameEntity): void {
        const pos = entity.position;
        const cluster = pos.galaxy.cluster;
        
        // Index cluster
        const clusterKey = `${cluster.x}-${cluster.y}-${cluster.z}`;
        if (!this.byCluster.has(clusterKey)) {
            this.byCluster.set(clusterKey, new Set());
        }
        this.byCluster.get(clusterKey)!.add(entity.id);
        
        // Index système (si dans un système)
        if (pos.galaxy.starIndex >= 0) {
            const systemKey = `${clusterKey}:${pos.galaxy.starIndex}`;
            if (!this.bySystem.has(systemKey)) {
                this.bySystem.set(systemKey, new Set());
            }
            this.bySystem.get(systemKey)!.add(entity.id);
            
            // Index planète (si en orbite ou au sol)
            if (pos.system && pos.system.orbitIndex >= 0) {
                const planetKey = `${systemKey}:${pos.system.orbitIndex}`;
                if (!this.byPlanet.has(planetKey)) {
                    this.byPlanet.set(planetKey, new Set());
                }
                this.byPlanet.get(planetKey)!.add(entity.id);
            }
        }
    }

    private removeFromPositionIndex(entity: GameEntity): void {
        const pos = entity.position;
        const cluster = pos.galaxy.cluster;
        
        const clusterKey = `${cluster.x}-${cluster.y}-${cluster.z}`;
        this.byCluster.get(clusterKey)?.delete(entity.id);
        
        if (pos.galaxy.starIndex >= 0) {
            const systemKey = `${clusterKey}:${pos.galaxy.starIndex}`;
            this.bySystem.get(systemKey)?.delete(entity.id);
            
            if (pos.system && pos.system.orbitIndex >= 0) {
                const planetKey = `${systemKey}:${pos.system.orbitIndex}`;
                this.byPlanet.get(planetKey)?.delete(entity.id);
            }
        }
    }

    private indexByOwner(entity: GameEntity): void {
        if (!this.byOwner.has(entity.ownerId)) {
            this.byOwner.set(entity.ownerId, new Set());
        }
        this.byOwner.get(entity.ownerId)!.add(entity.id);
    }

    private removeFromOwnerIndex(entity: GameEntity): void {
        this.byOwner.get(entity.ownerId)?.delete(entity.id);
    }

    // =========================================================================
    // ÉVÉNEMENTS
    // =========================================================================

    /**
     * S'abonne aux événements d'entités
     */
    on(callback: EntityEventCallback): void {
        this.eventListeners.push(callback);
    }

    /**
     * Se désabonne des événements
     */
    off(callback: EntityEventCallback): void {
        const index = this.eventListeners.indexOf(callback);
        if (index >= 0) {
            this.eventListeners.splice(index, 1);
        }
    }

    private emit(event: EntityEvent): void {
        for (const listener of this.eventListeners) {
            try {
                listener(event);
            } catch (e) {
                console.error('[EntityManager] Event listener error:', e);
            }
        }
    }

    // =========================================================================
    // SÉRIALISATION (pour persistance)
    // =========================================================================

    /**
     * Sérialise toutes les entités pour sauvegarde
     */
    serialize(): object {
        const entities: object[] = [];
        
        for (const entity of this.entities.values()) {
            entities.push(this.serializeEntity(entity));
        }
        
        const orbitalGrids: Record<string, object> = {};
        for (const [key, grid] of this.orbitalGrids) {
            orbitalGrids[key] = grid.serialize();
        }
        
        const surfaceGrids: Record<string, object> = {};
        for (const [key, grid] of this.surfaceGrids) {
            surfaceGrids[key] = grid.serialize();
        }
        
        return { entities, orbitalGrids, surfaceGrids };
    }

    private serializeEntity(entity: GameEntity): object {
        // Convertir Map en objet pour JSON
        const serialized: Record<string, unknown> = { ...entity };
        
        if (entity.category === EntityCategory.UNIT) {
            const ship = entity as ShipEntity;
            serialized.cargo = Object.fromEntries(ship.cargo);
        } else if (entity.category === EntityCategory.STRUCTURE) {
            const structure = entity as StructureEntity;
            serialized.storage = Object.fromEntries(structure.storage);
        }
        
        return serialized;
    }

    /**
     * Charge les entités depuis une sauvegarde
     */
    deserialize(data: { 
        entities: object[]; 
        orbitalGrids?: Record<string, object>;
        surfaceGrids?: Record<string, object>;
    }): void {
        // Nettoyer l'état actuel
        this.entities.clear();
        this.byCluster.clear();
        this.bySystem.clear();
        this.byPlanet.clear();
        this.byOwner.clear();
        
        // Charger les entités
        for (const entityData of data.entities) {
            const entity = this.deserializeEntity(entityData);
            if (entity) {
                this.addEntity(entity);
            }
        }
        
        console.log(`[EntityManager] Loaded ${this.entities.size} entities`);
    }

    private deserializeEntity(data: unknown): GameEntity | null {
        try {
            const obj = data as Record<string, unknown>;
            
            // Reconvertir les objets en Map
            if (obj.cargo && typeof obj.cargo === 'object') {
                obj.cargo = new Map(Object.entries(obj.cargo as object));
            }
            if (obj.storage && typeof obj.storage === 'object') {
                obj.storage = new Map(Object.entries(obj.storage as object));
            }
            
            return obj as unknown as GameEntity;
        } catch (e) {
            console.error('[EntityManager] Failed to deserialize entity:', e);
            return null;
        }
    }

    // =========================================================================
    // STATISTIQUES
    // =========================================================================

    getStats(): { total: number; ships: number; structures: number; byOwner: Record<string, number> } {
        let ships = 0;
        let structures = 0;
        const byOwner: Record<string, number> = {};
        
        for (const entity of this.entities.values()) {
            if (entity.category === EntityCategory.UNIT) ships++;
            else if (entity.category === EntityCategory.STRUCTURE) structures++;
            
            byOwner[entity.ownerId] = (byOwner[entity.ownerId] || 0) + 1;
        }
        
        return { total: this.entities.size, ships, structures, byOwner };
    }
}
