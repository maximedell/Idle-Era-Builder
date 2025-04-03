import { useGameStore } from "../stores/useGameStore";
import { FactoryManager } from "../game/managers/FactoryManager";

export function FactoryRow({ keyName }) {
    const count = useGameStore(state => state.ownedBuildings.factories[keyName] || 0);
    const assigned = useGameStore(state => state.assignedPopulation.factories[keyName] || 0);
    const factory = FactoryManager.getFactory(keyName);
    const price = FactoryManager.getBuildingCost("factories", keyName);
    const efficiency = (factory.populationRequired * count) === 0 ? 0 : Math.min(1, assigned / (factory.populationRequired * count));
    const handleClick = () => {
        const store = useGameStore.getState();
        if (store.spendMoney(price)) {
            store.addBuilding("factories", keyName);
        }
    };

    return (
        <tr>
            <td>{factory.name}</td>
            <td>
                {factory.inputs?.length > 0 ? (
                    factory.inputs.map((input, idx) => (
                        <div key={idx}>
                            {efficiency ? (input.amount * efficiency).toFixed(2) : input.amount}/s {input.resource}
                        </div>
                    ))
                ) : (
                    "—"
                )}
            </td>
            <td>
                {efficiency ? (factory.output.amount * efficiency).toFixed(2) : factory.output.amount}/s {factory.output.resource}
            </td>
            <td className="fixed-col">{assigned}/{factory.populationRequired * count}</td>
            <td className="fixed-col">{count}</td>
            <td className="fixed-col">
                <button onClick={handleClick} className="btn btn-sm btn-outline-light">
                    {price}$
                </button>
            </td>
        </tr>
    );
}
