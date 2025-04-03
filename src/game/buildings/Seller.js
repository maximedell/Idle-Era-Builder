import { Building } from './Building.js';

export class Seller extends Building {
    constructor(config) {
        super(config);
        this.sellRatePerSecond = config.sellRatePerSecond;
        this.populationRequired = config.populationRequired || 0;
        this.energyRequired = config.energyRequired || 0;
        this.assignedPopulation = 0;
        this.resource = config.resource || null;
    }


}
