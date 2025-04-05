import { useGameStore } from '@stores/useGameStore';

export function Header() {
    const money = useGameStore(state => state.money);
    const passiveIncome = useGameStore(state => state.passiveIncome);

    const handleClick = () => {
        console.log(useGameStore.getState());
    };

    return (
        <header className="text-center py-4 bg-primary text-white shadow border-b-2 border-b-gray-500 shadow-md">
            <h2 className="text-accent">
                💰 {money.toFixed(0)}$
                <span className="text-sm text-green-400"> (+{passiveIncome.toFixed(0)}/s)</span>
                <button onClick={handleClick} className='ml-4'>🛠️</button>
            </h2>

        </header>
    );
}