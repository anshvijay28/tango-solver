import { useState } from "react";
import "../styles/Cell.css";
import moon from "../images/moon.png";
import {
	CELL_SIZE,
	LOGO_SIZE,
	SYMBOL_SPACE,
	SYMBOL_OFFSET,
} from "../constants";

function Cell({ bgColor }) {
	const [clicks, setClicks] = useState(0);

  // const [leftBox, setLeftBox] = useState(false);
  // const [rightBox, setRightBox] = useState(false);
  // const [topBox, setTopBox] = useState(false);
  // const [bottomBox, setBottomBox] = useState(false);

	const handleClick = (e) => {
		const rect = e.target.getBoundingClientRect();

		if (rect.width === LOGO_SIZE && rect.height === LOGO_SIZE) {
			setClicks((clicks + 1) % 3);
		} else {
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const top =
				x >= SYMBOL_OFFSET &&
				x <= CELL_SIZE - SYMBOL_OFFSET &&
				y <= SYMBOL_SPACE;
			const bottom =
				x >= SYMBOL_OFFSET &&
				x <= CELL_SIZE - SYMBOL_OFFSET &&
				y >= CELL_SIZE - SYMBOL_SPACE;
			const left =
				x <= SYMBOL_SPACE &&
				y >= SYMBOL_OFFSET &&
				y <= CELL_SIZE - SYMBOL_OFFSET;
			const right =
				x >= CELL_SIZE - SYMBOL_SPACE &&
				y >= SYMBOL_OFFSET &&
				y <= CELL_SIZE - SYMBOL_OFFSET;

			if (top || bottom || left || right) {
				// i need to some how render the proper half of this logo
        
        console.log("= and x land!!!");
			} else {
				setClicks((clicks + 1) % 3);
			}
		}
	};

	return (
		<button
			onClick={handleClick}
			className="bg-gray-500 border flex items-center justify-center"
			style={{ backgroundColor: bgColor }}
		>
			{clicks === 0 && <div className="w-6 h-6 rounded-full"></div>}
			{clicks === 1 && (
				<div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-500"></div>
			)}
			{clicks === 2 && (
				<div className="w-6 h-6">
					<img src={moon} alt="moon.png" />
				</div>
			)}
		</button>
	);
}

export default Cell;
