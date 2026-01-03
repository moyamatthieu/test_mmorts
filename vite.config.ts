import { defineConfig } from 'vite'

/**
 * Configuration Vite pour le projet MMORTS.
 * 
 * Les en-têtes COOP (Cross-Origin-Opener-Policy) et COEP (Cross-Origin-Embedder-Policy)
 * sont configurés pour activer l'isolation cross-origin.
 * Cela est indispensable pour permettre l'utilisation de SharedArrayBuffer dans les Web Workers,
 * utilisé ici pour la gestion de la mémoire partagée et de la simulation.
 * 
 * Configuration HMR (Hot Module Replacement):
 * - watch: Surveille les changements dans les fichiers sources
 * - hmr: Active le rechargement à chaud
 * - strictPort: false permet de basculer sur un autre port si 5173 est occupé
 */
export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true,  // Nécessaire pour Windows : détection des changements via polling car les événements natifs du filesystem ne fonctionnent pas correctement
      interval: 100
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  },
  // Optimisations pour le développement
  optimizeDeps: {
    include: ['three']
  },
  // Configuration du build (au cas où)
  build: {
    target: 'esnext',
    sourcemap: true
  }
})
