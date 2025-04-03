export const GameBalance = {
    priceGrowthRate: 1.25,
    eras: [
        {
            name: "Néolithique",
            unlockCost: 0,
            buildings: {
                housing: {
                    mudHut: {
                        name: "Hutte en terre",
                        cost: 10,
                        population: 2,
                        incomePerPerson: 1
                    }
                },
                factories: {
                    stoneExtractor: {
                        name: "Extracteur de pierre",
                        cost: 20,
                        inputs: [], // pas d’input : production de base
                        output: { resource: "Pierre", amount: 0.5 },
                        populationRequired: 1
                    },
                    woodCutter: {
                        name: "Ciseleur de bois",
                        cost: 30,
                        inputs: [], // pas d’input : production de base
                        output: { resource: "Bois", amount: 1 },
                        populationRequired: 2
                    },

                }
            },
            sellers: {
                barterMarket: {
                    name: "Marché de troc",
                    cost: 50,
                    resource: "Baies",
                    sellRate: 1,
                    populationRequired: 1
                },
            },
            energyBuildings: {
                // Rien à cette époque
            }
        }

    ],
    resources: {
        stone: { name: 'Pierre', sellPrice: 4 },
        wood: { name: 'Bois', sellPrice: 2 },
    }
};
