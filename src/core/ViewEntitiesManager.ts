import * as THREE from 'three';
import type { NavigationState, ViewMode, PlanetReference } from '../types/NavigationState';
import type { SunMetadata } from '../entities/ClusterGrid';
import { SolarSystem } from '../entities/SolarSystem';
import { PlanetSurface } from '../entities/PlanetSurface';
import { SurfaceResourceManager } from '../entities/SurfaceResourceManager';
import { OrbitView } from '../views/OrbitView';
import { getPlanetSizeFromSeed } from './GameScales';
import type { IUpdatable } from './IUpdatable';
import { SurfaceGrid } from './SurfaceGrid';

export type SurfaceGridProvider = (planetRef: PlanetReference) => SurfaceGrid | null;

/**
 * Gère la visibilité et le cycle de vie des entités 3D selon la vue de navigation.
 * 
 * Responsabilités :
 * - Afficher/masquer les entités selon ViewMode (GALAXY, SYSTEM, ORBIT, SURFACE)
 * - Lazy loading de SolarSystem, OrbitView et PlanetSurface (création à la demande)
 * - Propagation des updates aux entités actives
 * - Nettoyage des ressources lors des transitions
 * 
 * Architecture :
 * - GALAXY : galaxyGroup visible, tout le reste masqué
 * - SYSTEM : SolarSystem visible, galaxyGroup masqué
 * - ORBIT : OrbitView visible (planète + grille orbitale), SolarSystem en arrière-plan
 * - SURFACE : PlanetSurface visible, SolarSystem en arrière-plan
 * 
 * Principe KISS : logique simple de visibilité basée sur l'état NavigationState.
 */
export class ViewEntitiesManager implements IUpdatable {
    /** Référence à la scène Three.js pour ajout/retrait d'entités */
    private scene: THREE.Scene;

    /** Groupe contenant les entités GALAXY (ClusterGrid, StarField) - toujours présent */
    private galaxyGroup: THREE.Group;

    /** SolarSystem actuel, créé à la demande lors de l'entrée dans un système */
    private currentSolarSystem: SolarSystem | null = null;

    /** OrbitView actuelle, créée à la demande lors de l'entrée en vue orbitale */
    private currentOrbitView: OrbitView | null = null;

    /** PlanetSurface actuelle, créée à la demande lors de l'entrée sur une planète */
    private currentPlanetSurface: PlanetSurface | null = null;

    /** Gestionnaire des ressources en surface */
    private surfaceResourceManager: SurfaceResourceManager | null = null;

    /** Provider pour récupérer la grille de surface logique (nécessaire pour les ressources) */
    private surfaceGridProvider: SurfaceGridProvider | null = null;

    /** Vue actuellement active (cache pour éviter les mises à jour inutiles) */
    private currentView: ViewMode = 'GALAXY';

    /** Référence à la caméra pour updateLOD de PlanetSurface */
    private camera: THREE.Camera | null = null;

    /**
     * Crée un nouveau ViewEntitiesManager.
     * 
     * @param scene - Scène Three.js où les entités sont ajoutées/retirées
     * @param galaxyGroup - Groupe contenant ClusterGrid et StarField (toujours présent)
     */
    constructor(scene: THREE.Scene, galaxyGroup: THREE.Group) {
        this.scene = scene;
        this.galaxyGroup = galaxyGroup;

        // S'assurer que le galaxyGroup est visible au départ (vue GALAXY par défaut)
        this.galaxyGroup.visible = true;
    }

    /**
     * Met à jour la visibilité des entités selon la vue actuelle.
     * Crée les entités à la demande (lazy loading) et détruit les anciennes si nécessaire.
     *
     * Logique de visibilité :
     * - GALAXY : galaxyGroup visible, pas de SolarSystem/OrbitView/PlanetSurface
     * - SYSTEM : galaxyGroup masqué, SolarSystem visible
     * - ORBIT : galaxyGroup masqué, SolarSystem visible (arrière-plan), OrbitView visible
     * - SURFACE : galaxyGroup masqué, SolarSystem visible (arrière-plan), PlanetSurface visible
     *
     * @param view - Mode de vue cible (GALAXY, SYSTEM, ORBIT, SURFACE)
     * @param navState - État de navigation complet (pour accéder aux références système/planète)
     */
    public setView(view: ViewMode, navState: NavigationState): void {
        console.log('[ViewEntitiesManager] setView called:', {
            requestedView: view,
            currentView: this.currentView,
            navStateView: navState.currentView,
            systemId: navState.currentSystem?.metadata.id || null,
            planetId: navState.currentPlanet?.id || null
        });

        // Optimisation : ne rien faire si la vue n'a pas changé
        const systemChanged = this.hasSystemChanged(navState);
        const planetChanged = this.hasPlanetChanged(navState);

        if (view === this.currentView && !systemChanged && !planetChanged) {
            console.log('[ViewEntitiesManager] setView skipped (no changes)');
            return;
        }

        this.currentView = view;

        switch (view) {
            case 'GALAXY':
                this.showGalaxyView();
                break;
            case 'SYSTEM':
                this.showSystemView(navState);
                break;
            case 'ORBIT':
                this.showOrbitView(navState);
                break;
            case 'SURFACE':
                this.showSurfaceView(navState);
                break;
            default:
                console.warn('[ViewEntitiesManager] Unknown view mode:', view);
        }
    }

    /**
     * Vérifie si le système sélectionné a changé.
     */
    private hasSystemChanged(navState: NavigationState): boolean {
        if (!navState.currentSystem) {
            return this.currentSolarSystem !== null;
        }
        if (!this.currentSolarSystem) {
            return true;
        }
        // Comparer par ID de métadonnées (source de vérité stable)
        return navState.currentSystem.metadata.id !== this.currentSolarSystem.getMetadata().id;
    }

    /**
     * Vérifie si la planète sélectionnée a changé.
     */
    private hasPlanetChanged(navState: NavigationState): boolean {
        if (!navState.currentPlanet) {
            return this.currentPlanetSurface !== null;
        }
        if (!this.currentPlanetSurface) {
            return true;
        }
        // Comparer par ID de planète
        return navState.currentPlanet.id !== this.currentPlanetSurface.getPlanetReference().id;
    }

    /**
     * Affiche la vue GALAXY : galaxyGroup visible, autres entités masquées/détruites.
     */
    private showGalaxyView(): void {
        // Afficher la galaxie
        this.galaxyGroup.visible = true;

        // Nettoyer toutes les vues spécifiques
        this.disposeOrbitView();
        this.disposePlanetSurface();
        this.disposeSolarSystem();
    }

    /**
     * Affiche la vue SYSTEM : SolarSystem visible, galaxyGroup masqué.
     * Crée le SolarSystem à la demande si nécessaire.
     */
    private showSystemView(navState: NavigationState): void {
        // Masquer la galaxie
        this.galaxyGroup.visible = false;

        // Nettoyer OrbitView et PlanetSurface si existantes
        this.disposeOrbitView();
        this.disposePlanetSurface();

        // Créer ou mettre à jour le SolarSystem
        if (navState.currentSystem) {
            this.ensureSolarSystem(navState.currentSystem.metadata);
        } else {
            console.warn('[ViewEntitiesManager] Vue SYSTEM sans currentSystem défini');
            this.disposeSolarSystem();
        }
    }

    /**
     * Affiche la vue ORBIT : OrbitView visible, SolarSystem en arrière-plan.
     * Crée l'OrbitView à la demande si nécessaire.
     */
    private showOrbitView(navState: NavigationState): void {
        // Masquer la galaxie
        this.galaxyGroup.visible = false;

        // Nettoyer PlanetSurface si existante
        this.disposePlanetSurface();

        // S'assurer que le SolarSystem est présent (arrière-plan)
        if (navState.currentSystem) {
            this.ensureSolarSystem(navState.currentSystem.metadata);
            // Rendre le SolarSystem semi-transparent en arrière-plan
            if (this.currentSolarSystem) {
                this.currentSolarSystem.getGroup().visible = true;
            }
        }

        // S'assurer que la PlanetSurface est présente (même si initialement masquée)
        if (navState.currentPlanet) {
            this.ensurePlanetSurface(navState.currentPlanet);
            if (this.currentPlanetSurface) {
                this.currentPlanetSurface.getGroup().visible = false; // Masquer PlanetSurface en vue ORBIT
            }
        } else {
            console.warn('[ViewEntitiesManager] Vue ORBIT sans currentPlanet défini');
            this.disposePlanetSurface();
        }

        // Créer l'OrbitView
        if (navState.currentPlanet) {
            this.ensureOrbitView(navState.currentPlanet);
        } else {
            console.warn('[ViewEntitiesManager] Vue ORBIT sans currentPlanet défini');
            this.disposeOrbitView();
        }
    }

    /**
     * Affiche la vue SURFACE : PlanetSurface visible, SolarSystem en arrière-plan.
     * Crée la PlanetSurface à la demande si nécessaire.
     */
    private showSurfaceView(navState: NavigationState): void {
        console.log('[ViewEntitiesManager] 🌍 showSurfaceView() START', {
            currentPlanet: navState.currentPlanet?.name || 'NULL',
            currentSystem: navState.currentSystem?.metadata.name || 'NULL',
            planetSurfaceExists: !!this.currentPlanetSurface
        });

        // DEBUG: Vérifier l'état de la scène avant modifications
        console.log('[ViewEntitiesManager] Scene state BEFORE:', {
            childrenCount: this.scene.children.length,
            galaxyVisible: this.galaxyGroup.visible
        });

        // Masquer la galaxie
        this.galaxyGroup.visible = false;

        // Nettoyer OrbitView si existante
        this.disposeOrbitView();

        // S'assurer que le SolarSystem est présent (arrière-plan)
        if (navState.currentSystem) {
            this.ensureSolarSystem(navState.currentSystem.metadata);
        }

        // Créer la PlanetSurface
        if (navState.currentPlanet) {
            console.log('[ViewEntitiesManager] Appel ensurePlanetSurface pour:', navState.currentPlanet.name);
            this.ensurePlanetSurface(navState.currentPlanet);
            
            // Initialiser les ressources de surface
            this.ensureSurfaceResources(navState.currentPlanet);

            // Vérification post-création
            if (this.currentPlanetSurface) {
                const group = this.currentPlanetSurface.getGroup();
                
                // DEBUG: Vérifier si le groupe est bien ajouté à la scène
                if (!this.scene.children.includes(group)) {
                    console.warn('[ViewEntitiesManager] ⚠️ PlanetSurface group NOT in scene children list! Adding it manually...');
                    this.scene.add(group);
                }

                console.log('[ViewEntitiesManager] ✅ PlanetSurface créée:', {
                    name: navState.currentPlanet.name,
                    groupVisible: group.visible,
                    groupInScene: this.scene.children.includes(group),
                    groupPosition: {
                        x: group.position.x.toFixed(2),
                        y: group.position.y.toFixed(2),
                        z: group.position.z.toFixed(2)
                    },
                    groupChildren: group.children.length,
                    sceneChildren: this.scene.children.length
                });

                // DEBUG: Vérifier la caméra
                if (this.camera) {
                    const dist = this.camera.position.distanceTo(group.position);
                    console.log('[ViewEntitiesManager] 📷 Caméra vs PlanetSurface:', {
                        camPos: this.camera.position,
                        planetPos: group.position,
                        distance: dist,
                        radius: navState.currentPlanet.radius,
                        ratio: dist / navState.currentPlanet.radius
                    });
                } else {
                    console.warn('[ViewEntitiesManager] ⚠️ Caméra non définie dans ViewEntitiesManager');
                }

                // DEBUG: Force update LOD immediately
                if (this.camera) {
                    console.log('[ViewEntitiesManager] Forcing initial LOD update...');
                    this.currentPlanetSurface.updateLOD(this.camera);
                    console.log('[ViewEntitiesManager] Initial LOD level:', this.currentPlanetSurface.getCurrentLODLevel());
                }

            } else {
                console.error('[ViewEntitiesManager] ❌ PlanetSurface NON créée après ensurePlanetSurface()');
            }
        } else {
            console.warn('[ViewEntitiesManager] Vue SURFACE sans currentPlanet défini');
            this.disposePlanetSurface();
        }
        
        console.log('[ViewEntitiesManager] 🌍 showSurfaceView() END');
    }

    /**
     * S'assure qu'un SolarSystem est créé et ajouté à la scène.
     * Si un SolarSystem différent existe déjà, il est remplacé.
     * 
     * @param metadata - Métadonnées du système à afficher
     */
    private ensureSolarSystem(metadata: SunMetadata): void {
        // Vérifier si on a déjà le bon système
        if (this.currentSolarSystem && 
            this.currentSolarSystem.getMetadata().id === metadata.id) {
            // Système déjà chargé, s'assurer qu'il est visible
            this.currentSolarSystem.getGroup().visible = true;
            return;
        }

        // Nettoyer l'ancien système si différent
        this.disposeSolarSystem();

        // Créer le nouveau SolarSystem (lazy loading)
        console.log(`[ViewEntitiesManager] Création SolarSystem: ${metadata.name}`);
        this.currentSolarSystem = new SolarSystem(metadata);

        // Récupérer le groupe Three.js
        const solarSystemGroup = this.currentSolarSystem.getGroup();

        // Positionner le groupe à l'absolutePosition du système (cohérence avec la caméra)
        solarSystemGroup.position.set(
            metadata.absolutePosition.x,
            metadata.absolutePosition.y,
            metadata.absolutePosition.z
        );

        // Ajouter à la scène
        this.scene.add(solarSystemGroup);

        console.log(
            `[ViewEntitiesManager] SolarSystem positionné à`,
            metadata.absolutePosition
        );
    }

    /**
     * S'assure qu'une OrbitView est créée et ajoutée à la scène.
     * Si une OrbitView différente existe déjà, elle est remplacée.
     *
     * @param planetRef - Référence de la planète à afficher
     */
    private ensureOrbitView(planetRef: PlanetReference): void {
        // Vérifier si on a déjà la bonne vue
        if (this.currentOrbitView &&
            this.currentOrbitView.getPlanetRef().id === planetRef.id) {
            this.currentOrbitView.getGroup().visible = true;
            return;
        }

        // Nettoyer l'ancienne vue
        this.disposeOrbitView();

        // Déterminer la taille de planète basée sur le seed
        const planetSize = getPlanetSizeFromSeed(planetRef.seed, 0, 1);

        // Créer la nouvelle OrbitView
        console.log(`[ViewEntitiesManager] Création OrbitView: ${planetRef.name}`);
        this.currentOrbitView = new OrbitView({
            planetRef,
            planetSize,
        });

        // Positionner à la position de la planète dans le système
        const group = this.currentOrbitView.getGroup();
        group.position.set(planetRef.position.x, planetRef.position.y, planetRef.position.z);

        // Ajouter à la scène
        this.scene.add(group);
    }

    /**
     * S'assure qu'une PlanetSurface est créée et ajoutée à la scène.
     * Si une PlanetSurface différente existe déjà, elle est remplacée.
     *
     * @param planetRef - Référence de la planète à afficher
     */
    private ensurePlanetSurface(planetRef: PlanetReference): void {
        console.log('[ViewEntitiesManager] 🔧 ensurePlanetSurface() START', {
            planetId: planetRef.id,
            planetName: planetRef.name,
            radius: planetRef.radius,
            currentExists: !!this.currentPlanetSurface
        });

        // Vérifier si on a déjà la bonne planète
        if (this.currentPlanetSurface &&
            this.currentPlanetSurface.getPlanetReference().id === planetRef.id) {
            // Planète déjà chargée, s'assurer qu'elle est visible
            this.currentPlanetSurface.getGroup().visible = true;
            console.log('[ViewEntitiesManager] PlanetSurface existante réutilisée (visible=true)');
            return;
        }

        // Nettoyer l'ancienne planète si différente
        this.disposePlanetSurface();
        this.disposeSurfaceResources();

        // Créer la nouvelle PlanetSurface (lazy loading)
        console.log(`[ViewEntitiesManager] 🏗️ Création PlanetSurface: ${planetRef.name}`);
        this.currentPlanetSurface = new PlanetSurface(planetRef);
        
        if (!this.currentPlanetSurface) {
            console.error('[ViewEntitiesManager] ❌ ÉCHEC création PlanetSurface (constructeur retourne null)');
            return;
        }
        
        // Positionner la surface à la position de la planète dans le système
        const group = this.currentPlanetSurface.getGroup();
        if (!group) {
            console.error('[ViewEntitiesManager] ❌ ÉCHEC getGroup() retourne null');
            return;
        }
        
        group.position.set(planetRef.position.x, planetRef.position.y, planetRef.position.z);
        group.visible = true; // S'assurer explicitement que le groupe est visible
        
        console.log(`[ViewEntitiesManager] PlanetSurface positionnée à:`, {
            x: planetRef.position.x.toFixed(2),
            y: planetRef.position.y.toFixed(2),
            z: planetRef.position.z.toFixed(2),
            radius: planetRef.radius.toFixed(2),
            groupVisible: group.visible,
            groupChildren: group.children.length
        });
        
        // Ajouter un grand repère 3D (AxesHelper) à l'origine de la planète pour debug/orientation
        // Rouge = X, Vert = Y, Bleu = Z
        // Taille proportionnelle au rayon de la planète (2× rayon pour être bien visible)
        const axesHelper = new THREE.AxesHelper(planetRef.radius * 2);
        axesHelper.position.set(0, 0, 0); // Origine locale du groupe planète
        group.add(axesHelper);
        console.log(`[ViewEntitiesManager] AxesHelper ajouté (taille: ${(planetRef.radius * 2).toFixed(2)})`);
        
        // Ajouter à la scène
        console.log('[ViewEntitiesManager] Ajout groupe PlanetSurface à la scène...');
        this.scene.add(group);
        
        // Vérification post-ajout
        const inScene = this.scene.children.includes(group);
        console.log('[ViewEntitiesManager] ✅ Groupe ajouté à la scène:', {
            inScene,
            sceneChildrenCount: this.scene.children.length,
            groupVisible: group.visible,
            lodGroupVisible: this.currentPlanetSurface.getGroup().children[0]?.visible // Vérifier LOD group
        });
        
        if (!inScene) {
            console.error('[ViewEntitiesManager] ❌ ÉCHEC: Groupe NOT dans scene.children après scene.add()');
        }
        
        console.log('[ViewEntitiesManager] 🔧 ensurePlanetSurface() END');
    }

    /**
     * Nettoie et supprime le SolarSystem actuel.
     */
    private disposeSolarSystem(): void {
        if (this.currentSolarSystem) {
            console.log(`[ViewEntitiesManager] Dispose SolarSystem: ${this.currentSolarSystem.getMetadata().name}`);
            this.scene.remove(this.currentSolarSystem.getGroup());
            this.currentSolarSystem.dispose();
            this.currentSolarSystem = null;
        }
    }

    /**
     * Nettoie et supprime l'OrbitView actuelle.
     */
    private disposeOrbitView(): void {
        if (this.currentOrbitView) {
            console.log(`[ViewEntitiesManager] Dispose OrbitView: ${this.currentOrbitView.getPlanetRef().name}`);
            this.scene.remove(this.currentOrbitView.getGroup());
            this.currentOrbitView.dispose();
            this.currentOrbitView = null;
        }
    }

    /**
     * Nettoie et supprime la PlanetSurface actuelle.
     */
    private disposePlanetSurface(): void {
        if (this.currentPlanetSurface) {
            console.log(`[ViewEntitiesManager] Dispose PlanetSurface: ${this.currentPlanetSurface.getPlanetReference().name}`);
            this.scene.remove(this.currentPlanetSurface.getGroup());
            this.currentPlanetSurface.dispose();
            this.currentPlanetSurface = null;
        }
        // Nettoyer aussi les ressources associées
        this.disposeSurfaceResources();
    }

    /**
     * S'assure que les ressources de surface sont affichées.
     */
    private ensureSurfaceResources(planetRef: PlanetReference): void {
        if (this.surfaceResourceManager) {
            return; // Déjà chargé
        }

        if (!this.surfaceGridProvider) {
            console.warn('[ViewEntitiesManager] Pas de SurfaceGridProvider, impossible d\'afficher les ressources');
            return;
        }

        const surfaceGrid = this.surfaceGridProvider(planetRef);
        if (!surfaceGrid) {
            console.warn('[ViewEntitiesManager] SurfaceGrid non trouvée pour', planetRef.name);
            return;
        }

        console.log('[ViewEntitiesManager] Initialisation SurfaceResourceManager');
        this.surfaceResourceManager = new SurfaceResourceManager(this.scene, surfaceGrid);
        this.surfaceResourceManager.initialize();
    }

    /**
     * Nettoie les ressources de surface.
     */
    private disposeSurfaceResources(): void {
        if (this.surfaceResourceManager) {
            console.log('[ViewEntitiesManager] Dispose SurfaceResourceManager');
            this.surfaceResourceManager.dispose();
            this.surfaceResourceManager = null;
        }
    }

    /**
     * Prépare (crée) le SolarSystem pour un système donné SANS changer de vue.
     * Utilisé pour obtenir les dimensions du système avant la transition caméra.
     * 
     * @param metadata Métadonnées du système à préparer
     * @returns Le SolarSystem créé ou existant
     */
    public prepareSolarSystem(metadata: SunMetadata): SolarSystem {
        this.ensureSolarSystem(metadata);
        return this.currentSolarSystem!;
    }

    /**
     * Retourne le SolarSystem actuel (ou null si non chargé).
     * Utile pour le raycasting et la sélection de planètes en vue SYSTEM.
     */
    public getSolarSystem(): SolarSystem | null {
        return this.currentSolarSystem;
    }

    /**
     * Retourne l'OrbitView actuelle (ou null si non chargée).
     * Utile pour le raycasting et l'interaction en vue ORBIT.
     */
    public getOrbitView(): OrbitView | null {
        return this.currentOrbitView;
    }

    /**
     * Retourne la PlanetSurface actuelle (ou null si non chargée).
     * Utile pour le raycasting et l'interaction en vue SURFACE.
     */
    public getPlanetSurface(): PlanetSurface | null {
        return this.currentPlanetSurface;
    }

    /**
     * Retourne la vue actuellement active.
     */
    public getCurrentView(): ViewMode {
        return this.currentView;
    }

    /**
     * Définit la référence à la caméra pour les mises à jour LOD.
     * Doit être appelé après la création du CameraManager.
     *
     * @param camera - Caméra Three.js pour calcul des distances LOD
     */
    public setCamera(camera: THREE.Camera): void {
        this.camera = camera;
    }

    /**
     * Définit le provider pour récupérer les grilles de surface.
     * Permet de découpler la vue de la logique de jeu (EntityManager).
     */
    public setSurfaceGridProvider(provider: SurfaceGridProvider): void {
        this.surfaceGridProvider = provider;
    }

    /**
     * Update appelé chaque frame (implémentation IUpdatable).
     * Propage l'update aux entités actives selon la vue courante.
     * 
     * @param deltaTime - Temps écoulé depuis la dernière frame (secondes)
     * @param _cameraPosition - Position de la caméra (optionnel, pour compatibilité IUpdatable)
     */
    public update(deltaTime: number, _cameraPosition?: THREE.Vector3): void {
        // Update SolarSystem si actif (vues SYSTEM, ORBIT ou SURFACE)
        if (this.currentSolarSystem && 
            (this.currentView === 'SYSTEM' || this.currentView === 'ORBIT' || this.currentView === 'SURFACE')) {
            this.currentSolarSystem.update(deltaTime);
        }

        // Update OrbitView si active (vue ORBIT)
        if (this.currentOrbitView && this.currentView === 'ORBIT') {
            this.currentOrbitView.update(deltaTime);
        }

        // Update PlanetSurface si active (vue SURFACE uniquement)
        // Note: L'instruction mentionne ORBIT ou SURFACE, mais PlanetSurface est spécifique à la vue SURFACE
        // et OrbitView gère sa propre représentation planétaire pour la vue ORBIT.
        if (this.currentPlanetSurface && (this.currentView === 'SURFACE' || this.currentView === 'ORBIT')) {
            this.currentPlanetSurface.update(deltaTime);
            
            // Mettre à jour le LOD si on a une caméra
            if (this.camera) {
                this.currentPlanetSurface.updateLOD(this.camera);
            }
        }
    }

    /**
     * Libère toutes les ressources (pattern Dispose).
     * Doit être appelé lors de la destruction du manager.
     */
    public dispose(): void {
        this.disposeOrbitView();
        this.disposePlanetSurface();
        this.disposeSolarSystem();
        
        this.camera = null;
        console.log('[ViewEntitiesManager] Disposed');
    }
}