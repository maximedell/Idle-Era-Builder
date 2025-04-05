export function createBuildingActions(set, get) {
    return {
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
    };
};