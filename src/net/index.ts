/**
 * PEEJS — Network Module Index
 *
 * Export centralisé pour le networking P2P.
 */

// === P2P MANAGER ===
export {
  P2PManager,
  p2pManager,
  P2P_CONFIG,
} from './P2PManager';
export type {
  ConnectionState,
  RoomState,
  PeerInfo,
  RoomInfo,
  NetworkMessageType,
  NetworkMessage,
  CommandMessage,
  CommandsBatchMessage,
  SnapshotMessage,
  P2PCallbacks,
} from './P2PManager';

/**
 * P2PMessage — Alias vers NetworkMessage pour compatibilité
 * @deprecated Utiliser NetworkMessage directement
 */
export type P2PMessage = import('./P2PManager').NetworkMessage;

/**
 * LockstepFrame — Données d'une frame de synchronisation lockstep
 */
export interface LockstepFrame {
  /** Numéro de la frame */
  frameNumber: number;
  /** Commandes par joueur */
  commands: Map<string, import('../types/commands').GameCommand[]>;
  /** Joueurs prêts */
  ready: Set<string>;
  /** Frame exécutée */
  executed: boolean;
}