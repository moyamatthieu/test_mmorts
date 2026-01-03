import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_CONFIG } from '../config';
import { TrackableEntity } from '../types/trackable-entity';

/**
 * Gère la caméra et les contrôles.
 */
export class CameraManager {
    private camera: THREE.PerspectiveCamera;
    private controls: OrbitControls;
    private moveSpeed: number;
    private keys: { [key: string]: boolean } = {};
    private initialPosition: THREE.Vector3;
    private initialTarget: THREE.Vector3;
    private targetToLerp: THREE.Vector3 | null = null;
    private positionToLerp: THREE.Vector3 | null = null;
    private dynamicTarget: THREE.Object3D | null = null;
    private trackedEntity: TrackableEntity | null = null;
    private trackedPlanet: (() => THREE.Vector3 | null) | null = null;
    private planetTrackOffset: THREE.Vector3 | null = null;
    private transitioning: boolean = false;
    private onTransitionComplete: (() => void) | null = null;

    constructor(domElement: HTMLElement) {
        this.moveSpeed = CAMERA_CONFIG.moveSpeed;
        
        this.camera = new THREE.PerspectiveCamera(
            CAMERA_CONFIG.fov,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        
        // Position initiale depuis la config
        this.initialPosition = new THREE.Vector3(
            CAMERA_CONFIG.initialPosition.x,
            CAMERA_CONFIG.initialPosition.y,
            CAMERA_CONFIG.initialPosition.z
        );
        this.initialTarget = new THREE.Vector3(
            CAMERA_CONFIG.lookAt.x,
            CAMERA_CONFIG.lookAt.y,
            CAMERA_CONFIG.lookAt.z
        );
        
        this.camera.position.copy(this.initialPosition);
        this.camera.lookAt(this.initialTarget);

        this.controls = new OrbitControls(this.camera, domElement);
        this.controls.enableDamping = true;
        this.controls.minDistance = CAMERA_CONFIG.minDistance;
        this.controls.maxDistance = CAMERA_CONFIG.maxDistance;
        this.controls.maxPolarAngle = Math.PI * 0.8;
        this.controls.target.copy(this.initialTarget);

        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);
        
        // Raccourci pour réinitialiser la position (R)
        window.addEventListener('keydown', (e) => {
            if (e.code === 'KeyR' && !e.repeat) {
                this.resetPosition();
            }
        });
    }

    /**
     * Met à jour l'aspect ratio de la caméra.
     */
    public updateAspect(aspect: number): void {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
    }

    /**
     * Retourne la distance actuelle entre la caméra et sa cible.
     */
    public get distance(): number {
        return this.controls.getDistance();
    }

    /**
     * Retourne l'instance de la caméra.
     */
    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    /**
     * Retourne la cible (point regardé) actuelle des contrôles.
     */
    public getTarget(): THREE.Vector3 {
        return this.controls.target.clone();
    }

    /**
     * Réinitialise la caméra à sa position initiale.
     */
    public resetPosition(): void {
        // Réinitialisation = état cohérent (pas de transition, pas de follow).
        // Invariant: une seule autorité sur controls.target par frame.
        this.targetToLerp = null;
        this.positionToLerp = null;
        this.onTransitionComplete = null;
        this.transitioning = false;
        this.controls.enabled = true;

        this.dynamicTarget = null;
        this.trackedEntity = null;
        this.trackedPlanet = null;
        this.planetTrackOffset = null;

        this.camera.position.copy(this.initialPosition);
        this.controls.target.copy(this.initialTarget);
        this.controls.update();
        console.log('[CameraManager] Position réinitialisée');
    }

    /**
     * Met à jour la logique de la caméra (contrôles et déplacements ZQSD).
     * @param dt Delta time (optionnel, pour compatibilité future)
     */
    public update(dt?: number): void {
        // Param conservé pour compatibilité future (dt), mais non utilisé actuellement.
        void dt;
        this.handleKeyboardMovement();
        
        if (this.targetToLerp) {
            // Désactiver les contrôles pendant le lerp pour éviter les conflits
            if (this.controls.enabled) {
                this.controls.enabled = false;
                this.transitioning = true;
            }
            
            const lerpFactor = 0.1;
            this.controls.target.lerp(this.targetToLerp, lerpFactor);
            
            if (this.positionToLerp) {
                this.camera.position.lerp(this.positionToLerp, lerpFactor);
            }

            const distTarget = this.controls.target.distanceTo(this.targetToLerp);
            const distPos = this.positionToLerp ? this.camera.position.distanceTo(this.positionToLerp) : 0;

            if (distTarget < 0.01 && distPos < 0.01) {
                this.controls.target.copy(this.targetToLerp);
                if (this.positionToLerp) {
                    this.camera.position.copy(this.positionToLerp);
                }
                
                this.targetToLerp = null;
                this.positionToLerp = null;
                this.controls.enabled = true; // Réactiver après transition
                this.transitioning = false;

                if (this.onTransitionComplete) {
                    this.onTransitionComplete();
                    this.onTransitionComplete = null;
                }
            }
        }

        // Invariant: une seule autorité sur controls.target par frame.
        // Pendant une transition (flyTo), on IGNORE le mode follow pour éviter le jitter / non-convergence.
        if (!this.transitioning) {
            // Priorité 1: suivi d'entité trackable (vaisseaux simulés)
            // Priorité 2: suivi de planète en orbite avec déplacement de caméra
            // Priorité 3: objet dynamique Three.js
            if (this.trackedEntity && this.trackedEntity.isActive()) {
                this.controls.target.copy(this.trackedEntity.getPosition());
            } else if (this.trackedPlanet && this.planetTrackOffset) {
                const planetPos = this.trackedPlanet();
                if (planetPos) {
                    // Mettre à jour le target (point regardé)
                    this.controls.target.copy(planetPos);
                    
                    // Déplacer la caméra en maintenant l'offset relatif
                    const newCameraPos = planetPos.clone().add(this.planetTrackOffset);
                    this.camera.position.copy(newCameraPos);
                }
            } else if (this.dynamicTarget) {
                this.controls.target.copy(this.dynamicTarget.position);
            }
        }

        this.controls.update();
    }

    /**
     * Indique si une transition de caméra est en cours.
     * Utilisé par SceneManager pour éviter conflits transitions automatiques.
     * @returns true si transition active, false sinon
     */
    public isTransitioning(): boolean {
        return this.transitioning;
    }

    /**
     * Retourne la position cible actuelle des OrbitControls.
     * Utilisé par SceneManager pour calculs distance automatiques.
     * @returns Vector3 position cible
     */
    public getControlsTarget(): THREE.Vector3 {
        return this.controls.target.clone();
    }

    /**
     * Active le suivi d'une planète en orbite.
     * La caméra suivra automatiquement la position de la planète ET se déplacera avec elle.
     * @param getPlanetPosition Fonction callback qui retourne la position actuelle de la planète
     */
    public trackPlanet(getPlanetPosition: (() => THREE.Vector3 | null) | null): void {
        this.trackedPlanet = getPlanetPosition;
        
        if (getPlanetPosition) {
            // Calculer l'offset initial entre la caméra et la planète
            const planetPos = getPlanetPosition();
            if (planetPos) {
                this.planetTrackOffset = this.camera.position.clone().sub(planetPos);
                console.log('[CameraManager] Suivi planète activé, offset:', this.planetTrackOffset);
            }
            
            // Désactiver les autres modes de suivi
            this.dynamicTarget = null;
            this.trackedEntity = null;
        } else {
            // Désactiver le suivi
            this.planetTrackOffset = null;
            console.log('[CameraManager] Suivi planète désactivé');
        }
    }

    /**
     * Gère les déplacements via les touches ZQSD.
     */
    private handleKeyboardMovement(): void {
        const vector = new THREE.Vector3();
        
        if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            vector.z -= this.moveSpeed;
            this.targetToLerp = null;
        }
        if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            vector.z += this.moveSpeed;
            this.targetToLerp = null;
        }
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
            vector.x -= this.moveSpeed;
            this.targetToLerp = null;
        }
        if (this.keys['KeyD'] || this.keys['ArrowRight']) {
            vector.x += this.moveSpeed;
            this.targetToLerp = null;
        }

        if (vector.lengthSq() > 0) {
            vector.applyQuaternion(this.camera.quaternion);
            vector.y = 0; // Garder le mouvement sur le plan horizontal
            
            this.camera.position.add(vector);
            this.controls.target.add(vector);
        }
    }

    /**
     * Définit la position de la caméra.
     */
    public setPosition(x: number, y: number, z: number): void {
        this.targetToLerp = null;
        this.camera.position.set(x, y, z);
        this.controls.update();
    }

    /**
     * Définit le point ciblé par la caméra.
     */
    public setTarget(x: number | THREE.Vector3, y?: number, z?: number): void {
        let target: THREE.Vector3;
        if (x instanceof THREE.Vector3) {
            target = x.clone();
        } else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            target = new THREE.Vector3(x, y, z);
        } else {
            return;
        }

        // Invariant: une seule autorité sur controls.target par frame.
        // Une cible "statique" (setTarget/flyTo) désactive explicitement le mode follow
        // pour éviter les conflits latents après la transition.
        this.trackedEntity = null;
        this.dynamicTarget = null;

        if (!this.transitioning) {
            this.controls.target.copy(target);
            this.controls.update();
        } else {
            this.targetToLerp = target;
        }
    }

    /**
     * Déplace la caméra vers une nouvelle cible en CONSERVANT la distance et l'orientation actuelles.
     * C'est un "glissement" de la caméra : le lookAt change, mais le zoom et l'angle restent identiques.
     * 
     * @param target Nouvelle cible (point à regarder)
     * @param onComplete Callback optionnel appelé à la fin de la transition
     */
    public panTo(target: THREE.Vector3, onComplete?: () => void): void {
        // Invariant: une seule autorité sur controls.target par frame.
        // panTo est une transition "statique": on désactive le follow pour toute la durée.
        this.trackedEntity = null;
        this.dynamicTarget = null;

        this.onTransitionComplete = onComplete || null;
        
        // Calculer l'offset actuel de la caméra par rapport au target
        // Cet offset encode à la fois la distance ET l'orientation
        const currentOffset = new THREE.Vector3().subVectors(this.camera.position, this.controls.target);
        
        // Nouvelle position = nouveau target + même offset
        // Cela conserve la distance et l'angle de vue
        const newPosition = target.clone().add(currentOffset);

        this.targetToLerp = target.clone();
        this.positionToLerp = newPosition;
        
        this.transitioning = true;
        this.controls.enabled = false;
    }

    /**
     * Direction standard pour les transitions avec angle fixe (vue isométrique ~45°).
     * Normalisée : légèrement plongeante et décalée sur Z+.
     */
    private static readonly STANDARD_VIEW_DIRECTION = new THREE.Vector3(0, 0.5, 1).normalize();

    /**
     * Déplace la caméra vers une cible avec une animation fluide.
     * @param target Point à regarder
     * @param distance Distance finale par rapport à la cible
     * @param onComplete Callback appelé à la fin de la transition
     * @param useStandardAngle Si true, utilise un angle de vue standard (vue isométrique)
     *                         pour centrer parfaitement la cible à l'écran.
     *                         Si false (défaut), conserve l'angle d'approche actuel.
     */
    public flyTo(
        target: THREE.Vector3,
        distance: number,
        onComplete?: () => void,
        useStandardAngle: boolean = false
    ): void {
        // Invariant: une seule autorité sur controls.target par frame.
        // flyTo est une transition "statique": on désactive le follow pour toute la durée.
        this.trackedEntity = null;
        this.dynamicTarget = null;

        this.onTransitionComplete = onComplete || null;
        
        let direction: THREE.Vector3;
        
        if (useStandardAngle) {
            // Utiliser l'angle de vue standard pour un centrage parfait
            direction = CameraManager.STANDARD_VIEW_DIRECTION.clone();
        } else {
            // Calculer la direction actuelle de la caméra par rapport à la cible actuelle
            // pour conserver l'angle d'approche
            direction = new THREE.Vector3()
                .subVectors(this.camera.position, this.controls.target)
                .normalize();
                
            // Si la direction est nulle (caméra sur la cible), on utilise un vecteur par défaut (Z+)
            if (direction.lengthSq() < 0.0001) {
                direction.set(0, 0, 1);
            }
        }

        // Nouvelle position : cible + direction * distance
        const newPos = target.clone().add(direction.multiplyScalar(distance));

        this.targetToLerp = target.clone();
        this.positionToLerp = newPos;
        
        this.transitioning = true;
        this.controls.enabled = false;
    }

    /**
     * Déplace la caméra de manière fluide vers une position cible et un point de regard cible.
     * @param targetPosition Position cible de la caméra.
     * @param targetLookAt Point de regard cible.
     * @param duration Durée de la transition en millisecondes.
     */
    public moveTo(targetPosition: THREE.Vector3, targetLookAt: THREE.Vector3, duration: number = 1000): void {
        if (this.transitioning) return; // Éviter les transitions multiples simultanées

        this.transitioning = true;
        const startPosition = this.camera.position.clone();
        const startLookAt = this.controls.target.clone();
        const startTime = performance.now();

        const animate = () => {
            const elapsed = performance.now() - startTime;
            const t = Math.min(elapsed / duration, 1); // Normaliser entre 0 et 1

            // Interpolation linéaire pour la position et le regard
            this.camera.position.lerpVectors(startPosition, targetPosition, t);
            this.controls.target.lerpVectors(startLookAt, targetLookAt, t);

            this.controls.update();

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                this.transitioning = false;
                if (this.onTransitionComplete) this.onTransitionComplete();
            }
        };

        animate();
    }

    /**
     * Définit une cible dynamique à suivre (ex: une planète en mouvement).
     */
    public setDynamicTarget(object: THREE.Object3D | null): void {
        this.dynamicTarget = object;
        // Ne pas annuler une transition en cours: c'est la transition qui a autorité.
        if (object && !this.transitioning) {
            this.targetToLerp = null; // Annuler le lerp statique si on suit un objet dynamique
            this.positionToLerp = null;
        }
    }

    /**
     * Définit une entité trackable à suivre (ex: un vaisseau simulé dans le worker).
     * Priorité sur setDynamicTarget() pour les objets Three.js statiques.
     */
    public setTrackedEntity(entity: TrackableEntity | null): void {
        this.trackedEntity = entity;
        // Ne pas annuler une transition en cours: c'est la transition qui a autorité.
        if (entity && !this.transitioning) {
            this.targetToLerp = null; // Annuler le lerp statique si on suit une entité trackable
            this.positionToLerp = null;
        }
    }

    /**
     * Verrouille ou déverrouille les contrôles OrbitControls.
     */
    public setControlsEnabled(enabled: boolean): void {
        this.controls.enabled = enabled;
    }

    /**
     * Zoom et pan sur une position donnée.
     * @param position La position à cibler.
     * @param distance La distance de zoom (optionnel, défaut 5).
     */
    public zoomToPosition(position: THREE.Vector3, distance: number = 5): void {
        this.controls.target.copy(position);
        const direction = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
        this.camera.position.copy(position).add(direction.multiplyScalar(distance));
        this.controls.update();
    }
}
