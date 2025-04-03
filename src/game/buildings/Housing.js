import { Building } from './Building.js';

export class Housing extends Building {
    constructor(config) {
        super(config);
        this.population = config.population;
        this.incomePerPerson = config.incomePerPerson;
    }


}