import { useGameStore } from '@stores/useGameStore';
import { HousingManager } from '@managers/HousingManager';

export function HousingRow({ keyName }) {
    const housing = HousingManager.getHousing(keyName);
    const count = useGameStore(state => state.ownedBuildings.housing[keyName] || 0);
    const price = HousingManager.getBuildingCost("housing", keyName);

    const handleClick = () => {
        HousingManager.purchaseBuilding(keyName);
    };
    return (
        <div className="main-list-row">
            <div className="main-list-cell main-list-name col-span-5">
                {housing.name}
            </div>

            <div className="main-list-cell">
                {housing.incomePerPerson * count > 0 ? (housing.incomePerPerson * count) : (housing.incomePerPerson)}/s
            </div>
            <div className="main-list-cell fixed-col">
                {housing.population * count > 0 ? (housing.population * count) : (housing.population)}
            </div>
            <div className="main-list-cell fixed-col">
                {count}
            </div>
            <div className="main-list-cell fixed-col">
                <button onClick={handleClick} className="btn btn-sm btn-outline-light">
                    {price}$
                </button>
            </div>
        </div>
    );
}
