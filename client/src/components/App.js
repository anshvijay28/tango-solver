import { useState } from "react";
import "../styles/App.css";
import Cell from "./Cell.js";
import SolveButton from "./SolveButton.js";
import ClearButton from "./ClearButton.js";
import DailyButton from "./DailyButton.js";
import githubLogo from "../images/github_logo.png";

function App() {
	const [grid, setGrid] = useState(
		JSON.parse(localStorage.getItem("grid")) ||
			Array.from({ length: 6 }, (_, r) =>
				Array.from({ length: 6 }, (_, c) => ({
					bgColor: "#F9F9F9",
					row: r,
					col: c,
					symbol: 0,
					error: false,
				}))
			)
	);

	const [signs, setSigns] = useState(
		JSON.parse(localStorage.getItem("signs")) ||
			Array.from({ length: 6 }, () =>
				Array.from({ length: 6 }, () => ({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				}))
			)
	);

	return (
		<div className="App">
			<h1
				className="mb-4 -mt-3 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
			>
				Tango Solver!
			</h1>
			<div className="gridContainer mb-4">
				{grid.map((row) =>
					row.map((cell) => (
						<Cell
							key={`${cell.row}-${cell.col}`}
							bgColor={cell.bgColor}
							row={cell.row}
							col={cell.col}
							signs={signs}
							setSigns={setSigns}
							grid={grid}
							setGrid={setGrid}
						/>
					))
				)}
			</div>
			<div className="button-container">
				<SolveButton text="Solve" grid={grid} setGrid={setGrid} signs={signs} />
				<ClearButton text="Clear" setGrid={setGrid} setSigns={setSigns} />
				<DailyButton setGrid={setGrid} setSigns={setSigns} />
			</div>
			<a href="https://github.com/anshvijay28" target="_blank" rel="noreferrer">
				<img
					src={githubLogo}
					alt="github logo"
					className="fixed bottom-2 right-3"
				/>
			</a>
		</div>
	);
}

export default App;
