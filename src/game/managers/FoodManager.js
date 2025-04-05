// systems/FoodManager.js
import { useGameStore } from "@stores/useGameStore";
import { GameBalance } from "../gameBalance";

export const FoodManager = {
    foodPerPersonPerSecond: 0.1,

    getFoodPolicy() {
        return useGameStore.getState().foodPolicy || "balanced"; // balanced, greedy, frugal
    },

    getSortedFoods(policy, food) {
        const entries = Object.entries(food).filter(([key, amount]) => amount > 0);

        switch (policy) {
            case "greedy":
                return entries.sort((a, b) => (GameBalance.food[b[0]].multiplier - GameBalance.food[a[0]].multiplier));
            case "frugal":
                return entries.sort((a, b) => (GameBalance.food[a[0]].multiplier - GameBalance.food[b[0]].multiplier));
            case "balanced":
            default:
                return entries.sort((a, b) => a[0].localeCompare(b[0])); // Stable order for balanced
        }
    },

    update(delta) {
        const state = useGameStore.getState();
        const totalPop = state.totalPopulation;
        const food = { ...state.food };
        const policy = this.getFoodPolicy();

        const totalNeed = totalPop * this.foodPerPersonPerSecond * delta;
        let totalConsumed = 0;
        let weightedMultiplier = 0;

        const sorted = this.getSortedFoods(policy, food);
        const perTypeNeed = policy === "balanced" ? totalNeed / sorted.length : totalNeed;

        for (const [key, amount] of sorted) {
            if (totalConsumed >= totalNeed) break;

            const available = food[key] || 0;
            const toConsume = Math.min(policy === "balanced" ? perTypeNeed : totalNeed - totalConsumed, available);

            food[key] -= toConsume;
            totalConsumed += toConsume;
            weightedMultiplier += toConsume * (GameBalance.food[key]?.multiplier || 1);
        }

        const finalMultiplier = totalConsumed > 0 ? weightedMultiplier / totalConsumed : 0.5;
        useGameStore.setState({ foodMultiplier: finalMultiplier, food });
    },

    getFoodAmount(key) {
        return useGameStore.getState().food?.[key] || 0;
    },

    addFood(key, amount) {
        useGameStore.setState((state) => {
            const current = state.food?.[key] || 0;
            return {
                food: {
                    ...state.food,
                    [key]: current + amount
                }
            };
        });
    }
};
