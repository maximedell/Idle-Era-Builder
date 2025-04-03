import { GameBalance } from "../gameBalance.js";
import { Era } from "../Era.js";

export const EraManager = {
    activeEraIndex: 0,
    eras: GameBalance.eras.map(config => new Era(config)),

    getCurrentEra() {
        return this.eras[this.activeEraIndex];
    },

    getEra(index) {
        return this.eras[index] || null;
    },

    getEraCount() {
        return this.eras.length;
    },

    getEraName() {
        return this.getCurrentEra().name;
    },

    nextEra() {
        if (this.activeEraIndex < this.eras.length - 1) {
            this.activeEraIndex++;
        }
    },

    reset() {
        this.activeEraIndex = 0;
    }
};
