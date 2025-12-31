/**
 * Interface utilisateur pour les contrôles de caméra et informations importantes.
 */
export class CornerUI {
    private helpPanel: HTMLElement;
    private infoPanel: HTMLElement;
    private debugPanel: HTMLElement;
    private logPanel: HTMLElement;
    private logMessages: string[] = [];
    private maxLogMessages: number = 10;

    constructor() {
        this.createHelpPanel();
        this.createInfoPanel();
        this.createDebugPanel();
        this.createLogPanel();
    }

    /**
     * Crée le panneau d'aide pour les contrôles.
     */
    private createHelpPanel(): void {
        this.helpPanel = document.createElement('div');
        this.helpPanel.id = 'camera-help';
        this.helpPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            max-width: 280px;
            border: 2px solid #00ff00;
            z-index: 1000;
            backdrop-filter: blur(5px);
        `;

        this.helpPanel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #ffffff;">🎮 CONTRÔLES CAMÉRA</div>
            <div style="line-height: 1.6;">
                <div>🖱️ <strong>Molette:</strong> Zoom</div>
                <div>🖱️ <strong>Clic gauche + glisser:</strong> Rotation</div>
                <div>🖱️ <strong>Clic droit + glisser:</strong> Déplacement</div>
                <div>⌨️ <strong>W/A/S/D:</strong> Déplacement</div>
                <div>⌨️ <strong>R:</strong> Position optimale</div>
                <div>🎯 <strong>Survol:</strong> Highlight cube</div>
                <div style="margin-top: 8px; font-size: 10px; color: #ffaaaa;">🔴X 🔴 <span style="color: #00ff00;">Y</span> 🔵Z - Repère 3D</div>
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #00ff00; font-size: 10px; opacity: 0.8;">
                Appuyez sur <strong>R</strong> pour recentrer la caméra sur tous les clusters
            </div>
        `;

        document.body.appendChild(this.helpPanel);
    }

    /**
     * Crée le panneau d'informations sur le cluster.
     */
    private createInfoPanel(): void {
        this.infoPanel = document.createElement('div');
        this.infoPanel.id = 'cluster-info';
        this.infoPanel.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 10px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            border: 1px solid #00ff00;
            z-index: 1000;
            min-width: 200px;
            backdrop-filter: blur(5px);
        `;

        this.updateClusterInfo({ clusters: 1, cubes: 100, size: '10x10' });
        document.body.appendChild(this.infoPanel);
    }

    /**
     * Met à jour les informations sur le cluster.
     */
    public updateClusterInfo(info: { clusters: number; cubes: number; size: string }): void {
        this.infoPanel.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold; color: #ffffff;">📊 GALAXIE</div>
            <div style="line-height: 1.5;">
                <div>🌌 Clusters d'étoiles: <span style="color: #ffff00;">${info.cubes}</span></div>
                <div>📦 Régions (clusters): <span style="color: #ffff00;">${info.clusters}</span></div>
                <div>📏 Taille: <span style="color: #ffff00;">${info.size}</span></div>
                <div style="margin-top:6px;">🔎 Sélection: <span id="selected-cluster" style="color:#00ffff;">-</span></div>
            </div>
        `;
    }

    /**
     * Met à jour l'affichage du cluster sélectionné (ID) dans le panneau d'information.
     */
    public updateSelectedCluster(clusterId: string | null, globalCoords?: { gx: number; gz: number } | null): void {
        const el = document.getElementById('selected-cluster');
        if (el) {
            if (clusterId && globalCoords) {
                el.textContent = `C[${globalCoords.gx}:${globalCoords.gz}]`;
            } else {
                el.textContent = clusterId ? clusterId : '-';
            }
        }
    }

    /**
     * Met à jour l'affichage des informations du soleil sélectionné.
     */
    public updateSelectedSun(sunMetadata: any): void {
        const el = document.getElementById('selected-cluster');
        if (el) {
            if (sunMetadata) {
                el.textContent = `${sunMetadata.name} (${sunMetadata.clusterId})`;
            } else {
                el.textContent = '-';
            }
        }
        
        // Ajouter un panneau d'informations détaillé pour le soleil
        this.updateSunDetailsPanel(sunMetadata);
    }

    /**
     * Met à jour le panneau détaillé des informations du soleil.
     */
    private updateSunDetailsPanel(sunMetadata: any): void {
        let detailsPanel = document.getElementById('sun-details-panel');
        
        if (!sunMetadata) {
            // Masquer le panneau si aucun soleil n'est sélectionné
            if (detailsPanel) {
                detailsPanel.style.display = 'none';
            }
            return;
        }
        
        // Créer le panneau s'il n'existe pas
        if (!detailsPanel) {
            detailsPanel = document.createElement('div');
            detailsPanel.id = 'sun-details-panel';
            detailsPanel.style.cssText = `
                position: fixed;
                bottom: 10px;
                left: 220px;
                background: rgba(0, 0, 0, 0.9);
                color: #ffff00;
                padding: 12px;
                border-radius: 8px;
                font-family: 'Courier New', monospace;
                font-size: 11px;
                border: 2px solid #ffff00;
                z-index: 1000;
                min-width: 280px;
                backdrop-filter: blur(5px);
            `;
            document.body.appendChild(detailsPanel);
        }
        
        // Afficher le panneau
        detailsPanel.style.display = 'block';
        
        // Formater les données
        const radiusKm = (sunMetadata.radius * 1000).toFixed(2);
        const massFormatted = sunMetadata.mass.toFixed(2);
        const tempFormatted = Math.round(sunMetadata.temperature) + 'K';
        const posFormatted = `${sunMetadata.absolutePosition.x.toFixed(2)}, ${sunMetadata.absolutePosition.y.toFixed(2)}, ${sunMetadata.absolutePosition.z.toFixed(2)}`;
        
        detailsPanel.innerHTML = `
            <div style="margin-bottom: 10px; font-weight: bold; color: #ffffff;">⭐ SOLEIL SÉLECTIONNÉ</div>
            <div style="line-height: 1.4;">
                <div><strong>Nom:</strong> <span style="color: #00ffff;">${sunMetadata.name}</span></div>
                <div><strong>ID:</strong> <span style="color: #cccccc;">${sunMetadata.id.substring(0, 20)}...</span></div>
                <div><strong>Cluster:</strong> <span style="color: #00ff00;">${sunMetadata.clusterId}</span></div>
                <div><strong>Taille:</strong> <span style="color: #ffaa00;">${radiusKm} km</span></div>
                <div><strong>Masse:</strong> <span style="color: #ffaa00;">${massFormatted}</span></div>
                <div><strong>Température:</strong> <span style="color: #ff6600;">${tempFormatted}</span></div>
                <div><strong>Position:</strong> <span style="color: #666666;">${posFormatted}</span></div>
                <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid #ffff00; font-size: 10px; color: #888;">
                    Double-clic pour zoomer
                </div>
            </div>
        `;
    }

    /**
     * Crée le panneau de debug en haut à droite affichant la position caméra et le lookAt.
     */
    private createDebugPanel(): void {
        this.debugPanel = document.createElement('div');
        this.debugPanel.id = 'camera-debug';
        this.debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: rgba(0, 0, 0, 0.85);
            color: #ffffff;
            padding: 10px 12px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            border: 1px solid #666666;
            z-index: 1000;
            min-width: 220px;
            backdrop-filter: blur(4px);
        `;

        this.debugPanel.innerHTML = `
            <div style="font-weight: bold; color: #ffffff; margin-bottom:6px;">⚙️ DEBUG CAMERA</div>
            <div style="line-height:1.4; font-size:11px;">
                <div>Pos: <span id="dbg-cam-pos">-</span></div>
                <div>LookAt: <span id="dbg-cam-look">-</span></div>
            </div>
        `;

        document.body.appendChild(this.debugPanel);
    }

    /**
     * Crée le panneau de log en bas à droite.
     */
    private createLogPanel(): void {
        this.logPanel = document.createElement('div');
        this.logPanel.id = 'log-panel';
        this.logPanel.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 10px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            border: 1px solid #00ff00;
            z-index: 1000;
            max-width: 300px;
            max-height: 200px;
            overflow-y: auto;
            backdrop-filter: blur(5px);
        `;

        this.logPanel.innerHTML = `
            <div style="margin-bottom: 8px; font-weight: bold; color: #ffffff;">📝 LOG</div>
            <div id="log-content" style="line-height: 1.4;"></div>
        `;

        document.body.appendChild(this.logPanel);
    }

    /**
     * Met à jour le panneau de debug avec la position caméra et le point regardé.
     */
    public updateCameraDebug(pos: { x: number; y: number; z: number }, lookAt: { x: number; y: number; z: number }): void {
        const posEl = document.getElementById('dbg-cam-pos');
        const lookEl = document.getElementById('dbg-cam-look');
        if (posEl) posEl.textContent = `${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}`;
        if (lookEl) lookEl.textContent = `${lookAt.x.toFixed(2)}, ${lookAt.y.toFixed(2)}, ${lookAt.z.toFixed(2)}`;
    }

    /**
     * Ajoute un message au panel de log.
     */
    public logMessage(message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        this.logMessages.push(logEntry);
        if (this.logMessages.length > this.maxLogMessages) {
            this.logMessages.shift();
        }
        this.updateLogDisplay();
    }

    /**
     * Met à jour l'affichage du log.
     */
    private updateLogDisplay(): void {
        const logContent = document.getElementById('log-content');
        if (logContent) {
            logContent.innerHTML = this.logMessages.map(msg => `<div>${msg}</div>`).join('');
            // Scroll to bottom
            logContent.scrollTop = logContent.scrollHeight;
        }
    }

    /**
     * Affiche un message temporaire. (Déprécié, utiliser logMessage)
     */
    public showTemporaryMessage(message: string, duration: number = 2000): void {
        // Ancienne implémentation supprimée, utiliser logMessage à la place
        this.logMessage(message);
    }

    /**
     * Nettoie les ressources.
     */
    public dispose(): void {
        if (this.helpPanel && this.helpPanel.parentNode) {
            this.helpPanel.parentNode.removeChild(this.helpPanel);
        }
        if (this.infoPanel && this.infoPanel.parentNode) {
            this.infoPanel.parentNode.removeChild(this.infoPanel);
        }
        if (this.debugPanel && this.debugPanel.parentNode) {
            this.debugPanel.parentNode.removeChild(this.debugPanel);
        }
        if (this.logPanel && this.logPanel.parentNode) {
            this.logPanel.parentNode.removeChild(this.logPanel);
        }
        const sunDetailsPanel = document.getElementById('sun-details-panel');
        if (sunDetailsPanel && sunDetailsPanel.parentNode) {
            sunDetailsPanel.parentNode.removeChild(sunDetailsPanel);
        }
    }
}