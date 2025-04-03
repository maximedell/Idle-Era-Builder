import { useEffect, useRef } from "react";
import { useGameStore } from "../stores/useGameStore";

// Tu peux créer des fonctions séparées si tu préfères les extraire
function applyPassiveIncome(delta) {
    const income = useGameStore.getState().passiveIncome;
    useGameStore.getState().addMoney(income * delta);
}

function updateProduction(delta) {
    // Ex : appelle ProductionManager ici
}

export function GameLoop() {
    const lastUpdate = useRef(performance.now());

    useEffect(() => {
        let frameId;

        const loop = (now) => {
            const delta = (now - lastUpdate.current) / 1000;
            lastUpdate.current = now;

            // 🧠 Logique du jeu à chaque tick
            applyPassiveIncome(delta);
            updateProduction(delta);

            // 🔁 Boucle continue
            frameId = requestAnimationFrame(loop);
        };

        // ✅ Démarrer la boucle
        frameId = requestAnimationFrame(loop);

        // 🧹 Nettoyage à la destruction
        return () => cancelAnimationFrame(frameId);
    }, []);

    return null; // Ce composant est "invisible" à l'écran
}
