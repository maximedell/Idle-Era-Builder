import { useGameStore } from '@stores/useGameStore';
import { GameBalance } from '@game/gameBalance';
import { EconomyManager } from '@managers/EconomyManager';

export const ResourceManager = {
    get(resourceKey) {
        return useGameStore.getState().resources[resourceKey] || 0;
    },

    getName(resourceKey) {
        return GameBalance.resources[resourceKey].name ? GameBalance.resources[resourceKey].name : resourceKey;

    },
    getKey(resourceName) {
        return Object.keys(GameBalance.resources).find(key => GameBalance.resources[key].name === resourceName);
    },
    getPrice(resourceKey) {
        const resource = GameBalance.resources[resourceKey];
        if (!resource) return 0;
        return resource.sellPrice || 0;
    },



    add(resourceKey, amount) {
        if (amount <= 0) return;
        useGameStore.getState().addResource(resourceKey, amount);

    },

    consume(resourceKey, amount) {
        const current = ResourceManager.get(resourceKey);
        const toConsume = Math.min(amount, current);

        useGameStore.getState().removeResource(resourceKey, toConsume);

        return toConsume;
    },


    isFood(resourceKey) {
        return GameBalance.resources[resourceKey].multplier !== undefined;
    },

    isResource(resourceKey) {
        return GameBalance.resources[resourceKey].sellPrice !== undefined;
    },

    getAllResources() {
        return Object.entries(useGameStore.getState().resources).filter(([key]) => this.isResource(key));
    },

    getAllFood() {
        return Object.entries(useGameStore.getState().resources).filter(([key]) => this.isFood(key));

    },

    sell(resourceKey) {
        const amount = ResourceManager.get(resourceKey);
        if (amount <= 0) return 0;

        const price = GameBalance.resources[resourceKey]?.sellPrice || 0;
        const value = amount * price;

        // Réinitialise la ressource et retourne l’argent
        useGameStore.getState().removeResource(resourceKey, amount);

        return value;
    },

    getTotalSellValue: () => {
        return this.getAllResources().reduce((total, [key, amount]) => {
            const price = GameBalance.resources[key]?.sellPrice || 0;
            return total + amount * price;
        });
    },
    sellAll() {
        let totalValue = 0;
        let removedResources = [];
        for (const [resourceKey, amount] of this.getAllResources()) {
            if (amount <= 0) continue;
            const price = GameBalance.resources[resourceKey]?.sellPrice || 0;
            if (price <= 0) continue;
            totalValue += amount * price;
            removedResources.push(resourceKey);
        }
        useGameStore.getState().removeResources(removedResources);
        EconomyManager.addMoney(totalValue);
        return totalValue;
    },

};
