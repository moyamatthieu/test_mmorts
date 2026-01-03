// src/net/P2PManager.ts
/**
 * Gestionnaire de connexions P2P via PeerJS.
 * 
 * Responsabilités:
 * - Gérer les connexions WebRTC entre joueurs
 * - Broadcast des commandes et synchronisation
 * - Gestion lockstep pour le déterminisme
 * - Émission d'événements réseau via EventBus
 * 
 * Architecture: Mesh topology (chaque joueur connecté à tous les autres)
 * 
 * KISS: API simple pour le jeu, complexité réseau cachée.
 */

import type { GameCommand, PlayerId, EntityId } from '../types/commands';
import { eventBus } from '../core/EventBus';

// Note: PeerJS sera importé dynamiquement ou via CDN
// Pour le dev, on simule l'interface

// ============================================================================
// Configuration
// ============================================================================

export const P2P_CONFIG = {
  /** ID du signaling server PeerJS */
  peerServer: {
    host: 'localhost',
    port: 9000,
    path: '/peejs',
    secure: false
  },
  
  /** Timeout pour les connexions (ms) */
  connectionTimeout: 10000,
  
  /** Intervalle de heartbeat (ms) */
  heartbeatInterval: 1000,
  
  /** Timeout avant déconnexion si pas de heartbeat (ms) */
  heartbeatTimeout: 5000,
  
  /** Nombre max de joueurs */
  maxPlayers: 8,
  
  /** Délai max pour lockstep (ms) */
  lockstepTimeout: 100,
  
  /** Intervalle de simulation lockstep (ms) */
  lockstepInterval: 50, // 20 ticks/sec
};

// ============================================================================
// Types
// ============================================================================

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';
export type RoomState = 'none' | 'joining' | 'hosting' | 'joined';

export interface PeerInfo {
  peerId: string;
  playerId: PlayerId;
  playerName: string;
  connectionState: ConnectionState;
  latency: number;
  lastHeartbeat: number;
}

export interface RoomInfo {
  roomId: string;
  hostId: PlayerId;
  players: PeerInfo[];
  maxPlayers: number;
  gameState: 'lobby' | 'starting' | 'playing' | 'ended';
}

// Messages réseau
export type NetworkMessageType = 
  | 'HELLO'           // Identification initiale
  | 'HEARTBEAT'       // Keep-alive
  | 'COMMAND'         // Commande de jeu
  | 'COMMANDS_BATCH'  // Lot de commandes pour une frame
  | 'SNAPSHOT'        // État complet pour sync
  | 'READY'           // Joueur prêt pour la frame
  | 'CHAT'            // Message chat
  | 'ROOM_UPDATE'     // Mise à jour de la room
  | 'START_GAME'      // Démarrage de la partie
  | 'END_GAME';       // Fin de la partie

export interface NetworkMessage {
  type: NetworkMessageType;
  senderId: PlayerId;
  timestamp: number;
  payload: unknown;
}

export interface CommandMessage extends NetworkMessage {
  type: 'COMMAND';
  payload: {
    command: GameCommand;
    frameNumber: number;
  };
}

export interface CommandsBatchMessage extends NetworkMessage {
  type: 'COMMANDS_BATCH';
  payload: {
    commands: GameCommand[];
    frameNumber: number;
  };
}

export interface SnapshotMessage extends NetworkMessage {
  type: 'SNAPSHOT';
  payload: {
    frameNumber: number;
    state: unknown; // GameState sérialisé
  };
}

// Callbacks
export interface P2PCallbacks {
  onConnected?: (peerId: string) => void;
  onDisconnected?: (peerId: string, reason?: string) => void;
  onPeerJoined?: (peer: PeerInfo) => void;
  onPeerLeft?: (peer: PeerInfo) => void;
  onCommand?: (command: GameCommand, senderId: PlayerId) => void;
  onSnapshot?: (state: unknown, frameNumber: number) => void;
  onChat?: (message: string, senderId: PlayerId) => void;
  onRoomUpdate?: (room: RoomInfo) => void;
  onGameStart?: () => void;
  onGameEnd?: () => void;
  onError?: (error: Error) => void;
}

// Lockstep frame
interface LockstepFrame {
  frameNumber: number;
  commands: Map<PlayerId, GameCommand[]>;
  ready: Set<PlayerId>;
  executed: boolean;
}

// ============================================================================
// Interface Peer (pour abstraction PeerJS)
// ============================================================================

interface IPeer {
  id: string;
  on(event: string, callback: (...args: unknown[]) => void): void;
  connect(peerId: string): IDataConnection;
  destroy(): void;
}

interface IDataConnection {
  peer: string;
  open: boolean;
  on(event: string, callback: (...args: unknown[]) => void): void;
  send(data: unknown): void;
  close(): void;
}

// ============================================================================
// Classe P2PManager
// ============================================================================

/**
 * Gestionnaire de connexions P2P.
 */
export class P2PManager {
  // État local
  private localPlayerId: PlayerId = '';
  private localPlayerName: string = 'Player';
  private connectionState: ConnectionState = 'disconnected';
  private roomState: RoomState = 'none';
  
  // PeerJS
  private peer: IPeer | null = null;
  private connections: Map<string, IDataConnection> = new Map();
  
  // Room
  private currentRoom: RoomInfo | null = null;
  private peers: Map<string, PeerInfo> = new Map();
  
  // Lockstep
  private currentFrame: number = 0;
  private frames: Map<number, LockstepFrame> = new Map();
  private localCommands: GameCommand[] = [];
  private lockstepTimer: number | null = null;
  
  // Callbacks
  private callbacks: P2PCallbacks = {};
  
  // Heartbeat
  private heartbeatTimer: number | null = null;
  
  constructor() {
    // Générer un ID joueur unique
    this.localPlayerId = this.generatePlayerId();
  }
  
  // ============================================================================
  // Initialisation
  // ============================================================================
  
  /**
   * Configure les callbacks.
   */
  setCallbacks(callbacks: P2PCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks };
  }
  
  /**
   * Définit le nom du joueur.
   */
  setPlayerName(name: string): void {
    this.localPlayerName = name;
  }
  
  /**
   * Initialise la connexion au serveur PeerJS.
   */
  async connect(): Promise<boolean> {
    if (this.connectionState === 'connected') {
      return true;
    }
    
    this.connectionState = 'connecting';
    
    try {
      // Charger PeerJS dynamiquement (si non disponible)
      const PeerClass = await this.loadPeerJS();
      
      if (!PeerClass) {
        console.warn('[P2P] PeerJS non disponible, mode offline');
        this.connectionState = 'error';
        return false;
      }
      
      // Créer le peer
      this.peer = new PeerClass(this.localPlayerId, {
        ...P2P_CONFIG.peerServer,
        debug: 2
      }) as unknown as IPeer;
      
      // Attendre la connexion
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          this.connectionState = 'error';
          this.callbacks.onError?.(new Error('Connection timeout'));
          resolve(false);
        }, P2P_CONFIG.connectionTimeout);
        
        this.peer!.on('open', (id: string) => {
          clearTimeout(timeout);
          this.localPlayerId = id;
          this.connectionState = 'connected';
          this.startHeartbeat();
          this.callbacks.onConnected?.(id);
          console.log(`[P2P] Connecté avec ID: ${id}`);
          resolve(true);
        });
        
        this.peer!.on('error', (err: Error) => {
          clearTimeout(timeout);
          this.connectionState = 'error';
          this.callbacks.onError?.(err);
          console.error('[P2P] Erreur:', err);
          resolve(false);
        });
        
        // Gérer les connexions entrantes
        this.peer!.on('connection', (conn: IDataConnection) => {
          this.handleIncomingConnection(conn);
        });
      });
    } catch (err) {
      this.connectionState = 'error';
      this.callbacks.onError?.(err as Error);
      return false;
    }
  }
  
  /**
   * Charge PeerJS dynamiquement.
   */
  private async loadPeerJS(): Promise<unknown> {
    // Essayer d'utiliser PeerJS global (CDN)
    if (typeof window !== 'undefined' && (window as Record<string, unknown>).Peer) {
      return (window as Record<string, unknown>).Peer;
    }
    
    // Sinon, essayer l'import dynamique
    try {
      const module = await import('peerjs');
      return module.default || module.Peer;
    } catch {
      console.warn('[P2P] PeerJS non trouvé');
      return null;
    }
  }
  
  // ============================================================================
  // Gestion des rooms
  // ============================================================================
  
  /**
   * Crée une nouvelle room (devient host).
   */
  createRoom(roomId?: string): RoomInfo {
    const id = roomId || this.generateRoomId();
    
    this.currentRoom = {
      roomId: id,
      hostId: this.localPlayerId,
      players: [{
        peerId: this.localPlayerId,
        playerId: this.localPlayerId,
        playerName: this.localPlayerName,
        connectionState: 'connected',
        latency: 0,
        lastHeartbeat: Date.now()
      }],
      maxPlayers: P2P_CONFIG.maxPlayers,
      gameState: 'lobby'
    };
    
    this.roomState = 'hosting';
    console.log(`[P2P] Room créée: ${id}`);
    
    return this.currentRoom;
  }
  
  /**
   * Rejoint une room existante.
   */
  async joinRoom(hostPeerId: string): Promise<boolean> {
    if (!this.peer) {
      await this.connect();
    }
    
    if (this.connectionState !== 'connected') {
      return false;
    }
    
    this.roomState = 'joining';
    
    try {
      const conn = this.peer!.connect(hostPeerId);
      
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          conn.close();
          this.roomState = 'none';
          resolve(false);
        }, P2P_CONFIG.connectionTimeout);
        
        conn.on('open', () => {
          clearTimeout(timeout);
          this.handleConnection(conn);
          
          // Envoyer HELLO
          this.sendTo(hostPeerId, {
            type: 'HELLO',
            senderId: this.localPlayerId,
            timestamp: Date.now(),
            payload: {
              playerName: this.localPlayerName
            }
          });
          
          this.roomState = 'joined';
          resolve(true);
        });
        
        conn.on('error', () => {
          clearTimeout(timeout);
          this.roomState = 'none';
          resolve(false);
        });
      });
    } catch {
      this.roomState = 'none';
      return false;
    }
  }
  
  /**
   * Quitte la room actuelle.
   */
  leaveRoom(): void {
    // Fermer toutes les connexions
    for (const conn of this.connections.values()) {
      conn.close();
    }
    this.connections.clear();
    this.peers.clear();
    
    this.currentRoom = null;
    this.roomState = 'none';
    this.stopLockstep();
    
    console.log('[P2P] Room quittée');
  }
  
  // ============================================================================
  // Gestion des connexions
  // ============================================================================
  
  private handleIncomingConnection(conn: IDataConnection): void {
    console.log(`[P2P] Connexion entrante de: ${conn.peer}`);
    
    conn.on('open', () => {
      this.handleConnection(conn);
    });
  }
  
  private handleConnection(conn: IDataConnection): void {
    const peerId = conn.peer;
    this.connections.set(peerId, conn);
    
    // Gérer les messages
    conn.on('data', (data: unknown) => {
      this.handleMessage(peerId, data as NetworkMessage);
    });
    
    // Gérer la déconnexion
    conn.on('close', () => {
      this.handleDisconnection(peerId);
    });
    
    conn.on('error', () => {
      this.handleDisconnection(peerId);
    });
  }
  
  private handleDisconnection(peerId: string): void {
    const peer = this.peers.get(peerId);
    
    this.connections.delete(peerId);
    this.peers.delete(peerId);
    
    if (peer) {
      this.callbacks.onPeerLeft?.(peer);
      
      // Émettre événement pour UI/HUD
      eventBus.emit('net:player-left', {
        playerId: peerId
      });
    }
    
    this.callbacks.onDisconnected?.(peerId);
    console.log(`[P2P] Peer déconnecté: ${peerId}`);
    
    // Mettre à jour la room
    if (this.currentRoom) {
      this.currentRoom.players = this.currentRoom.players.filter(
        p => p.peerId !== peerId
      );
      this.broadcastRoomUpdate();
    }
  }
  
  // ============================================================================
  // Messages
  // ============================================================================
  
  private handleMessage(senderId: string, message: NetworkMessage): void {
    switch (message.type) {
      case 'HELLO':
        this.handleHello(senderId, message);
        break;
        
      case 'HEARTBEAT':
        this.handleHeartbeat(senderId);
        break;
        
      case 'COMMAND':
        this.handleCommand(senderId, message as CommandMessage);
        break;
        
      case 'COMMANDS_BATCH':
        this.handleCommandsBatch(senderId, message as CommandsBatchMessage);
        break;
        
      case 'SNAPSHOT':
        this.handleSnapshot(message as SnapshotMessage);
        break;
        
      case 'READY':
        this.handleReady(senderId, message);
        break;
        
      case 'CHAT':
        this.callbacks.onChat?.(
          message.payload as string,
          message.senderId
        );
        break;
        
      case 'ROOM_UPDATE':
        this.handleRoomUpdate(message.payload as RoomInfo);
        break;
        
      case 'START_GAME':
        this.handleGameStart();
        break;
        
      case 'END_GAME':
        this.handleGameEnd();
        break;
    }
  }
  
  private handleHello(senderId: string, message: NetworkMessage): void {
    const payload = message.payload as { playerName: string };
    
    const peerInfo: PeerInfo = {
      peerId: senderId,
      playerId: senderId,
      playerName: payload.playerName,
      connectionState: 'connected',
      latency: 0,
      lastHeartbeat: Date.now()
    };
    
    this.peers.set(senderId, peerInfo);
    this.callbacks.onPeerJoined?.(peerInfo);
    
    // Émettre événement pour UI/HUD
    eventBus.emit('net:player-joined', {
      playerId: senderId,
      playerName: payload.playerName
    });
    
    // Mettre à jour la room
    if (this.currentRoom && this.roomState === 'hosting') {
      this.currentRoom.players.push(peerInfo);
      this.broadcastRoomUpdate();
    }
    
    console.log(`[P2P] Joueur connecté: ${payload.playerName}`);
  }
  
  private handleHeartbeat(senderId: string): void {
    const peer = this.peers.get(senderId);
    if (peer) {
      const now = Date.now();
      peer.latency = now - peer.lastHeartbeat;
      peer.lastHeartbeat = now;
    }
  }
  
  private handleCommand(senderId: string, message: CommandMessage): void {
    const { command, frameNumber } = message.payload;
    
    // Stocker pour le lockstep
    this.addCommandToFrame(frameNumber, senderId, command);
    
    // Notifier
    this.callbacks.onCommand?.(command, senderId);
  }
  
  private handleCommandsBatch(senderId: string, message: CommandsBatchMessage): void {
    const { commands, frameNumber } = message.payload;
    
    for (const command of commands) {
      this.addCommandToFrame(frameNumber, senderId, command);
      this.callbacks.onCommand?.(command, senderId);
    }
  }
  
  private handleSnapshot(message: SnapshotMessage): void {
    const { state, frameNumber } = message.payload;
    this.currentFrame = frameNumber;
    this.callbacks.onSnapshot?.(state, frameNumber);
  }
  
  private handleReady(senderId: string, message: NetworkMessage): void {
    const frameNumber = message.payload as number;
    const frame = this.frames.get(frameNumber);
    
    if (frame) {
      frame.ready.add(senderId);
      this.tryExecuteFrame(frameNumber);
    }
  }
  
  private handleRoomUpdate(room: RoomInfo): void {
    this.currentRoom = room;
    this.callbacks.onRoomUpdate?.(room);
  }
  
  private handleGameStart(): void {
    if (this.currentRoom) {
      this.currentRoom.gameState = 'playing';
    }
    this.startLockstep();
    this.callbacks.onGameStart?.();
    
    // Émettre événement pour UI/HUD
    eventBus.emit('game:start', {
      playerId: this.localPlayerId,
      playerName: this.localPlayerName
    });
  }
  
  private handleGameEnd(): void {
    if (this.currentRoom) {
      this.currentRoom.gameState = 'ended';
    }
    this.stopLockstep();
    this.callbacks.onGameEnd?.();
    
    // Émettre événement pour UI/HUD
    eventBus.emit('game:end', {
      reason: 'game_over'
    });
  }
  
  // ============================================================================
  // Envoi de messages
  // ============================================================================
  
  private sendTo(peerId: string, message: NetworkMessage): void {
    const conn = this.connections.get(peerId);
    if (conn?.open) {
      conn.send(message);
    }
  }
  
  private broadcast(message: NetworkMessage, excludeSelf: boolean = true): void {
    for (const [peerId, conn] of this.connections) {
      if (excludeSelf && peerId === this.localPlayerId) continue;
      if (conn.open) {
        conn.send(message);
      }
    }
  }
  
  /**
   * Envoie un message chat.
   */
  sendChat(message: string): void {
    this.broadcast({
      type: 'CHAT',
      senderId: this.localPlayerId,
      timestamp: Date.now(),
      payload: message
    });
  }
  
  /**
   * Diffuse une mise à jour de la room.
   */
  private broadcastRoomUpdate(): void {
    if (!this.currentRoom) return;
    
    this.broadcast({
      type: 'ROOM_UPDATE',
      senderId: this.localPlayerId,
      timestamp: Date.now(),
      payload: this.currentRoom
    });
  }
  
  /**
   * Démarre la partie (host uniquement).
   */
  startGame(): void {
    if (this.roomState !== 'hosting') {
      console.warn('[P2P] Seul le host peut démarrer');
      return;
    }
    
    if (this.currentRoom) {
      this.currentRoom.gameState = 'starting';
    }
    
    this.broadcast({
      type: 'START_GAME',
      senderId: this.localPlayerId,
      timestamp: Date.now(),
      payload: null
    });
    
    this.handleGameStart();
  }
  
  // ============================================================================
  // Lockstep
  // ============================================================================
  
  /**
   * Démarre la boucle lockstep.
   */
  private startLockstep(): void {
    if (this.lockstepTimer !== null) return;
    
    this.currentFrame = 0;
    this.frames.clear();
    
    this.lockstepTimer = window.setInterval(() => {
      this.tickLockstep();
    }, P2P_CONFIG.lockstepInterval);
    
    console.log('[P2P] Lockstep démarré');
  }
  
  /**
   * Arrête la boucle lockstep.
   */
  private stopLockstep(): void {
    if (this.lockstepTimer !== null) {
      clearInterval(this.lockstepTimer);
      this.lockstepTimer = null;
    }
  }
  
  /**
   * Tick de la boucle lockstep.
   */
  private tickLockstep(): void {
    const frameNumber = this.currentFrame + 1;
    
    // Créer la frame si nécessaire
    if (!this.frames.has(frameNumber)) {
      this.frames.set(frameNumber, {
        frameNumber,
        commands: new Map(),
        ready: new Set(),
        executed: false
      });
    }
    
    // Envoyer nos commandes locales
    if (this.localCommands.length > 0) {
      this.broadcast({
        type: 'COMMANDS_BATCH',
        senderId: this.localPlayerId,
        timestamp: Date.now(),
        payload: {
          commands: this.localCommands,
          frameNumber
        }
      });
      
      // Ajouter localement
      for (const cmd of this.localCommands) {
        this.addCommandToFrame(frameNumber, this.localPlayerId, cmd);
      }
      
      this.localCommands = [];
    }
    
    // Marquer comme prêt
    const frame = this.frames.get(frameNumber)!;
    frame.ready.add(this.localPlayerId);
    
    // Notifier les autres
    this.broadcast({
      type: 'READY',
      senderId: this.localPlayerId,
      timestamp: Date.now(),
      payload: frameNumber
    });
    
    // Essayer d'exécuter
    this.tryExecuteFrame(frameNumber);
  }
  
  /**
   * Ajoute une commande à une frame.
   */
  private addCommandToFrame(frameNumber: number, playerId: string, command: GameCommand): void {
    let frame = this.frames.get(frameNumber);
    
    if (!frame) {
      frame = {
        frameNumber,
        commands: new Map(),
        ready: new Set(),
        executed: false
      };
      this.frames.set(frameNumber, frame);
    }
    
    let playerCommands = frame.commands.get(playerId);
    if (!playerCommands) {
      playerCommands = [];
      frame.commands.set(playerId, playerCommands);
    }
    
    playerCommands.push(command);
  }
  
  /**
   * Essaie d'exécuter une frame si tous les joueurs sont prêts.
   */
  private tryExecuteFrame(frameNumber: number): void {
    const frame = this.frames.get(frameNumber);
    if (!frame || frame.executed) return;
    
    // Vérifier que tous les joueurs sont prêts
    const allPlayers = this.getAllPlayerIds();
    const allReady = allPlayers.every(id => frame.ready.has(id));
    
    if (!allReady) {
      // Vérifier le timeout
      const frameStart = this.frames.get(frameNumber - 1);
      if (frameStart) {
        const elapsed = Date.now() - frameStart.frameNumber * P2P_CONFIG.lockstepInterval;
        if (elapsed > P2P_CONFIG.lockstepTimeout) {
          // Timeout - continuer sans les joueurs manquants
          console.warn(`[P2P] Frame ${frameNumber} timeout, joueurs manquants`);
        } else {
          return; // Attendre encore
        }
      }
    }
    
    // Exécuter la frame
    this.executeFrame(frame);
  }
  
  /**
   * Exécute une frame de manière déterministe.
   */
  private executeFrame(frame: LockstepFrame): void {
    frame.executed = true;
    this.currentFrame = frame.frameNumber;
    
    // Collecter toutes les commandes dans l'ordre déterministe
    const allCommands: { playerId: string; command: GameCommand }[] = [];
    
    const sortedPlayerIds = Array.from(frame.commands.keys()).sort();
    
    for (const playerId of sortedPlayerIds) {
      const commands = frame.commands.get(playerId) || [];
      for (const command of commands) {
        allCommands.push({ playerId, command });
      }
    }
    
    // Exécuter dans l'ordre
    for (const { command, playerId } of allCommands) {
      this.callbacks.onCommand?.(command, playerId);
    }
    
    // Nettoyer les vieilles frames
    this.cleanupOldFrames();
  }
  
  /**
   * Nettoie les frames anciennes.
   */
  private cleanupOldFrames(): void {
    const minFrame = this.currentFrame - 10;
    
    for (const frameNumber of this.frames.keys()) {
      if (frameNumber < minFrame) {
        this.frames.delete(frameNumber);
      }
    }
  }
  
  /**
   * Récupère tous les IDs des joueurs.
   */
  private getAllPlayerIds(): string[] {
    const ids = [this.localPlayerId];
    for (const peer of this.peers.values()) {
      ids.push(peer.playerId);
    }
    return ids;
  }
  
  // ============================================================================
  // API pour le jeu
  // ============================================================================
  
  /**
   * Envoie une commande (sera envoyée au prochain tick lockstep).
   */
  queueCommand(command: GameCommand): void {
    this.localCommands.push(command);
  }
  
  /**
   * Envoie un snapshot de l'état (pour re-sync).
   */
  sendSnapshot(state: unknown): void {
    this.broadcast({
      type: 'SNAPSHOT',
      senderId: this.localPlayerId,
      timestamp: Date.now(),
      payload: {
        frameNumber: this.currentFrame,
        state
      }
    });
  }
  
  // ============================================================================
  // Heartbeat
  // ============================================================================
  
  private startHeartbeat(): void {
    if (this.heartbeatTimer !== null) return;
    
    this.heartbeatTimer = window.setInterval(() => {
      this.broadcast({
        type: 'HEARTBEAT',
        senderId: this.localPlayerId,
        timestamp: Date.now(),
        payload: null
      });
      
      // Vérifier les timeouts
      const now = Date.now();
      for (const [peerId, peer] of this.peers) {
        if (now - peer.lastHeartbeat > P2P_CONFIG.heartbeatTimeout) {
          console.warn(`[P2P] Heartbeat timeout: ${peerId}`);
          this.handleDisconnection(peerId);
        }
      }
    }, P2P_CONFIG.heartbeatInterval);
  }
  
  private stopHeartbeat(): void {
    if (this.heartbeatTimer !== null) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
  
  // ============================================================================
  // Utilitaires
  // ============================================================================
  
  private generatePlayerId(): PlayerId {
    return `player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private generateRoomId(): string {
    return `room-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  
  // ============================================================================
  // Getters
  // ============================================================================
  
  get playerId(): PlayerId {
    return this.localPlayerId;
  }
  
  get playerName(): string {
    return this.localPlayerName;
  }
  
  get state(): ConnectionState {
    return this.connectionState;
  }
  
  get room(): RoomInfo | null {
    return this.currentRoom;
  }
  
  get isHost(): boolean {
    return this.roomState === 'hosting';
  }
  
  get isConnected(): boolean {
    return this.connectionState === 'connected';
  }
  
  get peerCount(): number {
    return this.peers.size;
  }
  
  get frame(): number {
    return this.currentFrame;
  }
  
  // ============================================================================
  // API de compatibilité (pour GameIntegration/GameManager)
  // ============================================================================
  
  /**
   * Mise à jour périodique (appelée chaque frame).
   * Pour l'instant, pas d'action nécessaire — le lockstep fonctionne via setInterval.
   */
  update(_dt?: number): void {
    // Le lockstep et heartbeat fonctionnent via setInterval, pas besoin d'update frame.
    // Cette méthode existe pour compatibilité avec la boucle de jeu.
  }
  
  /**
   * Envoie une commande sur le réseau.
   * Alias de queueCommand() pour compatibilité GameIntegration.
   */
  sendCommand(command: GameCommand): void {
    this.queueCommand(command);
  }
  
  /**
   * Déconnecte et nettoie les ressources.
   * Alias de dispose() pour compatibilité GameIntegration.
   */
  disconnect(): void {
    this.dispose();
  }
  
  /**
   * Callback quand un peer se connecte.
   */
  onPeerConnected(callback: (peerId: string) => void): void {
    this.callbacks.onConnected = callback;
  }
  
  /**
   * Callback quand un peer se déconnecte.
   */
  onPeerDisconnected(callback: (peerId: string) => void): void {
    this.callbacks.onDisconnected = callback;
  }
  
  /**
   * Callback quand une commande est reçue.
   */
  onCommandReceived(callback: (command: GameCommand) => void): void {
    this.callbacks.onCommand = callback;
  }
  
  // ============================================================================
  // Nettoyage
  // ============================================================================
  
  /**
   * Détruit le gestionnaire P2P.
   */
  dispose(): void {
    this.stopHeartbeat();
    this.stopLockstep();
    this.leaveRoom();
    
    if (this.peer) {
      this.peer.destroy();
      this.peer = null;
    }
    
    this.connectionState = 'disconnected';
  }
}

// ============================================================================
// Singleton export
// ============================================================================

/** Instance globale du gestionnaire P2P */
export const p2pManager = new P2PManager();