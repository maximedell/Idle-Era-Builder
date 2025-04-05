export function createResourceActions(set, get) {
    return {
        addResource: (key, amount) => {
            set(state => ({
                resources: {
                    ...state.resources,
                    [key]: (state.resources[key] || 0) + amount
                }
            }));
        },

        removeResource: (key, amount) => {
            set(state => ({
                resources: {
                    ...state.resources,
                    [key]: Math.max(0, (state.resources[key] || 0) - amount)
                }
            }));
        },

        setResource: (key, amount) => {
            set(state => ({
                resources: {
                    ...state.resources,
                    [key]: amount
                }
            }));
        },

        removeResources: (resourcesKeys) => {
            const state = get();
            const updatedResources = { ...state.resources };
            for (const key of resourcesKeys) {
                updatedResources[key] = 0;
            }
            set({ resources: updatedResources });
        }
    };
}
