/**
 * ResourceManager — Gestion centralisée des ressources du joueur
 *
 * Ce module offre une interface simplifiée pour manipuler les ressources
 * (credits, metal, crystal, fuel) d'un joueur, en complément de EconomySystem.
 *
 * @module ResourceManager
 */

import type { Resources, Player } from '../../types/GameState';

/**
 * Coûts de ressources pour une opération (production, achat, etc.)
 */
export interface ResourceCost {
  credits?: number;
  metal?: number;
  crystal?: number;
  fuel?: number;
}

/**
 * Gestionnaire de ressources pour un joueur.
 * Fournit des méthodes utilitaires pour vérifier, dépenser et ajouter des ressources.
 */
export class ResourceManager {
  /**
   * Vérifie si un joueur possède suffisamment de ressources pour un coût donné.
   *
   * @param player - Le joueur à vérifier
   * @param cost - Le coût à payer
   * @returns true si le joueur a assez de ressources
   */
  static canAfford(player: Player, cost: ResourceCost): boolean {
    const { resources } = player;
    if (cost.credits && resources.credits < cost.credits) return false;
    if (cost.metal && resources.metal < cost.metal) return false;
    if (cost.crystal && resources.crystal < cost.crystal) return false;
    if (cost.fuel && resources.fuel < cost.fuel) return false;
    return true;
  }

  /**
   * Déduit les ressources du joueur (mutation en place).
   * Pré-condition : le joueur doit avoir assez de ressources (utiliser canAfford avant).
   *
   * @param player - Le joueur à débiter
   * @param cost - Le coût à déduire
   */
  static spend(player: Player, cost: ResourceCost): void {
    if (cost.credits) player.resources.credits -= cost.credits;
    if (cost.metal) player.resources.metal -= cost.metal;
    if (cost.crystal) player.resources.crystal -= cost.crystal;
    if (cost.fuel) player.resources.fuel -= cost.fuel;
  }

  /**
   * Ajoute des ressources au joueur (mutation en place).
   *
   * @param player - Le joueur à créditer
   * @param amount - Les ressources à ajouter
   */
  static add(player: Player, amount: Partial<Resources>): void {
    if (amount.credits) player.resources.credits += amount.credits;
    if (amount.metal) player.resources.metal += amount.metal;
    if (amount.crystal) player.resources.crystal += amount.crystal;
    if (amount.fuel) player.resources.fuel += amount.fuel;
  }

  /**
   * Retourne une copie des ressources du joueur (snapshot).
   *
   * @param player - Le joueur
   * @returns Une copie immuable des ressources
   */
  static snapshot(player: Player): Readonly<Resources> {
    return { ...player.resources };
  }
}