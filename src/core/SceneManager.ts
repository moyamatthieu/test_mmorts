import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { InputManager, KeyEventData, MouseEventData } from './InputManager';
import { ViewEntitiesManager, SurfaceGridProvider } from './ViewEntitiesManager';
import { NavigationManager } from './NavigationManager';
import { TransitionManager } from './TransitionManager';
import { SceneOrchestrator } from './SceneOrchestrator';
import { StarField } from '../entities/StarField';
import { ClusterGrid } from '../entities/ClusterGrid';
import { CoordinateSystem } from '../entities/CoordinateSystem';
import { MemoryManager } from './MemoryManager';
import { UnitManager } from '../entities/UnitManager';
import { hud } from '../ui/HUD';
import { SIMULATION_CONFIG, NAVIGATION_CONFIG } from '../config';
import { IUpdatable } from './IUpdatable';
import type { SystemReference } from '../types/NavigationState';
import { GameManager } from '../game/GameManager';

/**
 * SceneManager — Responsabilités après refactoring :
 * 1. Setup Three.js (scene, renderer, camera)
 * 2. Boucle animate() et propagation update() aux IUpdatable
 * 3. Coordination des transitions de vue (Enter/Escape)
 * 4. Délégation de l'input à InputManager
 * 5. Délégation de la gestion des entités de vue à ViewEntitiesManager
 * 6. Auto-transitions basées sur la distance caméra
 */
export class SceneManager {
    // Three.js core
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private cameraManager: CameraManager;

    // Managers délégués
    private navigationManager: NavigationManager;
    private inputManager: InputManager;
    private viewEntitiesManager: ViewEntitiesManager;
    private transitionManager: TransitionManager;
    private sceneOrchestrator: SceneOrchestrator;

    // Groupe GALAXY et entités (partagées, toujours présentes)
    private galaxyGroup: THREE.Group;
    private starField: StarField;
    private clusterGrid: ClusterGrid;
    private coordinateSystem: CoordinateSystem;

    // Simulation MMO
    private memoryManager: MemoryManager;
    private unitManager: UnitManager;
    private simulationWorker: Worker;

    // Updatables et timing
    private updatables: IUpdatable[] = [];
    private lastTime: number = performance.now();

    // Cache de vue pour éviter les appels redondants à ViewEntitiesManager.setView()
    private lastKnownView: ViewMode | null = null;

    // Sélection GALAXY (cluster coords pour priorité soleil)
    private selectedClusterCoords: { gx: number; gz: number } | null = null;

    // Raycast
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;

    // UI gérée par le singleton hud importé

    constructor() {
        console.log('[SceneManager] Initialisation...');

        // === Setup Three.js ===
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        // === Groupe GALAXY ===
        this.galaxyGroup = new THREE.Group();
        this.galaxyGroup.name = 'GalaxyGroup';
        this.scene.add(this.galaxyGroup);

        // === Managers ===
        this.cameraManager = new CameraManager(this.renderer.domElement);
        this.navigationManager = NavigationManager.getInstance();
        this.inputManager = new InputManager(this.renderer.domElement);
        this.viewEntitiesManager = new ViewEntitiesManager(this.scene, this.galaxyGroup);
        this.viewEntitiesManager.setCamera(this.cameraManager.getCamera());
        
        // Managers de transitions
        this.transitionManager = new TransitionManager(
            this.cameraManager,
            this.navigationManager,
            this.viewEntitiesManager,
            this.galaxyGroup
        );
        this.sceneOrchestrator = new SceneOrchestrator(
            this.navigationManager,
            this.cameraManager,
            this.transitionManager
        );

        // === Entités GALAXY (ajoutées au galaxyGroup) ===
        this.starField = new StarField();
        this.galaxyGroup.add(this.starField.getMesh());

        this.clusterGrid = new ClusterGrid();
        this.galaxyGroup.add(this.clusterGrid.getMesh());
        this.galaxyGroup.add(this.clusterGrid.getPickGroup());

        this.coordinateSystem = new CoordinateSystem(3);
        this.galaxyGroup.add(this.coordinateSystem.getMesh());

        // === Lumières ===
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        this.scene.add(directionalLight);

        // === Simulation MMO ===
        this.memoryManager = new MemoryManager(SIMULATION_CONFIG.maxUnits);
        this.simulationWorker = new Worker(
            new URL('./workers/SimulationWorker.ts', import.meta.url),
            { type: 'module' }
        );
        this.simulationWorker.postMessage({
            type: 'INIT',
            data: { buffer: this.memoryManager.buffer, maxUnits: this.memoryManager.maxUnits }
        });

        this.unitManager = new UnitManager(this.memoryManager);
        this.scene.add(this.unitManager.getMesh());

        // === Updatables ===
        this.updatables.push(this.starField as unknown as IUpdatable);
        this.updatables.push(this.unitManager as unknown as IUpdatable);
        this.updatables.push(this.clusterGrid as unknown as IUpdatable);
        this.updatables.push(this.coordinateSystem as unknown as IUpdatable);

        // === Raycast ===
        this.raycaster = new THREE.Raycaster();
        this.raycaster.params.Line = { threshold: 0.05 };
        this.mouse = new THREE.Vector2();

        // === UI ===
        // UI gérée par le singleton HUD (importé)
        this.updateGridInfo();

        // === Connecter GameManager au contexte de rendu ===
        GameManager.getInstance().setRenderContext(this.scene, this.cameraManager.getCamera());

        // === Event handlers ===
        this.setupInputHandlers();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    /**
     * Configure les handlers d'input via InputManager
     */
    private setupInputHandlers(): void {
        // Touche Enter : Naviguer vers le niveau inférieur
        this.inputManager.on<KeyEventData>('keydown', (data) => {
            const key = data.key;
            console.log('[SceneManager] 📥 Événement keydown reçu', { key, keyType: typeof key });
            
            if (key === 'Enter') {
                console.log('[SceneManager] 🚀 Appel handleEnter()');
                this.handleEnter();
            }
            else if (key === 'Escape') {
                console.log('[SceneManager] ⬅️ Appel handleEscape()');
                this.handleEscape();
            }
        });

        // Clic : sélection via raycast
        this.inputManager.on<MouseEventData>('click', (data) => {
            this.mouse.copy(data.position);
            this.handleClick();
        });

        // Double-clic : entrée directe
        this.inputManager.on<MouseEventData>('dblclick', (data) => {
            this.mouse.copy(data.position);
            this.handleDoubleClick();
        });
        // Note: Le survol (hover) est géré dans animate() via updateHover()
        // qui utilise inputManager.mousePosition directement
    }

    private onWindowResize(): void {
        this.cameraManager.updateAspect(window.innerWidth / window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private updateGridInfo(): void {
        hud.updateClusterInfo({
            clusters: 1,
            cubes: this.clusterGrid.getMesh().children.length,
            size: `${this.clusterGrid.getTotalDimensions().width}x${this.clusterGrid.getTotalDimensions().depth}`
        });
    }

    /**
     * Met à jour le hover basé sur la position actuelle de la souris
     * Appelé à chaque frame dans animate()
     */
    private updateHover(): void {
        // Utilise la position NDC courante depuis InputManager
        this.mouse.copy(this.inputManager.mousePosition);
        this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());
        const pickObjects = this.clusterGrid.getPickObjects();
        const intersects = this.raycaster.intersectObjects(pickObjects, false);
        const name = intersects.length > 0 ? (intersects[0].object as THREE.Object3D & { name?: string }).name || null : null;
        this.clusterGrid.setHoverCubeByName(name);
    }

    // ========== HANDLERS ENTER / ESCAPE ==========

    /**
     * Gère l'action "Enter" : entrer dans l'élément sélectionné.
     * GALAXY + système → SYSTEM
     * SYSTEM + planète → ORBIT
     * ORBIT → SURFACE
     */
    private handleEnter(): void {
        console.log('[SceneManager] 🎯 handleEnter() appelé');
        
        if (this.cameraManager.isTransitioning()) {
            console.log('[SceneManager] handleEnter() blocked: camera transition in progress');
            return;
        }

        const navState = this.navigationManager.getState();
        console.log('[SceneManager] État navigation', {
            currentView: navState.currentView,
            hasSystem: !!navState.currentSystem,
            hasPlanet: !!navState.currentPlanet
        });
        
        if (navState.currentView === 'GALAXY' && navState.currentSystem) {
            console.log('[SceneManager] ➡️ Transition GALAXY → SYSTEM');
            this.enterSystem(navState.currentSystem);
        } else if (navState.currentView === 'SYSTEM' && navState.currentPlanet) {
            console.log('[SceneManager] ➡️ Transition SYSTEM → ORBIT');
            this.enterPlanet();
        } else if (navState.currentView === 'ORBIT') {
            console.log('[SceneManager] ➡️ Transition ORBIT → SURFACE');
            this.enterSurface();
        } else {
            console.warn('[SceneManager] handleEnter() called in invalid state:', navState.currentView);
        }
    }

    /**
     * Gère l'action "Escape" : remonter d'un niveau.
     * SURFACE → ORBIT
     * ORBIT → SYSTEM
     * SYSTEM → GALAXY
     */
    private handleEscape(): void {
        if (this.cameraManager.isTransitioning()) {
            console.log('[SceneManager] handleEscape() blocked: camera transition in progress');
            return;
        }

        const navState = this.navigationManager.getState();
        
        if (navState.currentView === 'SURFACE') {
            this.exitSurface();
        } else if (navState.currentView === 'ORBIT') {
            this.exitOrbit();
        } else if (navState.currentView === 'SYSTEM') {
            this.exitSystem();
        } else {
            console.warn('[SceneManager] handleEscape() called in invalid state:', navState.currentView);
        }
    }

    private enterSystem(systemRef: SystemReference): void {
        // Préparer le SolarSystem avant la transition
        const meta = systemRef.metadata;
        if (!meta) {
            console.error('[SceneManager] enterSystem() : metadata manquante');
            return;
        }
        this.viewEntitiesManager.prepareSolarSystem(meta);
        
        // Déléguer la transition au TransitionManager
        this.transitionManager.enterSystem(systemRef);
    }

    private enterPlanet(): void {
        const navState = this.navigationManager.getState();
        if (!navState.currentPlanet) return;
        
        // Déléguer la transition au TransitionManager
        this.transitionManager.enterOrbit(navState.currentPlanet);

        const solarSystem = this.viewEntitiesManager.getSolarSystem();
        if (!solarSystem) {
            console.error('[SceneManager] enterPlanet() : SolarSystem non disponible');
            return;
        }

        const planets = solarSystem.getPlanets();
        console.log('[SceneManager] enterPlanet() recherche planète', {
            searchId: navState.currentPlanet.id,
            availablePlanets: planets.map(p => p.id)
        });
        
        const planet = planets.find(p => p.id === navState.currentPlanet!.id);
        if (!planet) {
            console.error('[SceneManager] enterPlanet() : planète non trouvée dans SolarSystem');
            return;
        }

        const targetPos = planet.mesh.position.clone();
        // Distance pour voir la grille orbitale (plus loin que surface)
        const entryDistance = navState.currentPlanet.radius * 4;
        
        console.log('[SceneManager] enterPlanet() démarrage flyTo vers ORBIT', {
            planetId: planet.id,
            targetPos: { x: targetPos.x.toFixed(2), y: targetPos.y.toFixed(2), z: targetPos.z.toFixed(2) },
            entryDistance: entryDistance.toFixed(2)
        });
        
        // Marquer le début de la transition de vue
        // Déléguer la transition au TransitionManager
        this.transitionManager.enterOrbit(navState.currentPlanet);
    }

    /**
     * Entre en vue SURFACE depuis l'ORBIT
     */
    private enterSurface(): void {
        console.log('[SceneManager] enterSurface() called. Current scene children:', this.scene.children.length);
        
        // DEBUG: Vérifier les lumières
        const lights = this.scene.children.filter(c => c instanceof THREE.Light);
        console.log('[SceneManager] 💡 Lumières actives:', lights.map(l => ({
            type: l.type,
            intensity: l.intensity,
            position: l.position,
            visible: l.visible
        })));

        this.transitionManager.enterSurface();
    }

    /**
     * Retourne en vue ORBIT depuis la SURFACE
     */
    private exitSurface(): void {
        this.transitionManager.exitSurface();
    }

    /**
     * Retourne en vue SYSTEM depuis l'ORBIT
     */
    private exitOrbit(): void {
        this.transitionManager.exitOrbit();
    }

    public exitSystem(): void {
        this.transitionManager.exitSystem();
    }

    // ========== CLICK HANDLERS ==========

    private handleClick(): void {
        this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());
        const navState = this.navigationManager.getState();

        if (navState.currentView === 'SYSTEM') {
            this.handleSystemClick();
        } else {
            this.handleGalaxyClick();
        }
    }

    /**
     * Gère le clic en vue SYSTEM : sélection de planète (sans changer de vue).
     * La transition vers la vue PLANET se fait via Enter ou double-clic.
     */
    private handleSystemClick(): void {
        const solarSystem = this.viewEntitiesManager.getSolarSystem();
        if (!solarSystem) return;

        const planetMeshes = solarSystem.getPlanets().map(p => p.mesh);
        const intersects = this.raycaster.intersectObjects(planetMeshes, false);

        if (intersects.length > 0) {
            const hit = intersects[0].object as THREE.Mesh;
            const planetId = hit.userData.planetId as string | undefined;
            if (planetId) {
                // Affichage visuel de la sélection (anneau)
                solarSystem.selectPlanet(planetId, true);
                
                // Activer le suivi de la planète par la caméra
                this.cameraManager.trackPlanet(() => {
                    const planet = solarSystem.getSelectedPlanet();
                    return planet ? planet.mesh.position.clone() : null;
                });
                
                const planet = solarSystem.getPlanets().find(p => p.id === planetId);
                if (planet) {
                    // Construire la référence planète avec seed et type procéduraux
                    const planetRef = {
                        id: planet.id,
                        name: `Planète ${planet.id.replace('PLANET_', '')}`,
                        radius: planet.radius,
                        position: {
                            x: planet.mesh.position.x,
                            y: planet.mesh.position.y,
                            z: planet.mesh.position.z
                        },
                        seed: planet.seed,   // Seed procédural pour surface reproductible
                        type: planet.type    // Type procédural basé sur distance au soleil
                    };
                    
                    // Sélectionner la planète et glisser la caméra vers elle
                    this.navigationManager.setSystemSelection(planetRef);
                    
                    // Glisser la caméra vers la planète en conservant distance et orientation
                    this.cameraManager.panTo(planet.mesh.position);
                    
                    hud.logMessage(`🪐 Planète sélectionnée: ${planetRef.name} (Double-clic pour entrer)`);
                }
            }
        } else {
            // Clic dans le vide : désélectionner
            solarSystem.selectPlanet('', false);
            this.navigationManager.setSystemSelection(null);
            
            // Désactiver le suivi de planète
            this.cameraManager.trackPlanet(null);
        }
    }

    private handleGalaxyClick(): void {
        const pickObjects = this.clusterGrid.getPickObjects();
        const cubeIntersects = this.raycaster.intersectObjects(pickObjects, false);
        const sunIntersects = this.raycaster.intersectObjects(this.clusterGrid.getSuns(), false);

        const cubeHit = cubeIntersects.length > 0 ? cubeIntersects[0] : null;
        const sunHit = sunIntersects.length > 0 ? sunIntersects[0] : null;
        const cubeName = cubeHit ? ((cubeHit.object as THREE.Object3D & { name?: string }).name || null) : null;
        const clickedSun = sunHit ? (sunHit.object as THREE.Mesh) : null;
        const sunMetadata = clickedSun ? this.clusterGrid.getSunMetadataFromMesh(clickedSun) : null;

        // Règle de priorité soleil
        const shouldSelectSun = (() => {
            if (!clickedSun) return false;
            if (!this.selectedClusterCoords) return true;
            const sunCoords = sunMetadata?.globalCoords || null;
            if (!sunCoords) return false;
            const clusterDistance = Math.max(Math.abs(this.selectedClusterCoords.gx - sunCoords.gx), Math.abs(this.selectedClusterCoords.gz - sunCoords.gz));
            return clusterDistance <= 1;
        })();

        if (shouldSelectSun && sunMetadata && clickedSun) {
            console.log('[onClick] 🎯 Détection clic sur soleil', {
                sunId: sunMetadata.id,
                sunName: sunMetadata.name,
                sunPosition: {
                    x: clickedSun.position.x.toFixed(3),
                    y: clickedSun.position.y.toFixed(3),
                    z: clickedSun.position.z.toFixed(3)
                }
            });
            
            // Affichage visuel de la sélection (anneau)
            this.clusterGrid.selectSun(clickedSun);
            this.clusterGrid.selectCubeByName(null);
            this.selectedClusterCoords = null;
            hud.updateSelectedCluster(null, null);
            hud.updateSelectedSun(sunMetadata);
            hud.logMessage(`⭐ Soleil sélectionné: ${sunMetadata.name}`);
            
            // Glisser la caméra vers l'étoile (lookAt)
            this.cameraManager.panTo(clickedSun.position);
            console.log('[onClick] 📷 Caméra panTo vers soleil effectué');
            
            // Construction de la SystemReference pour la navigation
            // Préférer getSystemReference() pour cohérence, sinon créer un fallback valide
            let systemRef = this.clusterGrid.getSystemReference(sunMetadata.id);
            if (!systemRef) {
                console.warn('[onClick] ⚠️ getSystemReference() retourne null pour', sunMetadata.id, '→ utilisation du fallback');
                systemRef = {
                    metadata: sunMetadata,
                    sunMesh: clickedSun,
                    pickMesh: clickedSun
                };
            }
            
            console.log('[onClick] 📦 SystemReference construite', {
                systemId: systemRef.metadata.id,
                systemName: systemRef.metadata.name,
                hasSunMesh: !!systemRef.sunMesh,
                hasMetadata: !!systemRef.metadata,
                sunMeshPosition: systemRef.sunMesh ? {
                    x: systemRef.sunMesh.position.x.toFixed(3),
                    y: systemRef.sunMesh.position.y.toFixed(3),
                    z: systemRef.sunMesh.position.z.toFixed(3)
                } : 'N/A'
            });
            
            // CRITIQUE : Mise à jour de NavigationState.currentSystem
            console.log('[onClick] 🔄 Appel setGalaxySelection()...');
            this.navigationManager.setGalaxySelection(systemRef);
            
            // Vérification post-sélection
            const navStateAfter = this.navigationManager.getState();
            console.log('[onClick] ✅ Vérification post-sélection', {
                currentView: navStateAfter.currentView,
                hasCurrentSystem: !!navStateAfter.currentSystem,
                currentSystemId: navStateAfter.currentSystem?.metadata.id || 'null',
                currentSystemName: navStateAfter.currentSystem?.metadata.name || 'null'
            });
            
            if (!navStateAfter.currentSystem) {
                console.error('[onClick] ❌ BUG : NavigationState.currentSystem est toujours null après setGalaxySelection()');
            } else {
                console.log('[onClick] 🎉 SUCCESS : NavigationState.currentSystem mis à jour avec succès');
            }
        } else if (cubeName) {
            const globalCoords = this.clusterGrid.getGlobalCoordsFromName(cubeName);
            this.clusterGrid.selectCubeByName(cubeName);
            this.clusterGrid.selectSun(null);
            hud.updateSelectedSun(null);
            hud.updateSelectedCluster(cubeName, globalCoords);
            this.selectedClusterCoords = globalCoords;
            this.navigationManager.setGalaxySelection(null);
            
            // Glisser la caméra vers le centre du cluster en conservant distance et orientation
            const clusterCenter = this.clusterGrid.getClusterCenter(globalCoords!.gx, globalCoords!.gz);
            if (clusterCenter) {
                this.cameraManager.panTo(clusterCenter);
            }
        } else {
            this.clusterGrid.selectCubeByName(null);
            this.clusterGrid.selectSun(null);
            hud.updateSelectedCluster(null, null);
            hud.updateSelectedSun(null);
            this.selectedClusterCoords = null;
            this.navigationManager.setGalaxySelection(null);
        }
    }

    /**
     * Gère le double-clic : entrée directe dans l'élément sélectionné.
     * - Double-clic sur étoile : entrée dans le système (avec flyTo intégré)
     * - Double-clic sur cluster : panTo vers le centre du cluster
     * - Double-clic sur planète : entrée dans la planète (avec flyTo intégré)
     */
    private handleDoubleClick(): void {
        const navState = this.navigationManager.getState();
        
        if (navState.currentView === 'GALAXY') {
            // D'abord sélectionner la cible (sans panTo car on va faire enterSystem)
            this.handleClick();
            
            const updatedNavState = this.navigationManager.getState();
            
            // Double-clic sur étoile → entrée directe dans le système
            if (updatedNavState.currentSystem) {
                this.enterSystem(updatedNavState.currentSystem);
                
            } else if (this.selectedClusterCoords) {
                // Double-clic sur cluster → panTo vers le centre (déjà fait par handleClick)
                hud.logMessage(`📍 Centrage sur cluster C[${this.selectedClusterCoords.gx}:${this.selectedClusterCoords.gz}]`);
            }
        } else if (navState.currentView === 'SYSTEM') {
            // Pour les planètes, on doit sélectionner SANS panTo puis entrer
            // Faire le raycasting manuellement pour éviter le panTo de handleSystemClick
            const solarSystem = this.viewEntitiesManager.getSolarSystem();
            if (!solarSystem) return;

            this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());
            const planetMeshes = solarSystem.getPlanets().map(p => p.mesh);
            const intersects = this.raycaster.intersectObjects(planetMeshes, false);

            if (intersects.length > 0) {
                const hit = intersects[0].object as THREE.Mesh;
                const planetId = hit.userData.planetId as string | undefined;
                if (planetId) {
                    const planet = solarSystem.getPlanets().find(p => p.id === planetId);
                    if (planet) {
                        // Construire la référence planète
                        const planetRef = {
                            id: planet.id,
                            name: `Planète ${planet.id.replace('PLANET_', '')}`,
                            radius: planet.radius,
                            position: {
                                x: planet.mesh.position.x,
                                y: planet.mesh.position.y,
                                z: planet.mesh.position.z
                            },
                            seed: planet.seed,
                            type: planet.type
                        };
                        
                        // Sélectionner la planète (affichage anneau)
                        solarSystem.selectPlanet(planetId, true);
                        this.navigationManager.setSystemSelection(planetRef);
                        
                        // Activer le suivi de la planète par la caméra
                        this.cameraManager.trackPlanet(() => {
                            const planet = solarSystem.getSelectedPlanet();
                            return planet ? planet.mesh.position.clone() : null;
                        });
                        
                        // Entrer directement dans la planète (sans panTo intermédiaire)
                        this.enterPlanet();
                    }
                }
            }
        }
    }

    // ========== BOUCLE PRINCIPALE ==========

    public animate(): void {
        requestAnimationFrame(() => this.animate());

        const now = performance.now();
        const dt = (now - this.lastTime) / 1000;
        this.lastTime = now;

        // Update managers
        this.cameraManager.update();
        this.viewEntitiesManager.update(dt);

        // DEBUG: Vérifier update en vue SURFACE
        if (this.navigationManager.getState().currentView === 'SURFACE' && Math.random() < 0.01) { // 1% des frames
             console.log('[SceneManager] Animate loop running in SURFACE view');
        }

        // Update GameManager (combat, économie, unités)
        GameManager.getInstance().update(dt);

        // Update updatables
        const camPos = this.cameraManager.getCamera().position;
        for (const u of this.updatables) {
            try { u.update(dt, camPos); } catch (e) { console.error('[SceneManager] update error', e); }
        }

        // Update hover (survol) basé sur la position souris courante
        this.updateHover();

        // Debug UI
        const camTarget = this.cameraManager.getTarget();
        try { hud.updateCameraDebug({ x: camPos.x, y: camPos.y, z: camPos.z }, { x: camTarget.x, y: camTarget.y, z: camTarget.z }); } catch { /* non bloquant */ }

        // Synchroniser ViewEntitiesManager avec NavigationState (uniquement si changement)
        const navState = this.navigationManager.getState();
        if (navState.currentView !== this.lastKnownView) {
            this.lastKnownView = navState.currentView;
            this.viewEntitiesManager.setView(navState.currentView, navState);
        }

        // Mise à jour SceneOrchestrator (auto-transitions ORBIT ↔ SURFACE)
        this.sceneOrchestrator.update();

        // Render
        this.renderer.render(this.scene, this.cameraManager.getCamera());
    }

    public resetCameraToOptimal(): void {
        this.cameraManager.resetPosition();
        hud.logMessage('🎯 Caméra réinitialisée');
    }

    /**
     * Définit le provider pour récupérer les grilles de surface.
     * Appelé par GameManager pour connecter EntityManager.
     */
    public setSurfaceGridProvider(provider: SurfaceGridProvider): void {
        this.viewEntitiesManager.setSurfaceGridProvider(provider);
    }

    public getNavigationState() { return this.navigationManager.getState(); }
    public getCamera() { return this.cameraManager.getCamera(); }
    public getScene() { return this.scene; }
}
