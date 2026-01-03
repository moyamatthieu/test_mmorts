/**
 * InputManager
 *
 * Centralized input handling for keyboard and mouse events.
 * Decoupled from application logic — emits normalized events for consumers.
 *
 * Features:
 * - Keyboard: tracks pressed keys, emits keydown/keyup events
 * - Mouse: tracks NDC position, emits click/dblclick/contextmenu
 * - Drag: detects drag gestures, emits dragstart/drag/dragend
 *
 * Design: KISS — simple callback system, no external dependencies except THREE.Vector2.
 */

import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// Event Types & Payloads
// ─────────────────────────────────────────────────────────────────────────────

/** All input event names supported by InputManager */
export type InputEventType =
    | 'click'
    | 'dblclick'
    | 'contextmenu'
    | 'dragstart'
    | 'drag'
    | 'dragend'
    | 'keydown'
    | 'keyup';

/** Payload for mouse click events (click, dblclick, contextmenu) */
export interface MouseEventData {
    position: THREE.Vector2;
    originalEvent: MouseEvent;
}

/** Payload for drag events (dragstart, drag, dragend) */
export interface DragEventData {
    start: THREE.Vector2;
    current: THREE.Vector2;
    originalEvent: MouseEvent;
}

/** Payload for keyboard events (keydown, keyup) */
export interface KeyEventData {
    key: string;
    originalEvent: KeyboardEvent;
}

/** Union of all event payloads */
export type InputEventData = MouseEventData | DragEventData | KeyEventData;

/** Callback signature for input events */
export type InputCallback<T = InputEventData> = (data: T) => void;

// ─────────────────────────────────────────────────────────────────────────────
// InputManager Class
// ─────────────────────────────────────────────────────────────────────────────

/** Minimum drag distance (pixels) before considering it a drag vs click */
const DRAG_THRESHOLD = 5;

export class InputManager {
    // ─────────────────────────────────────────────────────────────────────────
    // Public State
    // ─────────────────────────────────────────────────────────────────────────

    /** Current mouse position in NDC [-1, 1] — updated on every pointer move */
    public readonly mousePosition: THREE.Vector2 = new THREE.Vector2();

    // ─────────────────────────────────────────────────────────────────────────
    // Private State
    // ─────────────────────────────────────────────────────────────────────────

    private readonly domElement: HTMLElement;

    /** Set of currently pressed keys (lowercase) */
    private readonly pressedKeys: Set<string> = new Set();

    /** Event handlers registry — one Set per event type */
    private readonly handlers: Map<InputEventType, Set<InputCallback<any>>> = new Map();

    /** Drag state tracking */
    private isDragging = false;
    private dragStart: THREE.Vector2 | null = null;
    private dragButton: number = -1;

    // Bound event handlers for cleanup
    private readonly boundHandlers: {
        pointerMove: (e: PointerEvent) => void;
        pointerDown: (e: PointerEvent) => void;
        pointerUp: (e: PointerEvent) => void;
        click: (e: MouseEvent) => void;
        dblClick: (e: MouseEvent) => void;
        contextMenu: (e: MouseEvent) => void;
        keyDown: (e: KeyboardEvent) => void;
        keyUp: (e: KeyboardEvent) => void;
        blur: () => void;
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Constructor & Lifecycle
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Creates an InputManager attached to the given DOM element.
     * @param domElement - Element to listen for mouse events (typically canvas or its container)
     */
    constructor(domElement: HTMLElement) {
        this.domElement = domElement;

        // Initialize handler sets for all event types
        const eventTypes: InputEventType[] = [
            'click',
            'dblclick',
            'contextmenu',
            'dragstart',
            'drag',
            'dragend',
            'keydown',
            'keyup'
        ];
        for (const type of eventTypes) {
            this.handlers.set(type, new Set());
        }

        // Bind handlers
        this.boundHandlers = {
            pointerMove: this.handlePointerMove.bind(this),
            pointerDown: this.handlePointerDown.bind(this),
            pointerUp: this.handlePointerUp.bind(this),
            click: this.handleClick.bind(this),
            dblClick: this.handleDblClick.bind(this),
            contextMenu: this.handleContextMenu.bind(this),
            keyDown: this.handleKeyDown.bind(this),
            keyUp: this.handleKeyUp.bind(this),
            blur: this.handleBlur.bind(this)
        };

        // Attach mouse/pointer listeners to DOM element
        this.domElement.addEventListener('pointermove', this.boundHandlers.pointerMove, {
            passive: true
        });
        this.domElement.addEventListener('pointerdown', this.boundHandlers.pointerDown);
        this.domElement.addEventListener('pointerup', this.boundHandlers.pointerUp);
        this.domElement.addEventListener('click', this.boundHandlers.click);
        this.domElement.addEventListener('dblclick', this.boundHandlers.dblClick);
        this.domElement.addEventListener('contextmenu', this.boundHandlers.contextMenu);

        // Keyboard listeners on window (to catch keys even when canvas not focused)
        window.addEventListener('keydown', this.boundHandlers.keyDown);
        window.addEventListener('keyup', this.boundHandlers.keyUp);
        window.addEventListener('blur', this.boundHandlers.blur);
    }

    /**
     * Removes all event listeners and clears handlers.
     * Call this when destroying the InputManager.
     */
    public dispose(): void {
        // Remove mouse/pointer listeners
        this.domElement.removeEventListener('pointermove', this.boundHandlers.pointerMove);
        this.domElement.removeEventListener('pointerdown', this.boundHandlers.pointerDown);
        this.domElement.removeEventListener('pointerup', this.boundHandlers.pointerUp);
        this.domElement.removeEventListener('click', this.boundHandlers.click);
        this.domElement.removeEventListener('dblclick', this.boundHandlers.dblClick);
        this.domElement.removeEventListener('contextmenu', this.boundHandlers.contextMenu);

        // Remove keyboard listeners
        window.removeEventListener('keydown', this.boundHandlers.keyDown);
        window.removeEventListener('keyup', this.boundHandlers.keyUp);
        window.removeEventListener('blur', this.boundHandlers.blur);

        // Clear all handlers
        for (const set of this.handlers.values()) {
            set.clear();
        }

        // Clear pressed keys
        this.pressedKeys.clear();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API: Keyboard State
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Checks if a key is currently pressed.
     * @param key - Key name (case-insensitive, uses event.key)
     * @returns true if the key is currently held down
     */
    public isKeyDown(key: string): boolean {
        return this.pressedKeys.has(key.toLowerCase());
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Public API: Event Subscription
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Subscribe to an input event.
     * @param event - Event type to listen for
     * @param callback - Function to call when event fires
     */
    public on<T extends InputEventData>(event: InputEventType, callback: InputCallback<T>): void {
        const set = this.handlers.get(event);
        if (set) {
            set.add(callback as InputCallback<any>);
        }
    }

    /**
     * Unsubscribe from an input event.
     * @param event - Event type
     * @param callback - Specific callback to remove
     */
    public off<T extends InputEventData>(event: InputEventType, callback: InputCallback<T>): void {
        const set = this.handlers.get(event);
        if (set) {
            set.delete(callback as InputCallback<any>);
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: NDC Calculation
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Converts client coordinates to Normalized Device Coordinates [-1, 1].
     */
    private computeNDC(clientX: number, clientY: number): THREE.Vector2 {
        const rect = this.domElement.getBoundingClientRect();
        const w = rect.width || 1;
        const h = rect.height || 1;
        return new THREE.Vector2(
            ((clientX - rect.left) / w) * 2 - 1,
            -((clientY - rect.top) / h) * 2 + 1
        );
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: Event Emission
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Emits an event to all registered callbacks.
     */
    private emit<T>(event: InputEventType, data: T): void {
        const set = this.handlers.get(event);
        if (!set) return;

        for (const callback of set) {
            try {
                callback(data);
            } catch {
                // Silently ignore callback errors to prevent one handler from breaking others
            }
        }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: Mouse/Pointer Handlers
    // ─────────────────────────────────────────────────────────────────────────

    private handlePointerMove(e: PointerEvent): void {
        const ndc = this.computeNDC(e.clientX, e.clientY);
        this.mousePosition.copy(ndc);

        // Handle drag if active
        if (this.isDragging && this.dragStart) {
            this.emit<DragEventData>('drag', {
                start: this.dragStart.clone(),
                current: ndc,
                originalEvent: e
            });
        }
    }

    private handlePointerDown(e: PointerEvent): void {
        // Start potential drag
        this.dragStart = this.computeNDC(e.clientX, e.clientY);
        this.dragButton = e.button;
        this.isDragging = false; // Will become true if mouse moves enough
    }

    private handlePointerUp(e: PointerEvent): void {
        if (this.isDragging && this.dragStart) {
            // End drag
            const current = this.computeNDC(e.clientX, e.clientY);
            this.emit<DragEventData>('dragend', {
                start: this.dragStart.clone(),
                current,
                originalEvent: e
            });
        }

        // Reset drag state
        this.isDragging = false;
        this.dragStart = null;
        this.dragButton = -1;
    }

    private handleClick(e: MouseEvent): void {
        // If we were dragging, don't emit click
        if (this.isDragging) return;

        // Check if this could be a drag start (threshold not reached)
        if (this.dragStart) {
            const current = this.computeNDC(e.clientX, e.clientY);
            const dx = (current.x - this.dragStart.x) * this.domElement.clientWidth;
            const dy = (current.y - this.dragStart.y) * this.domElement.clientHeight;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > DRAG_THRESHOLD) {
                // This was actually a drag, emit dragstart + dragend
                if (!this.isDragging) {
                    this.isDragging = true;
                    this.emit<DragEventData>('dragstart', {
                        start: this.dragStart.clone(),
                        current,
                        originalEvent: e
                    });
                    this.emit<DragEventData>('dragend', {
                        start: this.dragStart.clone(),
                        current,
                        originalEvent: e
                    });
                    this.isDragging = false;
                    this.dragStart = null;
                    return;
                }
            }
        }

        // Normal click
        const ndc = this.computeNDC(e.clientX, e.clientY);
        this.mousePosition.copy(ndc);
        this.emit<MouseEventData>('click', {
            position: ndc,
            originalEvent: e
        });
    }

    private handleDblClick(e: MouseEvent): void {
        const ndc = this.computeNDC(e.clientX, e.clientY);
        this.mousePosition.copy(ndc);
        this.emit<MouseEventData>('dblclick', {
            position: ndc,
            originalEvent: e
        });
    }

    private handleContextMenu(e: MouseEvent): void {
        e.preventDefault(); // Prevent browser context menu
        const ndc = this.computeNDC(e.clientX, e.clientY);
        this.mousePosition.copy(ndc);
        this.emit<MouseEventData>('contextmenu', {
            position: ndc,
            originalEvent: e
        });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private: Keyboard Handlers
    // ─────────────────────────────────────────────────────────────────────────

    private handleKeyDown(e: KeyboardEvent): void {
        const key = e.key.toLowerCase();

        // Log de diagnostic pour Enter
        if (e.key === 'Enter') {
            console.log('[InputManager] 🔑 Enter détecté', {
                key: e.key,
                target: e.target,
                activeElement: document.activeElement?.tagName,
                pressedKeysHas: this.pressedKeys.has(key)
            });
        }

        // Only emit if key wasn't already pressed (avoid key repeat)
        if (!this.pressedKeys.has(key)) {
            this.pressedKeys.add(key);
            
            if (e.key === 'Enter') {
                console.log('[InputManager] ✅ Émission événement keydown pour Enter');
            }
            
            this.emit<KeyEventData>('keydown', {
                key: e.key,
                originalEvent: e
            });
        }
    }

    private handleKeyUp(e: KeyboardEvent): void {
        const key = e.key.toLowerCase();
        this.pressedKeys.delete(key);
        this.emit<KeyEventData>('keyup', {
            key: e.key,
            originalEvent: e
        });
    }

    /**
     * Clears all pressed keys when window loses focus.
     * Prevents "stuck" keys when user alt-tabs away.
     */
    private handleBlur(): void {
        this.pressedKeys.clear();
    }
}