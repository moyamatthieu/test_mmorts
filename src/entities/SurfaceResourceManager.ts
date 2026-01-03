/**
 * SurfaceResourceManager.ts
 * 
 * Gestionnaire de ressources pour la vue SURFACE.
 * Affiche les ressources (Cristal, Métal) sur la surface planétaire
 * en utilisant THREE.InstancedMesh pour la performance.
 */

import * as THREE from 'three';
import { SurfaceGrid } from '../core/SurfaceGrid';
import { NoiseGenerator } from '../utils/NoiseGenerator';

/**
 * Types de ressources disponibles
 */
export enum ResourceType {
  CRYSTAL = 'CRYSTAL',
  METAL = 'METAL'
}

/**
 * Configuration des ressources
 */
interface ResourceConfig {
  type: ResourceType;
  color: THREE.Color;
  geometry: THREE.BufferGeometry;
  count: number;
}

/**
 * Métadonnées pour chaque instance de ressource
 */
interface ResourceInstance {
  position: THREE.Vector3;
  normal: THREE.Vector3;
  type: ResourceType;
  index: number;
}

/**
 * SurfaceResourceManager
 * 
 * Responsabilités :
 * - Prendre une SurfaceGrid en entrée
 * - Générer des InstancedMesh pour les ressources
 * - Placer les instances aux positions de la grille
 * - Ajuster la hauteur avec NoiseGenerator.getSurfaceHeight
 * - Orienter selon la normale du terrain
 */
export class SurfaceResourceManager {
  private scene: THREE.Scene | null = null;
  private surfaceGrid: SurfaceGrid | null = null;
  
  // InstancedMesh par type de ressource
  private instancedMeshes: Map<ResourceType, THREE.InstancedMesh> = new Map();
  
  // Données des instances
  private instances: ResourceInstance[] = [];
  
  // Géométries et matériaux de base
  private geometries: Map<ResourceType, THREE.BufferGeometry>;
  private materials: Map<ResourceType, THREE.MeshStandardMaterial>;
  
  // Configuration
  private readonly RESOURCE_CONFIG: ResourceConfig[] = [
    {
      type: ResourceType.CRYSTAL,
      color: new THREE.Color(0x00ffff), // Cyan
      geometry: new THREE.OctahedronGeometry(0.3, 0),
      count: 50
    },
    {
      type: ResourceType.METAL,
      color: new THREE.Color(0xb8b8b8), // Gris clair
      geometry: new THREE.IcosahedronGeometry(0.25, 0),
      count: 50
    }
  ];

  constructor() {
    // Initialiser les géométries et matériaux
    this.geometries = new Map();
    this.materials = new Map();
    
    for (const config of this.RESOURCE_CONFIG) {
      this.geometries.set(config.type, config.geometry);
      
      const material = new THREE.MeshStandardMaterial({
        color: config.color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: config.color,
        emissiveIntensity: 0.2
      });
      
      this.materials.set(config.type, material);
    }
  }

  /**
   * Initialise le manager avec la scène et la grille
   */
  initialize(scene: THREE.Scene, surfaceGrid: SurfaceGrid): void {
    this.scene = scene;
    this.surfaceGrid = surfaceGrid;
    
    console.log('[SurfaceResourceManager] Initialisé');
  }

  /**
   * Génère les ressources sur la surface
   */
  generateResources(): void {
    if (!this.surfaceGrid || !this.scene) {
      console.warn('[SurfaceResourceManager] Non initialisé');
      return;
    }

    this.clearResources();
    this.instances = [];

    // Pour chaque type de ressource
    for (const config of this.RESOURCE_CONFIG) {
      const instancesForType: ResourceInstance[] = [];
      
      // Générer les positions sur la grille
      for (let i = 0; i < config.count; i++) {
        // Obtenir une position aléatoire sur la grille
        const gridPos = this.surfaceGrid.getRandomGridPosition();
        
        // Convertir en position world avec hauteur physique
        const worldPos = this.surfaceGrid.gridToWorld(gridPos);
        
        // Calculer la normale (gradient de hauteur ou normalisée)
        const normal = this.calculateNormal(worldPos);
        
        // Créer l'instance
        const instance: ResourceInstance = {
          position: worldPos,
          normal: normal,
          type: config.type,
          index: i
        };
        
        instancesForType.push(instance);
        this.instances.push(instance);
      }

      // Créer l'InstancedMesh pour ce type
      if (instancesForType.length > 0) {
        this.createInstancedMesh(config.type, instancesForType);
      }
    }

    console.log(`[SurfaceResourceManager] ${this.instances.length} ressources générées`);
  }

  /**
   * Crée un InstancedMesh pour un type de ressource
   */
  private createInstancedMesh(type: ResourceType, instances: ResourceInstance[]): void {
    if (!this.scene) return;

    const geometry = this.geometries.get(type);
    const material = this.materials.get(type);
    
    if (!geometry || !material) return;

    const mesh = new THREE.InstancedMesh(geometry, material, instances.length);
    mesh.name = `Resources_${type}`;
    
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    
    // Remplir les instances
    instances.forEach((instance, index) => {
      // Orientation : aligner l'axe Y de la géométrie avec la normale
      quaternion.setFromUnitVectors(up, instance.normal);
      
      // Matrice de transformation
      matrix.compose(instance.position, quaternion, new THREE.Vector3(1, 1, 1));
      
      mesh.setMatrixAt(index, matrix);
    });
    
    mesh.instanceMatrix.needsUpdate = true;
    
    // Ajouter à la scène
    this.scene.add(mesh);
    this.instancedMeshes.set(type, mesh);
  }

  /**
   * Calcule la normale du terrain à une position donnée
   * Utilise le gradient de hauteur ou la normalisation de la position
   */
  private calculateNormal(position: THREE.Vector3): THREE.Vector3 {
    // Pour une sphère, la normale est simplement la position normalisée
    // Mais nous pouvons aussi utiliser le gradient de hauteur pour plus de précision
    
    const epsilon = 0.1;
    const up = new THREE.Vector3(0, 1, 0);
    
    // Échantillons autour de la position pour calculer le gradient
    const posPlusX = position.clone().add(new THREE.Vector3(epsilon, 0, 0));
    const posMinusX = position.clone().add(new THREE.Vector3(-epsilon, 0, 0));
    const posPlusZ = position.clone().add(new THREE.Vector3(0, 0, epsilon));
    const posMinusZ = position.clone().add(new THREE.Vector3(0, 0, -epsilon));
    
    // Obtenir les hauteurs
    const hPlusX = NoiseGenerator.getSurfaceHeight(posPlusX);
    const hMinusX = NoiseGenerator.getSurfaceHeight(posMinusX);
    const hPlusZ = NoiseGenerator.getSurfaceHeight(posPlusZ);
    const hMinusZ = NoiseGenerator.getSurfaceHeight(posMinusZ);
    
    // Calculer le gradient
    const dx = (hPlusX - hMinusX) / (2 * epsilon);
    const dz = (hPlusZ - hMinusZ) / (2 * epsilon);
    
    // Vecteur normal (approximatif pour une sphère)
    const normal = new THREE.Vector3(-dx, 1, -dz).normalize();
    
    // Fallback : normalisation de la position si le gradient est trop plat
    if (normal.length() < 0.5) {
      return position.clone().normalize();
    }
    
    return normal;
  }

  /**
   * Met à jour les ressources (si nécessaire)
   */
  update(deltaTime: number): void {
    // Animation optionnelle : rotation légère des ressources
    this.instancedMeshes.forEach((mesh) => {
      mesh.rotation.y += deltaTime * 0.5;
    });
  }

  /**
   * Nettoie toutes les ressources
   */
  clearResources(): void {
    if (!this.scene) return;
    
    this.instancedMeshes.forEach((mesh) => {
      this.scene?.remove(mesh);
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    
    this.instancedMeshes.clear();
    this.instances = [];
  }

  /**
   * Dispose du manager
   */
  dispose(): void {
    this.clearResources();
    this.scene = null;
    this.surfaceGrid = null;
    
    // Nettoyer les géométries et matériaux de base
    this.geometries.forEach((geo) => geo.dispose());
    this.materials.forEach((mat) => mat.dispose());
    this.geometries.clear();
    this.materials.clear();
  }

  /**
   * Getter pour les instances (pour debug ou UI)
   */
  getInstances(): ResourceInstance[] {
    return this.instances;
  }

  /**
   * Getter pour les meshes (pour intégration)
   */
  getMeshes(): Map<ResourceType, THREE.InstancedMesh> {
    return this.instancedMeshes;
  }
}

// Export singleton pour usage global
export const surfaceResourceManager = new SurfaceResourceManager();