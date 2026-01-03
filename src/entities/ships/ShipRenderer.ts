// src/entities/ships/ShipRenderer.ts
/**
 * Rendu instancié des vaisseaux.
 * 
 * Responsabilités:
 * - Gérer les InstancedMesh pour chaque type de vaisseau
 * - Créer des modèles 3D procéduraux simples
 * - Mettre à jour les matrices d'instance depuis l'état du jeu
 * - Optimiser le rendu pour 500+ unités
 * 
 * KISS: Un InstancedMesh par type de vaisseau,
 *       modèles procéduraux simples (pas de GLTF).
 */

import * as THREE from 'three';
import type { Unit, UnitType } from '../../types/GameState';

// ============================================================================
// Types
// ============================================================================

export interface ShipModel {
  type: UnitType;
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  scale: number;
}

interface InstanceData {
  mesh: THREE.InstancedMesh;
  unitIds: string[];
  maxCount: number;
  colorAttribute?: THREE.InstancedBufferAttribute;
}

// ============================================================================
// Constantes
// ============================================================================

const SHIP_COLORS = {
  FIGHTER: 0x44aaff,
  CORVETTE: 0x66ccff,
  FRIGATE: 0x88ddff,
  DESTROYER: 0xaaeeff,
  CRUISER: 0xccffff,
  MOTHERSHIP: 0xffffff,
  HARVESTER: 0xffaa44,
  REPAIR: 0x44ff88,
  RESEARCH: 0xaa44ff,
  STATION: 0x888888,
  SHIPYARD: 0x666666,
  DEFENSE_PLATFORM: 0xff4444
};

const SHIP_SCALES = {
  FIGHTER: 0.5,
  CORVETTE: 1.0,
  FRIGATE: 2.0,
  DESTROYER: 3.5,
  CRUISER: 5.0,
  MOTHERSHIP: 10.0,
  HARVESTER: 1.5,
  REPAIR: 1.2,
  RESEARCH: 1.8,
  STATION: 8.0,
  SHIPYARD: 12.0,
  DEFENSE_PLATFORM: 3.0
};

const MAX_INSTANCES_PER_TYPE = 200;

// ============================================================================
// Classe ShipRenderer
// ============================================================================

/**
 * Gestionnaire de rendu des vaisseaux par instancing.
 */
export class ShipRenderer {
  private scene: THREE.Scene;
  private group: THREE.Group;
  private instances: Map<UnitType, InstanceData> = new Map();
  private models: Map<UnitType, ShipModel> = new Map();
  
  // Matrices temporaires (réutilisées pour éviter allocations)
  private tempMatrix = new THREE.Matrix4();
  private tempPosition = new THREE.Vector3();
  private tempQuaternion = new THREE.Quaternion();
  private tempScale = new THREE.Vector3();
  private tempColor = new THREE.Color();
  
  // ============================================================================
  // Constructeur
  // ============================================================================
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'ships';
    this.scene.add(this.group);
    
    // Créer les modèles et instances
    this.createModels();
    this.createInstances();
  }
  
  // ============================================================================
  // Création des modèles
  // ============================================================================
  
  /**
   * Crée tous les modèles de vaisseaux.
   */
  private createModels(): void {
    // Vaisseaux de combat
    this.models.set('FIGHTER', this.createFighterModel());
    this.models.set('CORVETTE', this.createCorvetteModel());
    this.models.set('FRIGATE', this.createFrigateModel());
    this.models.set('DESTROYER', this.createDestroyerModel());
    this.models.set('CRUISER', this.createCruiserModel());
    this.models.set('MOTHERSHIP', this.createMothershipModel());
    
    // Vaisseaux utilitaires
    this.models.set('HARVESTER', this.createHarvesterModel());
    this.models.set('REPAIR', this.createRepairModel());
    this.models.set('RESEARCH', this.createResearchModel());
    
    // Structures
    this.models.set('STATION', this.createStationModel());
    this.models.set('SHIPYARD', this.createShipyardModel());
    this.models.set('DEFENSE_PLATFORM', this.createDefensePlatformModel());
  }
  
  /**
   * Chasseur: petit triangle rapide.
   */
  private createFighterModel(): ShipModel {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1);
    shape.lineTo(-0.5, -0.5);
    shape.lineTo(0, -0.3);
    shape.lineTo(0.5, -0.5);
    shape.closePath();
    
    const extrudeSettings = { depth: 0.2, bevelEnabled: false };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateX(Math.PI / 2);
    geometry.center();
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.FIGHTER,
      emissive: SHIP_COLORS.FIGHTER,
      emissiveIntensity: 0.3,
      shininess: 60
    });
    
    return {
      type: 'FIGHTER',
      geometry,
      material,
      scale: SHIP_SCALES.FIGHTER
    };
  }
  
  /**
   * Corvette: forme allongée.
   */
  private createCorvetteModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps principal
    const bodyGeom = new THREE.BoxGeometry(0.4, 0.2, 1.2);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Ailes
    const wingGeom = new THREE.BoxGeometry(1.0, 0.05, 0.4);
    const wing = new THREE.Mesh(wingGeom);
    wing.position.set(0, 0, -0.2);
    group.add(wing);
    
    // Fusionner en une seule géométrie
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.CORVETTE,
      emissive: SHIP_COLORS.CORVETTE,
      emissiveIntensity: 0.2,
      shininess: 50
    });
    
    return {
      type: 'CORVETTE',
      geometry,
      material,
      scale: SHIP_SCALES.CORVETTE
    };
  }
  
  /**
   * Frégate: vaisseau moyen avec tourelles.
   */
  private createFrigateModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps principal
    const bodyGeom = new THREE.BoxGeometry(0.6, 0.4, 1.6);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Tourelles
    const turretGeom = new THREE.CylinderGeometry(0.1, 0.12, 0.15, 8);
    const turret1 = new THREE.Mesh(turretGeom);
    turret1.position.set(0.15, 0.25, 0.3);
    group.add(turret1);
    
    const turret2 = new THREE.Mesh(turretGeom);
    turret2.position.set(-0.15, 0.25, 0.3);
    group.add(turret2);
    
    // Fusionner en une seule géométrie
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.FRIGATE,
      emissive: SHIP_COLORS.FRIGATE,
      emissiveIntensity: 0.15,
      shininess: 40
    });
    
    return {
      type: 'FRIGATE',
      geometry,
      material,
      scale: SHIP_SCALES.FRIGATE
    };
  }
  
  /**
   * Destroyer: grand vaisseau lourd.
   */
  private createDestroyerModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps principal
    const bodyGeom = new THREE.BoxGeometry(0.8, 0.5, 2.2);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Pont supérieur
    const bridgeGeom = new THREE.BoxGeometry(0.4, 0.3, 0.6);
    const bridge = new THREE.Mesh(bridgeGeom);
    bridge.position.set(0, 0.4, 0.4);
    group.add(bridge);
    
    // Propulseurs
    const engineGeom = new THREE.CylinderGeometry(0.15, 0.2, 0.4, 8);
    engineGeom.rotateX(Math.PI / 2);
    
    const engine1 = new THREE.Mesh(engineGeom);
    engine1.position.set(0.25, 0, -1.2);
    group.add(engine1);
    
    const engine2 = new THREE.Mesh(engineGeom);
    engine2.position.set(-0.25, 0, -1.2);
    group.add(engine2);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.DESTROYER,
      emissive: SHIP_COLORS.DESTROYER,
      emissiveIntensity: 0.1,
      shininess: 30
    });
    
    return {
      type: 'DESTROYER',
      geometry,
      material,
      scale: SHIP_SCALES.DESTROYER
    };
  }
  
  /**
   * Croiseur: très grand vaisseau de ligne.
   */
  private createCruiserModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps principal allongé
    const bodyGeom = new THREE.BoxGeometry(1.0, 0.6, 3.0);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Section avant
    const noseGeom = new THREE.ConeGeometry(0.4, 0.8, 6);
    noseGeom.rotateX(-Math.PI / 2);
    const nose = new THREE.Mesh(noseGeom);
    nose.position.set(0, 0, 1.9);
    group.add(nose);
    
    // Hangars latéraux
    const hangarGeom = new THREE.BoxGeometry(0.3, 0.4, 1.2);
    
    const hangar1 = new THREE.Mesh(hangarGeom);
    hangar1.position.set(0.65, 0, -0.2);
    group.add(hangar1);
    
    const hangar2 = new THREE.Mesh(hangarGeom);
    hangar2.position.set(-0.65, 0, -0.2);
    group.add(hangar2);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.CRUISER,
      emissive: SHIP_COLORS.CRUISER,
      emissiveIntensity: 0.1,
      shininess: 25
    });
    
    return {
      type: 'CRUISER',
      geometry,
      material,
      scale: SHIP_SCALES.CRUISER
    };
  }
  
  /**
   * Mothership: vaisseau-mère massif.
   */
  private createMothershipModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps principal massif
    const bodyGeom = new THREE.BoxGeometry(2.0, 1.0, 4.0);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Tour de commandement
    const towerGeom = new THREE.BoxGeometry(0.6, 0.8, 0.8);
    const tower = new THREE.Mesh(towerGeom);
    tower.position.set(0, 0.9, 0.5);
    group.add(tower);
    
    // Baies de hangar
    const bayGeom = new THREE.BoxGeometry(0.8, 0.6, 1.5);
    
    const bay1 = new THREE.Mesh(bayGeom);
    bay1.position.set(1.2, -0.2, -0.5);
    group.add(bay1);
    
    const bay2 = new THREE.Mesh(bayGeom);
    bay2.position.set(-1.2, -0.2, -0.5);
    group.add(bay2);
    
    // Propulseurs massifs
    const engineGeom = new THREE.CylinderGeometry(0.3, 0.4, 0.6, 8);
    engineGeom.rotateX(Math.PI / 2);
    
    for (let i = -1; i <= 1; i++) {
      const engine = new THREE.Mesh(engineGeom);
      engine.position.set(i * 0.6, 0, -2.3);
      group.add(engine);
    }
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.MOTHERSHIP,
      emissive: 0x222233,
      emissiveIntensity: 0.2,
      shininess: 20
    });
    
    return {
      type: 'MOTHERSHIP',
      geometry,
      material,
      scale: SHIP_SCALES.MOTHERSHIP
    };
  }
  
  /**
   * Harvester: vaisseau minier.
   */
  private createHarvesterModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps cubique
    const bodyGeom = new THREE.BoxGeometry(1.0, 0.8, 1.2);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Bras de minage
    const armGeom = new THREE.BoxGeometry(0.1, 0.1, 0.8);
    
    const arm1 = new THREE.Mesh(armGeom);
    arm1.position.set(0.4, -0.3, 0.8);
    arm1.rotation.x = -0.3;
    group.add(arm1);
    
    const arm2 = new THREE.Mesh(armGeom);
    arm2.position.set(-0.4, -0.3, 0.8);
    arm2.rotation.x = -0.3;
    group.add(arm2);
    
    // Conteneur de ressources
    const containerGeom = new THREE.SphereGeometry(0.4, 8, 6);
    const container = new THREE.Mesh(containerGeom);
    container.position.set(0, 0, -0.4);
    group.add(container);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.HARVESTER,
      emissive: SHIP_COLORS.HARVESTER,
      emissiveIntensity: 0.1,
      shininess: 30
    });
    
    return {
      type: 'HARVESTER',
      geometry,
      material,
      scale: SHIP_SCALES.HARVESTER
    };
  }
  
  /**
   * Repair: vaisseau de réparation.
   */
  private createRepairModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps arrondi
    const bodyGeom = new THREE.SphereGeometry(0.5, 8, 6);
    bodyGeom.scale(1, 0.6, 1.2);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Bras de réparation
    const armGeom = new THREE.CylinderGeometry(0.05, 0.03, 0.6, 6);
    
    const arm1 = new THREE.Mesh(armGeom);
    arm1.position.set(0.4, 0, 0.3);
    arm1.rotation.z = Math.PI / 4;
    group.add(arm1);
    
    const arm2 = new THREE.Mesh(armGeom);
    arm2.position.set(-0.4, 0, 0.3);
    arm2.rotation.z = -Math.PI / 4;
    group.add(arm2);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.REPAIR,
      emissive: SHIP_COLORS.REPAIR,
      emissiveIntensity: 0.2,
      shininess: 40
    });
    
    return {
      type: 'REPAIR',
      geometry,
      material,
      scale: SHIP_SCALES.REPAIR
    };
  }
  
  /**
   * Research: vaisseau de recherche.
   */
  private createResearchModel(): ShipModel {
    const group = new THREE.Group();
    
    // Corps ovale
    const bodyGeom = new THREE.SphereGeometry(0.6, 8, 6);
    bodyGeom.scale(0.8, 0.5, 1.0);
    const body = new THREE.Mesh(bodyGeom);
    group.add(body);
    
    // Antennes
    const antennaGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 4);
    
    const antenna1 = new THREE.Mesh(antennaGeom);
    antenna1.position.set(0.3, 0.4, 0);
    antenna1.rotation.z = -0.3;
    group.add(antenna1);
    
    const antenna2 = new THREE.Mesh(antennaGeom);
    antenna2.position.set(-0.3, 0.4, 0);
    antenna2.rotation.z = 0.3;
    group.add(antenna2);
    
    // Dôme
    const domeGeom = new THREE.SphereGeometry(0.2, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeom);
    dome.position.set(0, 0.3, 0);
    group.add(dome);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.RESEARCH,
      emissive: SHIP_COLORS.RESEARCH,
      emissiveIntensity: 0.15,
      shininess: 50
    });
    
    return {
      type: 'RESEARCH',
      geometry,
      material,
      scale: SHIP_SCALES.RESEARCH
    };
  }
  
  /**
   * Station spatiale.
   */
  private createStationModel(): ShipModel {
    const group = new THREE.Group();
    
    // Module central
    const coreGeom = new THREE.CylinderGeometry(0.8, 0.8, 1.5, 8);
    const core = new THREE.Mesh(coreGeom);
    group.add(core);
    
    // Anneaux
    const ringGeom = new THREE.TorusGeometry(1.2, 0.15, 8, 24);
    
    const ring1 = new THREE.Mesh(ringGeom);
    ring1.position.y = 0.3;
    group.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeom);
    ring2.position.y = -0.3;
    group.add(ring2);
    
    // Panneaux solaires
    const panelGeom = new THREE.BoxGeometry(2.0, 0.02, 0.6);
    
    const panel1 = new THREE.Mesh(panelGeom);
    panel1.position.set(1.5, 0, 0);
    group.add(panel1);
    
    const panel2 = new THREE.Mesh(panelGeom);
    panel2.position.set(-1.5, 0, 0);
    group.add(panel2);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.STATION,
      emissive: 0x112233,
      emissiveIntensity: 0.1,
      shininess: 20
    });
    
    return {
      type: 'STATION',
      geometry,
      material,
      scale: SHIP_SCALES.STATION
    };
  }
  
  /**
   * Chantier naval.
   */
  private createShipyardModel(): ShipModel {
    const group = new THREE.Group();
    
    // Structure principale
    const frameGeom = new THREE.BoxGeometry(2.0, 1.0, 3.0);
    frameGeom.scale(1, 1, 1);
    const frame = new THREE.Mesh(frameGeom);
    group.add(frame);
    
    // Bras de construction
    const armGeom = new THREE.BoxGeometry(0.1, 0.1, 1.5);
    
    const arm1 = new THREE.Mesh(armGeom);
    arm1.position.set(0.8, 0.4, 1.5);
    group.add(arm1);
    
    const arm2 = new THREE.Mesh(armGeom);
    arm2.position.set(-0.8, 0.4, 1.5);
    group.add(arm2);
    
    const arm3 = new THREE.Mesh(armGeom);
    arm3.position.set(0.8, -0.4, 1.5);
    group.add(arm3);
    
    const arm4 = new THREE.Mesh(armGeom);
    arm4.position.set(-0.8, -0.4, 1.5);
    group.add(arm4);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.SHIPYARD,
      emissive: 0x223344,
      emissiveIntensity: 0.1,
      shininess: 15
    });
    
    return {
      type: 'SHIPYARD',
      geometry,
      material,
      scale: SHIP_SCALES.SHIPYARD
    };
  }
  
  /**
   * Plateforme de défense.
   */
  private createDefensePlatformModel(): ShipModel {
    const group = new THREE.Group();
    
    // Base
    const baseGeom = new THREE.CylinderGeometry(0.6, 0.8, 0.4, 8);
    const base = new THREE.Mesh(baseGeom);
    group.add(base);
    
    // Tourelle principale
    const turretGeom = new THREE.CylinderGeometry(0.25, 0.3, 0.3, 8);
    const turret = new THREE.Mesh(turretGeom);
    turret.position.y = 0.35;
    group.add(turret);
    
    // Canon
    const barrelGeom = new THREE.CylinderGeometry(0.08, 0.1, 0.8, 6);
    barrelGeom.rotateX(Math.PI / 2);
    const barrel = new THREE.Mesh(barrelGeom);
    barrel.position.set(0, 0.4, 0.4);
    group.add(barrel);
    
    const geometry = this.mergeGroup(group);
    
    const material = new THREE.MeshPhongMaterial({
      color: SHIP_COLORS.DEFENSE_PLATFORM,
      emissive: 0x330000,
      emissiveIntensity: 0.2,
      shininess: 25
    });
    
    return {
      type: 'DEFENSE_PLATFORM',
      geometry,
      material,
      scale: SHIP_SCALES.DEFENSE_PLATFORM
    };
  }
  
  /**
   * Fusionne un groupe en une seule géométrie.
   */
  private mergeGroup(group: THREE.Group): THREE.BufferGeometry {
    const geometries: THREE.BufferGeometry[] = [];
    
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const geom = child.geometry.clone();
        child.updateMatrix();
        geom.applyMatrix4(child.matrix);
        geometries.push(geom);
      }
    });
    
    if (geometries.length === 0) {
      return new THREE.BoxGeometry(1, 1, 1);
    }
    
    if (geometries.length === 1) {
      return geometries[0];
    }
    
    // Merge simple
    const merged = new THREE.BufferGeometry();
    const positions: number[] = [];
    const normals: number[] = [];
    
    for (const geom of geometries) {
      const pos = geom.getAttribute('position');
      const norm = geom.getAttribute('normal');
      
      for (let i = 0; i < pos.count; i++) {
        positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
        if (norm) {
          normals.push(norm.getX(i), norm.getY(i), norm.getZ(i));
        }
      }
      
      geom.dispose();
    }
    
    merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    if (normals.length > 0) {
      merged.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    }
    merged.computeVertexNormals();
    
    return merged;
  }
  
  // ============================================================================
  // Création des instances
  // ============================================================================
  
  /**
   * Crée les InstancedMesh pour chaque type.
   */
  private createInstances(): void {
    for (const [type, model] of this.models) {
      const mesh = new THREE.InstancedMesh(
        model.geometry,
        model.material,
        MAX_INSTANCES_PER_TYPE
      );
      
      mesh.name = `ships-${type}`;
      mesh.count = 0; // Pas d'instances actives au départ
      mesh.frustumCulled = true;
      
      // Attribut de couleur par instance (pour la couleur du joueur)
      const colors = new Float32Array(MAX_INSTANCES_PER_TYPE * 3);
      const colorAttribute = new THREE.InstancedBufferAttribute(colors, 3);
      mesh.geometry.setAttribute('instanceColor', colorAttribute);
      
      this.group.add(mesh);
      
      this.instances.set(type, {
        mesh,
        unitIds: [],
        maxCount: MAX_INSTANCES_PER_TYPE,
        colorAttribute
      });
    }
  }
  
  // ============================================================================
  // Mise à jour
  // ============================================================================
  
  /**
   * Met à jour le rendu depuis l'état du jeu.
   */
  update(units: Map<string, Unit>, playerColors: Map<string, number>): void {
    // Réinitialiser les compteurs
    for (const data of this.instances.values()) {
      data.unitIds = [];
    }
    
    // Classer les unités par type (exclure les unités détruites)
    for (const unit of units.values()) {
      if (unit.state === 'DESTROYED') continue;
      
      const data = this.instances.get(unit.shipClass);
      if (data && data.unitIds.length < data.maxCount) {
        data.unitIds.push(unit.id);
      }
    }
    
    // Mettre à jour chaque InstancedMesh
    for (const [type, data] of this.instances) {
      const model = this.models.get(type);
      if (!model) continue;
      
      data.mesh.count = data.unitIds.length;
      
      for (let i = 0; i < data.unitIds.length; i++) {
        const unit = units.get(data.unitIds[i]);
        if (!unit) continue;
        
        // Position
        this.tempPosition.set(
          unit.position.x,
          unit.position.y,
          unit.position.z
        );
        
        // Rotation (vers la direction)
        if (unit.velocity.x !== 0 || unit.velocity.z !== 0) {
          const angle = Math.atan2(unit.velocity.x, unit.velocity.z);
          this.tempQuaternion.setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            angle
          );
        } else {
          this.tempQuaternion.identity();
        }
        
        // Scale
        this.tempScale.setScalar(model.scale);
        
        // Composer la matrice
        this.tempMatrix.compose(
          this.tempPosition,
          this.tempQuaternion,
          this.tempScale
        );
        
        data.mesh.setMatrixAt(i, this.tempMatrix);
        
        // Couleur du joueur
        if (data.colorAttribute) {
          const color = playerColors.get(unit.ownerId) ?? 0xffffff;
          this.tempColor.setHex(color);
          data.colorAttribute.setXYZ(i, this.tempColor.r, this.tempColor.g, this.tempColor.b);
        }
      }
      
      // Marquer pour mise à jour
      data.mesh.instanceMatrix.needsUpdate = true;
      if (data.colorAttribute) {
        data.colorAttribute.needsUpdate = true;
      }
    }
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Nettoie toutes les ressources.
   */
  dispose(): void {
    for (const [, data] of this.instances) {
      data.mesh.geometry.dispose();
      if (Array.isArray(data.mesh.material)) {
        data.mesh.material.forEach(m => m.dispose());
      } else {
        data.mesh.material.dispose();
      }
    }
    
    this.instances.clear();
    this.models.clear();
    this.scene.remove(this.group);
  }
  
  // ============================================================================
  // Accesseurs
  // ============================================================================
  
  getGroup(): THREE.Group {
    return this.group;
  }
  
  getInstanceCount(type: UnitType): number {
    return this.instances.get(type)?.unitIds.length ?? 0;
  }
  
  getTotalInstanceCount(): number {
    let total = 0;
    for (const data of this.instances.values()) {
      total += data.unitIds.length;
    }
    return total;
  }
}