import { initFactoryWatchers } from '@subscriptions/factoryWatchers';
import { initPopulationWatchers } from '@subscriptions/populationWatchers';
import { initEconomyWatchers } from '@subscriptions/economyWatchers';
let watchersInitialized = false;
export function initWatchers() {
    if (watchersInitialized) return;
    console.log("[Watcher Init]");
    watchersInitialized = true;

    initFactoryWatchers();
    initPopulationWatchers();
    initEconomyWatchers();
}