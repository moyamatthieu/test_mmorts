# 🐛 Analyse des Bugs & Plan de Correction

## ❌ Bug Actuel: Variables Manquantes

### Erreur Console
```
Uncaught TypeError: Cannot read properties of undefined (reading 'getElapsedTime')
at SceneManager.checkAutomaticTransitions (SceneManager.ts:625:40)
```

### Cause Racine
Le code tente d'utiliser `this.clock`, `this.lastAutoTransitionCheck`, `this.AUTO_TRANSITION_CHECK_INTERVAL` et `this.isAutoTransitioning` qui ne sont **pas initialisés** dans le constructeur.

### Variables Manquantes
1. `this.clock: THREE.Clock` - Pour mesurer le temps écoulé
2. `this.lastAutoTransitionCheck: number` - Dernière vérification auto-transition
3. `this.AUTO_TRANSITION_CHECK_INTERVAL: number` - Intervalle entre checks (0.1s)
4. `this.isAutoTransitioning: boolean` - Flag transition en cours

---

## 🔧 Correctifs Immédiats Nécessaires

###  1. Ajout des Variables Manquantes dans Constructor

```typescript
// Dans SceneManager constructor, après les autres initialisations:

// Horloge pour transitions automatiques
private clock: THREE.Clock = new THREE.Clock();
private lastAutoTransitionCheck: number = 0;
private readonly AUTO_TRANSITION_CHECK_INTERVAL: number = 0.1; // 10x/sec
private isAutoTransitioning: boolean = false;
```

### 2. Problème Architecture: Système de Navigation Incomplet

Le système actuel a des **lacunes architecturales** :

#### ❌ Problèmes Identifiés

1. **Pas de Contexte de Sortie**
   - Quand on sort d'un système, la caméra ne sait pas où regarder
   - Pas de mémoire du système depuis lequel on vient
   
2. **Sélection Non Persistante**
   - `this.selectedSolarSystem` est null après transition
   - On perd le contexte de navigation
   
3. **Look-At Non Intelligent**
   - Pas de tracking du système après sortie
   - Pas de "breadcrumb" de navigation

4. **Transitions Rigides**
   - Pas de smooth lerp entre vues
   - Changements brusques désagréables

---

## ✅ Solution Architecture: Système de Navigation Robuste

### Structure NavigationState Améliorée

```typescript
interface NavigationContext {
  // État actuel
  currentView: ViewMode;
  currentSystem: SystemReference | null;
  currentPlanet: PlanetReference | null;
  
  // Contexte de sortie (CLEF pour look-at intelligent)
  exitContext: {
    fromView: ViewMode;
    exitedSystem: SystemReference | null;
    exitedPlanet: PlanetReference | null;
    cameraTarget: THREE.Vector3;  // Où regarder au retour
    cameraDistance: number;        // Distance à maintenir
  } | null;
  
  // Historique (pour UI breadcrumb & back button)
  history: Array<{
    view: ViewMode;
    timestamp: number;
    object: SystemReference | PlanetReference;
  }>;
}
```

### Workflow de Navigation Intelligent

#### Scénario 1: Sélectionner + Entrer dans Système A
```
1. Clic sur système A
   → selectedSolarSystem = A
   → camera.lookAt(A.position)
   
2. Double-clic OU Entrée OU Zoom proche
   → SAVE exitContext:
      - fromView: 'GALAXY'
      - exitedSystem: A
      - cameraTarget: A.absolutePosition
      - cameraDistance: optimalDistance * 2.0
   
   → Transition smooth vers SYSTEM view
   → camera.flyTo(A, insideDistance)
   
3. Dans système A, je zoom out
   → Distance > exitThreshold
   → Retour GALAXY view
   → camera.setTarget(exitContext.cameraTarget)  ← LOOK AT système A !
   → camera.setDistance(exitContext.cameraDistance)
```

#### Scénario 2: Changer de Système (A → B)
```
1. Dans galaxie, système A en exitContext (je viens d'en sortir)
   → camera regarde A
   
2. Clic sur système B
   → selectedSolarSystem = B
   → camera.transitionLookAt(A.pos → B.pos)  ← Smooth rotation
   
3. Entrer dans B (double-clic)
   → SAVE nouveau exitContext pour B
   → Entrée dans système B
```

#### Scénario 3: Navigation Vaisseau (Futur)
```
1. Vaisseau sort de planète
   → camera.track(ship)
   → camera.lookAt(planet) tant que proche
   
2. Vaisseau s'éloigne de planète
   → camera.lookAt(ship.direction)  // Regarde où il va
   
3. Vaisseau atteint bord système
   → Auto-exit vers GALAXY
   → camera.lookAt(ship.destination)  // Étoile cible
```

---

## 🛠️ Implémentation Détaillée

### Fichier: `src/core/TransitionManager.ts` (NOUVEAU)

```typescript
import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { NavigationManager } from './NavigationManager';
import { NAVIGATION_CONFIG } from '../config';

interface ExitContext {
  fromView: 'GALAXY' | 'SYSTEM' | 'PLANET';
  exitedObject: any;
  targetPosition: THREE.Vector3;
  targetDistance: number;
  timestamp: number;
}

export class TransitionManager {
  private exitContext: ExitContext | null = null;
  private isTransitioning: boolean = false;
  private transitionStartTime: number = 0;
  
  constructor(
    private cameraManager: CameraManager,
    private navigationManager: NavigationManager
  ) {}
  
  /**
   * Sauvegarde contexte avant entrée dans un niveau inférieur
   */
  private saveExitContext(
    fromView: 'GALAXY' | 'SYSTEM',
    object: any
  ): void {
    const camPos = this.cameraManager.getCamera().position;
    const target = this.cameraManager.getTarget();
    
    this.exitContext = {
      fromView,
      exitedObject: object,
      targetPosition: target.clone(),
      targetDistance: camPos.distanceTo(target),
      timestamp: performance.now()
    };
    
    console.log('[TransitionManager] Exit context saved:', this.exitContext);
  }
  
  /**
   * Entrée smooth dans un système solaire
   */
  enterSystem(systemRef: SystemReference): Promise<void> {
    return new Promise((resolve) => {
      this.isTransitioning = true;
      this.transitionStartTime = performance.now();
      
      // 1. Sauvegarder contexte pour retour
      this.saveExitContext('GALAXY', systemRef);
      
      // 2. Calculer position cible (intérieur système)
      const sunPos = systemRef.metadata.absolutePosition;
      const insideDistance = systemRef.metadata.optimalDistance * 0.3;
      const targetPos = new THREE.Vector3(
        sunPos.x,
        sunPos.y + insideDistance * 0.7,
        sunPos.z + insideDistance * 0.7
      );
      
      // 3. Animation smooth caméra
      this.cameraManager.flyTo(targetPos, sunPos, 2000, () => {
        this.isTransitioning = false;
        resolve();
      });
      
      // 4. Changement état navigation
      this.navigationManager.enterSystem(systemRef);
    });
  }
  
  /**
   * Sortie smooth d'un système → retour galaxie
   */
  exitSystem(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.exitContext || this.exitContext.fromView !== 'GALAXY') {
        console.warn('[TransitionManager] No valid exit context');
        resolve();
        return;
      }
      
      this.isTransitioning = true;
      
      // 1. Position de sortie (regarde le système quitté)
      const exitPos = this.exitContext.targetPosition;
      const exitDist = this.exitContext.targetDistance;
      
      // 2. Calculer position caméra externe
      const currentTarget = this.cameraManager.getTarget();
      const direction = new THREE.Vector3()
        .subVectors(this.cameraManager.getCamera().position, currentTarget)
        .normalize();
      
      const newCamPos = exitPos.clone().add(direction.multiplyScalar(exitDist));
      
      // 3. Animation smooth
      this.cameraManager.flyTo(newCamPos, exitPos, 1500, () => {
        this.isTransitioning = false;
        resolve();
      });
      
      // 4. Changement état navigation
      this.navigationManager.exitSystem();
    });
  }
  
  /**
   * Vérification automatique transitions basées distance
   */
  checkAutoTransitions(
    currentDistance: number,
    selectedObject: any,
    currentView: string
  ): void {
    // Throttle checks
    const now = performance.now();
    if (now - this.transitionStartTime < NAVIGATION_CONFIG.transitionCooldown) {
      return;
    }
    
    // Pas pendant transition manuelle
    if (this.isTransitioning) return;
    
    // === GALAXY → SYSTEM ===
    if (currentView === 'GALAXY' && selectedObject) {
      const enterThreshold = selectedObject.optimalDistance * 
                            NAVIGATION_CONFIG.systemEnterDistanceFactor;
      
      if (currentDistance < enterThreshold) {
        console.log('[TransitionManager] Auto enter system (zoom in)');
        this.enterSystem(selectedObject);
      }
    }
    
    // === SYSTEM → GALAXY ===
    if (currentView === 'SYSTEM' && this.exitContext) {
      const exitThreshold = this.exitContext.exitedObject.metadata.optimalDistance *
                           NAVIGATION_CONFIG.systemExitDistanceFactor;
      
      if (currentDistance > exitThreshold) {
        console.log('[TransitionManager] Auto exit system (zoom out)');
        this.exitSystem();
      }
    }
  }
  
  getExitContext(): ExitContext | null {
    return this.exitContext;
  }
  
  isCurrentlyTransitioning(): boolean {
    return this.isTransitioning;
  }
}
```

### Fichier: `src/core/CameraManager.ts` (Ajouts)

```typescript
// Ajouter méthode flyTo pour transitions smooth

/**
 * Transition animée vers une position et target
 */
flyTo(
  targetPosition: THREE.Vector3,
  targetLookAt: THREE.Vector3 | number, // Vec3 ou juste position
  duration: number = 2000,
  onComplete?: () => void
): void {
  const startPos = this.camera.position.clone();
  const startTarget = this.controls.target.clone();
  
  const endPos = targetPosition;
  const endTarget = targetLookAt instanceof THREE.Vector3
    ? targetLookAt
    : new THREE.Vector3(targetLookAt, 0, 0); // fallback
  
  const startTime = performance.now();
  
  const animate = () => {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1.0);
    
    // Easing (ease-in-out cubic)
    const eased = t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    // Lerp position et target
    this.camera.position.lerpVectors(startPos, endPos, eased);
    this.controls.target.lerpVectors(startTarget, endTarget, eased);
    this.controls.update();
    
    if (t < 1.0) {
      requestAnimationFrame(animate);
    } else {
      if (onComplete) onComplete();
    }
  };
  
  animate();
}
```

---

## 📝 TODO List pour Corrections

### Priorité 1: Bugs Critiques
- [ ] Ajouter variables manquantes dans SceneManager (clock, etc.)
- [ ] Initialiser `this.clock = new THREE.Clock()` dans constructor
- [ ] Initialiser `this.lastAutoTransitionCheck = 0`
- [ ] Définir `this.AUTO_TRANSITION_CHECK_INTERVAL = 0.1`
- [ ] Initialiser `this.isAutoTransitioning = false`

### Priorité 2: Architecture Navigation
- [ ] Créer `TransitionManager.ts`
- [ ] Implémenter `saveExitContext()`
- [ ] Implémenter `enterSystem()` avec smooth transition
- [ ] Implémenter `exitSystem()` avec look-at intelligent
- [ ] Ajouter `flyTo()` dans CameraManager

### Priorité 3: Tests & Polish
- [ ] Tester: sélection système A → entrée → sortie → regarder A ✓
- [ ] Tester: sortie de A → sélection système B → entrée dans B ✓
- [ ] Tester: zoom in/out automatique
- [ ] Tester: double-clic, Enter, bouton UI (3 méthodes)
- [ ] Ajouter transitions pour planètes (futur)

### Priorité 4: UX Améliorations
- [ ] Breadcrumb UI (Galaxy > System A > Planet 3)
- [ ] Bouton "Back" (remonte historique)
- [ ] Minimap avec position actuelle
- [ ] Indicateurs visuels transitions (fade, particles)

---

## 🎯 Résultat Attendu

### Avant (❌ Bug)
- Crash au démarrage (`clock undefined`)
- Pas de mémoire contexte navigation
- Look-at aléatoire après sortie système
- Transitions brusques

### Après (✅ Fonctionnel)
- Système démar