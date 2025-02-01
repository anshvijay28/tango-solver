import axios from "axios";
import { URL } from "../constants";
import LoadingScreen from "./LoadingScreen";
import { useState } from "react";

function DailyButton({ setGrid, setSigns }) {
	const [loading, setLoading] = useState(false);

	const handleScrape = async () => {
		try {
			const BACKEND_URL =
				process.env.NODE_ENV === "development"
					? "http://localhost:5000/scrape"
					: "https://tango-solver-server.vercel.app/scrape";

			setLoading(true);
			const res = await axios(`${BACKEND_URL}?url=${encodeURIComponent(URL)}`);
			const board = res.data.board;

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

			// clear symbols
			const newSigns = Array.from({ length: 6 }, () =>
				Array.from({ length: 6 }, () => ({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				}))
			);

			for (let i = 0; i < board.length; i++) {
				const r = Math.floor(i / newGrid[0].length);
				const c = i % newGrid.length;

				newGrid[r][c].symbol = board[i].value;
				// logic for sign
				if (board[i].sign) {
					const sign = board[i].sign === "Equal" ? 1 : 2;
					if (board[i].direction === "right") {
						newSigns[r][c].right = sign;
						newSigns[r][c + 1].left = sign;
					}
					if (board[i].direction === "down") {
						newSigns[r][c].bottom = sign;
						newSigns[r + 1][c].top = sign;
					}
				}
			}
			setGrid(newGrid);
			setSigns(newSigns);
		} catch (err) {
			console.log(`Error. Server responded with ${err}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{loading && <LoadingScreen />}
			<button
				onClick={handleScrape}
				className="inline-flex h-16 items-center justify-center rounded-md bg-neutral-950 px-8 font-semibold text-xl text-neutral-50 shadow-xl shadow-neutral-500/20 transition active:scale-95 mt-6"
			>
				Daily
			</button>
		</>
	);
}

export default DailyButton;
