import { useGameStore } from '@stores/useGameStore';
import { FactoryManager } from '@managers/FactoryManager';
import { ResourceManager } from '@managers/ResourceManager';

export function FactoryRow({ keyName }) {
    const count = useGameStore(state => state.ownedBuildings.factories[keyName] || 0);
    const outputPerSecond = useGameStore(state => state.factoryOutputPerMinute[keyName] || 0);
    const assigned = useGameStore(state => state.assignedPopulation.factories[keyName] || 0);
    const price = FactoryManager.getBuildingCost("factories", keyName);
    const factory = FactoryManager.getBuildingConfig("factories", keyName);
    const progress = useGameStore(state => state.progress.factories[keyName] || 0);
    const actionTimeRequired = useGameStore(state => state.actionTimeRequired.factories[keyName] || 0);
    const handleClick = () => {
        FactoryManager.purchaseBuilding("factories", keyName);
    };

    return (
        <>

            <div className="main-list-row">
                <p className='main-list-cell main-list-name'>{factory.name}</p>
                <p className='main-list-cell'>
                    {factory.inputs && factory.inputs.length > 0 ? (
                        factory.inputs.map((input, index) => (
                            <span key={index}>
                                {input.amount} {ResourceManager.getName(input.resource)}
                                {index < factory.inputs.length - 1 && " + "}
                            </span>
                        ))
                    ) : (
                        "—"
                    )}
                </p>
                <p className='main-list-cell'>
                    {outputPerSecond === 0 ? factory.output.amount : outputPerSecond.toFixed(0)} {factory.output.resource ? ResourceManager.getName(factory.output.resource) : ResourceManager.getName(factory.output.food)}
                </p>
                <p className='main-list-cell fixed-col'>{actionTimeRequired ? actionTimeRequired.toFixed(1) : factory.baseProductionTime}s</p>
                <p className='main-list-cell fixed-col'>{assigned}/{factory.populationRequired * count}</p>
                <p className='main-list-cell fixed-col'>{count}</p>
                <p className='main-list-cell fixed-col'>
                    <button onClick={handleClick} className="btn btn-sm btn-outline-light">
                        {price}$
                    </button>
                </p>
            </div>
            <div className="progress-bar-container" ><div className='progress-bar' style={{ "width": + progress / actionTimeRequired * 100 + "%" }}></div></div >
        </>
    );
}
