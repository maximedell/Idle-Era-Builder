import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import {
    createEconomyActions,
    createPopulationActions,
    createFactoryActions,
    createBuildingActions,
    createResourceActions
} from '@stores/actions/index';
console.log("[Store] useGameStore loaded");
export const useGameStore = create(
    subscribeWithSelector((set, get) => ({
        money: 1000,
        passiveIncome: 0,
        era: 0,
        productionBuffer: 0,
        // bâtiments possédés
        ownedBuildings: {
            housing: {},
            factories: {},
            sellers: {}
        },
        assignedPopulation: {
            factories: {},
            sellers: {}
        },
        buildingProgress: {
            factories: {},
            sellers: {}
        },
        actionTimeRequired: {
            factories: {},
            sellers: {}
        },
        amountMultipliers: {
            factories: {},
            sellers: {}
        },
        progress: {
            factories: {},
            sellers: {}
        },
        upgrades: {
            factories: {},
            sellers: {}
        },



        // output
        resourceOutputPerMinute: {
        },

        factoryOutputPerMinute: {
        },

        // politiques

        populationPolicy: "balanced", // balanced, manual, food-first, etc
        foodPolicy: "balanced", // balanced, frugal, greedy, etc


        // ressources en stock
        resources: {},

        // population
        totalPopulation: 0,
        freePopulation: 0,

        // --- Actions ---
        ...createEconomyActions(set, get),
        ...createPopulationActions(set, get),
        ...createFactoryActions(set, get),
        ...createBuildingActions(set, get),
        ...createResourceActions(set, get),

    })));
