// src/ui/SelectionBox.ts
/**
 * Système de sélection par boîte (box selection / drag select).
 * 
 * Responsabilités:
 * - Afficher le rectangle de sélection pendant le drag
 * - Calculer les unités dans la zone
 * - Gérer shift+click pour ajouter à la sélection
 * 
 * KISS: Rectangle simple en CSS, raycast pour la sélection.
 */

import * as THREE from 'three';
import type { Unit } from '../types/GameState';
import type { EntityId } from '../types/commands';

// ============================================================================
// Configuration
// ============================================================================

export const SELECTION_CONFIG = {
  /** Couleur de la boîte de sélection */
  boxColor: 'rgba(52, 152, 219, 0.3)',
  
  /** Couleur de la bordure */
  borderColor: 'rgba(52, 152, 219, 0.8)',
  
  /** Épaisseur de la bordure */
  borderWidth: 1,
  
  /** Distance minimale pour activer la box selection (pixels) */
  minDragDistance: 10,
  
  /** Couleur de sélection des unités */
  selectedColor: 0x3498db,
  
  /** Couleur de survol */
  hoverColor: 0x2ecc71,
};

// ============================================================================
// Types
// ============================================================================

export interface SelectionBoxCallbacks {
  /** Appelé quand la sélection change */
  onSelectionChange?: (unitIds: EntityId[], additive: boolean) => void;
  
  /** Appelé pendant le drag pour feedback visuel */
  onDragUpdate?: (start: THREE.Vector2, end: THREE.Vector2) => void;
}

export interface ScreenBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

// ============================================================================
// Classe SelectionBox
// ============================================================================

/**
 * Gestionnaire de la sélection par boîte.
 */
export class SelectionBox {
  // Éléments DOM
  private boxElement: HTMLDivElement;
  private container: HTMLElement;
  
  // État de drag
  private isDragging: boolean = false;
  private startPos: THREE.Vector2 = new THREE.Vector2();
  private currentPos: THREE.Vector2 = new THREE.Vector2();
  private isAdditive: boolean = false;
  
  // Références
  private camera: THREE.PerspectiveCamera | null = null;
  private unitPositions: Map<EntityId, THREE.Vector3> = new Map();
  
  // Callbacks
  private callbacks: SelectionBoxCallbacks = {};
  
  // Sélection actuelle
  private selectedIds: Set<EntityId> = new Set();
  
  constructor(container: HTMLElement = document.body) {
    this.container = container;
    
    // Créer l'élément de la boîte de sélection
    this.boxElement = document.createElement('div');
    this.boxElement.id = 'selection-box';
    this.boxElement.style.cssText = `
      position: fixed;
      pointer-events: none;
      border: ${SELECTION_CONFIG.borderWidth}px solid ${SELECTION_CONFIG.borderColor};
      background: ${SELECTION_CONFIG.boxColor};
      z-index: 999;
      display: none;
    `;
    this.container.appendChild(this.boxElement);
    
    // Bind des événements
    this.setupEventListeners();
  }
  
  // ============================================================================
  // Configuration
  // ============================================================================
  
  /**
   * Configure la caméra pour le calcul des projections.
   */
  setCamera(camera: THREE.PerspectiveCamera): void {
    this.camera = camera;
  }
  
  /**
   * Met à jour les positions des unités (appelé chaque frame).
   */
  updateUnitPositions(units: Map<EntityId, THREE.Vector3>): void {
    this.unitPositions = units;
  }
  
  /**
   * Enregistre les callbacks.
   */
  setCallbacks(callbacks: SelectionBoxCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }
  
  // ============================================================================
  // Event Listeners
  // ============================================================================
  
  private setupEventListeners(): void {
    // Mouse down
    this.container.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // Uniquement clic gauche
      if (this.isOverUI(e)) return; // Ignorer si sur l'UI
      
      this.startDrag(e.clientX, e.clientY, e.shiftKey);
    });
    
    // Mouse move
    this.container.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      
      this.updateDrag(e.clientX, e.clientY);
    });
    
    // Mouse up
    this.container.addEventListener('mouseup', (e) => {
      if (!this.isDragging) return;
      
      this.endDrag(e.clientX, e.clientY);
    });
    
    // Mouse leave (annuler si sort de la fenêtre)
    this.container.addEventListener('mouseleave', () => {
      if (this.isDragging) {
        this.cancelDrag();
      }
    });
  }
  
  /**
   * Vérifie si le clic est sur un élément UI.
   */
  private isOverUI(e: MouseEvent): boolean {
    const target = e.target as HTMLElement;
    
    // Vérifier si c'est dans le HUD ou autre panel UI
    if (target.closest('#game-hud')) return true;
    if (target.closest('.hud-panel')) return true;
    if (target.closest('#corner-ui')) return true;
    
    return false;
  }
  
  // ============================================================================
  // Gestion du drag
  // ============================================================================
  
  private startDrag(x: number, y: number, additive: boolean): void {
    this.isDragging = true;
    this.isAdditive = additive;
    this.startPos.set(x, y);
    this.currentPos.set(x, y);
    
    // Ne pas afficher la boîte tout de suite (attendre le minDragDistance)
    this.boxElement.style.display = 'none';
  }
  
  private updateDrag(x: number, y: number): void {
    this.currentPos.set(x, y);
    
    const distance = this.startPos.distanceTo(this.currentPos);
    
    if (distance >= SELECTION_CONFIG.minDragDistance) {
      // Afficher et mettre à jour la boîte
      this.updateBoxPosition();
      this.boxElement.style.display = 'block';
      
      // Callback
      this.callbacks.onDragUpdate?.(this.startPos, this.currentPos);
    }
  }
  
  private endDrag(x: number, y: number): void {
    this.currentPos.set(x, y);
    
    const distance = this.startPos.distanceTo(this.currentPos);
    
    if (distance >= SELECTION_CONFIG.minDragDistance) {
      // Box selection
      this.performBoxSelection();
    } else {
      // Click simple - sélection d'une seule unité (raycast)
      this.performClickSelection(x, y);
    }
    
    this.isDragging = false;
    this.boxElement.style.display = 'none';
  }
  
  private cancelDrag(): void {
    this.isDragging = false;
    this.boxElement.style.display = 'none';
  }
  
  // ============================================================================
  // Mise à jour visuelle
  // ============================================================================
  
  private updateBoxPosition(): void {
    const minX = Math.min(this.startPos.x, this.currentPos.x);
    const maxX = Math.max(this.startPos.x, this.currentPos.x);
    const minY = Math.min(this.startPos.y, this.currentPos.y);
    const maxY = Math.max(this.startPos.y, this.currentPos.y);
    
    this.boxElement.style.left = `${minX}px`;
    this.boxElement.style.top = `${minY}px`;
    this.boxElement.style.width = `${maxX - minX}px`;
    this.boxElement.style.height = `${maxY - minY}px`;
  }
  
  // ============================================================================
  // Sélection
  // ============================================================================
  
  /**
   * Effectue une sélection par boîte.
   */
  private performBoxSelection(): void {
    if (!this.camera) return;
    
    const bounds = this.getScreenBounds();
    const selectedUnitIds: EntityId[] = [];
    
    // Projeter chaque unité sur l'écran et vérifier si elle est dans la boîte
    for (const [unitId, worldPos] of this.unitPositions) {
      const screenPos = this.worldToScreen(worldPos);
      
      if (this.isInBounds(screenPos, bounds)) {
        selectedUnitIds.push(unitId);
      }
    }
    
    // Mettre à jour la sélection
    this.updateSelection(selectedUnitIds, this.isAdditive);
  }
  
  /**
   * Effectue une sélection par clic simple.
   */
  private performClickSelection(x: number, y: number): void {
    if (!this.camera) return;
    
    // Trouver l'unité la plus proche du clic
    const clickPos = new THREE.Vector2(x, y);
    let closestId: EntityId | null = null;
    let closestDist = Infinity;
    const maxClickDistance = 30; // pixels
    
    for (const [unitId, worldPos] of this.unitPositions) {
      const screenPos = this.worldToScreen(worldPos);
      const dist = clickPos.distanceTo(screenPos);
      
      if (dist < closestDist && dist < maxClickDistance) {
        closestDist = dist;
        closestId = unitId;
      }
    }
    
    if (closestId !== null) {
      this.updateSelection([closestId], this.isAdditive);
    } else if (!this.isAdditive) {
      // Désélectionner tout si clic dans le vide sans shift
      this.updateSelection([], false);
    }
  }
  
  /**
   * Met à jour la sélection.
   */
  private updateSelection(unitIds: EntityId[], additive: boolean): void {
    if (additive) {
      // Ajouter à la sélection existante
      for (const id of unitIds) {
        if (this.selectedIds.has(id)) {
          this.selectedIds.delete(id); // Toggle
        } else {
          this.selectedIds.add(id);
        }
      }
    } else {
      // Remplacer la sélection
      this.selectedIds.clear();
      for (const id of unitIds) {
        this.selectedIds.add(id);
      }
    }
    
    // Notifier
    this.callbacks.onSelectionChange?.(
      Array.from(this.selectedIds),
      additive
    );
  }
  
  // ============================================================================
  // Utilitaires géométriques
  // ============================================================================
  
  /**
   * Récupère les limites de la boîte en pixels.
   */
  private getScreenBounds(): ScreenBounds {
    return {
      minX: Math.min(this.startPos.x, this.currentPos.x),
      maxX: Math.max(this.startPos.x, this.currentPos.x),
      minY: Math.min(this.startPos.y, this.currentPos.y),
      maxY: Math.max(this.startPos.y, this.currentPos.y)
    };
  }
  
  /**
   * Projette une position 3D vers l'écran.
   */
  private worldToScreen(worldPos: THREE.Vector3): THREE.Vector2 {
    if (!this.camera) return new THREE.Vector2();
    
    const vector = worldPos.clone();
    vector.project(this.camera);
    
    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vector.y * 0.5 + 0.5) * window.innerHeight;
    
    return new THREE.Vector2(x, y);
  }
  
  /**
   * Vérifie si un point est dans les limites.
   */
  private isInBounds(point: THREE.Vector2, bounds: ScreenBounds): boolean {
    return (
      point.x >= bounds.minX &&
      point.x <= bounds.maxX &&
      point.y >= bounds.minY &&
      point.y <= bounds.maxY
    );
  }
  
  // ============================================================================
  // API publique
  // ============================================================================
  
  /**
   * Récupère les IDs sélectionnés.
   */
  getSelectedIds(): EntityId[] {
    return Array.from(this.selectedIds);
  }
  
  /**
   * Définit la sélection manuellement.
   */
  setSelection(unitIds: EntityId[]): void {
    this.selectedIds.clear();
    for (const id of unitIds) {
      this.selectedIds.add(id);
    }
  }
  
  /**
   * Vérifie si une unité est sélectionnée.
   */
  isSelected(unitId: EntityId): boolean {
    return this.selectedIds.has(unitId);
  }
  
  /**
   * Efface la sélection.
   */
  clearSelection(): void {
    this.selectedIds.clear();
    this.callbacks.onSelectionChange?.([], false);
  }
  
  /**
   * Récupère le nombre d'unités sélectionnées.
   */
  getSelectionCount(): number {
    return this.selectedIds.size;
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Détruit le composant.
   */
  dispose(): void {
    if (this.boxElement.parentNode) {
      this.boxElement.parentNode.removeChild(this.boxElement);
    }
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale de la sélection */
export const selectionBox = new SelectionBox();