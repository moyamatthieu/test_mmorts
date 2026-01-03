/**
 * PEEJS — Core Module Index
 * 
 * Point d'export centralisé pour tous les composants core.
 * Facilite les imports et maintient une API publique claire.
 */

// === MANAGERS ===
export { SceneManager } from './SceneManager';
export { CameraManager } from './CameraManager';
export { NavigationManager } from './NavigationManager';
export type { ViewMode, SystemReference, PlanetReference } from './NavigationManager';
export { InputManager } from './InputManager';
export type { InputEventType, MouseEventData, DragEventData, KeyEventData } from './InputManager';
export { SelectionManager } from './SelectionManager';
export type { SelectionState, BoxSelectionState, SelectableEntity } from './SelectionManager';
export { MemoryManager } from './MemoryManager';
export { ViewEntitiesManager } from './ViewEntitiesManager';
export { TransitionManager } from './TransitionManager';
export { SceneOrchestrator } from './SceneOrchestrator';
export { SurfaceGrid, TerrainType, CellState } from './SurfaceGrid';
export type { SurfaceCell, ResourceDeposit } from './SurfaceGrid';

// === EVENT SYSTEM ===
export { eventBus } from './EventBus';
export type { GameEvents, EventBus } from './EventBus';

// === INTERFACES ===
export type { IUpdatable } from './IUpdatable';
