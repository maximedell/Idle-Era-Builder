import { useGameStore } from "../../stores/useGameStore";
import { BuildingManager } from "./BuildingManager";
import { Housing } from "../buildings/Housing";

export class HousingManager extends BuildingManager {
    static getHousing(keyName) {
        return new Housing(this.getBuildingConfig("housing", keyName));
    }
}