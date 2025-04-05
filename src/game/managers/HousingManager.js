import { BuildingManager, PopulationManager } from "./index";
import { Housing } from "../buildings/Housing";

export class HousingManager extends BuildingManager {
    static getHousing(keyName) {
        return new Housing(this.getBuildingConfig("housing", keyName));
    }
    static purchaseBuilding(key) {
        super.purchaseBuilding("housing", key);
        PopulationManager.addPopulation(this.getBuildingConfig("housing", key).population);
    }
    static getHousingIncome(key) {
        return this.getBuildingConfig("housing", key).incomePerPerson;
    }

}