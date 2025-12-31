import { defineConfig } from 'vite'

/**
 * Configuration Vite pour le projet MMORTS.
 * 
 * Les en-têtes COOP (Cross-Origin-Opener-Policy) et COEP (Cross-Origin-Embedder-Policy)
 * sont configurés pour activer l'isolation cross-origin.
 * Cela est indispensable pour permettre l'utilisation de SharedArrayBuffer dans les Web Workers,
 * utilisé ici pour la gestion de la mémoire partagée et de la simulation.
 */
export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  }
})
