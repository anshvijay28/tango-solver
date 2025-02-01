import { useEffect } from "react";

function LockButton({ setGrid, lockedClicks, setLockedClicks }) {
    
    useEffect(() => {
        // lock cells
        setGrid((prevGrid) =>
            prevGrid.map((row) =>
                row.map((cell) =>
                    cell.symbol ? { ...cell, locked: lockedClicks % 2 } : cell
                )
            )
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lockedClicks]);

    const handleLock = () => {
        // update locked state
        setLockedClicks(lockedClicks + 1);
    }

	return (
		<button
			onClick={handleLock}
			className="inline-flex h-16 items-center justify-center rounded-md bg-neutral-950 px-8 font-semibold text-xl text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95 mt-6"
		>
            {lockedClicks % 2 ? "Unlock" : "Lock"}
		</button>
	);
}

export default LockButton;