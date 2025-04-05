import { useGameStore } from '@stores/useGameStore';
import { PopulationManager } from '@managers/PopulationManager';

export function initPopulationWatchers() {
    console.log("[initPopulationWatchers] Watcher registered");
    useGameStore.subscribe(
        state => state.freePopulation,
        (newVal, oldVal) => {
            if (newVal > 0 && newVal > oldVal) {
                PopulationManager.updateAssignments();
            }
        }
    );
    useGameStore.subscribe(
        state => state.ownedBuildings.factories,
        (newVal, oldVal) => {
            if (newVal !== oldVal) {
                PopulationManager.updateAssignments();
            }
        }
    );


}
