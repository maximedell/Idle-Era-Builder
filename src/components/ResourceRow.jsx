import { useGameStore } from '@stores/useGameStore';
import { ResourceManager } from '@managers/ResourceManager';
import { use } from 'react';

export function ResourceRow({ keyName }) {
    const outputPerMinute = useGameStore(state => state.outputPerMinuteFor[keyName] || 0);
    const count = useGameStore(state => state.resources[keyName] || 0);
    const name = ResourceManager.getName(keyName);
    return (
        <tr>
            <td className="">
                {name}
            </td>
            <td className="">
                {count}
            </td>
            <td className="">
                +{outputPerMinute ? outputPerMinute.toFixed(0) : 0}/m
            </td>
        </tr>
    );
}
