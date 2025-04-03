import { Building } from './Building.js';

export class Factory extends Building {
    constructor(config) {
        super(config);
        this.inputs = config.inputs || [];
        this.output = config.output;
        this.populationRequired = config.populationRequired || 0;
        this.energyRequired = config.energyRequired || 0;
    }

}