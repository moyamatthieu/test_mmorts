import * as THREE from 'three';
import { SunMetadata } from './ClusterGrid';
import { SelectionRing } from './SelectionRing';

/**
 * Crée un grand repère 3D (axes X, Y, Z) pour visualiser l'origine du système de coordonnées.
 * Utile pour le debug et la compréhension de l'espace 3D.
 *
 * @param size - Taille des axes (longueur de chaque axe)
 * @returns THREE.Group contenant les 3 axes colorés (X=rouge, Y=vert, Z=bleu)
 */
function createOriginHelper(size: number = 1): THREE.Group {
    const axesGroup = new THREE.Group();
    axesGroup.name = 'OriginHelper';

    // Axe X (rouge) - pointe vers la droite
    const xGeometry = new THREE.CylinderGeometry(size * 0.02, size * 0.02, size, 8);
    const xMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const xAxis = new THREE.Mesh(xGeometry, xMaterial);
    xAxis.rotation.z = -Math.PI / 2; // Rotation pour pointer vers X+
    xAxis.position.x = size / 2;
    axesGroup.add(xAxis);

    // Cône X
    const xConeGeometry = new THREE.ConeGeometry(size * 0.05, size * 0.15, 8);
    const xCone = new THREE.Mesh(xConeGeometry, xMaterial);
    xCone.rotation.z = -Math.PI / 2;
    xCone.position.x = size;
    axesGroup.add(xCone);

    // Axe Y (vert) - pointe vers le haut
    const yGeometry = new THREE.CylinderGeometry(size * 0.02, size * 0.02, size, 8);
    const yMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const yAxis = new THREE.Mesh(yGeometry, yMaterial);
    yAxis.position.y = size / 2;
    axesGroup.add(yAxis);

    // Cône Y
    const yConeGeometry = new THREE.ConeGeometry(size * 0.05, size * 0.15, 8);
    const yCone = new THREE.Mesh(yConeGeometry, yMaterial);
    yCone.position.y = size;
    axesGroup.add(yCone);

    // Axe Z (bleu) - pointe vers l'avant
    const zGeometry = new THREE.CylinderGeometry(size * 0.02, size * 0.02, size, 8);
    const zMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const zAxis = new THREE.Mesh(zGeometry, zMaterial);
    zAxis.rotation.x = Math.PI / 2; // Rotation pour pointer vers Z+
    zAxis.position.z = size / 2;
    axesGroup.add(zAxis);

    // Cône Z
    const zConeGeometry = new THREE.ConeGeometry(size * 0.05, size * 0.15, 8);
    const zCone = new THREE.Mesh(zConeGeometry, zMaterial);
    zCone.rotation.x = Math.PI / 2;
    zCone.position.z = size;
    axesGroup.add(zCone);

    // Sphère centrale (origine)
    const centerGeometry = new THREE.SphereGeometry(size * 0.05, 16, 16);
    const centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    axesGroup.add(centerSphere);

    return axesGroup;
}

export interface Planet {
    id: string;
    distance: number; // Distance from sun
    radius: number;   // Size of the planet
    speed: number;    // Orbital speed
    angle: number;    // Current angle in orbit
    color: number;
    mesh: THREE.Mesh;
    orbitLine: THREE.Line;
    /** Seed pour génération procédurale reproductible de la surface */
    seed: number;
    /** Type de planète (détermine biomes et apparence) */
    type: 'telluric' | 'gas' | 'ice' | 'desert';
}

export class SolarSystem {
    private group: THREE.Group;
    private sunMetadata: SunMetadata;
    private planets: Planet[] = [];
    private sunMesh: THREE.Mesh;
    private selectionRing: SelectionRing | null = null;
    private selectedPlanetRing: SelectionRing | null = null;
    private currentSelectedPlanetId: string | null = null;
    public optimalDistance: number;

    constructor(config: SunMetadata | number) {
        if (typeof config === 'number') {
            this.sunMetadata = this.generateFakeMetadata(config);
        } else {
            this.sunMetadata = config;
        }

        this.optimalDistance = this.sunMetadata.optimalDistance || 2;

        this.group = new THREE.Group();
         
        // Create central sun visual
        const sunGeometry = new THREE.SphereGeometry(this.sunMetadata.radius * 10, 32, 32); // Scaled up for system view
        const sunMaterial = new THREE.MeshBasicMaterial({ color: this.sunMetadata.color });
        this.sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
        this.group.add(this.sunMesh);

        // Add a light source at the center
        const sunLight = new THREE.PointLight(this.sunMetadata.color, 1.5, 100);
        this.group.add(sunLight);

        // DEBUG: Ajouter un grand repère 3D à l'origine (0,0,0) du système solaire
        // Taille = 0.5 unités (visible par rapport aux planètes qui orbitent à partir de 0.5)
        const originHelper = createOriginHelper(0.5);
        this.group.add(originHelper);
        console.log('[SolarSystem] Repère 3D ajouté à l\'origine (0,0,0)');

        this.generatePlanets();
    }

    private generateFakeMetadata(id: number): SunMetadata {
        // Seeded random based on ID
        const seed = id;
        const random = () => {
            const x = Math.sin(id++) * 10000;
            return x - Math.floor(x);
        };

        const radius = 0.005 + random() * 0.015;
        const colorVariations = [0xffff00, 0xffd700, 0xffa500, 0xffc0cb, 0xffffff];
        const color = colorVariations[Math.floor(random() * colorVariations.length)];

        return {
            id: `SYSTEM_${seed}`,
            name: `System ${seed}`,
            globalCoords: { gx: 0, gz: 0 },
            localPosition: { x: 0, y: 0, z: 0 },
            absolutePosition: { x: 0, y: 0, z: 0 },
            radius: radius,
            mass: Math.pow(radius * 100, 3),
            temperature: 3000 + random() * 5000,
            color: color,
            createdAt: Date.now(),
            clusterId: 'Generated',
            optimalDistance: 2
        };
    }

    private seededRandom(seed: number): number {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    private generatePlanets() {
        // Use sun ID to seed the generation
        let seed = this.stringToSeed(this.sunMetadata.id);
         
        const numPlanets = Math.floor(this.seededRandom(seed++) * 8) + 2; // 2 to 9 planets

        for (let i = 0; i < numPlanets; i++) {
            const distance = 0.5 + (i * 0.3) + (this.seededRandom(seed++) * 0.2);
            const radius = 0.02 + (this.seededRandom(seed++) * 0.05);
            const speed = 0.05 / distance; // Vitesse réduite (divisée par 4) pour orbites plus réalistes
            const startAngle = this.seededRandom(seed++) * Math.PI * 2;
            const color = Math.floor(this.seededRandom(seed++) * 0xffffff);
            
            // Seed unique pour cette planète (reproductible)
            const planetSeed = this.stringToSeed(`${this.sunMetadata.id}_PLANET_${i}`);
            
            // Type de planète basé sur la distance au soleil (procédural mais logique)
            // Proche = telluric/desert, Milieu = telluric, Loin = ice/gas
            const planetType = this.determinePlanetType(distance, this.seededRandom(seed++));

            // Planet Mesh
            const geometry = new THREE.SphereGeometry(radius, 16, 16);
            const material = new THREE.MeshStandardMaterial({ 
                color: color,
                roughness: 0.7,
                metalness: 0.1
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.userData.planetId = `PLANET_${i}`; // Ajout de l'ID pour le raycasting
             
            // Orbit Line
            const orbitCurve = new THREE.EllipseCurve(
                0, 0,            // ax, aY
                distance, distance, // xRadius, yRadius
                0, 2 * Math.PI,  // aStartAngle, aEndAngle
                false,            // aClockwise
                0                 // aRotation
            );
             
            const points = orbitCurve.getPoints(64);
            const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
            const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
            orbitLine.rotation.x = -Math.PI / 2; // Lay flat on XZ plane

            this.group.add(orbitLine);
            this.group.add(mesh);

            this.planets.push({
                id: `PLANET_${i}`,
                distance,
                radius,
                speed,
                angle: startAngle,
                color,
                mesh,
                orbitLine,
                seed: planetSeed,
                type: planetType
            });
        }
    }

    /**
     * Détermine le type de planète basé sur la distance au soleil.
     * Logique réaliste : proche = chaud (desert/telluric), loin = froid (ice/gas)
     */
    private determinePlanetType(distance: number, random: number): 'telluric' | 'gas' | 'ice' | 'desert' {
        if (distance < 0.6) {
            // Zone chaude : desert ou telluric
            return random < 0.6 ? 'desert' : 'telluric';
        } else if (distance < 1.2) {
            // Zone habitable : telluric principalement
            return random < 0.8 ? 'telluric' : 'desert';
        } else if (distance < 2.0) {
            // Zone froide : ice ou gas
            return random < 0.5 ? 'ice' : 'gas';
        } else {
            // Zone très froide : gas géantes ou ice
            return random < 0.7 ? 'gas' : 'ice';
        }
    }

    private stringToSeed(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    public update(dt: number) {
        this.planets.forEach(planet => {
            planet.angle += planet.speed * dt;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
        });

        // Animation de l'anneau de sélection du soleil s'il existe
        if (this.selectionRing) {
            this.selectionRing.updateRotation(dt);
        }

        // Mettre à jour la position de l'anneau de sélection si une planète est sélectionnée
        if (this.selectedPlanetRing && this.selectedPlanetRing.getMesh().visible) {
            const selectedPlanet = this.planets.find(p => {
                const ringPos = this.selectedPlanetRing!.getMesh().position;
                return Math.abs(p.mesh.position.x - ringPos.x) < 0.01 &&
                       Math.abs(p.mesh.position.z - ringPos.z) < 0.01;
            });
            if (selectedPlanet) {
                const pos = selectedPlanet.mesh.position;
                this.selectedPlanetRing.getMesh().position.set(pos.x, pos.y, pos.z);
            }
        }
    }

    public selectSun(selected: boolean): void {
        console.log("selectSun called with selected:", selected);
        if (selected) {
            if (!this.selectionRing) {
                const sunRadius = this.sunMetadata.radius * 10;
                console.log(`[SolarSystem DEBUG] Création anneau soleil:`);
                console.log(`  - Sun metadata radius: ${this.sunMetadata.radius}`);
                console.log(`  - Sun scaled radius: ${sunRadius}`);
                console.log(`  - Ring innerRadius: ${sunRadius * 1.30}`);
                console.log(`  - Paramètres corrects passés: innerRadius=${sunRadius * 1.30}, thickness=0.05, color=0xffffff`);
                // Utilisation de la classe SelectionRing avec les paramètres standardisés
                this.selectionRing = new SelectionRing(sunRadius * 1.30, 0.05, 0xffffff, 1.0);
                
                // Positionnement précis au centre du soleil avec alignement vertical parfait
                this.selectionRing.setPosition(this.sunMesh.position);
                this.group.add(this.selectionRing.getMesh());
            }
        } else {
            if (this.selectionRing) {
                this.group.remove(this.selectionRing.getMesh());
                this.selectionRing.dispose();
                this.selectionRing = null;
            }
        }
    }

    public getGroup(): THREE.Group {
        return this.group;
    }

    /**
     * Alias pour getGroup() - Cohérence avec les autres entités
     */
    public getMesh(): THREE.Group {
        return this.group;
    }

    public getMetadata(): SunMetadata {
        return this.sunMetadata;
    }

    public getSunMesh(): THREE.Mesh {
        return this.sunMesh;
    }

    /**
     * Retourne le tableau des planètes du système (lecture seule).
     * Utilisé pour le raycasting et l'identification.
     */
    public getPlanets(): readonly Planet[] {
        return this.planets;
    }

    /**
     * Retourne la distance orbitale maximale (planète la plus éloignée du soleil).
     */
    public getMaxOrbitDistance(): number {
        if (this.planets.length === 0) return 1;
        return Math.max(...this.planets.map(p => p.distance));
    }

    /**
     * Calcule la distance de vue optimale pour voir tout le système solaire.
     * La caméra doit être assez loin pour que l'orbite max soit visible avec une marge.
     * 
     * @param marginFactor Facteur de marge (1.5 = 50% de marge autour de l'orbite max)
     * @returns Distance optimale de la caméra au soleil
     */
    public getViewDistance(marginFactor: number = 1.8): number {
        const maxOrbit = this.getMaxOrbitDistance();
        // Distance = orbite max * marge pour bien voir toutes les planètes
        return maxOrbit * marginFactor;
    }

    /**
     * Sélectionne/désélectionne une planète avec anneau visuel.
     * @param planetId - ID de la planète à sélectionner
     * @param selected - true pour sélectionner, false pour désélectionner
     */
    public selectPlanet(planetId: string, selected: boolean): void {
        const planet = this.planets.find((p) => p.id === planetId);
        if (!planet) return;

        // Mémoriser l'ID de la planète sélectionnée
        this.currentSelectedPlanetId = selected ? planetId : null;

        if (selected && !this.selectedPlanetRing) {
            // Créer un anneau de sélection pour la planète avec paramètres corrects
            // Fix: Correction inversion paramètres - SelectionRing(innerRadius, thickness, color, opacity)
            this.selectedPlanetRing = new SelectionRing(
                planet.radius * 2.0,        // innerRadius - Augmenté pour meilleure visibilité
                planet.radius * 0.3,        // thickness - Proportionnelle au rayon planète
                0x00ff00,                   // color - Vert pour différencier du soleil
                0.8                         // opacity
            );
            this.group.add(this.selectedPlanetRing.getMesh());
        }

        if (this.selectedPlanetRing) {
            if (selected) {
                // Positionner l'anneau sur la planète
                const pos = planet.mesh.position;
                this.selectedPlanetRing.getMesh().position.set(pos.x, pos.y, pos.z);
                this.selectedPlanetRing.getMesh().visible = true;
            } else {
                this.selectedPlanetRing.getMesh().visible = false;
            }
        }
    }

    /**
     * Retourne la planète actuellement sélectionnée.
     * @returns La planète sélectionnée ou null
     */
    public getSelectedPlanet(): Planet | null {
        if (!this.currentSelectedPlanetId) return null;
        return this.planets.find(p => p.id === this.currentSelectedPlanetId) || null;
    }

    public dispose() {
        // Clean up geometries and materials
        this.sunMesh.geometry.dispose();
        (this.sunMesh.material as THREE.Material).dispose();
         
        if (this.selectionRing) {
            this.selectionRing.dispose();
        }

        if (this.selectedPlanetRing) {
            this.selectedPlanetRing.dispose();
        }

        this.planets.forEach(p => {
            p.mesh.geometry.dispose();
            (p.mesh.material as THREE.Material).dispose();
            p.orbitLine.geometry.dispose();
            (p.orbitLine.material as THREE.Material).dispose();
        });

        // CRITICAL FIX: Vider le group pour détacher tous les children
        // Sans cela, les meshes restent attachés au group même si scene.remove() est appelé
        this.group.clear();
    }
}