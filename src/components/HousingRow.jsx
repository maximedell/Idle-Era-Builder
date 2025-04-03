import { useGameStore } from "../stores/useGameStore";
import { HousingManager } from "../game/managers/HousingManager";

export function HousingRow({ keyName }) {
    const housing = HousingManager.getHousing(keyName);
    const count = useGameStore(state => state.ownedBuildings.housing[keyName] || 0);
    const price = HousingManager.getBuildingCost("housing", keyName);

    const handleClick = () => {
        const store = useGameStore.getState();
        if (store.spendMoney(price)) {
            store.addBuilding("housing", keyName);
        }
    };
    return (
        <tr>
            <td>
                {housing.name}
            </td>
            <td>

            </td>
            <td>
                {housing.incomePerPerson * count > 0 ? (housing.incomePerPerson * count) : (housing.incomePerPerson)}/s
            </td>
            <td className="fixed-col">
                {housing.population * count}
            </td>
            <td className="fixed-col">
                {count}
            </td>
            <td className="fixed-col">
                <button onClick={handleClick} className="btn btn-sm btn-outline-light">
                    {price}$
                </button>
            </td>
        </tr>
    );
}
