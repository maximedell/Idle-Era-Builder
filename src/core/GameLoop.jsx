import { useEffect, useRef } from 'react';
import { useGameStore } from '@stores/useGameStore';
import { applyTick, applySecond } from '@core/gameTick';

export function GameLoop() {
    const lastUpdate = useRef(performance.now());
    console.log("[GameLoop] Game loop started");

    useEffect(() => {
        let frameId;

        const loop = (now) => {
            const delta = (now - lastUpdate.current) / 1000;
            lastUpdate.current = now;
            const currentBuffer = useGameStore.getState().productionBuffer || 0;
            const newBuffer = currentBuffer + delta;

            let leftover = newBuffer; // ✅ Initialisation par défaut

            applyTick(delta);
            if (newBuffer >= 1) {
                const ticks = Math.floor(newBuffer);
                leftover = newBuffer - ticks;

                for (let i = 0; i < ticks; i++) {
                    applySecond();
                }
            }

            // ✅ Toujours update le buffer (même s’il n’a pas encore atteint 1s)
            useGameStore.setState(state => ({
                ...state,
                productionBuffer: leftover
            }));

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frameId);
    }, []);

    return null;
}