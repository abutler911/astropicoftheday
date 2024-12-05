const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const NASA_API_URL = "https://api.nasa.gov/planetary/apod";

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the NASA APOD Proxy Server!");
});

app.get("/api/apod", async (req, res) => {
  try {
    const { date } = req.query;

    const response = await axios.get(NASA_API_URL, {
      params: {
        api_key: process.env.API_KEY,
        date: date || undefined,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data from NASA API:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
