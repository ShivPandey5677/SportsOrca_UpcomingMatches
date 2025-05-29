
const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/matches", async (req, res) => {
  try {
    const response = await axios.get("https://v3.football.api-sports.io/fixtures", {
      headers: {
        "x-apisports-key": process.env.API_FOOTBALL_KEY,
      },
      params: {
        league: 39, // Premier League ID
        season: 2023
      }
    });
    console.log(response)
    const fixtures = response.data.response.map(match => ({
      id: match.fixture.id,
      date: match.fixture.date,
      homeTeam: match.teams.home.name,
      awayTeam: match.teams.away.name,
    }));

    res.json(fixtures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
