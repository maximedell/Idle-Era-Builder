export class Building {
    constructor(config) {
        this.name = config.name;
        this.cost = config.cost;
    }

    buy() {
        this.count += 1;
    }
}