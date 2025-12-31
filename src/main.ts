import { SceneManager } from './core/SceneManager';

/**
 * Point d'entrée de l'application.
 * Initialise le SceneManager, l'interface utilisateur et lance la boucle d'animation.
 */
function main() {
    const sceneManager = new SceneManager();
    
    sceneManager.animate();
}

// Lancement de l'application
main();
