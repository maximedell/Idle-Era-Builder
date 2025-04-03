import { Header } from "../components/Header.jsx";
import { FactoryRow } from "../components/FactoryRow.jsx";
import { HousingRow } from "../components/HousingRow.jsx";
import { EraManager } from "../game/managers/EraManager.js";

function Index() {
    const FactoryKeys = EraManager.getCurrentEra().getBuildingKeys("factories");
    const HousingKeys = EraManager.getCurrentEra().getBuildingKeys("housing");
    return (
        <div className="flex flex-col min-h-screen max-w-5xl mx-auto w-full bg-primary">
            <Header />
            <div className="flex text-secondary">
                <div className="flex w-52 border border-gray-500 rounded-xs p-4 mt-4 ml-4 shadow-md ">
                    <h1>Sidebar</h1>
                </div>
                <div className="flex flex-col border border-gray-500 rounded-xs p-4 mt-4 ml-4 mr-4 shadow-md flex-grow">
                    <div className="flex flex-col w-full">
                        <h2 className="mt-4">Listes des usines</h2>
                        <table className="building-table">
                            <thead>
                                <tr>
                                    <th className="text-left">Nom</th>
                                    <th className="text-left">Entrées</th>
                                    <th className="text-left">Sorties</th>
                                    <th className="text-right fixed-col">Population</th>
                                    <th className="text-right fixed-col">Nombre</th>
                                    <th className="text-right fixed-col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {FactoryKeys.map(keyName => (
                                    <FactoryRow
                                        keyName={keyName}
                                    >

                                    </FactoryRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col w-full">
                        <h2 className="mt-4">Listes des habitations</h2>
                        <table className="building-table">
                            <thead>
                                <tr>
                                    <th className="text-left">Nom</th>
                                    <th></th>
                                    <th className="text-left">Revenu</th>
                                    <th className="text-right fixed-col">Population</th>
                                    <th className="text-right fixed-col">Nombre</th>
                                    <th className="text-right fixed-col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {HousingKeys.map(keyName => (
                                    <HousingRow
                                        keyName={keyName}
                                    >
                                    </HousingRow>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Index;