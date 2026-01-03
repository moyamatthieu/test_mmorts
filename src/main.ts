import './styles.css';
import { SceneManager } from './core/SceneManager';
import { GameBootstrap } from './game/GameBootstrap';
import { hud } from './ui/HUD';

/**
 * Point d'entrée de l'application PEEJS (MMO RTS spatial).
 *
 * Architecture simplifiée :
 * - SceneManager est le point central qui orchestre Three.js et la navigation
 * - GameBootstrap initialise tous les systèmes de jeu (HUD, EventBus, réseau)
 * - HUD fournit l'interface utilisateur
 *
 * Flux d'initialisation:
 * 1. SceneManager: Three.js, caméra, entités visuelles
 * 2. GameBootstrap: HUD, EventBus, galaxie procédurale, réseau P2P
 * 3. Boucle d'animation démarre
 */
async function main(): Promise<void> {
    console.log(`🚀 PEEJS - Application démarrée - ${new Date().toLocaleTimeString()}`);
    
    try {
        // 1. Initialiser le rendu et la navigation
        const sceneManager = new SceneManager();
        
        // 2. Initialiser les systèmes de jeu
        const gameReady = await GameBootstrap.initialize({
            playerName: 'Commander',
            clustersX: 3,
            clustersZ: 3,
            clusterSize: 5,
            multiplayerEnabled: false // Activer pour le multijoueur
        }, sceneManager);
        
        if (!gameReady) {
            console.error('❌ PEEJS - Initialisation du jeu échouée');
            return;
        }
        
        // 3. Afficher le HUD
        hud.setVisible(true);
        
        // 4. Lancer la boucle d'animation
        sceneManager.animate();
        
        console.log('✅ PEEJS - Initialisation terminée');
        
        // Exposer pour debug en développement
        if (import.meta.env.DEV) {
            (window as any).sceneManager = sceneManager;
            (window as any).gameBootstrap = GameBootstrap;
            (window as any).hud = hud;
        }
        
    } catch (error) {
        console.error('❌ PEEJS - Erreur lors de l\'initialisation:', error);
    }
}

// Lancement de l'application
main();
