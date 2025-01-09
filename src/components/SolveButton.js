function SolveButton({ }) {
	const handleClear = () => {
		console.log("solve");
	};

	return (
		<button
			onClick={handleClear}
			className="inline-flex h-12 items-center justify-center rounded-md bg-neutral-950 px-6 font-medium text-neutral-50 shadow-lg shadow-neutral-500/20 transition active:scale-95 mt-5"
		>
			Solve
		</button>
	);
}

export default SolveButton;