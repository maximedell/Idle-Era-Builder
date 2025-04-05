export function createPopulationActions(set, get) {
    return {
        addPopulation: (amount) => {
            set((state) => ({
                totalPopulation: state.totalPopulation + amount,
                freePopulation: state.freePopulation + amount,
            }));
        },

        assignPopulationTo: (type, key, amount) => {
            set((state) => {
                const available = state.freePopulation;
                const assignable = Math.min(amount, available);

                return {
                    assignedPopulation: {
                        ...state.assignedPopulation,
                        [type]: {
                            ...state.assignedPopulation[type],
                            [key]:
                                (state.assignedPopulation[type]?.[key] || 0) + assignable,
                        },
                    },
                    freePopulation: state.freePopulation - assignable,
                };
            });
        },

        unassignPopulationFrom: (type, key, amount) => {
            set((state) => {
                const currentAssigned = state.assignedPopulation[type]?.[key] || 0;
                const toUnassign = Math.min(currentAssigned, amount);

                return {
                    assignedPopulation: {
                        ...state.assignedPopulation,
                        [type]: {
                            ...state.assignedPopulation[type],
                            [key]: currentAssigned - toUnassign,
                        },
                    },
                    freePopulation: state.freePopulation + toUnassign,
                };
            });
        },
    };
}
