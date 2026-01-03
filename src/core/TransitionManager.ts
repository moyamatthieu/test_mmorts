// src/core/TransitionManager.ts
/**
 * Gestion des transitions de vues avec animations flyTo.
 * 
 * Responsabilités :
 * - Transitions GALAXY ↔ SYSTEM ↔ ORBIT ↔ SURFACE
 * - Animations flyTo avec callbacks
 * - Coordination avec CameraManager, NavigationManager et ViewEntitiesManager
 * 
 * Principe KISS : Logique de transition pure, pas de rendu 3D direct.
 */

import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { NavigationManager } from './NavigationManager';
import { ViewEntitiesManager } from './ViewEntitiesManager';
import { hud } from '../ui/HUD';
import { NAVIGATION_CONFIG } from '../config';
import type { SystemReference, PlanetReference } from '../types/NavigationState';

/**
 * Gestionnaire des transitions de vues.
 */
export class TransitionManager {
    /** Timestamp de la dernière transition (pour anti-oscillation) */
    private lastTransitionTime: number = 0;
    
    /** Période de grâce après transition (ms) */
    private readonly GRACE_PERIOD = 1000;
    
    constructor(
        private cameraManager: CameraManager,
        private navigationManager: NavigationManager,
        private viewEntitiesManager: ViewEntitiesManager,
        private galaxyGroup: THREE.Group
    ) {}
    
    /**
     * Vérifie si une transition est autorisée (anti-oscillation).
     */
    private canTransition(): boolean {
        const now = performance.now();
        return now - this.lastTransitionTime > this.GRACE_PERIOD;
    }
    
    /**
     * Marque qu'une transition a eu lieu.
     */
    private markTransition(): void {
        this.lastTransitionTime = performance.now();
    }
    
    // ========================================================================
    // Transition GALAXY → SYSTEM
    // ========================================================================
    
    /**
     * Entre dans un système solaire depuis la galaxie.
     */
    public enterSystem(systemRef: SystemReference): void {
        if (!this.canTransition()) return;
        
        const meta = systemRef.metadata;
        const targetPos = new THREE.Vector3(
            meta.absolutePosition.x,
            meta.absolutePosition.y,
            meta.absolutePosition.z
        );
        
        // Distance d'entrée = 3x la distance optimale du soleil
        const enterDistance = meta.optimalDistance * NAVIGATION_CONFIG.systemEnterDistanceFactor;
        
        this.cameraManager.flyTo(targetPos, enterDistance, () => {
            this.markTransition();
            this.navigationManager.enterSystem(systemRef);
            this.viewEntitiesManager.setView('SYSTEM', this.navigationManager.getState());
            
            // Masquer la galaxie
            this.galaxyGroup.visible = false;
            
            hud.logMessage(`🌟 Système ${meta.name}`);
        }, true);
    }
    
    // ========================================================================
    // Transition SYSTEM → ORBIT
    // ========================================================================
    
    /**
     * Entre en orbite autour d'une planète depuis la vue système.
     */
    public enterOrbit(planetRef: PlanetReference): void {
        if (!this.canTransition()) return;
        
        const targetPos = new THREE.Vector3(planetRef.position.x, planetRef.position.y, planetRef.position.z);
        const orbitDistance = planetRef.radius * 4;
        
        this.cameraManager.flyTo(targetPos, orbitDistance, () => {
            this.markTransition();
            this.navigationManager.enterOrbit(planetRef);
            this.viewEntitiesManager.setView('ORBIT', this.navigationManager.getState());
            
            hud.logMessage(`🛰️ Orbite de ${planetRef.name}`);
        }, true);
    }
    
    // ========================================================================
    // Transition ORBIT → SURFACE
    // ========================================================================
    
    /**
     * Atterrit sur la surface d'une planète depuis l'orbite.
     * Descente progressive jusqu'au niveau du sol avec vue adaptée.
     */
    public enterSurface(): void {
        if (!this.canTransition()) return;
        
        const navState = this.navigationManager.getState();
        if (!navState.currentPlanet) {
            console.warn('[TransitionManager] enterSurface() sans currentPlanet');
            return;
        }
        
        const planetRef = navState.currentPlanet;
        const targetPos = new THREE.Vector3(planetRef.position.x, planetRef.position.y, planetRef.position.z);
        
        // Distance de surface : juste au-dessus du sol pour vue immersive
        // 1.2 * radius = 20% au-dessus de la surface (sécurité vs displacement 5%)
        const surfaceDistance = planetRef.radius * 1.2;
        
        console.log('[TransitionManager] 🏔️ enterSurface() START', {
            planet: planetRef.name,
            targetPos: {
                x: targetPos.x.toFixed(2),
                y: targetPos.y.toFixed(2),
                z: targetPos.z.toFixed(2)
            },
            surfaceDistance: surfaceDistance.toFixed(2),
            radius: planetRef.radius.toFixed(2),
            displacementScale: (planetRef.radius * 0.05).toFixed(2),
            cameraHeightAboveSurface: (surfaceDistance - planetRef.radius).toFixed(2),
            LOD0_Threshold: (planetRef.radius * 2).toFixed(2) // LOD 0 visible if dist < radius * 2
        });
        
        // Désactiver le suivi de planète pendant la transition
        this.cameraManager.trackPlanet(null);
        
        this.cameraManager.flyTo(targetPos, surfaceDistance, () => {
            console.log('[TransitionManager] 📍 flyTo callback - Caméra arrivée en position SURFACE');
            
            // Vérifier position caméra finale
            const camPos = this.cameraManager.getPosition();
            const camDist = camPos.distanceTo(targetPos);
            console.log('[TransitionManager] Position caméra finale:', {
                position: {
                    x: camPos.x.toFixed(2),
                    y: camPos.y.toFixed(2),
                    z: camPos.z.toFixed(2)
                },
                distanceToPlanet: camDist.toFixed(2),
                expectedDistance: surfaceDistance.toFixed(2)
            });
            
            this.markTransition();
            console.log('[TransitionManager] Appel navigationManager.enterSurface()...');
            this.navigationManager.enterSurface();
            
            console.log('[TransitionManager] Appel viewEntitiesManager.setView(SURFACE)...');
            this.viewEntitiesManager.setView('SURFACE', this.navigationManager.getState());
            
            hud.logMessage(`🏔️ Surface de ${planetRef.name} - Vue immersive`);
            console.log('[TransitionManager] 🏔️ enterSurface() END');
        }, true);
    }
    
    // ========================================================================
    // Transition SURFACE → ORBIT
    // ========================================================================
    
    /**
     * Retourne en orbite depuis la surface.
     * Remontée progressive jusqu'en altitude orbitale.
     */
    public exitSurface(): void {
        if (!this.canTransition()) return;
        
        const navState = this.navigationManager.getState();
        if (!navState.currentPlanet) return;
        
        const planetRef = navState.currentPlanet;
        const targetPos = new THREE.Vector3(planetRef.position.x, planetRef.position.y, planetRef.position.z);
        
        // Distance orbitale confortable pour voir la planète entière
        const orbitDistance = planetRef.radius * 4;
        
        this.cameraManager.flyTo(targetPos, orbitDistance, () => {
            this.markTransition();
            this.navigationManager.exitSurface();
            this.viewEntitiesManager.setView('ORBIT', this.navigationManager.getState());
            
            // Réactiver le suivi de planète en orbite
            const solarSystem = this.viewEntitiesManager.getSolarSystem();
            if (solarSystem) {
                this.cameraManager.trackPlanet(() => {
                    const planet = solarSystem.getSelectedPlanet();
                    return planet ? planet.mesh.position.clone() : null;
                });
            }
            
            hud.logMessage(`⬆️ Retour en orbite de ${planetRef.name}`);
        }, true);
    }
    
    // ========================================================================
    // Transition ORBIT → SYSTEM
    // ========================================================================
    
    /**
     * Retourne à la vue système depuis l'orbite.
     */
    public exitOrbit(): void {
        if (!this.canTransition()) return;
        
        const navState = this.navigationManager.getState();
        if (!navState.currentPlanet) return;
        
        const planetRef = navState.currentPlanet;
        const targetPos = new THREE.Vector3(planetRef.position.x, planetRef.position.y, planetRef.position.z);
        const systemDistance = planetRef.radius * 8;
        
        this.cameraManager.flyTo(targetPos, systemDistance, () => {
            this.markTransition();
            this.navigationManager.exitOrbit();
            this.viewEntitiesManager.setView('SYSTEM', this.navigationManager.getState());
            
            hud.logMessage(`⬅️ Sortie de l'orbite de ${planetRef.name}`);
        }, true);
    }
    
    // ========================================================================
    // Transition SYSTEM → GALAXY
    // ========================================================================
    
    /**
     * Retourne à la vue galaxie depuis un système.
     */
    public exitSystem(): void {
        if (!this.canTransition()) return;
        
        const navState = this.navigationManager.getState();
        if (navState.currentView !== 'SYSTEM') return;
        
        const exitedSystem = navState.currentSystem;
        if (!exitedSystem) return;
        
        const meta = exitedSystem.metadata;
        const targetPos = new THREE.Vector3(
            meta.absolutePosition.x,
            meta.absolutePosition.y,
            meta.absolutePosition.z
        );
        const distance = meta.optimalDistance * NAVIGATION_CONFIG.systemExitDistanceFactor;
        
        // Afficher la galaxie immédiatement
        this.galaxyGroup.visible = true;
        
        this.cameraManager.flyTo(targetPos, distance, () => {
            this.markTransition();
            this.navigationManager.exitSystem();
            this.viewEntitiesManager.setView('GALAXY', this.navigationManager.getState());
            
            hud.logMessage(`⬅️ Sortie du système ${meta.name}`);
        }, true);
    }
    
    /**
     * Obtient le timestamp de la dernière transition.
     */
    public getLastTransitionTime(): number {
        return this.lastTransitionTime;
    }
}
