import { useGameStore } from "../../stores/useGameStore";
import { BuildingManager } from "./BuildingManager";
import { Factory } from "../buildings/Factory";


export class FactoryManager extends BuildingManager {
    static getFactoryOutputPerSecond(factoryKey) {
        const efficiency = FactoryManager.getFactoryEfficiency(factoryKey);
        const factory = this.getBuilding("factories", factoryKey);
        const count = useGameStore.getState().ownedBuildings.factories[factoryKey] || 0;

        return {
            resource: factory.output.resource,
            amount: factory.output.amountPerSecond * efficiency * count
        };
    }

    static getFactory(key) {
        return new Factory(this.getBuildingConfig("factories", key));
    }
}