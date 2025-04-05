import { useGameStore } from '@stores/useGameStore';
import { HousingManager } from '@managers/index';

export const EconomyManager = {
    /**
     * Met à jour le revenu passif du joueur.
     */
    setPassiveIncome() {
        useGameStore.getState().setPassiveIncome(this.getPassiveIncome());
    },

    getPassiveIncome() {
        let passiveIncome = 0;
        const store = useGameStore.getState();
        const housingKeys = Object.keys(store.ownedBuildings.housing || {});
        for (const key of housingKeys) {
            passiveIncome += HousingManager.getHousingIncome(key) * useGameStore.getState().ownedBuildings.housing[key] || 0;
        }
        return passiveIncome;
    },

    /**
     * Ajoute de l'argent au joueur.
     * @param {number} amount
     */
    addMoney(amount) {
        useGameStore.getState().addMoney(amount);
    },

    /**
     * Déduit de l'argent si possible.
     * @param {number} amount
     * @returns {boolean} true si payé, false sinon
     */
    spendMoney(amount) {
        return useGameStore.getState().spendMoney(amount);
    },

    /**
     * Vérifie si le joueur peut se permettre une dépense.
     * @param {number} amount
     * @returns {boolean}
     */
    canAfford(amount) {
        return useGameStore.getState().money >= amount;
    },

    /**
     * Applique le revenu passif généré par la population.
     * @param {number} delta Temps écoulé en secondes
     */
    applyPassiveIncome() {
        const income = useGameStore.getState().passiveIncome || 0;
        this.addMoney(income);
    },

};
