import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
    money: 1000,
    passiveIncome: 0,
    era: 0,

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


    // ressources en stock
    resources: {},

    // population
    totalPopulation: 0,
    freePopulation: 0,

    // --- Actions ---
    addMoney: (amount) => set(state => ({ money: state.money + amount })),
    spendMoney: (amount) => {
        const current = get().money;
        if (current >= amount) {
            set({ money: current - amount });
            return true;
        }
        return false;
    },

    // Ajout d’un bâtiment
    addBuilding: (type, key) => {
        const currentCount = get().ownedBuildings[type]?.[key] || 0;
        set(state => ({
            ownedBuildings: {
                ...state.ownedBuildings,
                [type]: {
                    ...state.ownedBuildings[type],
                    [key]: currentCount + 1
                }
            }
        }));
    },
    addPopulation: (amount) => set(state => ({
        totalPopulation: state.totalPopulation + amount,
        freePopulation: state.freePopulation + amount
    })),
}));
