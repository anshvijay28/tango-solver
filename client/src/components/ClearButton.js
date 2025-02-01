function ClearButton({ setGrid, setSigns }) {
	const handleClear = () => {
		// clear cells
		const newGrid = Array.from({ length: 6 }, (_, r) =>
			Array.from({ length: 6 }, (_, c) => ({
				bgColor: "#F9F9F9",
				row: r,
				col: c,
				symbol: 0,
				error: false,
			}))
		);
		setGrid(newGrid);

		// clear symbols
		const newSigns = Array.from({ length: 6 }, () =>
			Array.from({ length: 6 }, () => ({
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			}))
		);
		setSigns(newSigns);
		localStorage.clear();
	};

	return (
		<button
			onClick={handleClear}
			className="inline-flex h-16 items-center justify-center rounded-md bg-neutral-950 px-8 font-semibold text-xl text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95 mt-6"
		>
			Clear
		</button>
	);
}

export default ClearButton;
