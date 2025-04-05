// game/systems/PopulationManager.js
import { useGameStore } from '@stores/useGameStore';
import { FactoryManager, EraManager } from '@managers/index';

export const PopulationManager = {
    /**
     * Répartition de population selon la politique actuelle
     */
    updateAssignments() {
        const policy = useGameStore.getState().populationPolicy;

        switch (policy) {
            case "balanced":
                this.assignAutoBalanced();
                break;
            case "manual":
                // Ne rien faire
                break;
            // D'autres politiques à ajouter plus tard (food-first, etc)
        }
    },

    /**
     * Répartition automatique équilibrée entre tous les bâtiments
     */
    assignAutoBalanced() {
        const state = useGameStore.getState();
        const free = state.freePopulation;

        const factories = EraManager.getCurrentEra().getBuildingKeys("factories");
        let remaining = free;
        let toAssign = {};

        for (const key of factories) {
            const count = state.ownedBuildings.factories[key] || 0;
            const config = FactoryManager.getBuildingConfig("factories", key);
            const asigned = state.assignedPopulation.factories[key] || 0;
            const max = config.populationRequired * count - asigned;
            if (max <= 0) continue;
            const assignable = Math.min(remaining, max);
            if (assignable <= 0) continue;
            state.assignPopulationTo("factories", key, assignable);
            remaining -= assignable;
            if (remaining <= 0) break;
        }
    },

    addPopulation(amount) {
        useGameStore.getState().addPopulation(amount);
    }


};
