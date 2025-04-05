export function createFactoryActions(set, get) {
    return {
        setActionTimeRequired: (factoryKey, time) =>
            set((state) => ({
                actionTimeRequired: {
                    ...state.actionTimeRequired,
                    factories: {
                        ...state.actionTimeRequired.factories,
                        [factoryKey]: time,
                    },
                },
            }
            )),

        removeActionTimeRequired: (factoryKey) =>
            set((state) => {
                const updated = { ...state.actionTimeRequired.factories };
                delete updated[factoryKey];
                return {
                    actionTimeRequired: {
                        ...state.actionTimeRequired,
                        factories: updated,
                    },
                };
            }),
        setAmountMultiplier: (factoryKey, multiplier) =>
            set((state) => ({
                amountMultiplier: {
                    ...state.amountMultiplier,
                    factories: {
                        ...state.amountMultiplier.factories,
                        [factoryKey]: multiplier,
                    },
                },
            })),
        updateFactoryOutputPerMinute: (factoryKey, value) =>
            set((state) => ({
                factoryOutputPerMinute: {
                    ...state.factoryOutputPerMinute,
                    [factoryKey]: value,
                },
            })),

        removeFactoryOutputPerMinute: (factoryKey) =>
            set((state) => {
                const updated = { ...state.factoryOutputPerMinute };
                delete updated[factoryKey];
                return { factoryOutputPerMinute: updated };
            }),
        setFactoryProgress: (factoryKey, progress) =>
            set((state) => ({
                progress: {
                    ...state.progress,
                    factories: {
                        ...state.progress.factories,
                        [factoryKey]: progress,
                    },
                },
            })),

        resetFactoryProgress: (factoryKey) =>
            set((state) => {
                const updated = { ...state.progress.factories };
                updated[factoryKey] = 0;
                return {
                    progress: {
                        ...state.progress,
                        factories: updated,
                    },
                };
            }),
        setOutputPerMinuteFor: (resourceKey, value) =>
            set((state) => ({
                outputPerMinuteFor: {
                    ...state.outputPerMinuteFor,
                    [resourceKey]: value,
                },
            })),
        removeOutputPerMinuteFor: (resourceKey) =>
            set((state) => ({
                outputPerMinuteFor: { ...state.outputPerMinuteFor },
                [resourceKey]: undefined,
            })),
        setFactoryOutputPerMinute: (factoryKey, value) =>
            set((state) => ({
                factoryOutputPerMinute: {
                    ...state.factoryOutputPerMinute,
                    [factoryKey]: value,
                },
            })),
        removeFactoryOutputPerMinute: (factoryKey) =>
            set((state) => ({
                factoryOutputPerMinute: { ...state.factoryOutputPerMinute },
                [factoryKey]: undefined,
            })),



    };

}
