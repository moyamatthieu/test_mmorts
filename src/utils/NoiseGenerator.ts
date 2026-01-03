/**
 * Générateur de bruit procédural 3D (Simplex noise)
 * Utilisé pour heightmap planétaire et patterns de texture
 * 
 * Architecture Phase 2.3: Textures procédurales GPU
 * - Génération GLSL pour calcul fragment shader (performances)
 * - Algorithme Simplex noise 3D (domaine public, Ashima Arts)
 * - FBM (Fractional Brownian Motion) pour détails multi-échelle
 * - Biomes adaptatifs selon type planète
 * 
 * Justifications techniques:
 * - GPU: calcul massivement parallèle (millions de fragments/frame)
 * - Simplex: meilleur que Perlin classique (moins d'artefacts directionnels)
 * - FBM: superposition octaves pour relief naturel réaliste
 * - Seed-based: reproductibilité garantie (même planète = mêmes textures)
 */
export class NoiseGenerator {
  /**
   * Génère code GLSL pour fonction noise 3D (Simplex)
   * À intégrer dans vertex/fragment shader
   * 
   * Source: https://github.com/ashima/webgl-noise (domaine public)
   * Auteurs: Ian McEwan, Ashima Arts
   * 
   * Optimisations appliquées:
   * - Pas de texture lookup (calcul pur)
   * - Vectorisation GLSL (vec3/vec4)
   * - Modulo 289 pour périodicité optimale GPU
   * 
   * @returns Code GLSL fonction snoise(vec3) -> float [-1, 1]
   */
  public static getGLSLNoiseFunction(): string {
    return `
      // === Simplex Noise 3D (Ashima Arts) ===
      // Retourne valeur [-1, 1] pour position 3D donnée
      
      vec3 mod289(vec3 x) { 
        return x - floor(x * (1.0 / 289.0)) * 289.0; 
      }
      
      vec4 mod289(vec4 x) { 
        return x - floor(x * (1.0 / 289.0)) * 289.0; 
      }
      
      vec4 permute(vec4 x) { 
        return mod289(((x * 34.0) + 1.0) * x); 
      }
      
      vec4 taylorInvSqrt(vec4 r) { 
        return 1.79284291400159 - 0.85373472095314 * r; 
      }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        // Premier coin (base grille simplexe)
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        // Autres coins (ordonnancement basé sur x0)
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        // Permutations
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        // Gradients (calcul optimisé)
        float n_ = 0.142857142857; // 1.0 / 7.0
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        // Normalisation
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; 
        p1 *= norm.y; 
        p2 *= norm.z; 
        p3 *= norm.w;
        
        // Mix contributions (kernel simplex)
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      // === FBM (Fractional Brownian Motion) ===
      // Superpose plusieurs octaves de noise pour détails multi-échelle
      // Paramètres:
      // - octaves: nombre couches (plus = plus détails, mais plus coûteux)
      // - lacunarity: facteur fréquence (typique: 2.0)
      // - gain: facteur amplitude (typique: 0.5 = diminution moitié par octave)
      float fbm(vec3 p, int octaves, float lacunarity, float gain) {
        float sum = 0.0;
        float amplitude = 1.0;
        float frequency = 1.0;
        
        // Boucle manuelle (GLSL ES 1.0 incompatible avec boucles dynamiques)
        for(int i = 0; i < 8; i++) {
          if(i >= octaves) break;
          sum += amplitude * snoise(p * frequency);
          amplitude *= gain;
          frequency *= lacunarity;
        }
        
        return sum;
      }
    `;
  }

  /**
   * Génère code GLSL pour couleurs biomes selon type planète
   * Entrées: height [0,1], moisture [0,1]
   * Sortie: vec3 RGB [0,1]
   * 
   * Types supportés:
   * - telluric: océans/plages/forêts/montagnes/neige
   * - desert: sable/rochers/dunes
   * - ice: glace/neige/crevasses
   * - gas: bandes atmosphériques colorées
   * 
   * @param planetType Type planète
   * @returns Code GLSL fonction getBiomeColor(float, float) -> vec3
   */
  public static getGLSLBiomeColors(planetType: string): string {
    switch (planetType) {
      case 'telluric':
        return `
          // === Biomes Telluriques (type Terre) ===
          vec3 getBiomeColor(float height, float moisture) {
            // Océans profonds (height < 0.3)
            if(height < 0.3) {
              vec3 deepOcean = vec3(0.0, 0.1, 0.3);
              vec3 shallowOcean = vec3(0.0, 0.3, 0.5);
              return mix(deepOcean, shallowOcean, height / 0.3);
            }
            
            // Plages sable (height 0.3-0.35)
            if(height < 0.35) {
              return vec3(0.8, 0.7, 0.5);
            }
            
            // Végétation (height 0.35-0.7) selon moisture
            if(height < 0.7) {
              vec3 forest = vec3(0.1, 0.4, 0.1);  // Forêts denses
              vec3 plains = vec3(0.4, 0.5, 0.2);  // Plaines herbacées
              return mix(plains, forest, moisture);
            }
            
            // Montagnes rocheuses (height 0.7-0.85)
            if(height < 0.85) {
              return vec3(0.4, 0.3, 0.2);
            }
            
            // Neige sommets (height > 0.85)
            return vec3(0.9, 0.9, 0.95);
          }
        `;
      
      case 'desert':
        return `
          // === Biomes Désertiques (type Mars) ===
          vec3 getBiomeColor(float height, float moisture) {
            vec3 sand = vec3(0.8, 0.7, 0.5);      // Sable clair
            vec3 rock = vec3(0.5, 0.4, 0.3);      // Rochers sombres
            vec3 dune = vec3(0.9, 0.75, 0.55);    // Dunes hautes
            
            // Mix selon height (rochers bas, dunes hautes)
            // moisture ajoute variation texture
            return mix(mix(sand, rock, height), dune, moisture * 0.5);
          }
        `;
      
      case 'ice':
        return `
          // === Biomes Glacés (type Europa) ===
          vec3 getBiomeColor(float height, float moisture) {
            vec3 ice = vec3(0.8, 0.9, 1.0);        // Glace bleutée
            vec3 snow = vec3(0.95, 0.95, 0.98);    // Neige pure
            vec3 crevasse = vec3(0.6, 0.7, 0.8);   // Crevasses sombres
            
            // Crevasses dans zones basses (height faible)
            // Neige pure zones hautes (moisture élevée)
            return mix(mix(ice, crevasse, height * 0.5), snow, moisture);
          }
        `;
      
      case 'gas':
        return `
          // === Bandes Atmosphériques (type Jupiter) ===
          vec3 getBiomeColor(float height, float moisture) {
            // Trois bandes colorées cycliques
            vec3 band1 = vec3(1.0, 0.6, 0.3);   // Orange clair
            vec3 band2 = vec3(0.9, 0.5, 0.2);   // Rouge-orange
            vec3 band3 = vec3(1.0, 0.7, 0.4);   // Jaune-orange
            
            // Index bande cyclique (5 répétitions sur sphere)
            // moisture ajoute turbulence
            float bandIndex = fract(height * 5.0 + moisture * 2.0);
            
            if(bandIndex < 0.33) {
              return mix(band1, band2, bandIndex * 3.0);
            }
            if(bandIndex < 0.66) {
              return mix(band2, band3, (bandIndex - 0.33) * 3.0);
            }
            return mix(band3, band1, (bandIndex - 0.66) * 3.0);
          }
        `;
      
      default:
        return `
          // === Fallback (type inconnu) ===
          vec3 getBiomeColor(float height, float moisture) {
            return vec3(0.5, 0.5, 0.5); // Gris neutre
          }
        `;
    }
  }

  // === Implémentation CPU (Simplex Noise 3D - Ashima Arts) ===
  // Portage strict du code GLSL pour garantir la cohérence visuelle/physique

  private static mod289(x: number): number {
    return x - Math.floor(x * (1.0 / 289.0)) * 289.0;
  }

  private static mod289Vec3(x: THREE.Vector3): THREE.Vector3 {
    return new THREE.Vector3(
      NoiseGenerator.mod289(x.x),
      NoiseGenerator.mod289(x.y),
      NoiseGenerator.mod289(x.z)
    );
  }

  private static mod289Vec4(x: THREE.Vector4): THREE.Vector4 {
    return new THREE.Vector4(
      NoiseGenerator.mod289(x.x),
      NoiseGenerator.mod289(x.y),
      NoiseGenerator.mod289(x.z),
      NoiseGenerator.mod289(x.w)
    );
  }

  private static permute(x: THREE.Vector4): THREE.Vector4 {
    // return mod289(((x * 34.0) + 1.0) * x);
    const res = x.clone();
    res.multiplyScalar(34.0).addScalar(1.0).multiply(x);
    return NoiseGenerator.mod289Vec4(res);
  }

  private static taylorInvSqrt(r: THREE.Vector4): THREE.Vector4 {
    // return 1.79284291400159 - 0.85373472095314 * r;
    return new THREE.Vector4(
      1.79284291400159 - 0.85373472095314 * r.x,
      1.79284291400159 - 0.85373472095314 * r.y,
      1.79284291400159 - 0.85373472095314 * r.z,
      1.79284291400159 - 0.85373472095314 * r.w
    );
  }

  /**
   * Implémentation CPU du Simplex Noise 3D (Ashima Arts)
   * Doit retourner exactement la même valeur que le shader snoise(vec3)
   */
  public static snoise(v: THREE.Vector3): number {
    const C = new THREE.Vector2(1.0 / 6.0, 1.0 / 3.0);
    const D = new THREE.Vector4(0.0, 0.5, 1.0, 2.0);

    // First corner
    const dotVCyyy = v.dot(new THREE.Vector3(C.y, C.y, C.y));
    const i = v.clone().addScalar(dotVCyyy).floor();
    
    const dotICxxx = i.dot(new THREE.Vector3(C.x, C.x, C.x));
    const x0 = v.clone().sub(i).addScalar(dotICxxx);

    // Other corners
    // vec3 g = step(x0.yzx, x0.xyz);
    const g = new THREE.Vector3(
      x0.y < x0.x ? 1.0 : 0.0, // step(x0.y, x0.x)
      x0.z < x0.y ? 1.0 : 0.0, // step(x0.z, x0.y)
      x0.x < x0.z ? 1.0 : 0.0  // step(x0.x, x0.z)
    );
    
    const l = new THREE.Vector3(1.0, 1.0, 1.0).sub(g);
    
    // vec3 i1 = min(g.xyz, l.zxy);
    const i1 = new THREE.Vector3(
      Math.min(g.x, l.z),
      Math.min(g.y, l.x),
      Math.min(g.z, l.y)
    );

    // vec3 i2 = max(g.xyz, l.zxy);
    const i2 = new THREE.Vector3(
      Math.max(g.x, l.z),
      Math.max(g.y, l.x),
      Math.max(g.z, l.y)
    );

    // x1 = x0 - i1 + C.xxx;
    const x1 = x0.clone().sub(i1).addScalar(C.x);
    // x2 = x0 - i2 + C.yyy;
    const x2 = x0.clone().sub(i2).addScalar(C.y);
    // x3 = x0 - D.yyy;
    const x3 = x0.clone().sub(new THREE.Vector3(D.y, D.y, D.y));

    // Permutations
    const iMod = NoiseGenerator.mod289Vec3(i);
    
    // p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + ...) + i.x + ...)
    const p_z = new THREE.Vector4(0.0, i1.z, i2.z, 1.0).addScalar(iMod.z);
    const perm_z = NoiseGenerator.permute(p_z);
    
    const p_y = new THREE.Vector4(0.0, i1.y, i2.y, 1.0).addScalar(iMod.y).add(perm_z);
    const perm_y = NoiseGenerator.permute(p_y);
    
    const p_x = new THREE.Vector4(0.0, i1.x, i2.x, 1.0).addScalar(iMod.x).add(perm_y);
    const p = NoiseGenerator.permute(p_x);

    // Gradients
    const n_ = 0.142857142857; // 1.0/7.0
    
    // vec3 ns = n_ * D.wyz - D.xzx;
    const ns = new THREE.Vector3(
      n_ * D.w - D.x,
      n_ * D.y - D.z,
      n_ * D.z - D.x
    );

    // vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    const nsz_sq = ns.z * ns.z;
    const j = p.clone().sub(
      p.clone().multiplyScalar(nsz_sq).floor().multiplyScalar(49.0)
    );

    // vec4 x_ = floor(j * ns.z);
    const x_ = j.clone().multiplyScalar(ns.z).floor();
    
    // vec4 y_ = floor(j - 7.0 * x_);
    const y_ = j.clone().sub(x_.clone().multiplyScalar(7.0)).floor();

    // vec4 x = x_ * ns.x + ns.yyyy;
    const x = x_.clone().multiplyScalar(ns.x).addScalar(ns.y);
    
    // vec4 y = y_ * ns.x + ns.yyyy;
    const y = y_.clone().multiplyScalar(ns.x).addScalar(ns.y);

    // vec4 h = 1.0 - abs(x) - abs(y);
    const h = new THREE.Vector4(
      1.0 - Math.abs(x.x) - Math.abs(y.x),
      1.0 - Math.abs(x.y) - Math.abs(y.y),
      1.0 - Math.abs(x.z) - Math.abs(y.z),
      1.0 - Math.abs(x.w) - Math.abs(y.w)
    );

    // vec4 b0 = vec4(x.xy, y.xy);
    const b0 = new THREE.Vector4(x.x, x.y, y.x, y.y);
    
    // vec4 b1 = vec4(x.zw, y.zw);
    const b1 = new THREE.Vector4(x.z, x.w, y.z, y.w);

    // vec4 s0 = floor(b0) * 2.0 + 1.0;
    const s0 = b0.clone().floor().multiplyScalar(2.0).addScalar(1.0);
    
    // vec4 s1 = floor(b1) * 2.0 + 1.0;
    const s1 = b1.clone().floor().multiplyScalar(2.0).addScalar(1.0);

    // vec4 sh = -step(h, vec4(0.0));
    const sh = new THREE.Vector4(
      h.x > 0.0 ? 0.0 : 1.0,
      h.y > 0.0 ? 0.0 : 1.0,
      h.z > 0.0 ? 0.0 : 1.0,
      h.w > 0.0 ? 0.0 : 1.0
    ).negate();

    // vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    const a0 = new THREE.Vector4(
      b0.x + s0.x * sh.x,
      b0.z + s0.z * sh.x,
      b0.y + s0.y * sh.y,
      b0.w + s0.w * sh.y
    );

    // vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    const a1 = new THREE.Vector4(
      b1.x + s1.x * sh.z,
      b1.z + s1.z * sh.z,
      b1.y + s1.y * sh.w,
      b1.w + s1.w * sh.w
    );

    // vec3 p0 = vec3(a0.xy, h.x);
    const p0 = new THREE.Vector3(a0.x, a0.y, h.x);
    // vec3 p1 = vec3(a0.zw, h.y);
    const p1 = new THREE.Vector3(a0.z, a0.w, h.y);
    // vec3 p2 = vec3(a1.xy, h.z);
    const p2 = new THREE.Vector3(a1.x, a1.y, h.z);
    // vec3 p3 = vec3(a1.zw, h.w);
    const p3 = new THREE.Vector3(a1.z, a1.w, h.w);

    // Normalisation
    // vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    const norm = NoiseGenerator.taylorInvSqrt(new THREE.Vector4(
      p0.dot(p0), p1.dot(p1), p2.dot(p2), p3.dot(p3)
    ));

    p0.multiplyScalar(norm.x);
    p1.multiplyScalar(norm.y);
    p2.multiplyScalar(norm.z);
    p3.multiplyScalar(norm.w);

    // Mix contributions
    // vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    const m = new THREE.Vector4(
      Math.max(0.6 - x0.dot(x0), 0.0),
      Math.max(0.6 - x1.dot(x1), 0.0),
      Math.max(0.6 - x2.dot(x2), 0.0),
      Math.max(0.6 - x3.dot(x3), 0.0)
    );

    // m = m * m;
    m.multiply(m);

    // return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    const m_sq = m.clone().multiply(m);
    const dots = new THREE.Vector4(
      p0.dot(x0),
      p1.dot(x1),
      p2.dot(x2),
      p3.dot(x3)
    );
    
    return 42.0 * m_sq.dot(dots);
  }

  /**
   * FBM (Fractional Brownian Motion) CPU
   * Superpose plusieurs octaves de noise
   */
  public static fbm(p: THREE.Vector3, octaves: number, lacunarity: number, gain: number): number {
    let sum = 0.0;
    let amplitude = 1.0;
    let frequency = 1.0;
    
    // Copie pour ne pas modifier l'original
    const pCopy = p.clone();

    for(let i = 0; i < octaves; i++) {
      // snoise(p * frequency)
      const input = pCopy.clone().multiplyScalar(frequency);
      sum += amplitude * NoiseGenerator.snoise(input);
      amplitude *= gain;
      frequency *= lacunarity;
    }
    
    return sum;
  }

  /**
   * Calcule la hauteur exacte de la surface planétaire en un point donné (CPU)
   * Doit correspondre EXACTEMENT au Vertex Shader de PlanetSurface
   *
   * @param point Position 3D sur la sphère (ou direction normalisée)
   * @param radius Rayon de base de la planète
   * @param seed Seed de la planète
   * @returns Hauteur absolue (distance au centre)
   */
  public static getSurfaceHeight(point: THREE.Vector3, radius: number, seed: number): number {
    // Normaliser seed comme dans le shader
    const normalizedSeed = (seed % 10000) / 10000.0;
    
    // Position normalisée pour cohérence sphérique
    // vec3 noisePos = normalize(position) * seed * 10.0;
    const noisePos = point.clone().normalize().multiplyScalar(normalizedSeed * 10.0);
    
    // Générer heightmap via FBM (5 octaves, lacunarity 2.0, gain 0.5)
    // float height = fbm(noisePos, 5, 2.0, 0.5);
    let height = NoiseGenerator.fbm(noisePos, 5, 2.0, 0.5);
    
    // Normaliser height [-1,1] -> [0,1]
    // height = (height + 1.0) * 0.5;
    height = (height + 1.0) * 0.5;
    
    // Calculer displacement scale (5% rayon)
    const displacementScale = radius * 0.05;
    
    // Hauteur finale = rayon + déplacement
    return radius + height * displacementScale;
  }
}