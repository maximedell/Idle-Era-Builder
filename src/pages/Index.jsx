import { Header } from "@components/Header";
import { FactoryRow } from "@components/FactoryRow";
import { HousingRow } from "@components/HousingRow";
import { EraManager } from "@managers/EraManager";
import { FactoryManager, ResourceManager } from "@managers/index";
import { useGameStore } from "@stores/useGameStore";
import { GameBalance } from "@game/gameBalance";
import { ResourceRow } from "@components/ResourceRow";

function Index() {
    const factoryKeys = EraManager.getCurrentEra().getBuildingKeys("factories");
    const foodFactories = factoryKeys.filter(key => FactoryManager.isFoodProducer(key));
    const resourceFactories = factoryKeys.filter(key => FactoryManager.isResourceProducer(key));
    const housingKeys = EraManager.getCurrentEra().getBuildingKeys("housing");
    const totalPopulation = useGameStore(state => state.totalPopulation);
    const freePopulation = useGameStore(state => state.freePopulation);
    const allResources = useGameStore((state) => state.resources);
    const totalValue = Object.entries(allResources).reduce((acc, [key, quantity]) => {
        return acc + ResourceManager.getPrice(key) * quantity;
    }, 0);
    const foodKeys = Object.keys(allResources).filter(
        (key) => GameBalance.resources[key]?.multiplier
    );
    const resourceKeys = Object.keys(allResources).filter(
        (key) => GameBalance.resources[key]?.sellPrice
    );
    const handleClick = () => {
        ResourceManager.sellAll();
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary max-w-7xl mx-auto">
            <Header />
            <div className="flex">

                {/* SIDEBAR */}
                <div className="flex flex-col w-96  border-gray-500 rounded-xs shadow-md mr-5">

                    {/* POPULATION */}
                    <div className="mt-4 p-0">
                        <h2 className="text-center border-b-2 border-gray-500">Population</h2>
                        <p className="mt-4">Totale: {totalPopulation}</p>
                        <p>Libre: {freePopulation}</p>
                    </div>

                    {/* FOOD */}
                    <div className="mt-4 p-0">
                        <h2 className="text-center">Nourriture</h2>
                        <table className="building-table">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs">Nom</th>
                                    <th className="text-left text-xs">Quantité</th>
                                    <th className="text-left text-xs">Production</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foodKeys.map((keyName) => (
                                    <ResourceRow key={keyName} keyName={keyName} />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* RESOURCES */}
                    <div className="mt-4 p-0">
                        <div className="flex flex-col items-center">
                            <h2 className="text-center">Ressources</h2>
                            <button onClick={handleClick} className="">Vendre tout {totalValue}$ </button>
                        </div>

                        <table className="building-table">
                            <thead>
                                <tr>
                                    <th className="text-left text-xs">Nom</th>
                                    <th className="text-left text-xs">Quantité</th>
                                    <th className="text-left text-xs">Production</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resourceKeys.map((keyName) => (
                                    <ResourceRow key={keyName} keyName={keyName} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex flex-col ">

                    {/* HOUSING LIST */}
                    <div className="list-container">
                        <h2 className="mt-4">Logement</h2>
                        <div className="main-list">
                            <div className="main-list-header">
                                <p className="main-list-header-element main-list-name col-span-5">Nom</p>
                                <p className="main-list-header-element">Revenu</p>
                                <p className="main-list-header-element fixed-col">Population</p>
                                <p className="main-list-header-element fixed-col">Nombre</p>
                                <p className="main-list-header-element fixed-col"></p>
                            </div>
                            {housingKeys.map(keyName => (
                                <HousingRow keyName={keyName} />
                            ))}
                        </div>
                    </div>

                    {/* FOOD PRODUCER LIST */}
                    <div className="list-container">
                        <h2 className="mt-4">Production de nourriture</h2>
                        <div className="main-list">
                            <div className="main-list-header">
                                <p className="main-list-header-element main-list-name">Nom</p>
                                <p className="main-list-header-element">Entrées</p>
                                <p className="main-list-header-element">Produit</p>
                                <p className="main-list-header-element fixed-col">Durée</p>
                                <p className="main-list-header-element fixed-col">Population</p>
                                <p className="main-list-header-element fixed-col">Nombre</p>
                                <p className="main-list-header-element fixed-col"></p>
                            </div>

                            {foodFactories.map(keyName => (
                                <FactoryRow
                                    keyName={keyName}
                                >

                                </FactoryRow>
                            ))}
                        </div>
                    </div>

                    {/* RESOURCE PRODUCER LIST */}
                    <div className="list-container">
                        <h2 className="mt-4">Production de ressources</h2>
                        <div className="main-list">
                            <div className="main-list-header">
                                <p className="main-list-header-element main-list-name">Nom</p>
                                <p className="main-list-header-element">Entrées</p>
                                <p className="main-list-header-element">Produit</p>
                                <p className="main-list-header-element fixed-col">Durée</p>
                                <p className="main-list-header-element fixed-col">Population</p>
                                <p className="main-list-header-element fixed-col">Nombre</p>
                                <p className="main-list-header-element fixed-col">Acheter</p>
                            </div>
                            {resourceFactories.map(keyName => (
                                <FactoryRow
                                    keyName={keyName}
                                >

                                </FactoryRow>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div >
    )
}


export default Index;