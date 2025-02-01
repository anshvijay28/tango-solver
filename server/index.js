const express = require("express");
const puppeteer_core = require("puppeteer-core");
const puppeteer = require("puppeteer");
const cors = require("cors");
const chromium = require('chrome-aws-lambda');
// const chromium = require("@sparticuz/chromium");


const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/scrape", async (req, res) => {
	const URL = req.query.url;

	if (!URL)
		return res.status(400).json({ error: "Missing 'url' query parameter." });


	let chromiumBin;
	if (process.argv[2] === "dev") 
		chromiumBin = "/Users/anshvijay/.cache/puppeteer/chrome/mac_arm-132.0.6834.110/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing";
	else
		chromiumBin = await chromium.executablePath();

	console.log(`The chromium binary path is ${chromiumBin}`);

	let browser;

	try {
		browser = await chromium.puppeteer.launch({
			args: chromium.args,
			defaultViewport: chromium.defaultViewport,
			executablePath: await chromium.executablePath,
			headless: chromium.headless,
			ignoreHTTPSErrors: true,
		  });
		// browser = await puppeteer_core.launch({
		// 	args: chromium.args,
		// 	executablePath: chromiumBin,
		// 	headless: chromium.headless,
		// });
		// browser = await puppeteer.launch();
		console.log(`I was able to set up the broswer`);

		// Open tango
		const tangoPage = await browser.newPage();
		await tangoPage.goto(URL, { waitUntil: "domcontentloaded" });

		console.log("was able to open browser");

		// press start game
		await tangoPage.waitForSelector("div.launch-footer button");
		await tangoPage.click("div.launch-footer button");

		console.log("was able to click start game");

		// exit from tutorial
		await tangoPage.waitForSelector(`div#artdeco-modal-outlet button[aria-label="Dismiss"]`);
		await tangoPage.click(`div#artdeco-modal-outlet button[aria-label="Dismiss"]`);

		console.log("was able to exit tutorial");

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

		await browser.close();

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
                                                               