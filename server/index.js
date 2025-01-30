const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/scrape", async (req, res) => {
	const URL = req.query.url;

	if (!URL)
		return res.status(400).json({ error: "Missing 'url' query parameter." });

	let browser;
	try {
		browser = await puppeteer.launch({ headless: "new" });

		// Open tango
		const tangoPage = await browser.newPage();
		await tangoPage.goto(URL, { waitUntil: "domcontentloaded" });

		// press start game
		await tangoPage.waitForSelector("button#ember25");
		await tangoPage.click("button#ember25");

		// exit from tutorial
		await tangoPage.waitForSelector("button#ember36");
		await tangoPage.click("button#ember36");

		const cellValues = await tangoPage.evaluate(() => {
			const cellList = document.querySelectorAll(".lotka-cell");

			return Array.from(cellList).map((cell, idx) => {
				// get value of each cell
				const gElement = cell.querySelector(".lotka-cell-content > svg > g");
				const value = gElement ? (gElement.id === "Sun" ? 1 : 2) : 0;

				// check for sign
				const isSign = cell.querySelector(".lotka-cell-edge");
				const direction = isSign ? isSign.classList[1].split("-").slice(-1)[0] : 0;
				const sign = isSign ? isSign.querySelector("svg").ariaLabel : null;

				return { value, idx, sign, direction };
			});
		});

		res.json({ board: cellValues });
	} catch (err) {
		console.error("Scraping error:", err);
		res
			.status(500)
			.json({ error: `An error occurred while scraping the webpage. ${err}` });
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${5000}`);
});
