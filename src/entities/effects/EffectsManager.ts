// src/entities/effects/EffectsManager.ts
/**
 * Gestionnaire d'effets visuels.
 * 
 * Responsabilités:
 * - Gérer les pools d'effets (explosions, faisceaux, traînées)
 * - Mettre à jour les animations
 * - Recycler les objets pour éviter les allocations
 * 
 * Utilise l'object pooling pour des performances optimales
 * lors des combats avec de nombreuses unités.
 * 
 * KISS: Pool simple avec arrays, pas de structures complexes.
 */

import * as THREE from 'three';
import { eventBus } from '../../core/EventBus';

// ============================================================================
// Types
// ============================================================================

export type EffectType = 
  | 'EXPLOSION'
  | 'BEAM'
  | 'PROJECTILE'
  | 'ENGINE_TRAIL'
  | 'SHIELD_HIT'
  | 'MUZZLE_FLASH';

export interface Effect {
  id: string;
  type: EffectType;
  active: boolean;
  
  // Position et orientation
  position: THREE.Vector3;
  target?: THREE.Vector3; // Pour les beams
  
  // Timing
  startTime: number;
  duration: number;
  
  // Visual
  mesh: THREE.Object3D | null;
  color: THREE.Color;
  scale: number;
  
  // Animation
  progress: number; // 0-1
}

export interface ExplosionConfig {
  position: THREE.Vector3;
  scale?: number;
  color?: number;
  duration?: number;
}

export interface BeamConfig {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: number;
  width?: number;
  duration?: number;
}

export interface ProjectileConfig {
  start: THREE.Vector3;
  end: THREE.Vector3;
  speed?: number;
  color?: number;
  size?: number;
}

export interface TrailConfig {
  position: THREE.Vector3;
  direction: THREE.Vector3;
  color?: number;
  length?: number;
  width?: number;
}

// ============================================================================
// Constantes
// ============================================================================

const POOL_SIZE = {
  EXPLOSION: 50,
  BEAM: 30,
  PROJECTILE: 100,
  ENGINE_TRAIL: 200,
  SHIELD_HIT: 20,
  MUZZLE_FLASH: 50
};

const DEFAULT_COLORS = {
  EXPLOSION: 0xff6600,
  BEAM: 0x00ffff,
  PROJECTILE: 0xffff00,
  ENGINE_TRAIL: 0x00aaff,
  SHIELD_HIT: 0x0088ff,
  MUZZLE_FLASH: 0xffffaa
};

// ============================================================================
// Classe EffectsManager
// ============================================================================

/**
 * Gestionnaire centralisé des effets visuels.
 */
export class EffectsManager {
  private scene: THREE.Scene;
  private pools: Map<EffectType, Effect[]> = new Map();
  private activeEffects: Set<Effect> = new Set();
  
  // Géométries partagées (évite la duplication)
  private sharedGeometries: Map<string, THREE.BufferGeometry> = new Map();
  private sharedMaterials: Map<string, THREE.Material> = new Map();
  
  // Groupe parent pour tous les effets
  private effectsGroup: THREE.Group;
  
  // ============================================================================
  // Constructeur
  // ============================================================================
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.effectsGroup = new THREE.Group();
    this.effectsGroup.name = 'effects';
    this.scene.add(this.effectsGroup);
    
    // Initialiser les pools
    this.initializePools();
    this.initializeSharedResources();
  }
  
  // ============================================================================
  // Initialisation
  // ============================================================================
  
  /**
   * Initialise les pools d'effets.
   */
  private initializePools(): void {
    for (const [type, size] of Object.entries(POOL_SIZE)) {
      const pool: Effect[] = [];
      for (let i = 0; i < size; i++) {
        pool.push(this.createEffect(type as EffectType));
      }
      this.pools.set(type as EffectType, pool);
    }
  }
  
  /**
   * Initialise les ressources partagées (géométries, matériaux).
   */
  private initializeSharedResources(): void {
    // Géométrie sphère pour explosions
    this.sharedGeometries.set('explosion', new THREE.SphereGeometry(1, 8, 6));
    
    // Géométrie cylindre pour beams
    this.sharedGeometries.set('beam', new THREE.CylinderGeometry(0.1, 0.1, 1, 8));
    
    // Géométrie petite sphère pour projectiles
    this.sharedGeometries.set('projectile', new THREE.SphereGeometry(0.2, 6, 4));
    
    // Géométrie cône pour traînées
    this.sharedGeometries.set('trail', new THREE.ConeGeometry(0.1, 1, 6));
    
    // Matériau basique émissif
    this.sharedMaterials.set('emissive', new THREE.MeshBasicMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    }));
  }
  
  /**
   * Crée un effet inactif pour le pool.
   */
  private createEffect(type: EffectType): Effect {
    return {
      id: `${type}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      active: false,
      position: new THREE.Vector3(),
      startTime: 0,
      duration: 1,
      mesh: null,
      color: new THREE.Color(DEFAULT_COLORS[type] || 0xffffff),
      scale: 1,
      progress: 0
    };
  }
  
  // ============================================================================
  // API Publique - Création d'effets
  // ============================================================================
  
  /**
   * Crée une explosion.
   */
  spawnExplosion(config: ExplosionConfig): Effect | null {
    const effect = this.getFromPool('EXPLOSION');
    if (!effect) return null;
    
    effect.position.copy(config.position);
    effect.scale = config.scale ?? 1;
    effect.duration = config.duration ?? 0.5;
    effect.color.setHex(config.color ?? DEFAULT_COLORS.EXPLOSION);
    
    // Créer le mesh
    effect.mesh = this.createExplosionMesh(effect);
    this.activateEffect(effect);
    
    return effect;
  }
  
  /**
   * Crée un faisceau (beam).
   */
  spawnBeam(config: BeamConfig): Effect | null {
    const effect = this.getFromPool('BEAM');
    if (!effect) return null;
    
    effect.position.copy(config.start);
    effect.target = config.end.clone();
    effect.duration = config.duration ?? 0.2;
    effect.color.setHex(config.color ?? DEFAULT_COLORS.BEAM);
    effect.scale = config.width ?? 0.1;
    
    // Créer le mesh
    effect.mesh = this.createBeamMesh(effect);
    this.activateEffect(effect);
    
    return effect;
  }
  
  /**
   * Crée un projectile animé.
   */
  spawnProjectile(config: ProjectileConfig): Effect | null {
    const effect = this.getFromPool('PROJECTILE');
    if (!effect) return null;
    
    effect.position.copy(config.start);
    effect.target = config.end.clone();
    
    // Calculer la durée basée sur la distance et la vitesse
    const distance = config.start.distanceTo(config.end);
    const speed = config.speed ?? 50;
    effect.duration = distance / speed;
    
    effect.color.setHex(config.color ?? DEFAULT_COLORS.PROJECTILE);
    effect.scale = config.size ?? 0.2;
    
    // Créer le mesh
    effect.mesh = this.createProjectileMesh(effect);
    this.activateEffect(effect);
    
    return effect;
  }
  
  /**
   * Crée une traînée de moteur.
   */
  spawnTrail(config: TrailConfig): Effect | null {
    const effect = this.getFromPool('ENGINE_TRAIL');
    if (!effect) return null;
    
    effect.position.copy(config.position);
    effect.target = config.direction.clone();
    effect.duration = 0.3;
    effect.color.setHex(config.color ?? DEFAULT_COLORS.ENGINE_TRAIL);
    effect.scale = config.width ?? 0.1;
    
    // Créer le mesh
    effect.mesh = this.createTrailMesh(effect, config.length ?? 1);
    this.activateEffect(effect);
    
    return effect;
  }
  
  /**
   * Crée un impact de bouclier.
   */
  spawnShieldHit(position: THREE.Vector3, normal: THREE.Vector3): Effect | null {
    const effect = this.getFromPool('SHIELD_HIT');
    if (!effect) return null;
    
    effect.position.copy(position);
    effect.target = normal.clone();
    effect.duration = 0.3;
    effect.color.setHex(DEFAULT_COLORS.SHIELD_HIT);
    effect.scale = 0.5;
    
    // Créer le mesh
    effect.mesh = this.createShieldHitMesh(effect);
    this.activateEffect(effect);
    
    return effect;
  }
  
  /**
   * Crée un flash de tir.
   */
  spawnMuzzleFlash(position: THREE.Vector3, direction: THREE.Vector3): Effect | null {
    const effect = this.getFromPool('MUZZLE_FLASH');
    if (!effect) return null;
    
    effect.position.copy(position);
    effect.target = direction.clone();
    effect.duration = 0.1;
    effect.color.setHex(DEFAULT_COLORS.MUZZLE_FLASH);
    effect.scale = 0.3;
    
    // Créer le mesh
    effect.mesh = this.createMuzzleFlashMesh(effect);
    this.activateEffect(effect);
    
    return effect;
  }
  
  // ============================================================================
  // Création de meshes
  // ============================================================================
  
  /**
   * Crée le mesh d'une explosion.
   */
  private createExplosionMesh(effect: Effect): THREE.Mesh {
    const geometry = this.sharedGeometries.get('explosion')!;
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(effect.position);
    mesh.scale.setScalar(effect.scale * 0.1); // Commence petit
    
    return mesh;
  }
  
  /**
   * Crée le mesh d'un faisceau.
   */
  private createBeamMesh(effect: Effect): THREE.Mesh {
    if (!effect.target) return new THREE.Mesh();
    
    const start = effect.position;
    const end = effect.target;
    const length = start.distanceTo(end);
    
    // Géométrie cylindre orientée
    const geometry = new THREE.CylinderGeometry(
      effect.scale,
      effect.scale,
      length,
      8
    );
    geometry.translate(0, length / 2, 0);
    geometry.rotateX(Math.PI / 2);
    
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(start);
    
    // Orienter vers la cible
    mesh.lookAt(end);
    
    return mesh;
  }
  
  /**
   * Crée le mesh d'un projectile.
   */
  private createProjectileMesh(effect: Effect): THREE.Mesh {
    const geometry = this.sharedGeometries.get('projectile')!;
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(effect.position);
    mesh.scale.setScalar(effect.scale);
    
    return mesh;
  }
  
  /**
   * Crée le mesh d'une traînée.
   */
  private createTrailMesh(effect: Effect, length: number): THREE.Mesh {
    const geometry = new THREE.ConeGeometry(effect.scale, length, 6);
    geometry.translate(0, -length / 2, 0);
    geometry.rotateX(Math.PI / 2);
    
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(effect.position);
    
    if (effect.target) {
      const dir = effect.target.clone().normalize();
      const up = new THREE.Vector3(0, 1, 0);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(up, dir);
      mesh.quaternion.copy(quaternion);
    }
    
    return mesh;
  }
  
  /**
   * Crée le mesh d'un impact de bouclier.
   */
  private createShieldHitMesh(effect: Effect): THREE.Mesh {
    const geometry = new THREE.RingGeometry(0.1, effect.scale, 16);
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(effect.position);
    
    if (effect.target) {
      mesh.lookAt(effect.position.clone().add(effect.target));
    }
    
    return mesh;
  }
  
  /**
   * Crée le mesh d'un flash de tir.
   */
  private createMuzzleFlashMesh(effect: Effect): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(effect.scale, 6, 4);
    const material = new THREE.MeshBasicMaterial({
      color: effect.color,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(effect.position);
    
    return mesh;
  }
  
  // ============================================================================
  // Gestion du pool
  // ============================================================================
  
  /**
   * Récupère un effet du pool.
   */
  private getFromPool(type: EffectType): Effect | null {
    const pool = this.pools.get(type);
    if (!pool) return null;
    
    // Trouver un effet inactif
    const effect = pool.find(e => !e.active);
    if (effect) {
      return effect;
    }
    
    // Pool épuisé, recycler le plus ancien
    const oldest = this.findOldestActive(type);
    if (oldest) {
      this.deactivateEffect(oldest);
      return oldest;
    }
    
    return null;
  }
  
  /**
   * Trouve l'effet actif le plus ancien d'un type.
   */
  private findOldestActive(type: EffectType): Effect | null {
    let oldest: Effect | null = null;
    let oldestTime = Infinity;
    
    for (const effect of this.activeEffects) {
      if (effect.type === type && effect.startTime < oldestTime) {
        oldest = effect;
        oldestTime = effect.startTime;
      }
    }
    
    return oldest;
  }
  
  /**
   * Active un effet.
   */
  private activateEffect(effect: Effect): void {
    effect.active = true;
    effect.startTime = performance.now() / 1000;
    effect.progress = 0;
    
    if (effect.mesh) {
      this.effectsGroup.add(effect.mesh);
    }
    
    this.activeEffects.add(effect);
  }
  
  /**
   * Désactive un effet et le remet dans le pool.
   */
  private deactivateEffect(effect: Effect): void {
    effect.active = false;
    
    if (effect.mesh) {
      this.effectsGroup.remove(effect.mesh);
      
      // Nettoyer le matériau (non partagé)
      if ((effect.mesh as THREE.Mesh).material) {
        const mat = (effect.mesh as THREE.Mesh).material;
        if (Array.isArray(mat)) {
          mat.forEach(m => m.dispose());
        } else {
          mat.dispose();
        }
      }
      
      // Nettoyer la géométrie si non partagée
      if ((effect.mesh as THREE.Mesh).geometry) {
        const geom = (effect.mesh as THREE.Mesh).geometry;
        const isShared = Array.from(this.sharedGeometries.values()).includes(geom);
        if (!isShared) {
          geom.dispose();
        }
      }
      
      effect.mesh = null;
    }
    
    this.activeEffects.delete(effect);
  }
  
  // ============================================================================
  // Mise à jour
  // ============================================================================
  
  /**
   * Met à jour tous les effets actifs.
   */
  update(dt: number): void {
    const now = performance.now() / 1000;
    const toRemove: Effect[] = [];
    
    for (const effect of this.activeEffects) {
      // Calculer la progression
      const elapsed = now - effect.startTime;
      effect.progress = Math.min(1, elapsed / effect.duration);
      
      // Mettre à jour selon le type
      this.updateEffect(effect, dt);
      
      // Marquer pour suppression si terminé
      if (effect.progress >= 1) {
        toRemove.push(effect);
      }
    }
    
    // Désactiver les effets terminés
    for (const effect of toRemove) {
      this.deactivateEffect(effect);
    }
  }
  
  /**
   * Met à jour un effet spécifique.
   */
  private updateEffect(effect: Effect, dt: number): void {
    if (!effect.mesh) return;
    
    const mesh = effect.mesh as THREE.Mesh;
    const material = mesh.material as THREE.MeshBasicMaterial;
    
    switch (effect.type) {
      case 'EXPLOSION':
        this.updateExplosion(effect, mesh, material);
        break;
        
      case 'BEAM':
        this.updateBeam(effect, mesh, material);
        break;
        
      case 'PROJECTILE':
        this.updateProjectile(effect, mesh, material);
        break;
        
      case 'ENGINE_TRAIL':
        this.updateTrail(effect, mesh, material);
        break;
        
      case 'SHIELD_HIT':
        this.updateShieldHit(effect, mesh, material);
        break;
        
      case 'MUZZLE_FLASH':
        this.updateMuzzleFlash(effect, mesh, material);
        break;
    }
  }
  
  /**
   * Animation d'explosion: expand + fade.
   */
  private updateExplosion(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    // Expansion rapide puis ralentissement
    const scaleProgress = 1 - Math.pow(1 - effect.progress, 3);
    const scale = effect.scale * (0.1 + scaleProgress * 2);
    mesh.scale.setScalar(scale);
    
    // Fade out
    material.opacity = 1 - effect.progress;
    
    // Changement de couleur: orange → rouge → noir
    const hue = 0.05 * (1 - effect.progress);
    material.color.setHSL(hue, 1, 0.5 * (1 - effect.progress * 0.5));
  }
  
  /**
   * Animation de faisceau: fade in/out rapide.
   */
  private updateBeam(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    // Flash rapide
    if (effect.progress < 0.2) {
      material.opacity = effect.progress * 5;
    } else {
      material.opacity = 1 - (effect.progress - 0.2) / 0.8;
    }
    
    // Pulse de largeur
    const pulse = 1 + 0.3 * Math.sin(effect.progress * Math.PI * 4);
    mesh.scale.x = pulse;
    mesh.scale.z = pulse;
  }
  
  /**
   * Animation de projectile: déplacement linéaire.
   */
  private updateProjectile(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    if (!effect.target) return;
    
    // Interpolation linéaire de position
    mesh.position.lerpVectors(
      effect.position,
      effect.target,
      effect.progress
    );
    
    // Légère rotation
    mesh.rotation.x += 0.1;
    mesh.rotation.y += 0.15;
    
    // Opacité constante sauf à la fin
    material.opacity = effect.progress > 0.9 ? (1 - effect.progress) * 10 : 1;
  }
  
  /**
   * Animation de traînée: shrink + fade.
   */
  private updateTrail(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    // Rétrécissement
    const scale = 1 - effect.progress;
    mesh.scale.x = scale;
    mesh.scale.z = scale;
    
    // Fade
    material.opacity = 0.6 * (1 - effect.progress);
  }
  
  /**
   * Animation d'impact de bouclier: expand ring + fade.
   */
  private updateShieldHit(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    // Expansion de l'anneau
    const scale = effect.scale * (1 + effect.progress * 2);
    mesh.scale.setScalar(scale);
    
    // Fade
    material.opacity = 1 - effect.progress;
  }
  
  /**
   * Animation de flash: scale down rapide + fade.
   */
  private updateMuzzleFlash(
    effect: Effect,
    mesh: THREE.Mesh,
    material: THREE.MeshBasicMaterial
  ): void {
    // Rétrécissement rapide
    const scale = effect.scale * (1 - effect.progress);
    mesh.scale.setScalar(scale);
    
    // Fade très rapide
    material.opacity = 1 - effect.progress;
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Nettoie toutes les ressources.
   */
  dispose(): void {
    // Désactiver tous les effets
    for (const effect of this.activeEffects) {
      this.deactivateEffect(effect);
    }
    
    // Nettoyer les géométries partagées
    for (const geom of this.sharedGeometries.values()) {
      geom.dispose();
    }
    this.sharedGeometries.clear();
    
    // Nettoyer les matériaux partagés
    for (const mat of this.sharedMaterials.values()) {
      mat.dispose();
    }
    this.sharedMaterials.clear();
    
    // Retirer le groupe de la scène
    this.scene.remove(this.effectsGroup);
    
    // Vider les pools
    this.pools.clear();
    this.activeEffects.clear();
  }
  
  // ============================================================================
  // Accesseurs
  // ============================================================================
  
  getActiveCount(): number {
    return this.activeEffects.size;
  }
  
  getPoolStats(): Record<EffectType, { active: number; total: number }> {
    const stats: Record<string, { active: number; total: number }> = {};
    
    for (const [type, pool] of this.pools) {
      const active = pool.filter(e => e.active).length;
      stats[type] = { active, total: pool.length };
    }
    
    return stats as Record<EffectType, { active: number; total: number }>;
  }
  
  // ============================================================================
  // Intégration EventBus
  // ============================================================================
  
  /**
   * Connecte le gestionnaire d'effets à l'EventBus pour réagir
   * automatiquement aux événements de combat.
   */
  connectToEventBus(): void {
    // Unité détruite → explosion
    eventBus.on('unit:destroyed', (_data) => {
      // Position par défaut si non fournie
      const pos = new THREE.Vector3(0, 0, 0);
      this.spawnExplosion({
        position: pos,
        scale: 1.5,
        duration: 0.8
      });
    });
    
    // Combat démarré → flash d'alerte (optionnel)
    eventBus.on('combat:started', (_data) => {
      // On pourrait ajouter un effet visuel global ici
      console.log('[EffectsManager] Combat détecté');
    });
    
    console.log('[EffectsManager] Connecté à EventBus');
  }
  
  /**
   * Crée un effet de tir entre attaquant et cible.
   * À appeler depuis le système de combat.
   */
  spawnWeaponFire(
    from: THREE.Vector3,
    to: THREE.Vector3,
    weaponType: 'BEAM' | 'PROJECTILE' = 'PROJECTILE'
  ): Effect | null {
    // Flash au niveau du canon
    this.spawnMuzzleFlash(from);
    
    if (weaponType === 'BEAM') {
      return this.spawnBeam({
        start: from,
        end: to,
        color: 0x00ffff,
        duration: 0.15
      });
    } else {
      return this.spawnProjectile({
        start: from,
        end: to,
        speed: 80,
        color: 0xffaa00,
        size: 0.15
      });
    }
  }
  
  /**
   * Crée un impact sur une cible (avec ou sans bouclier).
   */
  spawnImpact(position: THREE.Vector3, hasShield: boolean = false): void {
    if (hasShield) {
      // Impact de bouclier
      this.spawnShieldHit(position, new THREE.Vector3(0, 1, 0));
    } else {
      // Petite explosion d'impact
      this.spawnExplosion({
        position,
        scale: 0.3,
        duration: 0.2,
        color: 0xff4400
      });
    }
  }
}