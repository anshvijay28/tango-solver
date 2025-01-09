import { useState } from "react";
import "../styles/Cell.css";
import moon from "../images/moon.png";
import {
	CELL_SIZE,
	SYMBOL_SPACE,
	SYMBOL_OFFSET,
} from "../constants";

const boundsCheck = (row, col, dir, signs) => {
	if (
		(dir === "north" && row === 0) ||
		(dir === "south" && row === signs.length - 1) ||
		(dir === "west" && col === 0) ||
		(dir === "east" && col === signs[0].length - 1)
	)
		return false;

	return true;
};

const changeSigns = (row, col, side, signs) => {
	signs[row][col] = {
		...signs[row][col],
		[side]: (signs[row][col][side] + 1) % 3,
	};
	return signs;
};

const dirToSide = {
	north: "top",
	south: "bottom",
	west: "left",
	east: "right",
};

const dirToNeiSide = {
	north: "bottom",
	south: "top",
	west: "right",
	east: "left",
};

const dirToNeiInc = {
	north: [-1, 0],
	south: [1, 0],
	west: [0, -1],
	east: [0, 1],
};

function Cell({ bgColor, row, col, signs, setSigns }) {
	const [clicks, setClicks] = useState(0);

	const handleClick = (e) => {
		const rect = e.target.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const north =
			x >= SYMBOL_OFFSET && x <= CELL_SIZE - SYMBOL_OFFSET && y <= SYMBOL_SPACE;
		const south =
			x >= SYMBOL_OFFSET &&
			x <= CELL_SIZE - SYMBOL_OFFSET &&
			y >= CELL_SIZE - SYMBOL_SPACE;
		const west =
			x <= SYMBOL_SPACE && y >= SYMBOL_OFFSET && y <= CELL_SIZE - SYMBOL_OFFSET;
		const east =
			x >= CELL_SIZE - SYMBOL_SPACE &&
			y >= SYMBOL_OFFSET &&
			y <= CELL_SIZE - SYMBOL_OFFSET;

		const directions = { north, south, west, east };
		const dir = Object.keys(directions).find((key) => directions[key]);

		// some bounds checking for edge clicks
		if (north || south || west || east) {
			// bounds check
			if (!boundsCheck(row, col, dir, signs)) return;

			const newSigns = signs.map((row) => [...row]);

			// updating current square
			const side = dirToSide[dir];
			changeSigns(row, col, side, newSigns);

			// updating neighbor square
			const neiSide = dirToNeiSide[dir];
			const [dr, dc] = dirToNeiInc[dir];
			changeSigns(row + dr, col + dc, neiSide, newSigns);

			setSigns(newSigns);
		} else {
			setClicks((clicks + 1) % 3);
		}
	};

	return (
		<button
			onClick={handleClick}
			className="bg-gray-500 border flex items-center justify-center relative"
			style={{ backgroundColor: bgColor }}
		>
			{clicks === 0 && (
				<div
					style={{ pointerEvents: "none" }}
					className="w-6 h-6 rounded-full"
				></div>
			)}
			{clicks === 1 && (
				<div
					style={{ pointerEvents: "none" }}
					className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-500"
				></div>
			)}
			{clicks === 2 && (
				<div style={{ pointerEvents: "none" }} className="w-6 h-6">
					<img src={moon} alt="moon.png" />
				</div>
			)}

			{/* top = */}
			{row > 0 && signs[row][col].top > 0 && (
				<div
					style={{ pointerEvents: "none" }}
					className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 text-xs font-bold bg-white rounded-full px-1 leading-[0.75rem]"
				>
					{signs[row][col].top === 1 ? `=` : `×`}
				</div>
			)}
			{/* right */}
			{col < signs[0].length - 1 && signs[row][col].right > 0 && (
				<div
					style={{ pointerEvents: "none" }}
					className="absolute -right-2 z-20 text-xs font-bold bg-white rounded-full px-1"
				>
					{signs[row][col].right === 1 ? `=` : `×`}
				</div>
			)}
		</button>
	);
}

export default Cell;
