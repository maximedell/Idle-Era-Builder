import { GameBalance } from '../gameBalance.js';
import { EraManager } from './EraManager.js';
import { useGameStore } from '../../stores/useGameStore.jsx';
import { Factory, Housing, Seller } from '../buildings/index.js';

export class BuildingManager {
    static getBuildingConfig(type, key) {
        return EraManager.getCurrentEra().getBuilding(type, key);
    }

    static getBuilding(type, key) {
        switch (type) {
            case "factories":
                return new Factory(this.getBuildingConfig("factories", key));
            case "housing":
                return new Housing(this.getBuildingConfig("housing", key));
            case "sellers":
                return new Seller(this.getBuildingConfig("sellers", key));

        }
    }

    static getBuildingTypes() {
        return GameBalance.buildings.map(building => building.keyName);
    }




    static getBuildingCost(type, key) {
        const building = this.getBuildingConfig(type, key);
        const count = useGameStore.getState().ownedBuildings[type][key] || 0;
        return Math.round(building.cost * Math.pow(GameBalance.priceGrowthRate, count));
    }
}