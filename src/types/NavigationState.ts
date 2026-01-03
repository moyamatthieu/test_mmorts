import * as THREE from 'three';
import { SunMetadata } from '../entities/ClusterGrid';

/**
 * États de navigation possibles dans l'application
 * 
 * Hiérarchie des vues:
 *  * GALAXY → SYSTEM → PLANET
 *  * 
 *  * - GALAXY: Vue de la galaxie entière (clusters + étoiles)
 *  * - SYSTEM: Vue d'un système solaire (soleil + planètes en orbite)
 *  * - PLANET: Vue surface d'une planète (grille de construction au sol)
 */
export type ViewMode = 'GALAXY' | 'SYSTEM' | 'ORBIT' | 'SURFACE';

/**
 * Informations complètes sur un système solaire sélectionné
 * Combine métadonnées ET références Three.js
 */
export interface SystemReference {
   /**
    * Métadonnées du système (source de vérité stable).
    * Important: elles restent valides même si le référentiel Three.js change (scene graph swap).
    */
   metadata: SunMetadata;

   /**
    * Références runtime Three.js (optionnelles).
    * En vue GALAXY, elles existent généralement (raycast / rendu).
    * Ne pas les utiliser comme source de vérité lors d'un changement de référentiel.
    */
   sunMesh?: THREE.Mesh | null;
   pickMesh?: THREE.Mesh | null;
}

/**
 * Référence vers une planète dans un système solaire
 * Architecture: Géométrie sphérique stricte (AUCUNE projection plane)
 */
export interface PlanetReference {
   /** ID unique de la planète */
   id: string;
   
   /** Nom affiché */
   name: string;
   
   /** Rayon de la planète (unités Three.js) */
   radius: number;
   
   /** Position relative au soleil (coordonnées locales système) */
   position: { x: number; y: number; z: number };
   
   /** Seed pour génération procédurale reproductible */
   seed: number;
   
   /** Type de planète (détermine apparence de base) */
   type: 'telluric' | 'gas' | 'ice' | 'desert';
}
 
/**
 * État centralisé de la navigation
 * Source de vérité unique pour tous les composants
 */
export interface NavigationState {
   /** Vue actuellement active */
   currentView: ViewMode;
   
   /** Système solaire actuellement sélectionné/visité (null si vue galaxie sans sélection) */
   currentSystem: SystemReference | null;
   
   /** Planète actuellement visitée en vue SURFACE (null si pas en vue planète) */
   currentPlanet: PlanetReference | null;
   
   /**
    * Pile d'historique navigation pour retours (back)
    * Permet de revenir au système précédent lors de navigation multi-niveaux
    */
   navigationHistory: SystemReference[];
   
   /**
    * Distance optimale de l'objet actuellement ciblé (soleil ou planète)
    * Utilisée pour déclencher les transitions automatiques basées sur le zoom
    * null en vue GALAXY sans sélection
    */
   currentOptimalDistance: number | null;
}
 
/**
 * Créer un état navigation initial (vue galaxie, aucune sélection)
 */
export function createInitialNavigationState(): NavigationState {
   return {
     currentView: 'GALAXY',
     currentSystem: null,
     currentPlanet: null,
     navigationHistory: [],
     currentOptimalDistance: 100 // Valeur par défaut pour auto-transitions en vue GALAXY
   };
}