// src/core/SelectionManager.ts
/**
 * Gestionnaire de sélection d'unités RTS complet.
 * 
 * Responsabilités:
 * - Gérer la sélection courante (unités sélectionnées)
 * - Rectangle de sélection (box select)
 * - Groupes de contrôle (Ctrl+1-9)
 * - Sélection primaire (unité principale pour les ordres)
 * - Raycasting pour détection de clics
 * 
 * KISS: Logique de sélection pure, découplée du rendu.
 */

import * as THREE from 'three';
import { eventBus } from './EventBus';
import type { EntityId, PlayerId } from '../types/commands';
import type { GameState } from '../types/GameState';

// ============================================================================
// Types
// ============================================================================

type MouseNDC = { x: number; y: number };

/** Ancien format pour compatibilité */
type LegacySelection = { id: number | null; object?: THREE.Object3D | null };

export interface SelectionState {
    /** IDs des unités actuellement sélectionnées */
    selectedIds: Set<EntityId>;
    
    /** ID de l'unité primaire (première sélectionnée ou leader) */
    primaryId: EntityId | null;
    
    /** Groupes de contrôle (Ctrl+1-9 pour créer, 1-9 pour rappeler) */
    controlGroups: Map<number, Set<EntityId>>;
    
    /** Rectangle de sélection actif */
    boxSelection: BoxSelectionState | null;
}

export interface BoxSelectionState {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    active: boolean;
}

export interface SelectableEntity {
    id: EntityId;
    ownerId: PlayerId;
    position: THREE.Vector3 | { x: number; y: number; z: number };
    isSelectable: boolean;
}

// ============================================================================
// Constantes
// ============================================================================

const MAX_SELECTION = 200;
const MIN_BOX_SIZE = 10;

// ============================================================================
// Classe SelectionManager
// ============================================================================

export class SelectionManager {
    // Raycasting (legacy + nouveau)
    private raycaster: THREE.Raycaster;
    private camera: THREE.Camera;
    private scene: THREE.Scene;
    
    // État de sélection RTS complet
    private state: SelectionState;
    private localPlayerId: PlayerId | null = null;
    
    // Legacy: sélection simple pour compatibilité
    private current: LegacySelection = { id: null, object: null };
    private callbacks: Array<(sel: LegacySelection) => void> = [];

    constructor(scene: THREE.Scene, camera: THREE.Camera) {
        this.scene = scene;
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();
        (this.raycaster.params as Record<string, unknown>).Line = { threshold: 0.05 };
        
        this.state = {
            selectedIds: new Set(),
            primaryId: null,
            controlGroups: new Map(),
            boxSelection: null
        };
    }

    // ============================================================================
    // Configuration
    // ============================================================================
    
    setLocalPlayer(playerId: PlayerId): void {
        this.localPlayerId = playerId;
    }
    
    setCamera(camera: THREE.Camera): void {
        this.camera = camera;
    }

    // ============================================================================
    // Sélection RTS
    // ============================================================================
    
    /**
     * Sélectionne une seule unité (remplace la sélection actuelle).
     */
    select(unitId: EntityId): void {
        this.clearSelection(false);
        this.addToSelection(unitId);
        this.state.primaryId = unitId;
        this.emitSelectionChanged();
    }
    
    /**
     * Ajoute une unité à la sélection (Shift+click).
     */
    addToSelection(unitId: EntityId): void {
        if (this.state.selectedIds.size >= MAX_SELECTION) {
            console.warn('[SelectionManager] Max selection reached');
            return;
        }
        
        this.state.selectedIds.add(unitId);
        
        if (this.state.primaryId === null) {
            this.state.primaryId = unitId;
        }
    }
    
    /**
     * Retire une unité de la sélection.
     */
    removeFromSelection(unitId: EntityId): void {
        this.state.selectedIds.delete(unitId);
        
        if (this.state.primaryId === unitId) {
            this.state.primaryId = this.state.selectedIds.size > 0
                ? this.state.selectedIds.values().next().value ?? null
                : null;
        }
        
        this.emitSelectionChanged();
    }
    
    /**
     * Toggle la sélection d'une unité.
     */
    toggleSelection(unitId: EntityId): void {
        if (this.state.selectedIds.has(unitId)) {
            this.removeFromSelection(unitId);
        } else {
            this.addToSelection(unitId);
            this.emitSelectionChanged();
        }
    }
    
    /**
     * Efface la sélection.
     */
    clearSelection(emit = true): void {
        this.state.selectedIds.clear();
        this.state.primaryId = null;
        
        if (emit) {
            eventBus.emit('selection:cleared', undefined);
        }
    }
    
    /**
     * Sélectionne plusieurs unités.
     */
    selectMultiple(unitIds: EntityId[]): void {
        this.clearSelection(false);
        
        const toSelect = unitIds.slice(0, MAX_SELECTION);
        for (const id of toSelect) {
            this.state.selectedIds.add(id);
        }
        
        this.state.primaryId = toSelect.length > 0 ? toSelect[0] : null;
        this.emitSelectionChanged();
    }

    // ============================================================================
    // Box Selection
    // ============================================================================
    
    startBoxSelection(screenX: number, screenY: number): void {
        this.state.boxSelection = {
            startX: screenX,
            startY: screenY,
            currentX: screenX,
            currentY: screenY,
            active: true
        };
    }
    
    updateBoxSelection(screenX: number, screenY: number): void {
        if (!this.state.boxSelection) return;
        this.state.boxSelection.currentX = screenX;
        this.state.boxSelection.currentY = screenY;
    }
    
    endBoxSelection(entities: SelectableEntity[], additive = false): void {
        if (!this.state.boxSelection) {
            return;
        }
        
        const box = this.state.boxSelection;
        this.state.boxSelection = null;
        
        const width = Math.abs(box.currentX - box.startX);
        const height = Math.abs(box.currentY - box.startY);
        
        if (width < MIN_BOX_SIZE && height < MIN_BOX_SIZE) {
            return;
        }
        
        const minX = Math.min(box.startX, box.currentX);
        const maxX = Math.max(box.startX, box.currentX);
        const minY = Math.min(box.startY, box.currentY);
        const maxY = Math.max(box.startY, box.currentY);
        
        const selected: EntityId[] = [];
        
        for (const entity of entities) {
            if (!entity.isSelectable) continue;
            if (this.localPlayerId && entity.ownerId !== this.localPlayerId) continue;
            
            const screenPos = this.projectToScreen(entity.position);
            if (!screenPos) continue;
            
            if (screenPos.x >= minX && screenPos.x <= maxX &&
                screenPos.y >= minY && screenPos.y <= maxY) {
                selected.push(entity.id);
            }
        }
        
        if (additive) {
            for (const id of selected) {
                this.addToSelection(id);
            }
            this.emitSelectionChanged();
        } else {
            this.selectMultiple(selected);
        }
    }
    
    private projectToScreen(
        position: THREE.Vector3 | { x: number; y: number; z: number }
    ): { x: number; y: number } | null {
        if (!this.camera) return null;
        
        const pos = position instanceof THREE.Vector3
            ? position.clone()
            : new THREE.Vector3(position.x, position.y, position.z);
        
        pos.project(this.camera);
        
        const x = (pos.x + 1) / 2 * window.innerWidth;
        const y = (-pos.y + 1) / 2 * window.innerHeight;
        
        return { x, y };
    }
    
    getBoxSelectionRect(): { x: number; y: number; width: number; height: number } | null {
        if (!this.state.boxSelection) return null;
        
        const box = this.state.boxSelection;
        return {
            x: Math.min(box.startX, box.currentX),
            y: Math.min(box.startY, box.currentY),
            width: Math.abs(box.currentX - box.startX),
            height: Math.abs(box.currentY - box.startY)
        };
    }

    // ============================================================================
    // Groupes de contrôle
    // ============================================================================
    
    createControlGroup(groupIndex: number): void {
        if (groupIndex < 1 || groupIndex > 9) return;
        
        if (this.state.selectedIds.size === 0) {
            console.warn('[SelectionManager] Cannot create empty control group');
            return;
        }
        
        this.state.controlGroups.set(groupIndex, new Set(this.state.selectedIds));
        console.log(`[SelectionManager] Control group ${groupIndex} created with ${this.state.selectedIds.size} units`);
    }
    
    recallControlGroup(groupIndex: number, additive = false): EntityId[] {
        if (groupIndex < 1 || groupIndex > 9) return [];
        
        const group = this.state.controlGroups.get(groupIndex);
        if (!group || group.size === 0) {
            return [];
        }
        
        const ids = [...group];
        
        if (additive) {
            for (const id of ids) {
                this.addToSelection(id);
            }
            this.emitSelectionChanged();
        } else {
            this.selectMultiple(ids);
        }
        
        return ids;
    }
    
    addToControlGroup(groupIndex: number): void {
        if (groupIndex < 1 || groupIndex > 9) return;
        
        let group = this.state.controlGroups.get(groupIndex);
        if (!group) {
            group = new Set();
            this.state.controlGroups.set(groupIndex, group);
        }
        
        for (const id of this.state.selectedIds) {
            group.add(id);
        }
    }
    
    removeDestroyedFromGroups(destroyedIds: Set<EntityId>): void {
        for (const group of this.state.controlGroups.values()) {
            for (const id of destroyedIds) {
                group.delete(id);
            }
        }
        
        for (const id of destroyedIds) {
            this.state.selectedIds.delete(id);
        }
        
        if (this.state.primaryId !== null && destroyedIds.has(this.state.primaryId)) {
            this.state.primaryId = this.state.selectedIds.size > 0
                ? this.state.selectedIds.values().next().value ?? null
                : null;
        }
    }

    // ============================================================================
    // Sélection par type
    // ============================================================================
    
    selectAllOfType(unitType: string, entities: SelectableEntity[], gameState: GameState): void {
        const sameType = entities.filter(e => {
            if (!e.isSelectable) return false;
            if (this.localPlayerId && e.ownerId !== this.localPlayerId) return false;
            
            const unit = gameState.units.get(e.id);
            return unit && unit.shipClass === unitType;
        });
        
        this.selectMultiple(sameType.map(e => e.id));
    }
    
    selectAll(entities: SelectableEntity[]): void {
        const owned = entities.filter(e => {
            if (!e.isSelectable) return false;
            return !this.localPlayerId || e.ownerId === this.localPlayerId;
        });
        
        this.selectMultiple(owned.map(e => e.id));
    }

    // ============================================================================
    // Getters
    // ============================================================================
    
    getSelectedIds(): EntityId[] {
        return [...this.state.selectedIds];
    }
    
    getSelectedSet(): ReadonlySet<EntityId> {
        return this.state.selectedIds;
    }
    
    getPrimaryId(): EntityId | null {
        return this.state.primaryId;
    }
    
    isSelected(unitId: EntityId): boolean {
        return this.state.selectedIds.has(unitId);
    }
    
    getSelectionCount(): number {
        return this.state.selectedIds.size;
    }
    
    isEmpty(): boolean {
        return this.state.selectedIds.size === 0;
    }
    
    isBoxSelecting(): boolean {
        return this.state.boxSelection?.active ?? false;
    }

    // ============================================================================
    // Legacy API (compatibilité avec le code existant)
    // ============================================================================
    
    /**
     * @deprecated Utiliser select() ou les méthodes RTS
     */
    public update(mouse: MouseNDC, objects?: THREE.Object3D[]): void {
        const intersects = this.raycast(mouse, objects ?? this.scene.children);
        const prevId = this.current.id;
        if (intersects.length > 0) {
            const obj = intersects[0].object;
            this.current = { id: obj.id, object: obj };
        } else {
            this.current = { id: null, object: null };
        }
        if (prevId !== this.current.id) {
            this.emitLegacyChange();
        }
    }

    public raycast(mouse: MouseNDC, objects: THREE.Object3D[] | ArrayLike<THREE.Object3D>): THREE.Intersection[] {
        this.raycaster.setFromCamera(mouse as THREE.Vector2, this.camera);
        return this.raycaster.intersectObjects(Array.from(objects as ArrayLike<THREE.Object3D>), false);
    }

    /** @deprecated */
    public getSelected(): LegacySelection {
        return { ...this.current };
    }

    /** @deprecated Utiliser eventBus.on('selection:changed') */
    public onSelectionChange(cb: (sel: LegacySelection) => void): void {
        this.callbacks.push(cb);
    }

    public dispose(): void {
        this.callbacks.length = 0;
        this.state.selectedIds.clear();
        this.state.controlGroups.clear();
    }

    // ============================================================================
    // Événements
    // ============================================================================
    
    private emitSelectionChanged(): void {
        eventBus.emit('selection:changed', {
            unitIds: this.getSelectedIds(),
            primaryId: this.state.primaryId
        });
    }
    
    private emitLegacyChange(): void {
        for (const cb of this.callbacks) {
            try { cb({ ...this.current }); } catch { /* non bloquant */ }
        }
    }
}