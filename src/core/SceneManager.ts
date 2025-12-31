import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { StarField } from '../entities/StarField';
import { ClusterGrid } from '../entities/ClusterGrid';
import { CoordinateSystem } from '../entities/CoordinateSystem';
import { MemoryManager } from './MemoryManager';
import { UnitManager } from '../entities/UnitManager';
import { CornerUI } from '../ui/CornerUI';
import { SIMULATION_CONFIG } from '../config';
import { IUpdatable } from './IUpdatable';

/**
 * Gère la scène, le rendu et la boucle d'animation.
 */
export class SceneManager {
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private cameraManager: CameraManager;
    private starField: StarField;
    private clusterGrid: ClusterGrid;
    private coordinateSystem: CoordinateSystem;
    private memoryManager: MemoryManager;
    private unitManager: UnitManager;
    private simulationWorker: Worker;
    private cornerUI: CornerUI;
    
    // Raycasting pour le survol et la sélection des cubes
    private raycaster: THREE.Raycaster;
    private mouse: THREE.Vector2;

    // Mémorise le cluster actuellement sélectionné (coordonnées globales) pour appliquer
    // la règle de priorité de sélection des soleils (distance en clusters).
    private selectedClusterCoords: { gx: number; gz: number } | null = null;
    private updatables: IUpdatable[] = [];
    private lastTime: number = performance.now();

    constructor() {
        console.log('[SceneManager] Initialisation...');
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);

        this.cameraManager = new CameraManager(this.renderer.domElement);
        
        // Initialisation des entités
        this.starField = new StarField();
        console.log('[SceneManager] StarField créé, ajout à la scène...');
        this.scene.add(this.starField.getMesh());

        this.clusterGrid = new ClusterGrid();
        console.log('[SceneManager] ClusterGrid créé, ajout à la scène...');
        this.scene.add(this.clusterGrid.getMesh());
        // Ajout du groupe de pick meshes pour la détection précise du hover/clic
        console.log('[SceneManager] Ajout du pickGroup à la scène...');
        this.scene.add(this.clusterGrid.getPickGroup());
        
        // Ajout du repère 3D
        this.coordinateSystem = new CoordinateSystem(3);
        this.scene.add(this.coordinateSystem.getMesh());
        

        // Lumières
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        this.scene.add(directionalLight);

        // Initialisation de la gestion mémoire et du worker de simulation
        this.memoryManager = new MemoryManager(SIMULATION_CONFIG.maxUnits);
        this.simulationWorker = new Worker(
            new URL('./workers/SimulationWorker.ts', import.meta.url),
            { type: 'module' }
        );

        // Envoi du buffer au worker
        this.simulationWorker.postMessage({
            type: 'INIT',
            data: {
                buffer: this.memoryManager.buffer,
                maxUnits: this.memoryManager.maxUnits
            }
        });
        console.log('[SceneManager] Message INIT envoyé au worker');

        // Unit manager (rendu instancié) — synchronise avec SharedArrayBuffer
        this.unitManager = new UnitManager(this.memoryManager);
        this.scene.add(this.unitManager.getMesh());

        // Register updatables (order: simple animations -> units -> grid -> coord)
        this.updatables.push(this.starField as unknown as IUpdatable);
        this.updatables.push(this.unitManager as unknown as IUpdatable);
        this.updatables.push(this.clusterGrid as unknown as IUpdatable);
        this.updatables.push(this.coordinateSystem as unknown as IUpdatable);

        window.addEventListener('resize', () => this.onWindowResize());
        
        // Initialisation du raycaster pour le survol et la sélection
        this.raycaster = new THREE.Raycaster();
        // Configuration pour une meilleure précision
        this.raycaster.params.Line = { threshold: 0.05 }; // Augmente la zone de détection des lignes
        this.mouse = new THREE.Vector2();
        window.addEventListener('mousemove', (event) => this.onMouseMove(event));
        window.addEventListener('click', (event) => this.onClick(event));
        window.addEventListener('dblclick', (event) => this.onDoubleClick(event));
        
        // Initialisation de l'interface utilisateur
        this.cornerUI = new CornerUI();
        
        // Mise à jour des informations de la grille dans l'UI
        this.updateGridInfo();
    }

    /**
     * Redimensionne le rendu lors du changement de taille de la fenêtre.
     */
    private onWindowResize(): void {
        this.cameraManager.updateAspect(window.innerWidth / window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    /**
     * Gère le mouvement de la souris pour le survol des cubes.
     */
    private onMouseMove(event: MouseEvent): void {
        // Conversion des coordonnées souris en coordonnées normalisées (-1 à +1)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        this.updateHover();
    }
    
    /**
     * Met à jour l'effet de survol sur les cubes.
     * Utilise les pick meshes invisibles pour une détection précise.
     */
    private updateHover(): void {
        this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());

        // Utilisation exclusive des pick meshes pour une précision maximale
        const pickObjects = this.clusterGrid.getPickObjects();
        const intersects = this.raycaster.intersectObjects(pickObjects, false);

        if (intersects.length > 0) {
            const closest = intersects[0];
            const obj = closest.object as THREE.Object3D & { name?: string };
            this.clusterGrid.setHoverCubeByName(obj.name || null);
        } else {
            this.clusterGrid.setHoverCubeByName(null);
        }
    }

    /**
     * Gère le clic sur un cube pour le sélectionner.
     * Utilise les pick meshes invisibles pour une détection précise.
     */
    private onClick(event: MouseEvent): void {
        // IMPORTANT: recalcul NDC à chaque clic (sinon mouse est stale).
        // On utilise le canvas réel (renderer.domElement) plutôt que window.*
        // pour supporter les layouts / tailles non plein-écran.
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());

        // Raycast sur cubes (pick meshes) ET soleils, puis application de la règle:
        // - priorité au soleil si touché, SAUF si un cluster est sélectionné ET que
        //   la distance en clusters > 1.
        // Distance choisie: Chebyshev max(|dx|,|dz|) (inclut les diagonales), déterministe.
        const pickObjects = this.clusterGrid.getPickObjects();
        const cubeIntersects = this.raycaster.intersectObjects(pickObjects, false);
        const sunIntersects = this.raycaster.intersectObjects(this.clusterGrid.getSuns(), false);

        const cubeHit = cubeIntersects.length > 0 ? cubeIntersects[0] : null;
        const sunHit = sunIntersects.length > 0 ? sunIntersects[0] : null;

        const cubeName = cubeHit ? ((cubeHit.object as THREE.Object3D & { name?: string }).name || null) : null;
        const clickedSun = sunHit ? (sunHit.object as THREE.Mesh) : null;
        const sunMetadata = clickedSun ? this.clusterGrid.getSunMetadataFromMesh(clickedSun) : null;

        const shouldSelectSun = (() => {
            if (!clickedSun) return false;
            if (!this.selectedClusterCoords) return true;
            const sunCoords = sunMetadata?.globalCoords || null;
            if (!sunCoords) return false;
            const dx = Math.abs(this.selectedClusterCoords.gx - sunCoords.gx);
            const dz = Math.abs(this.selectedClusterCoords.gz - sunCoords.gz);
            const clusterDistance = Math.max(dx, dz); // Chebyshev
            return clusterDistance <= 1;
        })();

        if (shouldSelectSun) {
            this.clusterGrid.selectSun(clickedSun);
            this.clusterGrid.selectCubeByName(null); // Désélectionner le cube
            this.selectedClusterCoords = null;

            // Récupérer et afficher les métadonnées du soleil
            this.cornerUI.updateSelectedCluster(null, null);
            this.cornerUI.updateSelectedSun(sunMetadata);

            if (sunMetadata) {
                this.cornerUI.logMessage(`⭐ Soleil sélectionné: ${sunMetadata.name} (${sunMetadata.clusterId})`);
            }
            return;
        }

        if (cubeName) {
            const clusterId = cubeName;
            const globalCoords = this.clusterGrid.getGlobalCoordsFromName(cubeName);
            this.clusterGrid.selectCubeByName(cubeName);
            this.clusterGrid.selectSun(null); // Désélectionner le soleil
            this.cornerUI.updateSelectedSun(null); // Reset UI soleil explicite lors d'une sélection cube
            this.cornerUI.updateSelectedCluster(clusterId, globalCoords);
            this.selectedClusterCoords = globalCoords;
            return;
        }

        // Rien touché: clear sélection
        this.clusterGrid.selectCubeByName(null);
        this.clusterGrid.selectSun(null);
        this.cornerUI.updateSelectedCluster(null, null);
        this.cornerUI.updateSelectedSun(null);
        this.selectedClusterCoords = null;
    }

    /**
     * Gère le double-clic pour zoomer sur un cluster sélectionné.
     */
    private onDoubleClick(event: MouseEvent): void {
        // Mettre à jour la position de la souris
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.cameraManager.getCamera());

        // Vérifier d'abord les cubes
        const pickObjects = this.clusterGrid.getPickObjects();
        const cubeIntersects = this.raycaster.intersectObjects(pickObjects, false);

        if (cubeIntersects.length > 0) {
            const closest = cubeIntersects[0];
            const clicked = closest.object as THREE.Object3D & { name?: string };
            const cubeName = clicked.name || null;
            if (cubeName) {
                const globalCoords = this.clusterGrid.getGlobalCoordsFromName(cubeName);
                if (globalCoords) {
                    const { gx, gz } = globalCoords;
                    const clusterSize = 10; // GRID_CONFIG.cubesX
                    const cx = Math.floor(gx / clusterSize);
                    const cz = Math.floor(gz / clusterSize);
                    const lx = gx % clusterSize;
                    const lz = gz % clusterSize;
                    const position = this.clusterGrid.getPosFromCoords(cx, cz, lx, lz);
                    this.cameraManager.zoomToPosition(position, 5);
                    this.cornerUI.logMessage('🔍 Zoom sur le cube');
                }
            }
        } else {
            // Vérifier les soleils
            const sunIntersects = this.raycaster.intersectObjects(this.clusterGrid.getSuns(), false);
            if (sunIntersects.length > 0) {
                const clickedSun = sunIntersects[0].object as THREE.Mesh;
                
                // Zoom dynamique basé sur les métadonnées du soleil
                const optimalDistance = this.clusterGrid.getOptimalZoomDistance(clickedSun);
                this.cameraManager.zoomToPosition(clickedSun.position, optimalDistance);
                
                // Récupérer les métadonnées pour le message de log
                const sunMetadata = this.clusterGrid.getSunMetadataFromMesh(clickedSun);
                const sunName = sunMetadata?.name || clickedSun.name || 'Soleil inconnu';
                this.cornerUI.logMessage(`🔍 Zoom sur ${sunName} (distance: ${optimalDistance.toFixed(1)})`);
            }
        }
    }

    /**
     * Met à jour les informations de la grille dans l'interface utilisateur.
     */
    private updateGridInfo(): void {
        const clusterInfo = {
            clusters: 1,
            cubes: this.clusterGrid.getMesh().children.length,
            size: `${this.clusterGrid.getTotalDimensions().width}x${this.clusterGrid.getTotalDimensions().depth}`
        };
        this.cornerUI.updateClusterInfo(clusterInfo);
    }

    /**
     * Permet de réinitialiser la position de la caméra.
     */
    public resetCameraToOptimal(): void {
        this.cameraManager.resetPosition();
        this.cornerUI.logMessage('🎯 Caméra réinitialisée');
        console.log('[SceneManager] Caméra réinitialisée à la position initiale');
    }

    /**
     * Boucle d'animation principale.
     */
    public animate(): void {
        requestAnimationFrame(() => this.animate());

        const now = performance.now();
        const dt = (now - this.lastTime) / 1000; // en secondes
        this.lastTime = now;

        this.cameraManager.update();
        const camPos = this.cameraManager.getCamera().position;
        const camTarget = this.cameraManager.getTarget();
        // Mise à jour du panneau de debug caméra
        try { this.cornerUI.updateCameraDebug({ x: camPos.x, y: camPos.y, z: camPos.z }, { x: camTarget.x, y: camTarget.y, z: camTarget.z }); } catch (e) { /* non bloquant */ }
        // Mise à jour uniforme des updatables
        for (const u of this.updatables) {
            try { u.update(dt, camPos); } catch (e) { console.error('[SceneManager] update error', e); }
        }

        this.renderer.render(this.scene, this.cameraManager.getCamera());
    }
}
