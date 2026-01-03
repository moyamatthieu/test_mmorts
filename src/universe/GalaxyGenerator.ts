// src/universe/GalaxyGenerator.ts
/**
 * Générateur procédural de galaxie.
 * 
 * Responsabilités:
 * - Générer des systèmes stellaires
 * - Générer des planètes pour chaque système
 * - Générer des champs d'astéroïdes
 * - Attribuer des ressources
 * - Générer des noms procéduraux
 * 
 * Utilise un PRNG seedé pour reproductibilité.
 * 
 * KISS: Génération simple basée sur seed, pas d'algorithmes complexes.
 */

// ============================================================================
// Types
// ============================================================================

export type StarType = 
  | 'O_BLUE_GIANT'      // Bleu, très chaud
  | 'B_BLUE'            // Bleu-blanc
  | 'A_WHITE'           // Blanc
  | 'F_YELLOW_WHITE'    // Jaune-blanc
  | 'G_YELLOW'          // Jaune (comme le Soleil)
  | 'K_ORANGE'          // Orange
  | 'M_RED_DWARF'       // Naine rouge
  | 'RED_GIANT'         // Géante rouge
  | 'WHITE_DWARF'       // Naine blanche
  | 'NEUTRON';          // Étoile à neutrons

export type PlanetType = 
  | 'TERRAN'            // Habitable (terre-like)
  | 'OCEAN'             // Océan
  | 'DESERT'            // Désert
  | 'ICE'               // Glacé
  | 'GAS_GIANT'         // Géante gazeuse
  | 'VOLCANIC'          // Volcanique
  | 'BARREN'            // Stérile
  | 'TOXIC';            // Toxique

export type ResourceType = 
  | 'METAL'
  | 'CRYSTAL'
  | 'FUEL'
  | 'RARE_ELEMENTS';

export interface StarData {
  id: string;
  name: string;
  type: StarType;
  radius: number;        // En unités de jeu
  temperature: number;   // En Kelvin
  color: number;         // Hex color
  luminosity: number;    // Multiplicateur
  position: { x: number; y: number; z: number };
}

export interface PlanetData {
  id: string;
  name: string;
  type: PlanetType;
  radius: number;
  orbitRadius: number;   // Distance au soleil
  orbitSpeed: number;    // Vitesse orbitale
  orbitPhase: number;    // Phase initiale (0-2π)
  rotationSpeed: number;
  hasAtmosphere: boolean;
  atmosphereColor?: number;
  surfaceColor: number;
  resources: ResourceDeposit[];
  habitability: number;  // 0-1
  moons: MoonData[];
}

export interface MoonData {
  id: string;
  name: string;
  radius: number;
  orbitRadius: number;
  orbitSpeed: number;
  color: number;
}

export interface ResourceDeposit {
  type: ResourceType;
  amount: number;        // Quantité totale extractible
  richness: number;      // 0-1, taux d'extraction
}

export interface AsteroidFieldData {
  id: string;
  position: { x: number; y: number; z: number };
  radius: number;        // Rayon du champ
  density: number;       // Nombre d'astéroïdes
  resources: ResourceDeposit[];
}

export interface SystemData {
  id: string;
  seed: number;
  name: string;
  position: { x: number; y: number; z: number };
  clusterX: number;
  clusterZ: number;
  star: StarData;
  planets: PlanetData[];
  asteroidFields: AsteroidFieldData[];
  discovered: boolean;
  ownerId: string | null;
}

export interface GalaxyData {
  seed: number;
  name: string;
  systems: Map<string, SystemData>;
  clusterSize: number;
  clustersX: number;
  clustersZ: number;
}

// ============================================================================
// Configuration
// ============================================================================

export const GALAXY_CONFIG = {
  /** Nombre de systèmes par cluster */
  systemsPerCluster: { min: 3, max: 8 },
  
  /** Distance entre les systèmes dans un cluster */
  systemSpacing: 50,
  
  /** Nombre de planètes par système */
  planetsPerSystem: { min: 2, max: 10 },
  
  /** Probabilité d'avoir un champ d'astéroïdes */
  asteroidFieldChance: 0.4,
  
  /** Distance orbitale min/max des planètes */
  orbitDistance: { min: 30, max: 300 },
  
  /** Probabilités des types d'étoiles */
  starTypeProbabilities: {
    'M_RED_DWARF': 0.40,
    'K_ORANGE': 0.20,
    'G_YELLOW': 0.15,
    'F_YELLOW_WHITE': 0.10,
    'A_WHITE': 0.06,
    'B_BLUE': 0.04,
    'O_BLUE_GIANT': 0.02,
    'RED_GIANT': 0.02,
    'WHITE_DWARF': 0.01,
    'NEUTRON': 0.005
  } as Record<StarType, number>,
  
  /** Couleurs des types d'étoiles */
  starColors: {
    'O_BLUE_GIANT': 0x9bb0ff,
    'B_BLUE': 0xaabfff,
    'A_WHITE': 0xcad7ff,
    'F_YELLOW_WHITE': 0xf8f7ff,
    'G_YELLOW': 0xfff4ea,
    'K_ORANGE': 0xffd2a1,
    'M_RED_DWARF': 0xffcc6f,
    'RED_GIANT': 0xff6b6b,
    'WHITE_DWARF': 0xffffff,
    'NEUTRON': 0x88ccff
  } as Record<StarType, number>,
  
  /** Couleurs des types de planètes */
  planetColors: {
    'TERRAN': 0x4a8f29,
    'OCEAN': 0x1a75ff,
    'DESERT': 0xc2a64d,
    'ICE': 0xd4f1f9,
    'GAS_GIANT': 0xe8c36a,
    'VOLCANIC': 0x8b0000,
    'BARREN': 0x808080,
    'TOXIC': 0x9acd32
  } as Record<PlanetType, number>
};

// ============================================================================
// PRNG (Pseudo-Random Number Generator)
// ============================================================================

/**
 * Générateur pseudo-aléatoire seedé (Mulberry32).
 */
class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  /** Retourne un nombre entre 0 et 1 */
  next(): number {
    let t = this.seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  
  /** Retourne un entier entre min et max (inclus) */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  
  /** Retourne un nombre flottant entre min et max */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }
  
  /** Retourne true avec la probabilité donnée */
  chance(probability: number): boolean {
    return this.next() < probability;
  }
  
  /** Choisit un élément aléatoire dans un tableau */
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
  
  /** Choisit selon des probabilités pondérées */
  pickWeighted<T extends string>(weights: Record<T, number>): T {
    const entries = Object.entries(weights) as [T, number][];
    const total = entries.reduce((sum, [_, w]) => sum + w, 0);
    let r = this.next() * total;
    
    for (const [key, weight] of entries) {
      r -= weight;
      if (r <= 0) return key;
    }
    
    return entries[entries.length - 1][0];
  }
}

// ============================================================================
// Générateur de noms
// ============================================================================

const NAME_PREFIXES = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Theta', 'Kappa',
  'Nova', 'Proxima', 'Kepler', 'Gliese', 'Tau', 'Sigma', 'Omega',
  'Cygni', 'Centauri', 'Lyrae', 'Draconis', 'Pegasi', 'Aquarii'
];

const NAME_SUFFIXES = [
  'Prime', 'Major', 'Minor', 'Secundus', 'Tertius', 'Quartus',
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'
];

const STAR_NAMES = [
  'Sol', 'Vega', 'Rigel', 'Sirius', 'Arcturus', 'Betelgeuse', 'Polaris',
  'Aldebaran', 'Antares', 'Canopus', 'Capella', 'Deneb', 'Fomalhaut',
  'Regulus', 'Spica', 'Achernar', 'Altair', 'Procyon', 'Pollux'
];

const PLANET_PREFIXES = [
  'Terra', 'Aqua', 'Ignis', 'Ventus', 'Glacius', 'Ferrum', 'Aether',
  'Nox', 'Lux', 'Umbra', 'Vita', 'Mors', 'Tempus', 'Chaos', 'Ordo'
];

/**
 * Génère un nom de système.
 */
function generateSystemName(rng: SeededRandom): string {
  if (rng.chance(0.3)) {
    // Nom simple
    return rng.pick(STAR_NAMES);
  } else if (rng.chance(0.5)) {
    // Préfixe + numéro
    return `${rng.pick(NAME_PREFIXES)}-${rng.nextInt(100, 999)}`;
  } else {
    // Préfixe + suffixe
    return `${rng.pick(NAME_PREFIXES)} ${rng.pick(NAME_SUFFIXES)}`;
  }
}

/**
 * Génère un nom de planète.
 */
function generatePlanetName(systemName: string, index: number, rng: SeededRandom): string {
  if (rng.chance(0.4)) {
    // Numérotation romaine
    const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return `${systemName} ${numerals[index] || (index + 1)}`;
  } else {
    // Nom unique
    return rng.pick(PLANET_PREFIXES) + '-' + rng.nextInt(1, 99);
  }
}

// ============================================================================
// Classe GalaxyGenerator
// ============================================================================

/**
 * Générateur de galaxie procédurale.
 */
export class GalaxyGenerator {
  private galaxySeed: number;
  private rng: SeededRandom;
  
  constructor(seed?: number) {
    this.galaxySeed = seed ?? Date.now();
    this.rng = new SeededRandom(this.galaxySeed);
  }
  
  // ============================================================================
  // Génération de galaxie complète
  // ============================================================================
  
  /**
   * Génère une galaxie complète.
   */
  generateGalaxy(clustersX: number, clustersZ: number, clusterSize: number): GalaxyData {
    const systems = new Map<string, SystemData>();
    
    for (let cx = 0; cx < clustersX; cx++) {
      for (let cz = 0; cz < clustersZ; cz++) {
        const clusterSystems = this.generateCluster(cx, cz, clusterSize);
        for (const system of clusterSystems) {
          systems.set(system.id, system);
        }
      }
    }
    
    return {
      seed: this.galaxySeed,
      name: this.generateGalaxyName(),
      systems,
      clusterSize,
      clustersX,
      clustersZ
    };
  }
  
  /**
   * Génère un nom de galaxie.
   */
  private generateGalaxyName(): string {
    const prefixes = ['Andromeda', 'Milky', 'Spiral', 'Triangulum', 'Whirlpool', 'Sombrero'];
    const suffixes = ['Galaxy', 'Cluster', 'Expanse', 'Nebula', 'Sector'];
    return `${this.rng.pick(prefixes)} ${this.rng.pick(suffixes)}`;
  }
  
  // ============================================================================
  // Génération de cluster
  // ============================================================================
  
  /**
   * Génère un cluster de systèmes.
   */
  generateCluster(clusterX: number, clusterZ: number, clusterSize: number): SystemData[] {
    const systems: SystemData[] = [];
    const numSystems = this.rng.nextInt(
      GALAXY_CONFIG.systemsPerCluster.min,
      GALAXY_CONFIG.systemsPerCluster.max
    );
    
    // Position centrale du cluster
    const clusterCenterX = clusterX * clusterSize * GALAXY_CONFIG.systemSpacing;
    const clusterCenterZ = clusterZ * clusterSize * GALAXY_CONFIG.systemSpacing;
    
    for (let i = 0; i < numSystems; i++) {
      // Position aléatoire dans le cluster
      const angle = this.rng.nextFloat(0, Math.PI * 2);
      const distance = this.rng.nextFloat(0, clusterSize * GALAXY_CONFIG.systemSpacing * 0.4);
      
      const x = clusterCenterX + Math.cos(angle) * distance;
      const y = this.rng.nextFloat(-20, 20); // Légère variation verticale
      const z = clusterCenterZ + Math.sin(angle) * distance;
      
      // Seed unique pour ce système
      const systemSeed = this.galaxySeed + clusterX * 1000 + clusterZ * 100 + i;
      
      const system = this.generateSystem(systemSeed, { x, y, z }, clusterX, clusterZ);
      systems.push(system);
    }
    
    return systems;
  }
  
  // ============================================================================
  // Génération de système
  // ============================================================================
  
  /**
   * Génère un système stellaire complet.
   */
  generateSystem(
    seed: number,
    position: { x: number; y: number; z: number },
    clusterX: number,
    clusterZ: number
  ): SystemData {
    const systemRng = new SeededRandom(seed);
    const name = generateSystemName(systemRng);
    const id = `sys-${seed}`;
    
    // Générer l'étoile
    const star = this.generateStar(id, name, position, systemRng);
    
    // Générer les planètes
    const numPlanets = systemRng.nextInt(
      GALAXY_CONFIG.planetsPerSystem.min,
      GALAXY_CONFIG.planetsPerSystem.max
    );
    const planets = this.generatePlanets(id, name, star, numPlanets, systemRng);
    
    // Générer les champs d'astéroïdes
    const asteroidFields = this.generateAsteroidFields(id, planets, systemRng);
    
    return {
      id,
      seed,
      name,
      position,
      clusterX,
      clusterZ,
      star,
      planets,
      asteroidFields,
      discovered: false,
      ownerId: null
    };
  }
  
  // ============================================================================
  // Génération d'étoile
  // ============================================================================
  
  /**
   * Génère une étoile.
   */
  private generateStar(
    systemId: string,
    systemName: string,
    position: { x: number; y: number; z: number },
    rng: SeededRandom
  ): StarData {
    const type = rng.pickWeighted(GALAXY_CONFIG.starTypeProbabilities);
    const color = GALAXY_CONFIG.starColors[type];
    
    // Propriétés basées sur le type
    let radius: number;
    let temperature: number;
    let luminosity: number;
    
    switch (type) {
      case 'O_BLUE_GIANT':
        radius = rng.nextFloat(10, 15);
        temperature = rng.nextInt(30000, 50000);
        luminosity = rng.nextFloat(30, 100);
        break;
      case 'B_BLUE':
        radius = rng.nextFloat(5, 10);
        temperature = rng.nextInt(10000, 30000);
        luminosity = rng.nextFloat(10, 30);
        break;
      case 'A_WHITE':
        radius = rng.nextFloat(2, 5);
        temperature = rng.nextInt(7500, 10000);
        luminosity = rng.nextFloat(5, 10);
        break;
      case 'F_YELLOW_WHITE':
        radius = rng.nextFloat(1.5, 2.5);
        temperature = rng.nextInt(6000, 7500);
        luminosity = rng.nextFloat(2, 5);
        break;
      case 'G_YELLOW':
        radius = rng.nextFloat(0.9, 1.5);
        temperature = rng.nextInt(5200, 6000);
        luminosity = rng.nextFloat(0.8, 2);
        break;
      case 'K_ORANGE':
        radius = rng.nextFloat(0.7, 0.9);
        temperature = rng.nextInt(3700, 5200);
        luminosity = rng.nextFloat(0.3, 0.8);
        break;
      case 'M_RED_DWARF':
        radius = rng.nextFloat(0.3, 0.7);
        temperature = rng.nextInt(2400, 3700);
        luminosity = rng.nextFloat(0.01, 0.3);
        break;
      case 'RED_GIANT':
        radius = rng.nextFloat(20, 50);
        temperature = rng.nextInt(3000, 5000);
        luminosity = rng.nextFloat(50, 200);
        break;
      case 'WHITE_DWARF':
        radius = rng.nextFloat(0.01, 0.02);
        temperature = rng.nextInt(10000, 40000);
        luminosity = rng.nextFloat(0.001, 0.01);
        break;
      case 'NEUTRON':
        radius = 0.00001;
        temperature = 1000000;
        luminosity = rng.nextFloat(0.0001, 0.001);
        break;
      default:
        radius = 1;
        temperature = 5800;
        luminosity = 1;
    }
    
    return {
      id: `${systemId}-star`,
      name: systemName,
      type,
      radius,
      temperature,
      color,
      luminosity,
      position
    };
  }
  
  // ============================================================================
  // Génération de planètes
  // ============================================================================
  
  /**
   * Génère les planètes d'un système.
   */
  private generatePlanets(
    systemId: string,
    systemName: string,
    star: StarData,
    count: number,
    rng: SeededRandom
  ): PlanetData[] {
    const planets: PlanetData[] = [];
    
    // Distribuer les orbites
    const orbitStep = (GALAXY_CONFIG.orbitDistance.max - GALAXY_CONFIG.orbitDistance.min) / count;
    
    for (let i = 0; i < count; i++) {
      const orbitRadius = GALAXY_CONFIG.orbitDistance.min + orbitStep * i + rng.nextFloat(-5, 5);
      const planet = this.generatePlanet(
        `${systemId}-planet-${i}`,
        generatePlanetName(systemName, i, rng),
        orbitRadius,
        star,
        rng
      );
      planets.push(planet);
    }
    
    return planets;
  }
  
  /**
   * Génère une planète.
   */
  private generatePlanet(
    id: string,
    name: string,
    orbitRadius: number,
    star: StarData,
    rng: SeededRandom
  ): PlanetData {
    // Déterminer le type basé sur la distance
    const type = this.determinePlanetType(orbitRadius, star, rng);
    const color = GALAXY_CONFIG.planetColors[type];
    
    // Propriétés
    let radius: number;
    let habitability: number;
    let hasAtmosphere: boolean;
    
    switch (type) {
      case 'GAS_GIANT':
        radius = rng.nextFloat(8, 15);
        habitability = 0;
        hasAtmosphere = true;
        break;
      case 'TERRAN':
        radius = rng.nextFloat(0.8, 1.5);
        habitability = rng.nextFloat(0.6, 1);
        hasAtmosphere = true;
        break;
      case 'OCEAN':
        radius = rng.nextFloat(0.9, 1.4);
        habitability = rng.nextFloat(0.4, 0.8);
        hasAtmosphere = true;
        break;
      case 'DESERT':
        radius = rng.nextFloat(0.6, 1.2);
        habitability = rng.nextFloat(0.1, 0.4);
        hasAtmosphere = rng.chance(0.6);
        break;
      case 'ICE':
        radius = rng.nextFloat(0.5, 1.3);
        habitability = rng.nextFloat(0, 0.2);
        hasAtmosphere = rng.chance(0.4);
        break;
      case 'VOLCANIC':
        radius = rng.nextFloat(0.4, 0.9);
        habitability = 0;
        hasAtmosphere = rng.chance(0.3);
        break;
      case 'TOXIC':
        radius = rng.nextFloat(0.6, 1.1);
        habitability = 0;
        hasAtmosphere = true;
        break;
      default: // BARREN
        radius = rng.nextFloat(0.3, 0.8);
        habitability = 0;
        hasAtmosphere = false;
    }
    
    // Vitesses
    const orbitSpeed = 0.1 / Math.sqrt(orbitRadius); // Kepler-like
    const rotationSpeed = rng.nextFloat(0.01, 0.1);
    const orbitPhase = rng.nextFloat(0, Math.PI * 2);
    
    // Ressources
    const resources = this.generatePlanetResources(type, rng);
    
    // Lunes
    const moons = this.generateMoons(id, name, radius, rng);
    
    return {
      id,
      name,
      type,
      radius,
      orbitRadius,
      orbitSpeed,
      orbitPhase,
      rotationSpeed,
      hasAtmosphere,
      atmosphereColor: hasAtmosphere ? this.generateAtmosphereColor(type, rng) : undefined,
      surfaceColor: color,
      resources,
      habitability,
      moons
    };
  }
  
  /**
   * Détermine le type de planète basé sur la distance.
   */
  private determinePlanetType(orbitRadius: number, star: StarData, rng: SeededRandom): PlanetType {
    // Zone habitable (simplifié)
    const habitableMin = star.luminosity * 0.8 * 100;
    const habitableMax = star.luminosity * 1.2 * 100;
    
    // Normalisé par rapport à l'orbite
    const normalizedOrbit = orbitRadius / GALAXY_CONFIG.orbitDistance.max;
    
    // Proche du soleil
    if (normalizedOrbit < 0.15) {
      if (rng.chance(0.7)) return 'VOLCANIC';
      return 'BARREN';
    }
    
    // Zone chaude
    if (normalizedOrbit < 0.3) {
      if (rng.chance(0.4)) return 'DESERT';
      if (rng.chance(0.3)) return 'TOXIC';
      return 'BARREN';
    }
    
    // Zone habitable
    if (orbitRadius >= habitableMin && orbitRadius <= habitableMax) {
      const r = rng.next();
      if (r < 0.4) return 'TERRAN';
      if (r < 0.7) return 'OCEAN';
      if (r < 0.85) return 'DESERT';
      return 'BARREN';
    }
    
    // Zone froide
    if (normalizedOrbit < 0.6) {
      if (rng.chance(0.5)) return 'GAS_GIANT';
      if (rng.chance(0.3)) return 'ICE';
      return 'BARREN';
    }
    
    // Zone externe
    if (rng.chance(0.6)) return 'GAS_GIANT';
    if (rng.chance(0.5)) return 'ICE';
    return 'BARREN';
  }
  
  /**
   * Génère les ressources d'une planète.
   */
  private generatePlanetResources(type: PlanetType, rng: SeededRandom): ResourceDeposit[] {
    const resources: ResourceDeposit[] = [];
    
    // Métal
    if (rng.chance(0.7)) {
      resources.push({
        type: 'METAL',
        amount: rng.nextInt(1000, 10000),
        richness: rng.nextFloat(0.3, 1)
      });
    }
    
    // Cristaux (plus rares)
    if (rng.chance(type === 'VOLCANIC' ? 0.5 : 0.2)) {
      resources.push({
        type: 'CRYSTAL',
        amount: rng.nextInt(500, 3000),
        richness: rng.nextFloat(0.2, 0.8)
      });
    }
    
    // Carburant (géantes gazeuses)
    if (type === 'GAS_GIANT') {
      resources.push({
        type: 'FUEL',
        amount: rng.nextInt(5000, 50000),
        richness: rng.nextFloat(0.5, 1)
      });
    }
    
    // Éléments rares
    if (rng.chance(0.1)) {
      resources.push({
        type: 'RARE_ELEMENTS',
        amount: rng.nextInt(100, 1000),
        richness: rng.nextFloat(0.1, 0.5)
      });
    }
    
    return resources;
  }
  
  /**
   * Génère la couleur de l'atmosphère.
   */
  private generateAtmosphereColor(type: PlanetType, rng: SeededRandom): number {
    switch (type) {
      case 'TERRAN':
        return 0x87ceeb; // Bleu ciel
      case 'OCEAN':
        return 0x4169e1; // Bleu royal
      case 'DESERT':
        return 0xdaa520; // Goldenrod
      case 'TOXIC':
        return 0x9acd32; // Jaune-vert
      case 'GAS_GIANT':
        return rng.pick([0xe8c36a, 0xffa07a, 0x87ceeb, 0xdda0dd]);
      default:
        return 0xcccccc;
    }
  }
  
  /**
   * Génère les lunes d'une planète.
   */
  private generateMoons(
    planetId: string,
    planetName: string,
    planetRadius: number,
    rng: SeededRandom
  ): MoonData[] {
    const moons: MoonData[] = [];
    
    // Plus grosses planètes = plus de lunes
    const maxMoons = Math.floor(planetRadius / 2);
    const numMoons = rng.chance(0.5) ? rng.nextInt(0, maxMoons) : 0;
    
    for (let i = 0; i < numMoons; i++) {
      moons.push({
        id: `${planetId}-moon-${i}`,
        name: `${planetName} ${String.fromCharCode(97 + i)}`, // a, b, c...
        radius: rng.nextFloat(0.1, 0.4),
        orbitRadius: planetRadius * 2 + rng.nextFloat(1, 5) * (i + 1),
        orbitSpeed: rng.nextFloat(0.5, 2),
        color: rng.pick([0x808080, 0xa0a0a0, 0xc0c0c0, 0x606060])
      });
    }
    
    return moons;
  }
  
  // ============================================================================
  // Génération de champs d'astéroïdes
  // ============================================================================
  
  /**
   * Génère les champs d'astéroïdes d'un système.
   */
  private generateAsteroidFields(
    systemId: string,
    planets: PlanetData[],
    rng: SeededRandom
  ): AsteroidFieldData[] {
    const fields: AsteroidFieldData[] = [];
    
    // Ceinture principale (entre les planètes intérieures et extérieures)
    if (planets.length >= 4 && rng.chance(GALAXY_CONFIG.asteroidFieldChance)) {
      const midOrbit = (planets[2].orbitRadius + planets[3].orbitRadius) / 2;
      
      fields.push({
        id: `${systemId}-belt-main`,
        position: { x: 0, y: 0, z: 0 }, // Centré sur l'étoile
        radius: midOrbit,
        density: rng.nextInt(100, 500),
        resources: [
          {
            type: 'METAL',
            amount: rng.nextInt(10000, 50000),
            richness: rng.nextFloat(0.5, 1)
          },
          {
            type: 'CRYSTAL',
            amount: rng.nextInt(2000, 10000),
            richness: rng.nextFloat(0.3, 0.8)
          }
        ]
      });
    }
    
    // Ceinture externe (Kuiper-like)
    if (rng.chance(0.3)) {
      const outerOrbit = GALAXY_CONFIG.orbitDistance.max * 1.2;
      
      fields.push({
        id: `${systemId}-belt-outer`,
        position: { x: 0, y: 0, z: 0 },
        radius: outerOrbit,
        density: rng.nextInt(50, 200),
        resources: [
          {
            type: 'FUEL',
            amount: rng.nextInt(5000, 20000),
            richness: rng.nextFloat(0.4, 0.9)
          }
        ]
      });
    }
    
    return fields;
  }
  
  // ============================================================================
  // Utilitaires
  // ============================================================================
  
  /**
   * Régénère un système à partir de son seed.
   */
  regenerateSystem(systemData: { seed: number; position: { x: number; y: number; z: number }; clusterX: number; clusterZ: number }): SystemData {
    return this.generateSystem(
      systemData.seed,
      systemData.position,
      systemData.clusterX,
      systemData.clusterZ
    );
  }
  
  /**
   * Obtient le seed de la galaxie.
   */
  getSeed(): number {
    return this.galaxySeed;
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale du générateur */
export const galaxyGenerator = new GalaxyGenerator();