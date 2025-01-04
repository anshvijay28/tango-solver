import { useState } from "react";
import "../styles/Cell.css";
import moon from "../images/moon.png"

function Cell({ bgColor }) {
	const [clicks, setClicks] = useState(0);

	const handleClick = () => setClicks((clicks + 1) % 3);

	return (
		<button
			onClick={handleClick}
			className="bg-gray-500 text-white font-bold py-4 px-4 border rounded"
			style={{ backgroundColor: bgColor }}
		>
            {clicks === 0 && (
				<div className="w-5 h-5 rounded-full"></div>
			)}
			{clicks === 1 && (
				<div className="w-5 h-5 rounded-full bg-yellow-400 border-2 border-yellow-500"></div>
			)}
			{clicks === 2 && (
				<div className="w-5 h-5">
					<img width="30px" src={moon} alt="moon.png" />
				</div>
			)}
		</button>
	);
}

export default Cell;
