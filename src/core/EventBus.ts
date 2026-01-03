// src/core/EventBus.ts
/**
 * Bus d'événements central pour communication découplée entre systèmes.
 * 
 * Architecture:
 * - Pattern Observer typé pour TypeScript
 * - Singleton global pour accès depuis n'importe quel module
 * - Support des événements asynchrones et synchrones
 * - Nettoyage automatique des listeners
 * 
 * KISS: API minimaliste, zéro dépendance externe.
 */

// ============================================================================
// Types d'événements du jeu
// ============================================================================

export interface GameEvents {
    // === Lifecycle ===
    'game:start': { playerId: string; playerName: string };
    'game:pause': undefined;
    'game:resume': undefined;
    'game:end': { winnerId: string | null; reason: 'victory' | 'defeat' | 'disconnect' };
    
    // === Navigation ===
    'nav:enter-system': { systemId: string; systemName: string };
    'nav:exit-system': { systemId: string };
    'nav:enter-planet': { planetId: string; planetName: string };
    'nav:exit-planet': undefined;
    'nav:view-changed': { from: string; to: string };
    
    // === Unités ===
    'unit:created': { unitId: number; ownerId: string; shipClass: string; position: Position3D };
    'unit:destroyed': { unitId: number; killerId: number | null; position: Position3D };
    'unit:damaged': { unitId: number; damage: number; attackerId: number };
    'unit:healed': { unitId: number; amount: number };
    'unit:state-changed': { unitId: number; oldState: string; newState: string };
    
    // === Sélection ===
    'selection:changed': { unitIds: number[]; primaryId: number | null };
    'selection:cleared': undefined;
    
    // === Combat ===
    'combat:started': { attackerIds: number[]; defenderIds: number[] };
    'combat:ended': { winnerId: string | null };
    'combat:attack': { attackerId: number; targetId: number; damage: number; isCritical: boolean };
    
    // === Économie ===
    'resources:changed': { playerId: string; resources: Record<string, number>; delta: Record<string, number> };
    'harvest:started': { harvesterId: number; targetId: number };
    'harvest:completed': { harvesterId: number; amount: number; resourceType: string };
    'production:started': { structureId: number; unitType: string; duration: number };
    'production:completed': { structureId: number; unitId: number };
    'production:cancelled': { structureId: number; refund: Record<string, number> };
    
    // === Réseau ===
    'net:connected': { peerId: string };
    'net:disconnected': { peerId: string; reason?: string };
    'net:player-joined': { playerId: string; playerName: string };
    'net:player-left': { playerId: string };
    'net:sync-received': { frameNumber: number };
    'net:latency-update': { peerId: string; latency: number };
    
    // === UI ===
    'ui:notification': { type: 'info' | 'warning' | 'error' | 'success'; message: string };
    'ui:tooltip-show': { text: string; x: number; y: number };
    'ui:tooltip-hide': undefined;
    'ui:menu-open': { menuId: string };
    'ui:menu-close': { menuId: string };
}

// Types utilitaires
interface Position3D {
    x: number;
    y: number;
    z: number;
}

type EventCallback<T> = (data: T) => void;
type UnsubscribeFn = () => void;

// ============================================================================
// Classe EventBus
// ============================================================================

class EventBusImpl {
    /** Map des listeners par type d'événement */
    private listeners: Map<string, Set<EventCallback<unknown>>> = new Map();
    
    /** Compteur pour statistiques debug */
    private emitCount = 0;
    
    /** Mode debug (log tous les événements) */
    private debugMode = false;
    
    /**
     * S'abonne à un type d'événement.
     * Retourne une fonction de désabonnement.
     */
    on<K extends keyof GameEvents>(
        event: K,
        callback: EventCallback<GameEvents[K]>
    ): UnsubscribeFn {
        let listeners = this.listeners.get(event);
        if (!listeners) {
            listeners = new Set();
            this.listeners.set(event, listeners);
        }
        
        listeners.add(callback as EventCallback<unknown>);
        
        // Retourner fonction de nettoyage
        return () => {
            listeners!.delete(callback as EventCallback<unknown>);
            if (listeners!.size === 0) {
                this.listeners.delete(event);
            }
        };
    }
    
    /**
     * S'abonne à un événement pour une seule émission.
     */
    once<K extends keyof GameEvents>(
        event: K,
        callback: EventCallback<GameEvents[K]>
    ): UnsubscribeFn {
        const unsubscribe = this.on(event, (data) => {
            unsubscribe();
            callback(data);
        });
        return unsubscribe;
    }
    
    /**
     * Émet un événement vers tous les listeners.
     */
    emit<K extends keyof GameEvents>(
        event: K,
        data: GameEvents[K]
    ): void {
        this.emitCount++;
        
        if (this.debugMode) {
            console.log(`[EventBus] ${event}`, data);
        }
        
        const listeners = this.listeners.get(event);
        if (!listeners) return;
        
        // Copie du set pour éviter les problèmes si un listener se désabonne
        for (const callback of [...listeners]) {
            try {
                callback(data);
            } catch (error) {
                console.error(`[EventBus] Error in listener for "${event}":`, error);
            }
        }
    }
    
    /**
     * Supprime tous les listeners d'un type d'événement.
     */
    off<K extends keyof GameEvents>(event: K): void {
        this.listeners.delete(event);
    }
    
    /**
     * Supprime tous les listeners.
     */
    clear(): void {
        this.listeners.clear();
    }
    
    /**
     * Active/désactive le mode debug.
     */
    setDebugMode(enabled: boolean): void {
        this.debugMode = enabled;
        console.log(`[EventBus] Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    /**
     * Retourne des statistiques sur l'EventBus.
     */
    getStats(): { eventTypes: number; totalListeners: number; emitCount: number } {
        let totalListeners = 0;
        for (const listeners of this.listeners.values()) {
            totalListeners += listeners.size;
        }
        
        return {
            eventTypes: this.listeners.size,
            totalListeners,
            emitCount: this.emitCount
        };
    }
}

// ============================================================================
// Export Singleton
// ============================================================================

/**
 * Instance singleton du bus d'événements.
 * Usage: `eventBus.on('event', handler)` ou `eventBus.emit('event', data)`
 */
export const eventBus = new EventBusImpl();

// Export du type pour les tests
export type EventBus = EventBusImpl;
