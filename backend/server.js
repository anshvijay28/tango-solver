const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/scrape", (req, res) => {
    console.log(`User requested backend with route: ${req.url}`);
    res.json({ "data": "bruh" });

    // to test error handling in front end
    res.send(500);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${5000}`);
});
