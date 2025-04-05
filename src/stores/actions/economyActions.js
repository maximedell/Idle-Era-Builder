export function createEconomyActions(set, get) {
    return {
        addMoney: (amount) => {
            set((state) => ({ money: state.money + amount }));
        },

        spendMoney: (amount) => {
            const current = get().money;
            if (current >= amount) {
                set({ money: current - amount });
                return true;
            }
            return false;
        },

        setPassiveIncome: (amount) => {
            set({ passiveIncome: amount });
        },
    };
}
