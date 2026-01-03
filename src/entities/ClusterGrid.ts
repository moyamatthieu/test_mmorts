import * as THREE from 'three';
import { GRID_CONFIG, DEBUG_CONFIG } from '../config';
import { SelectionRing } from './SelectionRing';
import { SystemReference } from '../types/NavigationState';

/**
 * Métadonnées associées à chaque soleil pour la sélection individuelle.
 */
export interface SunMetadata {
    id: string; // Identifiant unique du soleil
    name: string; // Nom généré automatiquement
    globalCoords: { gx: number; gz: number }; // Coordonnées du cluster parent
    localPosition: { x: number; y: number; z: number }; // Position relative dans le cluster
    absolutePosition: { x: number; y: number; z: number }; // Position absolue
    radius: number; // Taille du soleil
    mass: number; // Masse calculée (proportionnelle au rayon)
    temperature: number; // Température simulée
    color: number; // Couleur du matériau
    createdAt: number; // Timestamp de création
    clusterId: string; // ID du cluster parent
    optimalDistance: number; // Distance optimale de zoom
}

/**
 * Gère la création et l'affichage d'une grille de clusters d'étoiles (cubes filaires).
 *
 * Terminologie :
 * - Chaque cube représente un "cluster d'étoiles".
 * - L'ensemble de la grille (tous les clusters) forme la galaxie.
 */
export class ClusterGrid {
    private group: THREE.Group;
    private labelsGroup: THREE.Group;
    private clusterSize: number;
    private spacing: number;
    private readonly MAX_LABEL_DISTANCE = 50;
    private hoveredCubeName: string | null = null;
    private selectedCubeName: string | null = null;
    private selectedSun: THREE.Mesh | null = null;
    private selectionRing: SelectionRing | null = null;
    private pickMeshes: THREE.Mesh[] = [];
    private pickGroup: THREE.Group;
    private suns: THREE.Mesh[] = []; // Array pour stocker les soleils
    private sunMetadata: Map<string, SunMetadata> = new Map(); // Métadonnées des soleils
     
    // Constantes de couleurs
    private readonly DEFAULT_COLOR = 0xffffff;
    private readonly SELECT_COLOR = 0x0066ff;
    private readonly HOVER_COLOR = 0xff9900;

    /**
     * @param spacing Espacement entre les centres des cubes.
     */
    constructor(spacing: number = 1.0) {
        this.group = new THREE.Group();
        this.labelsGroup = new THREE.Group();
        this.group.add(this.labelsGroup);
        this.pickGroup = new THREE.Group();
         
        this.clusterSize = GRID_CONFIG.cubesX; // Utilise la config
        this.spacing = spacing;
         
        const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
        const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff });
        console.log('[ClusterGrid] Matériau de base créé:', { transparent: material.transparent, depthWrite: material.depthWrite, depthTest: material.depthTest });

        // Génération du cluster central (0:0) par défaut
        // Chaque cube reçoit un identifiant global unique au format C[gx:gz]
        for (let lx = 0; lx < this.clusterSize; lx++) {
            for (let lz = 0; lz < this.clusterSize; lz++) {
                // Créer un matériau unique pour chaque cube pour permettre le changement de couleur indépendant
                const individualMaterial = new THREE.LineBasicMaterial({ 
                    color: this.DEFAULT_COLOR,
                    transparent: true,
                    opacity: 0.3, // Opacité réduite par défaut pour effet de focus
                    depthWrite: false, // IMPORTANT: Évite les conflits de tri de profondeur
                    depthTest: true
                });
                const cubeEdges = new THREE.LineSegments(edgesGeometry, individualMaterial);
                console.log(`[ClusterGrid] Matériau individu cube ${cubeEdges.name}:`, { 
                    transparent: individualMaterial.transparent, 
                    depthWrite: individualMaterial.depthWrite, 
                    depthTest: individualMaterial.depthTest, 
                    opacity: individualMaterial.opacity
                });
                const pos = this.getPosFromCoords(0, 0, lx, lz);
                cubeEdges.position.copy(pos);
                const gx = 0 * this.clusterSize + lx;
                const gz = 0 * this.clusterSize + lz;
                cubeEdges.name = `C[${gx}:${gz}]`;
                console.log(`[ClusterGrid] Cube ${cubeEdges.name} créé à la position:`, pos);
                this.group.add(cubeEdges);

                // Création d'un mesh pour le raycasting précis
                // Ce mesh permet une détection exacte des faces (contrairement aux LineSegments)
                const pickMat = new THREE.MeshBasicMaterial({ 
                    visible: DEBUG_CONFIG.showPickMeshes,
                    color: 0xff00ff, // Magenta en mode debug
                    transparent: true,
                    opacity: 0.3,
                    side: THREE.DoubleSide // Détection des deux côtés pour plus de fiabilité
                });
                const pickMesh = new THREE.Mesh(boxGeometry, pickMat);
                pickMesh.position.copy(pos);
                pickMesh.name = cubeEdges.name;
                this.pickMeshes.push(pickMesh);
                this.pickGroup.add(pickMesh);

                // Générer des soleils pour ce cluster
                const sunCount = this.getSunsCountForCluster(gx, gz);
                this.generateSuns(gx, gz, sunCount);
            }
        }

        // note: pickGroup n'est pas ajouté à la scène visuelle ; SceneManager effectuera le raycast sur pickMeshes via getPickObjects()
    }

    /** Retourne les objets invisibles à utiliser pour le raycast de précision */
    public getPickObjects(): THREE.Object3D[] {
        return this.pickMeshes;
    }

    /** Retourne le groupe contenant les pick meshes (pour l'ajouter à la scène) */
    public getPickGroup(): THREE.Group {
        return this.pickGroup;
    }

    /** Retourne les soleils pour le raycasting */
    public getSuns(): THREE.Mesh[] {
        return this.suns;
    }

    /**
     * Retourne les métadonnées d'un soleil à partir de son mesh.
     */
    public getSunMetadataFromMesh(sunMesh: THREE.Mesh): SunMetadata | null {
        const sunId = sunMesh.name;
        return this.sunMetadata.get(sunId) || null;
    }

    /**
     * Retourne la distance optimale de zoom pour un soleil donné.
     */
    public getOptimalZoomDistance(sunMesh: THREE.Mesh): number {
        const metadata = this.getSunMetadataFromMesh(sunMesh);
        if (!metadata) return 2; // Distance par défaut
         
        // Distance proportionnelle à la taille et à la masse du soleil
        const baseDistance = 2;
        const sizeMultiplier = Math.max(0.5, Math.min(3, metadata.radius * 200));
        const massMultiplier = Math.max(0.8, Math.min(2, Math.log10(metadata.mass + 1)));
         
        return baseDistance * sizeMultiplier * massMultiplier;
    }

    /**
     * Retourne le mesh d'un soleil par son ID.
     * @param sunId ID du soleil (format: "SUN_...")
     * @returns Mesh du soleil ou null si non trouvé
     */
    public getSunMeshById(sunId: string): THREE.Mesh | null {
        return this.suns.find(s => s.name === sunId) || null;
    }

    /**
     * Construit une SystemReference complète et validée pour un soleil donné.
     * Centralise la logique de construction pour garantir cohérence et validation.
     *
     * @param sunId ID du soleil (format: "SUN_...")
     * @returns SystemReference complète ou null si le soleil n'existe pas
     */
    public getSystemReference(sunId: string): SystemReference | null {
        const metadata = this.sunMetadata.get(sunId);
        const sunMesh = this.getSunMeshById(sunId);
        
        if (!metadata || !sunMesh) {
            console.warn(`[ClusterGrid] Impossible de construire SystemReference: sunId="${sunId}", metadata=${!!metadata}, mesh=${!!sunMesh}`);
            return null;
        }
        
        // Note: Les soleils sont directement cliquables (géométrie raycastable)
        // Pas besoin de pickMesh séparé, on réutilise sunMesh
        return {
            metadata,
            sunMesh,
            pickMesh: sunMesh
        };
    }

    /**
     * Convertit des coordonnées de cluster et locales en position 3D World.
     * Formule : WorldX = (CX * S + LX - (S / 2 - 0.5)) * G
     */
    public getPosFromCoords(cx: number, cz: number, lx: number, lz: number): THREE.Vector3 {
        const x = (cx * this.clusterSize + lx - (this.clusterSize / 2 - 0.5)) * this.spacing;
        const z = (cz * this.clusterSize + lz - (this.clusterSize / 2 - 0.5)) * this.spacing;
        return new THREE.Vector3(x, 0, z);
    }

    /**
     * Retourne le centre d'un cluster (cube) à partir de ses coordonnées globales.
     * Utilisé pour le centrage de la caméra sur double-clic.
     */
    public getClusterCenter(gx: number, gz: number): THREE.Vector3 | null {
        // Les coordonnées globales sont directement les coordonnées locales dans le cluster central (cx=0, cz=0)
        return this.getPosFromCoords(0, 0, gx, gz);
    }

    /**
     * Retourne les dimensions totales de la grille de cubes.
     */
    public getTotalDimensions(): { width: number; height: number; depth: number } {
        // Pour l'instant, on considère un seul cluster central
        const totalWidth = (this.clusterSize - 1) * this.spacing;
        const totalHeight = 1; // Hauteur des cubes
        const totalDepth = (this.clusterSize - 1) * this.spacing;

        return {
            width: totalWidth,
            height: totalHeight,
            depth: totalDepth
        };
    }

    /**
     * Convertit une position 3D World en identifiant de coordonnées string.
     * Format : C[CX:CZ]-L[LX]-C[LZ]
     */
    public getIdFromPos(pos: THREE.Vector3): string {
        const coords = this.getCoordsFromPos(pos);
        return `C[${coords.cx}:${coords.cz}]-L[${coords.lx}]-C[${coords.lz}]`;
    }

    /**
     * Extrait les coordonnées de cluster et locales à partir d'une position 3D World.
     */
    public getCoordsFromPos(pos: THREE.Vector3) {
        const s = this.clusterSize;
        const g = this.spacing; 

        const totalX = Math.floor(pos.x / g + (s / 2));
        const totalZ = Math.floor(pos.z / g + (s / 2));

        const cx = Math.floor(totalX / s);
        const cz = Math.floor(totalZ / s);

        // Gestion du modulo pour les nombres négatifs en JS
        const lx = ((totalX % s) + s) % s;
        const lz = ((totalZ % s) + s) % s;

        return { cx, cz, lx, lz };
    }

    /**
     * Retourne l'identifiant du cube (qui est maintenant l'identifiant global).
     * Chaque cube ayant son propre identifiant unique, cette méthode retourne simplement le nom.
     */
    public getClusterIdFromName(name: string): string | null {
        return name;
    }

    /**
     * Retourne les coordonnées globales à partir du nom d'un cube (ex: "C[5:3]" -> {gx: 5, gz: 3}).
     */
    public getGlobalCoordsFromName(name: string): { gx: number; gz: number } | null {
        if (!name) return null;
        // Rechercher des nombres dans C[...] 
        const match = name.match(/^C\[(\-?\d+):(\-?\d+)\]$/);
        if (!match) return null;
        const gx = parseInt(match[1], 10);
        const gz = parseInt(match[2], 10);
        if (Number.isNaN(gx) || Number.isNaN(gz)) return null;
        return { gx, gz };
    }

    /**
     * Sélectionne un soleil par son mesh et affiche ses métadonnées.
     */
    public selectSun(sun: THREE.Mesh | null): void {
        if (this.selectedSun === sun) return;

        // Supprimer l'ancien anneau de sélection
        if (this.selectionRing) {
            this.group.remove(this.selectionRing.getMesh());
            this.selectionRing = null;
        }

        this.selectedSun = sun;

        if (sun) {
            const metadata = this.getSunMetadataFromMesh(sun);
             
            // Utilisation de la classe SelectionRing avec les paramètres standardisés
            const sunRadius = metadata?.radius || 0.01;
            this.selectionRing = new SelectionRing(sunRadius * 1.30, 0.05, metadata?.color || 0x00ff00, 0.8);
            
            // Positionnement précis au centre du soleil avec alignement vertical parfait
            this.selectionRing.setPosition(sun.position);
            this.group.add(this.selectionRing.getMesh());
             
            // Log des informations du soleil sélectionné
            if (metadata) {
                console.log(`⭐ Soleil sélectionné:`, {
                    nom: metadata.name,
                    id: metadata.id,
                    position: metadata.absolutePosition,
                    taille: `${(metadata.radius * 1000).toFixed(2)}km`,
                    masse: metadata.mass.toFixed(2),
                    temperature: Math.round(metadata.temperature) + 'K',
                    cluster: metadata.clusterId
                });
            }
        }
    }

    /**
     * Met à jour l'animation de l'anneau de sélection.
     */
    public updateSelectionRing(dt: number): void {
        if (this.selectionRing) {
            this.selectionRing.updateRotation(dt);
        }
    }

    /**
     * Retourne les métadonnées d'un soleil par son ID.
     */
    public getSunMetadata(sunId: string): SunMetadata | null {
        return this.sunMetadata.get(sunId) || null;
    }

    /**
     * Retourne toutes les métadonnées des soleils.
     */
    public getAllSunMetadata(): SunMetadata[] {
        return Array.from(this.sunMetadata.values());
    }

    /**
     * Génère un nom automatique et descriptif pour un soleil.
     */
    private generateSunName(gx: number, gz: number, index: number): string {
        const sectorNames = [
            'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta',
            'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu'
        ];
        const clusterNames = [
            'Orion', 'Lyra', 'Cygnus', 'Andromeda', 'Pegasus', 'Aquila',
            'Vulpecula', 'Lacerta', 'Scutum', 'Sagitta', 'Delphinus', 'Equuleus'
        ]; 

        const sector = sectorNames[(gx + 50) % sectorNames.length];
        const cluster = clusterNames[(gz + 50) % clusterNames.length];
        const designation = String.fromCharCode(65 + (index % 26)); // A, B, C...
         
        return `${sector}-${cluster}-${designation}`;
    }
    public selectCubeByName(cubeName: string | null): void {
        if (this.selectedCubeName === cubeName) return;
        this.selectedCubeName = cubeName; 

        this.group.children.forEach(child => {
            if (!(child instanceof THREE.LineSegments)) return;
            const name = child.name || '';
            const mat = child.material as THREE.LineBasicMaterial;

            if (cubeName && name === cubeName) {
                // Cube sélectionné : couleur bleue + opacité maximale
                mat.color.setHex(this.SELECT_COLOR);
                mat.opacity = 1.0;
            } else {
                const isHovered = this.hoveredCubeName ? name === this.hoveredCubeName : false;
                mat.color.setHex(isHovered ? this.HOVER_COLOR : this.DEFAULT_COLOR);
                // Cubes non-actifs : opacité réduite pour effet de focus
                mat.opacity = isHovered ? 1.0 : 0.3;
            }
        });
    }

    /**
     * Met à jour le survol d'un cube par son nom (identifiant global unique).
     * Utilise l'opacité pour créer un effet de focus professionnel.
     * Le cube survolé passe en HOVER_COLOR, sauf s'il est sélectionné (priorité à SELECT_COLOR).
     */
    public setHoverCubeByName(cubeName: string | null): void {
        if (this.hoveredCubeName === cubeName) return;
        this.hoveredCubeName = cubeName; 

        this.group.children.forEach(child => {
            if (!(child instanceof THREE.LineSegments)) return;
            const name = child.name || '';
            const mat = child.material as THREE.LineBasicMaterial;

            // La sélection a priorité sur le hover
            const isSelected = this.selectedCubeName === name;
            if (isSelected) {
                mat.color.setHex(this.SELECT_COLOR);
                mat.opacity = 1.0;
                return;
            }

            // Appliquer la couleur et l'opacité de hover ou par défaut
            if (cubeName && name === cubeName) {
                mat.color.setHex(this.HOVER_COLOR);
                mat.opacity = 1.0; // Hover : opacité maximale
            } else {
                mat.color.setHex(this.DEFAULT_COLOR);
                mat.opacity = 0.3; // Autres : opacité réduite
            }
        });
    }

    /**
     * Met à jour la visibilité et l'opacité des labels en fonction de la distance à la caméra.
     */
    public update(dt: number, cameraPosition?: THREE.Vector3): void {
        this.updateSelectionRing(dt);
        if (!cameraPosition) return;
        this.labelsGroup.children.forEach(child => {
            if (child instanceof THREE.Sprite) {
                const distance = child.position.distanceTo(cameraPosition);

                if (distance > this.MAX_LABEL_DISTANCE) {
                    child.visible = false;
                } else {
                    child.visible = true;
                    // Atténuation linéaire de l'opacité
                    const opacity = 1 - (distance / this.MAX_LABEL_DISTANCE);
                    child.material.opacity = Math.max(0, opacity);
                }
            }
        });
    }

    /**
     * Détermine le nombre de soleils à générer pour un cluster donné.
     * @param gx Coordonnée globale X du cluster
     * @param gz Coordonnée globale Z du cluster
     * @returns Nombre de soleils à générer (entre 5 et 20)
     */
    private getSunsCountForCluster(gx: number, gz: number): number {
        // gx/gz non utilisés pour l'instant (distribution uniforme), mais gardés pour
        // permettre une variation seed-based future par cluster sans changer l'API interne.
        void gx;
        void gz;
        // Variation aléatoire entre 5 et 20 soleils par cluster
        return Math.floor(Math.random() * 16) + 5;
    }

    /**
     * Génère des soleils de manière procédurale dans un cluster donné (un cube spécifique).
     * @param gx Coordonnée globale X du cube
     * @param gz Coordonnée globale Z du cube
     * @param count Nombre de soleils à générer
     */
    private generateSuns(gx: number, gz: number, count: number): void {
        // Calculer la position centrale du cube
        const cubePos = this.getPosFromCoords(0, 0, gx, gz); // cx=0, cz=0 puisque un seul cluster pour l'instant

        // Limites du cube : autour de sa position, ± spacing/2
        const halfSpacing = this.spacing / 2;
        const minX = cubePos.x - halfSpacing;
        const maxX = cubePos.x + halfSpacing;
        const minZ = cubePos.z - halfSpacing;
        const maxZ = cubePos.z + halfSpacing;

        // Variations de couleur pour plus de réalisme
        const colorVariations = [
            0xffff00, // Jaune standard
            0xffd700, // Or
            0xffa500, // Orange
            0xffc0cb, // Rose
            0xffffff  // Blanc
        ];

        for (let i = 0; i < count; i++) {
            // Taille aléatoire pour chaque soleil (rayon entre 0.005 et 0.02)
            const radius = 0.005 + Math.random() * 0.015;
            const sunGeometry = new THREE.SphereGeometry(radius, 8, 8);
            const colorIndex = Math.floor(Math.random() * colorVariations.length);
            const sunMaterial = new THREE.MeshBasicMaterial({
                color: colorVariations[colorIndex]
            });
             
            const sun = new THREE.Mesh(sunGeometry, sunMaterial);
             
            // Position aléatoire dans les limites du cube (distribution 3D uniforme)
            const absoluteX = minX + Math.random() * (maxX - minX);
            const absoluteY = (Math.random() - 0.5) * this.spacing;
            const absoluteZ = minZ + Math.random() * (maxZ - minZ); 
             
            sun.position.set(absoluteX, absoluteY, absoluteZ);
             
            // Génération des métadonnées
            const sunId = `SUN_${gx}_${gz}_${i}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const sunName = this.generateSunName(gx, gz, i);
            const mass = Math.pow(radius * 100, 3); // Masse proportionnelle au cube du rayon
            const temperature = 3000 + Math.random() * 5000; // Température entre 3000K et 8000K
             
            const metadata: SunMetadata = {
                id: sunId,
                name: sunName,
                globalCoords: { gx, gz },
                localPosition: {
                    x: sun.position.x - cubePos.x,
                    y: sun.position.y,
                    z: sun.position.z - cubePos.z
                },
                absolutePosition: {
                    x: absoluteX,
                    y: absoluteY,
                    z: absoluteZ
                },
                radius: radius,
                mass: mass,
                temperature: temperature,
                color: colorVariations[colorIndex],
                createdAt: Date.now(),
                clusterId: `C[${gx}:${gz}]`,
                optimalDistance: 2 // Valeur par défaut, sera affinée si besoin
            }; 
             
            // Calculer la distance optimale réelle
            metadata.optimalDistance = this.getOptimalZoomDistance(sun);
            
            sun.name = sunId; // Stocker l'ID dans le mesh
            sun.userData = { metadata }; // Associer les métadonnées au mesh
             
            this.suns.push(sun);
            this.sunMetadata.set(sunId, metadata);
            this.group.add(sun); 
             
            // Log de validation pour vérifier la distribution 3D et les métadonnées
            console.log(`[ClusterGrid] Soleil généré:`, {
                id: sunId,
                name: sunName,
                position: {
                    x: absoluteX.toFixed(3),
                    y: absoluteY.toFixed(3),  // Vérifier la variation Y
                    z: absoluteZ.toFixed(3)
                },
                radius: radius.toFixed(4),
                mass: mass.toFixed(2),
                temperature: Math.round(temperature) + 'K',
                clusterId: metadata.clusterId
            });
        }
    }

    /**
     * Retourne le groupe contenant la grille de cubes.
     */
    public getMesh(): THREE.Group {
        return this.group;
    }
}
