export class Era {
    constructor(config) {
        this.name = config.name;
        this.buildings = config.buildings || {};
        this.resources = config.resources || {};
        this.upgrades = config.upgrades || {};
        // Tu peux ajouter d’autres catégories plus tard (énergie, science, etc.)
    }

    /** 🔍 Récupère un bâtiment spécifique */
    getBuilding(type, key) {
        return this.buildings[type]?.[key] || null;
    }

    /** 📦 Récupère tous les bâtiments d’un type (ex: "factories") */
    getAllBuildings(type) {
        return Object.entries(this.buildings[type] || {});
    }

    /** 📋 Récupère la liste des clés de bâtiments d’un type */
    getBuildingKeys(type) {
        return Object.keys(this.buildings[type] || {});
    }

    /** 💰 Récupère une ressource par son ID */
    getResource(id) {
        return this.resources[id] || null;
    }

    /** 📦 Récupère toutes les ressources de cette ère */
    getAllResources() {
        return Object.entries(this.resources || {});
    }

    /** 📋 Renvoie toutes les ressources vendables */
    getSellableResources() {
        return Object.entries(this.resources || {})
            .filter(([_, r]) => typeof r.sellPrice === "number" && r.sellPrice > 0);
    }

    /** 🧪 Récupère le prix d’une ressource */
    getSellPrice(resourceId) {
        return this.resources[resourceId]?.sellPrice || 0;
    }

    /** 🏷️ Récupère le nom affiché d’une ressource */
    getResourceName(resourceId) {
        return this.resources[resourceId]?.name || resourceId;
    }

    /** 🎓 (optionnel) Récupère les upgrades de cette ère */
    getAllUpgrades() {
        return Object.entries(this.upgrades || {});
    }
}
