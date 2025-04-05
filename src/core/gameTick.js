import { FactoryManager, EconomyManager } from '@managers/index';
export function applyTick(delta) {
    FactoryManager.updateFactoryProgress(delta);
}
export function applySecond() {
    EconomyManager.applyPassiveIncome();
}