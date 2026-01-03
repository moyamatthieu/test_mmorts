import { NavigationState, createInitialNavigationState, SystemReference, ViewMode, PlanetReference } from '../types/NavigationState';

// Ré-export pour compatibilité avec les autres modules
export type { ViewMode, SystemReference, PlanetReference } from '../types/NavigationState';

export class NavigationManager {
    private static instance: NavigationManager;

    /**
     * État centralisé de navigation (source de vérité unique)
     */
    private state: NavigationState;
 
    /**
     * Callbacks notifications changement vue
     */
    private viewChangeCallbacks: Array<(mode: ViewMode) => void> = [];
 
    private constructor() {
        this.state = createInitialNavigationState();
    }

    public static getInstance(): NavigationManager {
        if (!NavigationManager.instance) {
            NavigationManager.instance = new NavigationManager();
        }
        return NavigationManager.instance;
    }

    /**
     * Mode de vue actuel
     */
    getCurrentView(): ViewMode {
        return this.state.currentView;
    }

    /**
     * Système actuellement sélectionné (null si aucun)
     */
    getCurrentSystem(): SystemReference | null {
        return this.state.currentSystem;
    }

    /**
     * Met à jour la cible de navigation en vue GALAXY (sélection), sans changer de vue.
     * Invariant: la sélection galaxie doit être basée sur des données stables (metadata),
     * pas sur un handle runtime (Mesh) qui peut devenir invalide lors d'un scene graph swap.
     */
    public setGalaxySelection(system: SystemReference | null): void {
        if (this.state.currentView !== 'GALAXY') {
            console.warn('[NavigationManager] setGalaxySelection ignored (not in GALAXY view)');
            return;
        }

        this.state.currentSystem = system;
        this.state.currentOptimalDistance = system ? system.metadata.optimalDistance : null;
    }

    /**
     * Historique navigation (copie lecture seule)
     */
    getNavigationHistory(): ReadonlyArray<SystemReference> {
        return this.state.navigationHistory;
    }

    /**
     * Changer le mode de vue avec gestion du contexte de sortie.
     * @param mode Nouveau mode de vue
     * @param system Système associé (obligatoire si mode=SYSTEM)
     */
    setViewMode(mode: ViewMode, system?: SystemReference): void {
        // Validation : SYSTEM nécessite un SystemReference
        if (mode === 'SYSTEM' && !system) {
            console.error('[NavigationManager] SYSTEM mode requires a SystemReference');
            return;
        }

        // Mise à jour état
        this.state.currentView = mode;

        if (mode === 'GALAXY') {
            // Retour galaxie : conserver currentSystem pour retour lookAt
            this.state.currentOptimalDistance = null;
        } else if (mode === 'SYSTEM' && system) {
            this.state.currentSystem = system;
        }

        // Notifications
        this.notifyViewChange(mode);
    }

    /**
     * Entrer dans un système solaire
     * @param system Système à visiter
     */
    enterSystem(system: SystemReference): void {
        // Validation minimale: metadata est la seule source de vérité obligatoire.
        if (!system || !system.metadata) {
            console.error('[NavigationManager] Invalid SystemReference (missing metadata)', system);
            return;
        }

        // FIX Bug #1: Sauvegarder système actuel AVANT changement d'état
        // Note: currentSystem peut être null (première entrée depuis galaxie) ou non-null (navigation système->système)
        if (this.state.currentView === 'SYSTEM' && this.state.currentSystem) {
            this.state.navigationHistory.push(this.state.currentSystem);
        }

        // Transition
        this.setViewMode('SYSTEM', system);
        
        // Mettre à jour optimalDistance pour transitions automatiques
        this.state.currentOptimalDistance = system.metadata.optimalDistance;
        
        console.log(`[NavigationManager] Entered system: ${system.metadata.id} (optimalDistance: ${system.metadata.optimalDistance.toFixed(1)})`, {
            historyDepth: this.state.navigationHistory.length
        });
    }

    /**
     * Retour au système précédent dans l'historique
     * @returns true si un système précédent existe, false sinon
     */
    exitSystemToHistory(): boolean {
        if (this.state.navigationHistory.length === 0) {
            return false; // Pas d'historique disponible
        }
        
        const previousSystem = this.state.navigationHistory.pop()!;
        this.state.currentSystem = previousSystem;
        this.state.currentView = 'SYSTEM';
        this.notifyViewChange('SYSTEM');
        
        console.log(`[NavigationManager] Returned to previous system: ${previousSystem.metadata.id}`, {
            historyRemaining: this.state.navigationHistory.length
        });
        
        return true;
    }

    /**
     * Sortir du système actuel (retour galaxie)
     * @returns Le système qui vient d'être quitté (pour repositionnement caméra)
     */
    exitSystem(): SystemReference | null {
        if (this.state.currentView !== 'SYSTEM') {
            console.warn('[NavigationManager] exitSystem called but not in SYSTEM view');
            return null;
        }

        // Le système quitté est toujours le système actuel
        const exitedSystem = this.state.currentSystem;

        // Retour galaxie
        this.setViewMode('GALAXY');
        
        // Reset optimalDistance en vue galaxie
        this.state.currentOptimalDistance = null;
        
        console.log(`[NavigationManager] Exited system: ${exitedSystem?.metadata.id}`, {
            historyRemaining: this.state.navigationHistory.length
        });

        return exitedSystem;
    }

    /**
     * Entre en vue ORBIT autour d'une planète
     * Transition: SYSTEM → ORBIT
     * @param planetRef Référence de la planète cible
     */
    public enterOrbit(planetRef: PlanetReference): void {
        if (this.state.currentView !== 'SYSTEM') {
            console.warn('[NavigationManager] enterOrbit only allowed from SYSTEM view');
            return;
        }

        if (!planetRef || !planetRef.id) {
            console.error('[NavigationManager] Invalid PlanetReference', planetRef);
            return;
        }

        this.state.currentView = 'ORBIT';
        this.state.currentPlanet = planetRef;
        
        // Distance optimale pour vue orbitale
        const orbitOptimalDistance = planetRef.radius * 4;
        this.state.currentOptimalDistance = orbitOptimalDistance;
        
        console.log(`[NavigationManager] Entering orbit: ${planetRef.name}`);
        this.notifyViewChange('ORBIT');
    }

    /**
     * Entre en vue SURFACE depuis l'orbite
     * Transition: ORBIT → SURFACE
     */
    public enterSurface(): void {
        if (this.state.currentView !== 'ORBIT') {
            console.warn('[NavigationManager] enterSurface only allowed from ORBIT view');
            return;
        }

        if (!this.state.currentPlanet) {
            console.error('[NavigationManager] No planet selected for surface entry');
            return;
        }

        this.state.currentView = 'SURFACE';
        
        // Distance optimale pour vue surface
        const surfaceOptimalDistance = this.state.currentPlanet.radius * 1.5;
        this.state.currentOptimalDistance = surfaceOptimalDistance;
        
        console.log(`[NavigationManager] Landing on: ${this.state.currentPlanet.name}`);
        this.notifyViewChange('SURFACE');
    }

    /**
     * Retourne à la vue ORBIT depuis la surface
     * Transition: SURFACE → ORBIT
     */
    public exitSurface(): void {
        if (this.state.currentView !== 'SURFACE') {
            console.warn('[NavigationManager] exitSurface only from SURFACE view');
            return;
        }

        this.state.currentView = 'ORBIT';
        
        // Restaurer distance orbitale
        if (this.state.currentPlanet) {
            this.state.currentOptimalDistance = this.state.currentPlanet.radius * 4;
        }
        
        console.log(`[NavigationManager] Ascending to orbit from: ${this.state.currentPlanet?.name}`);
        this.notifyViewChange('ORBIT');
    }

    /**
     * Retourne à la vue SYSTEM depuis l'orbite
     * Transition: ORBIT → SYSTEM
     */
    public exitOrbit(): void {
        if (this.state.currentView !== 'ORBIT') {
            console.warn('[NavigationManager] exitOrbit only from ORBIT view');
            return;
        }

        const exitedPlanet = this.state.currentPlanet;
        
        this.state.currentView = 'SYSTEM';
        this.state.currentPlanet = null;
        
        // Restaurer distance système
        if (this.state.currentSystem) {
            this.state.currentOptimalDistance = this.state.currentSystem.metadata.optimalDistance;
        }
        
        console.log(`[NavigationManager] Exiting orbit of: ${exitedPlanet?.name}`);
        this.notifyViewChange('SYSTEM');
    }

    /**
     * Retourne à la vue SYSTEM depuis une planète (legacy pour compatibilité)
     * Transition: ORBIT/SURFACE → SYSTEM
     */
    public exitPlanet(): void {
        if (this.state.currentView !== 'ORBIT' && this.state.currentView !== 'SURFACE') {
            console.warn('[NavigationManager] exitPlanet only from ORBIT or SURFACE view');
            return;
        }

        const exitedPlanet = this.state.currentPlanet;
        
        // Retour au système parent
        this.state.currentView = 'SYSTEM';
        this.state.currentPlanet = null;
        
        // Restaurer optimalDistance système
        if (this.state.currentSystem) {
            this.state.currentOptimalDistance = this.state.currentSystem.metadata.optimalDistance;
        }
        
        console.log(`[NavigationManager] Exiting planet: ${exitedPlanet?.name || 'unknown'}`);
        this.notifyViewChange('SYSTEM');
    }

    /**
     * Met à jour la cible de navigation en vue SYSTEM (sélection planète), sans changer de vue.
     * Similaire à setGalaxySelection() pour les systèmes.
     * La planète sélectionnée pourra ensuite être entrée via Enter ou double-clic.
     */
    public setSystemSelection(planet: PlanetReference | null): void {
        if (this.state.currentView !== 'SYSTEM') {
            console.warn('[NavigationManager] setSystemSelection ignored (not in SYSTEM view)');
            return;
        }

        this.state.currentPlanet = planet;
        // Note: on ne change PAS currentOptimalDistance ici, car on reste en vue SYSTEM
        // L'optimalDistance ne change que lors de l'entrée effective dans la planète
        
        console.log(`[NavigationManager] Planet selection: ${planet ? planet.name : 'cleared'}`);
    }

    /**
     * Retourne la planète actuellement sélectionnée
     */
    public getCurrentPlanet(): PlanetReference | null {
        return this.state.currentPlanet;
    }

    /**
     * Retourne l'état complet de navigation (lecture seule)
     * Utilisé par SceneManager pour les transitions automatiques
     */
    public getState(): Readonly<NavigationState> {
        return this.state;
    }

    onViewChange(callback: (mode: ViewMode) => void): void {
        this.viewChangeCallbacks.push(callback);
    }

    private notifyViewChange(mode: ViewMode): void {
        this.viewChangeCallbacks.forEach(cb => cb(mode));
    }
}
