import { useGameStore } from '@stores/useGameStore';
import { BuildingManager } from '@managers/BuildingManager';
import { EraManager } from '@managers/EraManager';
import { ResourceManager } from '@managers/ResourceManager';
import { GameBalance } from '../gameBalance';
import { act } from 'react';


export class FactoryManager extends BuildingManager {
    /**
     * Calculate and update the amount of output per minute of a factory (UI)
     * @param {*} factoryKey Key of the factory
     * @returns Amount of output per minute of the factory
     */
    static updateFactoryOutputPerMinute(factoryKey) {
        const state = useGameStore.getState();
        const timeRequired = state.actionTimeRequired.factories[factoryKey] || 0;
        if (timeRequired === 0) {
            return 0;
        }
        const amountMultiplier = state.amountMultipliers.factories[factoryKey] || 1;
        const config = this.getBuilding("factories", factoryKey);
        const baseOutput = config.output.amount || 0;
        const output = (baseOutput * amountMultiplier) / timeRequired * 60;
        state.setFactoryOutputPerMinute(factoryKey, output);
        console.log("[FactoryManager] updateFactoryOutputPerMinute", factoryKey, output);
        return output;
    }


    /**
     * Get the total output per second of all factories producing a specific resource.
     * And update the resourceOutputPerSecond state.
     * Used for UI purposes.
     * Watchers required:
     * -> actionTimeRequired.factories if output.resource === resourceKey
     * -> amountMultipliers.factories if output.resource === resourceKey
     * @param {*} resourceKey
     * 
     */
    static updateOutputPerMinuteFor(resourceKey) {
        const producers = this.getAllProducersFor(resourceKey);
        const state = useGameStore.getState();
        let totalOutput = 0;
        for (const [key] of producers) {
            const timeRequired = state.actionTimeRequired.factories[key] || 0;
            const baseOutput = this.getBuildingConfig("factories", key).output.amount || 0;
            const amountMultiplier = state.amountMultipliers.factories[key] || 1;
            this.updateFactoryOutputPerMinute(key);
            totalOutput += (baseOutput * amountMultiplier) / timeRequired * 60;
        }
        console.log("[FactoryManager] updateOutputPerMinuteFor", resourceKey, totalOutput);
        state.setOutputPerMinuteFor(resourceKey, totalOutput);
    }

    /**
     * Get all factories producing a specific resource
     * @param {*} resourceKey
     * @returns Array of factories producing the resource
     */
    static getAllProducersFor(resourceKey) {
        const factories = useGameStore.getState().ownedBuildings.factories;
        return Object.keys(factories).filter(key => {
            const config = this.getBuildingConfig("factories", key);
            return config.output?.resource === resourceKey || config.output?.food === resourceKey;
        }).map((key) => [key]);
    }

    /**
      * Get the production factor of a specific factory.
      * @param {string} factoryKey
       * @returns {number} Production factor of the factory
     */
    static getProductionFactor(factoryKey) {
        const state = useGameStore.getState();
        const config = this.getBuildingConfig("factories", factoryKey);
        const assigned = state.assignedPopulation.factories[factoryKey] || 0;
        const count = state.ownedBuildings.factories[factoryKey] || 0;
        const max = config.populationRequired * count;
        const productionFactor = count * (assigned / max);
        return productionFactor;
    }


    /**
     * TODO: Apply passive and tech upgrades here
     * Watchers required:
     * -> upgrades.factories
     * @param {*} factoryKey 
     */
    static updateAmountMultiplier(factoryKey) {
        return; // TODO
        const state = useGameStore.getState();
        let multiplier = state.factoryMultipliers[factoryKey] || 1;
        for (const upgrade in state.upgrades.factories) {
            if (upgrade.all || upgrade.some.include(factoryKey)) {
                if (upgrade.type === "additive") multiplier += state.upgrades.factories[upgrade].multiplier;
                if (upgrade.type === "multiplicative") multiplier *= state.upgrades.factories[upgrade].multiplier;
            }
        }
        state.setAmountMultiplier("factories", factoryKey, multiplier);
    }


    /**
     * Calculate and update the time required to produce a factory's output
     * Watchers required:
     * -> the assigned population
     * -> the number of factories owned
     * @param {*} factoryKey 
     */
    static updateTimeRequired(factoryKey) {
        const state = useGameStore.getState();
        const productionFactor = this.getProductionFactor(factoryKey);
        const baseProductionTime = this.getBuildingConfig("factories", factoryKey).baseProductionTime || 0;
        if (productionFactor === 0) {
            console.log("[FactoryManager] updateTimeRequired", factoryKey, "0 production factor, removing time required");
            state.setActionTimeRequired(factoryKey, 0);
            return;
        }
        const actionTimeRequired = baseProductionTime / productionFactor
        console.log("[FactoryManager] updateTimeRequired", factoryKey, actionTimeRequired);
        state.setActionTimeRequired(factoryKey, actionTimeRequired);
    }



    // Utility functions
    static isFoodProducer(factoryKey) {
        return !!this.getBuildingConfig("factories", factoryKey).output?.food;
    }
    static isResourceProducer(factoryKey) {
        return !!this.getBuildingConfig("factories", factoryKey).output?.resource;
    }


    /**
     * * Update the production progress of all factories.
     *  Applied in the game loop.
     * @param {*} delta 
     */
    static updateFactoryProgress(delta) {
        const state = useGameStore.getState();

        for (const factoryKey in state.ownedBuildings.factories) {
            const timeRequired = state.actionTimeRequired.factories[factoryKey] || 0;
            if (timeRequired === 0) continue;
            const config = this.getBuildingConfig("factories", factoryKey);
            const progress = state.progress.factories[factoryKey] || 0;
            const newProgress = progress + delta;
            const amountMultiplier = state.amountMultipliers.factories[factoryKey] || 1;
            if (newProgress >= timeRequired) {
                // Produire
                ResourceManager.add(config.output.resource ? config.output.resource : config.output.food, config.output.amount * amountMultiplier);
                useGameStore.getState().resetFactoryProgress(factoryKey);
            } else {
                useGameStore.getState().setFactoryProgress(factoryKey, newProgress);
            }
        }
    }


}
