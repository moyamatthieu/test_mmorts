import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CAMERA_CONFIG } from '../config';

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
        this.camera.position.copy(this.initialPosition);
        this.controls.target.copy(this.initialTarget);
        this.controls.update();
        console.log('[CameraManager] Position réinitialisée');
    }

    /**
     * Met à jour la logique de la caméra (contrôles et déplacements ZQSD).
     */
    public update(): void {
        this.handleKeyboardMovement();
        this.controls.update();
    }

    /**
     * Gère les déplacements via les touches ZQSD.
     */
    private handleKeyboardMovement(): void {
        const vector = new THREE.Vector3();
        
        if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            vector.z -= this.moveSpeed;
        }
        if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            vector.z += this.moveSpeed;
        }
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
            vector.x -= this.moveSpeed;
        }
        if (this.keys['KeyD'] || this.keys['ArrowRight']) {
            vector.x += this.moveSpeed;
        }

        vector.applyQuaternion(this.camera.quaternion);
        vector.y = 0; // Garder le mouvement sur le plan horizontal
        
        this.camera.position.add(vector);
        this.controls.target.add(vector);
    }

    /**
     * Définit la position de la caméra.
     */
    public setPosition(x: number, y: number, z: number): void {
        this.camera.position.set(x, y, z);
        this.controls.update();
    }

    /**
     * Définit le point ciblé par la caméra.
     */
    public setTarget(x: number, y: number, z: number): void {
        this.controls.target.set(x, y, z);
        this.controls.update();
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
