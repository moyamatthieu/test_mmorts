# 🚀 Prochaines Étapes - Guide d'Implémentation

## ✅ État Actuel

### Corrigé
- [x] Bug `clock undefined` - Variables initialisées
- [x] Plan architectural complet documenté
- [x] Diagrammes système créés
- [x] Analyse bugs & solutions rédigée

### Fonctionnel
- [x] Rendu galaxie 3D (cubes + soleils)
- [x] Sélection système solaire
- [x] Entrée système (Enter, double-clic, bouton)
- [x] Sortie système (Échap)

### À Implémenter
- [ ] Système look-at intelligent
- [ ] Transitions smooth (lerp caméra)
- [ ] Mémoire contexte navigation
- [ ] Niveau planétaire

---

## 📋 TODO Immédiat (Cette Semaine)

### Jour 1: TransitionManager (Priorité 1)

#### Fichier: `src/core/TransitionManager.ts`

```typescript
import * as THREE from 'three';
import { CameraManager } from './CameraManager';
import { NavigationManager } from './NavigationManager';
import { NAVIGATION_CONFIG } from '../config';
import { SystemReference } from '../types/NavigationState';

interface ExitContext {
  fromView: 'GALAXY' | 'SYSTEM' | 'PLANET';
  exitedObject: SystemReference | any;
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
   * Sauvegarde du contexte avant descente de niveau
   */
  private saveExitContext(fromView: 'GALAXY' | 'SYSTEM', object: any): void {
    const camPos = this.cameraManager.getCamera().position;
    const target = this.cameraManager.getTarget();
    
    this.exitContext = {
      fromView,
      exitedObject: object,
      targetPosition: target.clone(),
      targetDistance: camPos.distanceTo(target),
      timestamp: performance.now()
    };
    
    console.log('[TransitionManager] Exit context saved:', {
      fromView,
      targetPos: this.exitContext.targetPosition,
      distance: this.exitContext.targetDistance
    });
  }
  
  /**
   * Entrée smooth dans un système solaire
   */
  enterSystem(systemRef: SystemReference): Promise<void> {
    return new Promise((resolve) => {
      if (this.isTransitioning) {
        console.warn('[TransitionManager] Transition already in progress');
        resolve();
        return;
      }
      
      this.isTransitioning = true;
      this.transitionStartTime = performance.now();
      
      // 1. Sauvegarder contexte actuel
      this.saveExitContext('GALAXY', systemRef);
      
      // 2. Position cible (intérieur du système)
      const sunPos = new THREE.Vector3(
        systemRef.metadata.absolutePosition.x,
        systemRef.metadata.absolutePosition.y,
        systemRef.metadata.absolutePosition.z
      );
      const insideDistance = systemRef.metadata.optimalDistance * 0.3;
      const targetPos = sunPos.clone().add(new THREE.Vector3(
        insideDistance * 0.5,
        insideDistance * 0.7,
        insideDistance * 0.5
      ));
      
      // 3. Animation caméra smooth (2 secondes)
      this.cameraManager.flyTo(targetPos, sunPos, 2000, () => {
        this.isTransitioning = false;
        console.log('[TransitionManager] Enter system complete');
        resolve();
      });
      
      // 4. Mise à jour état navigation
      this.navigationManager.enterSystem(systemRef);
    });
  }
  
  /**
   * Sortie smooth vers galaxie avec look-at intelligent
   */
  exitSystem(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.exitContext || this.exitContext.fromView !== 'GALAXY') {
        console.warn('[TransitionManager] No valid exit context');
        resolve();
        return;
      }
      
      if (this.isTransitioning) {
        console.warn('[TransitionManager] Transition already in progress');
        resolve();
        return;
      }
      
      this.isTransitioning = true;
      
      // 1. Récupérer position/target sauvegardés
      const exitTarget = this.exitContext.targetPosition;
      const exitDist = this.exitContext.targetDistance;
      
      // 2. Calculer position caméra sortie
      const direction = new THREE.Vector3()
        .subVectors(this.cameraManager.getCamera().position, this.cameraManager.getTarget())
        .normalize();
      const newCamPos = exitTarget.clone().add(direction.multiplyScalar(exitDist));
      
      // 3. Animation smooth (1.5 secondes)
      this.cameraManager.flyTo(newCamPos, exitTarget, 1500, () => {
        this.isTransitioning = false;
        console.log('[TransitionManager] Exit system complete, looking at:', exitTarget);
        resolve();
      });
      
      // 4. Mise à jour navigation
      this.navigationManager.exitSystem();
    });
  }
  
  /**
   * Vérification transitions automatiques (appelé dans animate loop)
   */
  checkAutoTransitions(
    currentDistance: number,
    selectedObject: SystemReference | null,
    currentView: string
  ): void {
    // Cooldown entre transitions
    const now = performance.now();
    if (now - this.transitionStartTime < NAVIGATION_CONFIG.transitionCooldown) {
      return;
    }
    
    // Pas pendant transition manuelle
    if (this.isTransitioning) return;
    
    // === GALAXY → SYSTEM (zoom in) ===
    if (currentView === 'GALAXY' && selectedObject) {
      const enterThreshold = selectedObject.metadata.optimalDistance * 
                            NAVIGATION_CONFIG.systemEnterDistanceFactor;
      
      if (currentDistance < enterThreshold) {
        console.log(`[TransitionManager] Auto enter system (distance: ${currentDistance.toFixed(1)} < ${enterThreshold.toFixed(1)})`);
        this.enterSystem(selectedObject);
      }
    }
    
    // === SYSTEM → GALAXY (zoom out) ===
    if (currentView === 'SYSTEM' && this.exitContext) {
      const metadata = this.exitContext.exitedObject.metadata;
      const exitThreshold = metadata.optimalDistance * 
                           NAVIGATION_CONFIG.systemExitDistanceFactor;
      
      if (currentDistance > exitThreshold) {
        console.log(`[TransitionManager] Auto exit system (distance: ${currentDistance.toFixed(1)} > ${exitThreshold.toFixed(1)})`);
        this.exitSystem();
      }
    }
  }
  
  /**
   * Getters
   */
  getExitContext(): ExitContext | null {
    return this.exitContext;
  }
  
  isCurrentlyTransitioning(): boolean {
    return this.isTransitioning;
  }
}
```

**Actions:**
1. Créer le fichier `src/core/TransitionManager.ts`
2. Copier le code ci-dessus
3. Tester la compilation

---

### Jour 2: CameraManager.flyTo() (Priorité 1)

#### Ajouter dans `src/core/CameraManager.ts`:

```typescript
/**
 * Transition animée smooth vers position + target
 * @param targetPosition Position finale caméra
 * @param targetLookAt Point à regarder
 * @param duration Durée animation (ms)
 * @param onComplete Callback fin animation
 */
public flyTo(
  targetPosition: THREE.Vector3,
  targetLookAt: THREE.Vector3 | { x: number; y: number; z: number },
  duration: number = 2000,
  onComplete?: () => void
): void {
  // Désactiver contrôles pendant transition
  this.controls.enabled = false;
  this.transitioning = true;
  
  const startPos = this.camera.position.clone();
  const startTarget = this.controls.target.clone();
  
  const endPos = targetPosition;
  const endTarget = targetLookAt instanceof THREE.Vector3
    ? targetLookAt
    : new THREE.Vector3(targetLookAt.x, targetLookAt.y, targetLookAt.z);
  
  const startTime = performance.now();
  
  const animate = () => {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1.0);
    
    // Easing curve (ease-in-out cubic pour smooth natural)
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
      // Fin transition
      this.controls.enabled = true;
      this.transitioning = false;
      if (onComplete) onComplete();
    }
  };
  
  animate();
}

/**
 * Getter état transition
 */
public isTransitioning(): boolean {
  return this.transitioning;
}
```

**Actions:**
1. Ajouter la méthode dans CameraManager
2. S'assurer que `this.transitioning` existe (déjà fait)
3. Tester avec `flyTo(new THREE.Vector3(0, 10, 10), new THREE.Vector3(0, 0, 0), 2000)`

---

### Jour 3: Intégration dans SceneManager (Priorité 1)

#### Modifier `src/core/SceneManager.ts`:

```typescript
// Dans constructor, après navigationManager
private transitionManager: TransitionManager;

constructor() {
  // ... code existant ...
  
  this.navigationManager = new NavigationManager();
  this.transitionManager = new TransitionManager(
    this.cameraManager,
    this.navigationManager
  );
  
  // ... reste du code ...
}

// Remplacer les appels directs par TransitionManager
// Dans onEnterSystem callback:
this.cornerUI.onEnterSystem(() => {
  if (this.selectedSolarSystem) {
    const systemRef = this.clusterGrid.getSystemReference(this.selectedSolarSystem.id);
    if (systemRef) {
      this.transitionManager.enterSystem(systemRef);  // ← Utiliser TransitionManager
      this.cornerUI.logMessage(`🚀 Entrée dans ${this.selectedSolarSystem.name} (bouton UI)`);
    }
  }
});

// Dans double-click handler:
this.renderer.domElement.addEventListener('dblclick', () => {
  if (this.selectedSolarSystem && this.navigationManager.getCurrentView() === 'GALAXY') {
    const systemRef = this.clusterGrid.getSystemReference(this.selectedSolarSystem.id);
    if (systemRef) {
      this.transitionManager.enterSystem(systemRef);  // ← Utiliser TransitionManager
      this.cornerUI.logMessage(`🚀 Entrée dans ${this.selectedSolarSystem.name} (double-clic)`);
    }
  }
});

// Dans keydown Enter:
if (event.key === 'Enter' && this.selectedSolarSystem && this.navigationManager.getCurrentView() === 'GALAXY') {
  const systemRef = this.clusterGrid.getSystemReference(this.selectedSolarSystem.id);
  if (systemRef) {
    this.transitionManager.enterSystem(systemRef);  // ← Utiliser TransitionManager
    this.cornerUI.logMessage(`🚀 Entrée dans ${this.selectedSolarSystem.name} (touche Entrée)`);
  }
}

// Dans animate loop, remplacer checkAutomaticTransitions:
public animate(): void {
  requestAnimationFrame(() => this.animate());
  
  const now = performance.now();
  const dt = (now - this.lastTime) / 1000;
  this.lastTime = now;
  
  this.cameraManager.update();
  
  // Vérification transitions automatiques
  const camPos = this.cameraManager.getCamera().position;
  const camTarget = this.cameraManager.getTarget();
  const distance = camPos.distanceTo(camTarget);
  const currentView = this.navigationManager.getCurrentView();
  
  this.transitionManager.checkAutoTransitions(
    distance,
    this.selectedSolarSystem ? 
      this.clusterGrid.getSystemReference(this.selectedSolarSystem.id) : null,
    currentView
  );
  
  // ... reste du code render ...
}
```

**Actions:**
1. Importer TransitionManager
2. Instancier dans constructor
3. Remplacer tous les appels directs
4. Tester le flow complet

---

## 🧪 Tests à Effectuer

### Test 1: Entrée Système
```
1. Lancer le jeu
2. Cliquer sur un système solaire (doit être surligné)
3. Appuyer sur Entrée
   ✓ Animation smooth 2s
   ✓ Caméra entre dans le système
   ✓ Vue système solaire affichée
   ✓ Console log "Enter system complete"
```

### Test 2: Sortie Système avec Look-At
```
1. Dans un système solaire
2. Zoomer out (molette)
   ✓ Quand distance > seuil, sortie auto
   ✓ Animation smooth 1.5s
   ✓ Retour vue galaxie
   ✓ Caméra regarde le système quitté ! ← IMPORTANT
   ✓ Console log "looking at: Vector3(...)"
```

### Test 3: Changement de Système
```
1. Sortir du système A (caméra regarde A)
2. Cliquer sur système B
   ✓ Caméra tourne progressivement de A vers B
   ✓ Pas de saut brusque
3. Double-cliquer sur B
   ✓ Entrée dans système B
   ✓ Exit context sauvegardé pour B
```

### Test 4: Transitions Automatiques
```
1. Sélectionner un système
2. Zoomer progressivement vers lui (molette)
   ✓ Quand distance < 50% optimalDistance → entrée auto
3. Dans système, zoomer out progressivement
   ✓ Quand distance > 250% optimalDistance → sortie auto
```

---

## 📊 Checklist Complète

### Phase 1: Navigation Robuste
- [ ] TransitionManager créé et fonctionnel
- [ ] CameraManager.flyTo() implémenté
- [ ] Intégration dans SceneManager
- [ ] Exit context sauvegarde/restauration
- [ ] Look-at intelligent après sortie
- [ ] Transitions smooth (lerp + easing)
- [ ] Transitions auto zoom in/out
- [ ] Tests passés (4/4)

### Phase 2: UI & Feedback
- [ ] Breadcrumb navigation (Galaxy > System A)
- [ ] Bouton "Back" (remonte niveau)
- [ ] Indicateurs visuels transitions (fade, particles)
- [ ] Messages transitoires ("Entering Sol System...")
- [ ] Sound effects (whoosh, hyperspace)

### Phase 3: Niveau Planétaire
- [ ] Créer PlanetReference type
- [ ] Étendre NavigationState (PLANET view)
- [ ] Implémenter enterPlanet() / exitPlanet()
- [ ] Génération terrain procédural
- [ ] Textures planètes
- [ ] Atmosphère shader

### Phase 4: Suivi Vaisseau
- [ ] CameraManager.trackEntity()
- [ ] Modes: FOLLOW, CHASE, ORBIT
- [ ] Comportement contextuel (proche planète → regarde planète)
- [ ] Hyperspace jump (effet visuel)
- [ ] Cinematic camera paths

---

## 🎯 Objectifs Semaine

**Lundi-Mardi**: TransitionManager + CameraManager.flyTo()  
**Mercredi**: Intégration SceneManager  
**Jeudi**: Tests & debug  
**Vendredi**: Polish & UX feedback

**Résultat attendu**: Navigation galaxie ↔ système 100% fonctionnelle avec look-at intelligent !

---

## 💡 Conseils Implémentation

### Debug Console
```javascript
// Dans browser console pour debug
window.sceneManager = sceneManager; // Exposer dans main.ts

// Puis tester:
sceneManager.transitionManager.getExitContext()
sceneManager.cameraManager.getCamera().position
sceneManager.cameraManager.getTarget()
sceneManager.navigationManager.getCurrentView()
```

### Performance Monitoring
```typescript
// Ajouter dans animate():
if (performance.now() % 1000 < 16) {  // Chaque seconde
  console.log('FPS:', Math.round(1000 / dt));
  console.log('Draw calls:', renderer.info.render.calls);
  console.log('Triangles:', renderer.info.render.triangles);
}
```

### Easing Curves Alternatives
```typescript
// ease-in-out quad (plus doux)
const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// ease-out expo (rapide au début, lent à la fin)
const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

// ease-in-out back (léger overshoot, effet "rebond")
const c1 = 1.70158;
const c2 = c1 * 1.525;
const eased = t < 0.5
  ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
  : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
```

---

Bon courage pour l'implémentation ! N'hésite pas à commiter régulièrement et à tester à chaque étape. 🚀

**Next milestone**: Navigation complète galaxie ↔ système avec look-at intelligent ! 🎯
