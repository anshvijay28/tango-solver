function ConfigButton({ text }) {
	const handleSolve = () => {
		console.log("solve");
	};

	return (
		<button
			onClick={handleSolve}
			className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 mt-5"
		>
			{text}
		</button>
	);
}

export default ConfigButton;

// clear will need grid and setGrid
// solve will need, grid, setGrid, and signs