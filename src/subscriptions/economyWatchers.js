import { useGameStore } from '@stores/useGameStore';
import { EconomyManager } from '@managers/EconomyManager';

export function initEconomyWatchers() {
    console.log("[initEconomyWatchers] Watcher registered");
    useGameStore.subscribe(
        state => state.totalPopulation,
        (newVal, oldVal) => {
            if (newVal > 0 && newVal !== oldVal) {
                EconomyManager.setPassiveIncome();
            }
        }
    );
}