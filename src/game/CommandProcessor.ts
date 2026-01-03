/**
 * CommandProcessor — Traitement complet des commandes de jeu RTS
 *
 * Ce module centralise le traitement des commandes RTS (MOVE, ATTACK, BUILD, etc.)
 * en les routant vers les systèmes appropriés (unités, économie, combat).
 * 
 * Architecture:
 * - Chaque type de commande a un handler dédié
 * - Les commandes modifient le GameState de manière déterministe (lockstep)
 * - Validation des commandes avant exécution
 * - Log des commandes pour replay/debug
 *
 * @module CommandProcessor
 */

import type { GameState, Unit, SHIP_STATS, ShipClass } from '../types/GameState';
import type {
    GameCommand,
    MoveCommand,
    AttackCommand,
    PatrolCommand,
    HarvestCommand,
    BuildUnitCommand,
    StopCommand,
    SetFormationCommand,
    Position3D,
    EntityId
} from '../types/commands';
import { orderMove, orderAttack, orderStop, orderPatrol } from './units/UnitBehavior';
import { spawnUnit, canAffordUnit, deductUnitCost } from './units/UnitFactory';
import { eventBus } from '../core/EventBus';

// ============================================================================
// Types
// ============================================================================

export interface CommandResult {
    success: boolean;
    message?: string;
    affectedUnits?: EntityId[];
}

export interface CommandLog {
    command: GameCommand;
    result: CommandResult;
    frame: number;
    timestamp: number;
}

// ============================================================================
// Validation
// ============================================================================

/**
 * Vérifie qu'un joueur possède les unités spécifiées.
 */
function validateOwnership(state: GameState, unitIds: EntityId[], playerId: string): EntityId[] {
    const validIds: EntityId[] = [];
    
    for (const id of unitIds) {
        const unit = state.units.get(id);
        if (unit && unit.ownerId === playerId && unit.state !== 'DESTROYED') {
            validIds.push(id);
        }
    }
    
    return validIds;
}

/**
 * Vérifie qu'une cible existe et est valide.
 */
function validateTarget(state: GameState, targetId: EntityId): Unit | null {
    const target = state.units.get(targetId);
    if (!target || target.state === 'DESTROYED') {
        return null;
    }
    return target;
}

// ============================================================================
// Handlers de commandes
// ============================================================================

/**
 * Traite une commande MOVE.
 */
function handleMove(state: GameState, command: MoveCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    
    if (validUnits.length === 0) {
        return { success: false, message: 'No valid units to move' };
    }
    
    for (const unitId of validUnits) {
        const unit = state.units.get(unitId);
        if (unit) {
            if (command.queue) {
                // Ajouter à la file d'ordres
                unit.orderQueue.push({
                    type: 'MOVE',
                    target: command.target
                });
            } else {
                // Ordre immédiat
                orderMove(unit, command.target);
            }
        }
    }
    
    return { success: true, affectedUnits: validUnits };
}

/**
 * Traite une commande ATTACK.
 */
function handleAttack(state: GameState, command: AttackCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    const target = validateTarget(state, command.targetId);
    
    if (validUnits.length === 0) {
        return { success: false, message: 'No valid units to attack' };
    }
    
    if (!target) {
        return { success: false, message: 'Invalid target' };
    }
    
    // Vérifier que la cible n'est pas alliée
    if (target.ownerId === command.playerId) {
        return { success: false, message: 'Cannot attack own units' };
    }
    
    for (const unitId of validUnits) {
        const unit = state.units.get(unitId);
        if (unit) {
            if (command.queue) {
                unit.orderQueue.push({
                    type: 'ATTACK',
                    targetId: command.targetId
                });
            } else {
                orderAttack(unit, command.targetId);
            }
        }
    }
    
    // Émettre événement combat
    eventBus.emit('combat:started', {
        attackerIds: validUnits,
        defenderIds: [command.targetId]
    });
    
    return { success: true, affectedUnits: validUnits };
}

/**
 * Traite une commande STOP.
 */
function handleStop(state: GameState, command: StopCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    
    for (const unitId of validUnits) {
        const unit = state.units.get(unitId);
        if (unit) {
            orderStop(unit);
            unit.orderQueue = []; // Vider la file d'ordres
        }
    }
    
    return { success: true, affectedUnits: validUnits };
}

/**
 * Traite une commande PATROL.
 */
function handlePatrol(state: GameState, command: PatrolCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    
    if (validUnits.length === 0) {
        return { success: false, message: 'No valid units to patrol' };
    }
    
    if (command.waypoints.length < 2) {
        return { success: false, message: 'Patrol requires at least 2 waypoints' };
    }
    
    for (const unitId of validUnits) {
        const unit = state.units.get(unitId);
        if (unit) {
            orderPatrol(unit, command.waypoints);
        }
    }
    
    return { success: true, affectedUnits: validUnits };
}

/**
 * Traite une commande HARVEST.
 */
function handleHarvest(state: GameState, command: HarvestCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    
    // Filtrer pour ne garder que les harvesters
    const harvesters = validUnits.filter(id => {
        const unit = state.units.get(id);
        return unit && unit.shipClass === 'HARVESTER';
    });
    
    if (harvesters.length === 0) {
        return { success: false, message: 'No harvesters selected' };
    }
    
    // Vérifier que la cible est une source de ressources
    const target = state.resourceSources?.get(command.targetId);
    if (!target) {
        return { success: false, message: 'Invalid harvest target' };
    }
    
    for (const unitId of harvesters) {
        const unit = state.units.get(unitId);
        if (unit) {
            unit.state = 'HARVESTING';
            unit.targetId = command.targetId;
            
            eventBus.emit('harvest:started', {
                harvesterId: unitId,
                targetId: command.targetId
            });
        }
    }
    
    return { success: true, affectedUnits: harvesters };
}

/**
 * Traite une commande BUILD_UNIT.
 */
function handleBuildUnit(state: GameState, command: BuildUnitCommand): CommandResult {
    const player = state.players.get(command.playerId);
    if (!player) {
        return { success: false, message: 'Player not found' };
    }
    
    const structure = state.structures?.get(command.structureId);
    if (!structure || structure.ownerId !== command.playerId) {
        return { success: false, message: 'Invalid structure' };
    }
    
    // Vérifier que la structure peut produire ce type d'unité
    const shipClass = command.unitType as ShipClass;
    const stats = (state as any).SHIP_STATS?.[shipClass];
    
    if (!stats) {
        return { success: false, message: `Unknown unit type: ${command.unitType}` };
    }
    
    // Vérifier les ressources
    if (!canAffordUnit(player.resources, shipClass)) {
        return { success: false, message: 'Insufficient resources' };
    }
    
    // Déduire le coût
    deductUnitCost(player.resources, shipClass);
    
    // Ajouter à la file de production
    if (!structure.productionQueue) {
        structure.productionQueue = [];
    }
    
    for (let i = 0; i < command.count; i++) {
        structure.productionQueue.push({
            unitType: shipClass,
            progress: 0,
            totalTime: stats.buildTime
        });
    }
    
    eventBus.emit('production:started', {
        structureId: command.structureId,
        unitType: command.unitType,
        duration: stats.buildTime
    });
    
    eventBus.emit('resources:changed', {
        playerId: command.playerId,
        resources: player.resources as Record<string, number>,
        delta: stats.cost as Record<string, number>
    });
    
    return { success: true };
}

/**
 * Traite une commande SET_FORMATION.
 */
function handleSetFormation(state: GameState, command: SetFormationCommand): CommandResult {
    const validUnits = validateOwnership(state, command.unitIds, command.playerId);
    
    if (validUnits.length === 0) {
        return { success: false, message: 'No valid units for formation' };
    }
    
    // Définir le premier comme leader
    const leaderId = validUnits[0];
    
    for (const unitId of validUnits) {
        const unit = state.units.get(unitId);
        if (unit) {
            unit.formation = command.formation;
            unit.groupLeaderId = unitId === leaderId ? null : leaderId;
        }
    }
    
    return { success: true, affectedUnits: validUnits };
}

// ============================================================================
// Processeur principal
// ============================================================================

/**
 * Traite une commande et modifie l'état du jeu en conséquence.
 *
 * @param state - L'état actuel du jeu (sera muté)
 * @param command - La commande à exécuter
 * @returns Résultat de l'exécution
 */
export function processCommand(state: GameState, command: GameCommand): CommandResult {
    switch (command.type) {
        case 'MOVE':
            return handleMove(state, command as MoveCommand);

        case 'ATTACK':
            return handleAttack(state, command as AttackCommand);

        case 'STOP':
            return handleStop(state, command as StopCommand);

        case 'PATROL':
            return handlePatrol(state, command as PatrolCommand);

        case 'HARVEST':
            return handleHarvest(state, command as HarvestCommand);

        case 'BUILD_UNIT':
            return handleBuildUnit(state, command as BuildUnitCommand);

        case 'SET_FORMATION':
            return handleSetFormation(state, command as SetFormationCommand);

        case 'CANCEL_BUILD':
            // TODO: Annuler la production en cours
            return { success: true, message: 'Not implemented yet' };

        case 'MOVE_TO_SYSTEM':
            // TODO: Gérer le déplacement inter-système
            return { success: true, message: 'Not implemented yet' };

        case 'ATTACK_MOVE':
            // Similaire à MOVE mais avec engagement automatique
            return { success: true, message: 'Not implemented yet' };

        case 'HOLD_POSITION':
            // Similaire à STOP mais avec attaque auto
            return { success: true, message: 'Not implemented yet' };

        case 'DEFEND':
            // Défendre une cible alliée
            return { success: true, message: 'Not implemented yet' };

        case 'BUILD_STRUCTURE':
            // Construire une structure
            return { success: true, message: 'Not implemented yet' };

        case 'SET_RALLY':
            // Point de ralliement
            return { success: true, message: 'Not implemented yet' };

        case 'DOCK':
            // Amarrage
            return { success: true, message: 'Not implemented yet' };

        case 'UNDOCK':
            // Désamarrage
            return { success: true, message: 'Not implemented yet' };

        default:
            console.warn(`[CommandProcessor] Unknown command type: ${(command as GameCommand).type}`);
            return { success: false, message: 'Unknown command type' };
    }
}

/**
 * Classe CommandProcessor pour usage orienté objet.
 * Garde un historique des commandes pour replay/debug.
 */
export class CommandProcessor {
    private commandLog: CommandLog[] = [];
    private maxLogSize = 1000;
    
    /**
     * Traite une commande sur l'état donné.
     */
    process(state: GameState, command: GameCommand): CommandResult {
        const result = processCommand(state, command);
        
        // Logger la commande
        this.commandLog.push({
            command,
            result,
            frame: state.currentFrame,
            timestamp: Date.now()
        });
        
        // Limiter la taille du log
        if (this.commandLog.length > this.maxLogSize) {
            this.commandLog.shift();
        }
        
        return result;
    }
    
    /**
     * Retourne l'historique des commandes.
     */
    getCommandLog(): readonly CommandLog[] {
        return this.commandLog;
    }
    
    /**
     * Vide l'historique.
     */
    clearLog(): void {
        this.commandLog = [];
    }
}