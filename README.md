# 🧾 Game Design Document – Idle Era Builder

## 🎯 Objectif du jeu

Développer une civilisation à travers différentes ères historiques, en gérant :
- la population
- les ressources
- la production
- les ventes
- la nourriture
- la science

Le tout dans un système idle (automatisé, passif, évolutif).

---

## 🏛️ Structure générale

- Jeu divisé en **ères historiques** (Néolithique → Futur)
- Chaque ère contient :
  - des bâtiments spécifiques (logements, usines, vendeurs…)
  - des ressources propres
  - des mécaniques progressives (ex : énergie, science…)

---

## 🧱 Types de bâtiments

### 1. 🏠 Logements
- Génèrent des habitants
- Chaque habitant génère un revenu passif (`incomePerPerson`)
- Leur bonheur peut modifier ce revenu (ex : s'ils sont bien nourris)

### 2. 🏭 Usines (factories)
- Produisent des ressources à partir d’inputs (ou pas)
- Taux de production influencé par l’efficacité (`assignedPopulation / max`)
- Production ajoutée au `ResourceManager`

### 3. 🛒 Vendeurs (auto-sellers)
- Vendent automatiquement des ressources à un certain taux (`sellRatePerSecond`)
- Génèrent de l’argent en passif
- La vente est limitée par la **production réelle** de la ressource
- Une **moyenne** des ventes par seconde est utilisée pour l’affichage

### 4. 🌾 Bâtiments alimentaires (NOUVEAU)
- Produisent des ressources de type `food` (ex: blé, poisson…)
- Ces ressources ne peuvent **pas être vendues**
- Elles sont **consommées par la population** en continu
- L’état de nutrition influence :
  - Le revenu passif
  - L’efficacité de production/vente
- Exemple : une population bien nourrie donne +20% income, +10% efficacité

### 5. 🔬 Bâtiments scientifiques (FUTUR)
- Produisent des **points de science** (`sciencePerSecond`)
- Nécessitent population (et plus tard, nourriture ou énergie ?)
- Points de science utilisés pour :
  - Débloquer des **bâtiments**
  - Acheter des **bonus passifs**
  - Explorer un **arbre technologique** (à venir)

---

## 💸 Économie

- L’argent est gagné :
  - Par revenu passif (population dans logement)
  - Par vente automatique (vendeurs)
- Le **coût des bâtiments augmente exponentiellement** :
  ```js
  cost = baseCost * growthRate^count
  ```
  - `growthRate` global (ex: 1.15) ou spécifique par bâtiment

---

## 📦 Ressources

- Stock illimité pour l’instant
- Les ressources sont de 2 types :
  - `tradables` (vendables)
  - `food` (non vendables, consommées)

---

## ⚙️ Systèmes internes

| Système             | Rôle                                                                 |
|---------------------|----------------------------------------------------------------------|
| `BuildingManager`   | Gère achats, coûts, données de base                                  |
| `PopulationManager` | Gère population totale, libre, assignée                              |
| `ProductionManager` | Gère les usines et production                                         |
| `AutoSellManager`   | Gère la vente automatique, et le suivi de ventes /s                  |
| `EconomyManager`    | Calcule et applique les revenus passifs                              |
| `UIManager`         | Met à jour dynamiquement les éléments de l’interface                 |
| `ResourceManager`   | Gère ajout/retrait de ressources                                      |
| `FoodManager` (à créer) | Gère la consommation de nourriture et les bonus associés         |
| `ScienceManager` (futur) | Gère l’accumulation et l’usage des points de science           |
| `EraManager`        | Gère l’accès aux bâtiments et données de l’ère courante              |

---

## 🔁 Boucle de jeu

1. Le joueur achète un logement
2. Augmentation de la population
3. Population assignée automatiquement à :
   - usines → production → ressources
   - vendeurs → vente → argent
   - nourriture → consommation → bonus
4. Argent gagné → achat de nouveaux bâtiments
5. Cycle de progression par ères et améliorations

---

## 🧠 Améliorations futures

- ✨ Ajout d’un système de prestige (reboot avec bonus)
- 🧬 Arbre technologique visuel
- 🌍 Gestion du bonheur plus poussée
- 📈 Statistiques (production/s, consommation/s, efficacité, etc.)
- 💾 Sauvegarde + reprise avec calcul offline

---
