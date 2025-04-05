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
                        output: { resource: "stone", amount: 5 },
                        populationRequired: 1,
                        baseProductionTime: 30,
                    },
                    woodCutter: {
                        name: "Ciseleur de bois",
                        cost: 30,
                        inputs: [], // pas d’input : production de base
                        output: { resource: "wood", amount: 2 },
                        populationRequired: 2,
                        baseProductionTime: 15,
                    },
                    spearWorkshop: {
                        name: "Atelier de fabrication de sagaies",
                        cost: 50,
                        inputs: [{ resource: "stone", amount: 1 }, { resource: "wood", amount: 1 }],
                        output: { resource: "spear", amount: 1 },
                        populationRequired: 2,
                        baseProductionTime: 60,
                    },
                    fishingCamp: {
                        name: "Camp de pêche",
                        cost: 50,
                        inputs: [], // pas d’input : production de base
                        output: { food: "fish", amount: 2 },
                        populationRequired: 2,
                        baseProductionTime: 30,
                    },
                    berryBush: {
                        name: "Buisson de baies",
                        cost: 50,
                        inputs: [], // pas d’input : production de base
                        output: { food: "berries", amount: 2 },
                        populationRequired: 1,
                        baseProductionTime: 15,
                    },
                    huntingCamp: {
                        name: "Campement de chasse",
                        cost: 50,
                        inputs: [], // pas d’input  : production de base
                        output: { food: "meat", amount: 1 },
                        populationRequired: 1,
                        baseProductionTime: 60,
                    },
                },
            },
            sellers: {
                barterMarket: {
                    name: "Marché de troc",
                    cost: 50,
                    resource: ["Pierre"],
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
        // ressources
        stone: { name: 'Pierre', sellPrice: 4 },
        wood: { name: 'Bois', sellPrice: 2 },
        spear: { name: 'Sagaie', sellPrice: 5 },

        // nourriture
        fish: { name: 'Poisson', multiplier: 1.3 },
        meat: { name: 'Viande', multiplier: 1.5 },
        berries: { name: 'Baies', multiplier: 1.2 },
    },

};
