import { useGameStore } from '@stores/useGameStore';
import { FactoryManager } from '@managers/FactoryManager';

export function initFactoryWatchers() {
    console.log("[initFactoryWatchers] Watcher registered");
    // 🏭 Met à jour la production de chaque usine si l'assignation change
    useGameStore.subscribe(
        (state) => state.ownedBuildings.factories,
        (newVal, oldVal) => {
            for (const key of Object.keys(newVal)) {
                if (newVal[key] !== oldVal?.[key]) {
                    console.log(key)
                    FactoryManager.updateTimeRequired(key);
                    const resource = FactoryManager.getBuildingConfig("factories", key).output.resource || FactoryManager.getBuildingConfig("factories", key).output.food;
                    FactoryManager.updateOutputPerMinuteFor(resource);
                }
            }
        }
    );
    // 🏭 Met à jour la production de chaque usine si le nombre d'usines change
    useGameStore.subscribe(
        (state) => state.assignedPopulation.factories,
        (newVal, oldVal) => {
            for (const key of Object.keys(newVal)) {
                if (newVal[key] !== oldVal?.[key]) {
                    FactoryManager.updateTimeRequired(key);
                    const resource = FactoryManager.getBuildingConfig("factories", key).output.resource || FactoryManager.getBuildingConfig("factories", key).output.food;
                    FactoryManager.updateOutputPerMinuteFor(resource);
                }

            }
        }
    );
}