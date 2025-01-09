import { useState } from "react";
import "../styles/App.css";
import Cell from "../components/Cell.js";

function App() {

  // honestly not sure why we need this to be a state variable yet
	const [grid, setGrid] = useState(
		Array.from({ length: 6 }, (_, r) =>
			Array.from({ length: 6 }, (_, c) => ({
				bgColor: "#F9F9F9",
				row: r,
				col: c,
			}))
		)
	);
  
	const [signs, setSigns] = useState(
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
			<div className="gridContainer">
				{grid.map((row) =>
					row.map((cell) => (
						<Cell
							key={`${cell.row}-${cell.col}`}
							bgColor={cell.bgColor}
							row={cell.row}
							col={cell.col}
							signs={signs}
							setSigns={setSigns}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default App;
