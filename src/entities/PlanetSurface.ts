import * as THREE from 'three';
import type { PlanetReference } from '../types/NavigationState';
import { NoiseGenerator } from '../utils/NoiseGenerator';

/**
 * Représente la surface sphérique d'une planète avec génération procédurale
 *
 * Architecture Phase 2.3: Textures procédurales + Relief topographique
 * - ShaderMaterial GLSL pour génération GPU (performances)
 * - Heightmap via FBM (Fractional Brownian Motion, 5 octaves)
 * - Displacement mapping le long des normales (5% radius maximal)
 * - Biomes adaptatifs selon type planète (telluric/desert/ice/gas)
 * - Seed-based reproductible (même planète = mêmes patterns)
 *
 * Architecture Phase 2.2: Système LOD multi-niveaux
 * - Géométrie sphérique pure (AUCUNE projection plane autorisée)
 * - Adaptation automatique du niveau de détail selon distance caméra
 * - 4 niveaux LOD: 128×128 (haute), 64×64 (moyenne), 32×32 (basse), 16×16 (très basse)
 * - Seuils: 2×, 5×, 10×, 20× radius pour transitions invisibles
 * - Material partagé entre niveaux (optimisation mémoire)
 * - Utilisation THREE.LOD natif (gestion automatique)
 *
 * Contrainte architecturale CRITIQUE:
 * La planète DOIT rester sphérique en toutes circonstances.
 * Le displacement est appliqué le long des normales pour préserver la sphéricité.
 */
export class PlanetSurface {
    private group: THREE.Group;
    private lodGroup: THREE.LOD;
    private geometries: THREE.SphereGeometry[] = [];
    private materials: THREE.ShaderMaterial[] = [];
    private meshes: THREE.Mesh[] = [];
    private planetRef: PlanetReference;

    /**
     * Crée ShaderMaterial procédural pour surface planétaire
     * Phase 2.3: Génération textures + relief GPU
     *
     * Vertex shader: Displacement heightmap le long normales (relief topographique)
     * Fragment shader: Couleurs biomes adaptatifs selon type planète
     *
     * Justifications techniques:
     * - GPU: performances (calcul parallèle massivement)
     * - Seed: reproductibilité garantie (déterminisme)
     * - FBM 5 octaves: détails multi-échelle réalistes
     * - Displacement 5% radius: relief visible sans déformation excessive
     *
     * @param planetRef Référence planète (type, seed, radius)
     * @returns ShaderMaterial avec vertex/fragment shaders personnalisés
     */
    private createProceduralMaterial(planetRef: PlanetReference): THREE.ShaderMaterial {
        // Normaliser seed pour uniformité (0-1)
        const normalizedSeed = (planetRef.seed % 10000) / 10000.0;

        const vertexShader = `
            ${NoiseGenerator.getGLSLNoiseFunction()}

            uniform float seed;
            uniform float radius;
            uniform float displacementScale;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vHeight;
            
            void main() {
                vPosition = position;
                vNormal = normal;
                
                // Générer heightmap via FBM (5 octaves, lacunarity 2.0, gain 0.5)
                // Position normalisée pour cohérence sphérique
                vec3 noisePos = normalize(position) * seed * 10.0;
                float height = fbm(noisePos, 5, 2.0, 0.5);
                
                // Normaliser height [-1,1] -> [0,1]
                height = (height + 1.0) * 0.5;
                vHeight = height;
                
                // Appliquer displacement le long des normales (CRITÈRE SPHÉRICITÉ)
                // Préserve la forme sphérique en déplaçant radialement
                vec3 displacedPosition = position + normal * height * displacementScale;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
            }
        `;

        const fragmentShader = `
            ${NoiseGenerator.getGLSLNoiseFunction()}
            ${NoiseGenerator.getGLSLBiomeColors(planetRef.type)}

            uniform float seed;
            
            varying vec3 vPosition;
            varying vec3 vNormal;
            varying float vHeight;
            
            void main() {
                // Générer moisture map (humidité) via noise secondaire
                // Seed différent pour décorrélation height/moisture
                vec3 moisturePos = normalize(vPosition) * seed * 15.0;
                float moisture = fbm(moisturePos, 3, 2.0, 0.5);
                
                // Normaliser moisture [-1,1] -> [0,1]
                moisture = (moisture + 1.0) * 0.5;
                
                // Calculer couleur biome (adapté au type planète)
                vec3 baseColor = getBiomeColor(vHeight, moisture);
                
                // Lighting simple (diffuse Lambert)
                // Direction lumière fixe (soleil au centre système)
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                float diff = max(dot(vNormal, lightDir), 0.0);
                
                // Terme ambient (0.5) + diffuse (0.5) - Plus lumineux pour éviter le noir total
                vec3 finalColor = baseColor * (0.5 + 0.5 * diff);
                
                // Debug: si height est hors limites, afficher rouge
                if (vHeight < 0.0 || vHeight > 1.0) {
                    finalColor = vec3(1.0, 0.0, 0.0);
                }

                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        // Calculer displacement scale adapté au rayon (5% rayon = relief maximal)
        // Justification: visible en vue rapprochée, pas excessif en vue éloignée
        const displacementScale = planetRef.radius * 0.05;

        return new THREE.ShaderMaterial({
            uniforms: {
                seed: { value: normalizedSeed },
                radius: { value: planetRef.radius },
                displacementScale: { value: displacementScale },
            },
            vertexShader,
            fragmentShader,
            lights: false, // Lighting custom dans fragment shader
            side: THREE.DoubleSide, // Rendre visible même si caméra à l'intérieur (debug)
        });
    }

    /**
     * Crée une nouvelle surface planétaire avec système LOD multi-niveaux
     * Phase 2.3: Textures procédurales + relief topographique
     * Phase 2.2: 4 niveaux de détail adaptatifs
     *
     * @param planetRef Référence planète contenant radius, seed, type, position
     */
    constructor(planetRef: PlanetReference) {
        console.log('[PlanetSurface] 🏗️ Constructor START', {
            name: planetRef.name,
            radius: planetRef.radius,
            type: planetRef.type,
            seed: planetRef.seed
        });

        this.planetRef = planetRef;
        this.group = new THREE.Group();
        this.group.name = `PlanetSurface_${planetRef.name}`;
        this.group.visible = true; // Explicitement visible

        console.log('[PlanetSurface] Groupe THREE.Group créé:', {
            name: this.group.name,
            visible: this.group.visible
        });

        // Créer LOD group (gestion automatique niveau détail)
        this.lodGroup = new THREE.LOD();
        this.lodGroup.name = `Planet_${planetRef.name}_LOD`;
        this.lodGroup.visible = true;

        console.log('[PlanetSurface] LOD group créé:', {
            name: this.lodGroup.name,
            visible: this.lodGroup.visible
        });

        // Définition niveaux LOD (segments, distance_max)
        // Seuils calculés pour transitions invisibles (facteur <2× entre niveaux)
        const lodLevels: Array<{ segments: number; distance: number }> = [
            { segments: 128, distance: planetRef.radius * 2 },   // LOD 0: haute résolution (proche)
            { segments: 64, distance: planetRef.radius * 5 },    // LOD 1: moyenne (normal)
            { segments: 32, distance: planetRef.radius * 10 },   // LOD 2: basse (loin)
            { segments: 16, distance: planetRef.radius * 20 },   // LOD 3: très basse (très loin)
        ];

        // Phase 2.3: Créer ShaderMaterial procédural (remplace MeshStandardMaterial)
        console.log('[PlanetSurface] Création ShaderMaterial procédural...');
        const proceduralMaterial = this.createProceduralMaterial(planetRef);
        this.materials.push(proceduralMaterial);
        console.log('[PlanetSurface] ShaderMaterial créé avec uniforms:', {
            seed: proceduralMaterial.uniforms.seed.value,
            radius: proceduralMaterial.uniforms.radius.value,
            displacementScale: proceduralMaterial.uniforms.displacementScale.value,
            lights: proceduralMaterial.lights // Should be false
        });

        // Créer chaque niveau LOD
        console.log('[PlanetSurface] Création niveaux LOD:', lodLevels.length);
        lodLevels.forEach((level, index) => {
            const geometry = new THREE.SphereGeometry(
                planetRef.radius,
                level.segments,  // widthSegments
                level.segments   // heightSegments
            );
            this.geometries.push(geometry);

            const mesh = new THREE.Mesh(geometry, proceduralMaterial);
            mesh.name = `Planet_${planetRef.name}_LOD${index}`;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.visible = true;
            
            // DEBUG: Ensure frustum culling doesn't hide it prematurely
            mesh.frustumCulled = false;

            this.meshes.push(mesh);

            console.log(`[PlanetSurface] LOD${index} créé:`, {
                name: mesh.name,
                segments: level.segments,
                distance: level.distance,
                vertices: geometry.attributes.position.count,
                visible: mesh.visible,
                material: mesh.material.type,
                scale: mesh.scale
            });

            // Ajouter au LOD group avec distance seuil
            // THREE.LOD sélectionne automatiquement le mesh selon distance caméra
            this.lodGroup.addLevel(mesh, level.distance);
        });

        this.group.add(this.lodGroup);
        console.log('[PlanetSurface] LOD group ajouté au groupe principal');

        console.log(
            `[PlanetSurface] ✅ Created ${planetRef.name} with procedural textures (Phase 2.3):`,
            {
                type: planetRef.type,
                radius: planetRef.radius,
                seed: planetRef.seed,
                displacementScale: (planetRef.radius * 0.05).toFixed(2),
                lodLevels: lodLevels.length,
                groupChildren: this.group.children.length,
                lodGroupLevels: this.lodGroup.levels.length,
                lod0: `${lodLevels[0].segments}×${lodLevels[0].segments} (< ${lodLevels[0].distance.toFixed(1)} units)`,
                lod1: `${lodLevels[1].segments}×${lodLevels[1].segments} (< ${lodLevels[1].distance.toFixed(1)} units)`,
                lod2: `${lodLevels[2].segments}×${lodLevels[2].segments} (< ${lodLevels[2].distance.toFixed(1)} units)`,
                lod3: `${lodLevels[3].segments}×${lodLevels[3].segments} (< ${lodLevels[3].distance.toFixed(1)} units)`,
            }
        );
        
        console.log('[PlanetSurface] 🏗️ Constructor END');
    }

    /**
     * Expose le groupe Three.js pour ajout à la scène
     * Pattern standard du projet (voir tasks.md)
     */
    public getGroup(): THREE.Group {
        return this.group;
    }

    /**
     * Retourne référence planète (métadonnées)
     * Utile pour UI et debug
     */
    public getPlanetReference(): PlanetReference {
        return this.planetRef;
    }

    /**
     * Update appelé chaque frame
     * Phase 2.2: Rotation simple pour visualisation
     * Phase 2.3+: Animation atmosphère, nuages, océans
     *
     * Note: updateLOD() doit être appelé séparément avec position caméra
     *
     * @param deltaTime Temps écoulé depuis dernière frame (secondes)
     */
    public update(deltaTime: number): void {
        // Rotation lente pour visualisation (0.1 rad/s ≈ 5.7°/s)
        // Vitesse choisie pour montrer clairement la géométrie sphérique
        this.group.rotation.y += deltaTime * 0.1;
    }

    /**
     * Met à jour le LOD selon la position de la caméra
     * Doit être appelé dans la boucle principale (SceneManager.animate)
     * THREE.LOD calcule automatiquement la distance et sélectionne le mesh approprié
     *
     * @param cameraPosition Position actuelle de la caméra (coordonnées monde)
     */
    public updateLOD(camera: THREE.Camera): void {
        // THREE.LOD.update attend une Camera (pas une position).
        this.lodGroup.update(camera);
        
        // DEBUG: Log LOD level changes (optionnel, peut être verbeux)
        // const currentLevel = this.lodGroup.getCurrentLevel();
        // console.log(`[PlanetSurface] LOD Level: ${currentLevel}`);
    }

    /**
     * Retourne le niveau LOD actuellement actif (debug)
     * Utile pour monitoring performances et validation transitions
     *
     * @returns Index LOD actif (0-3) ou -1 si aucun mesh actif
     */
    public getCurrentLODLevel(): number {
        // THREE.LOD.getCurrentLevel() retourne un index de niveau (number) dans Three.js.
        return this.lodGroup.getCurrentLevel();
    }

    /**
     * Libération mémoire (pattern Dispose obligatoire)
     * Phase 2.2: Dispose tous les niveaux LOD (géométries + materials + meshes)
     * Voir tasks.md: "Ajouter Nouvelle Entité Three.js avec Dispose"
     */
    public dispose(): void {
        // Dispose toutes les géométries (une par niveau LOD)
        this.geometries.forEach(geo => geo.dispose());
        this.geometries = [];

        // Dispose tous les materials (partagé mais sécurisé)
        this.materials.forEach(mat => mat.dispose());
        this.materials = [];

        // Clear références meshes
        this.meshes = [];

        // Clear groupes Three.js
        this.lodGroup.clear();
        this.group.clear();

        console.log(`[PlanetSurface] Disposed ${this.planetRef.name} (LOD system cleaned)`);
    }
}