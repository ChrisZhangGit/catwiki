const path = require("path");
const express = require("express");
const axios = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/search", async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds/search?q=${query}`,
      {
        headers: {
          "x-api-key":
            "live_4hxmTLEDReKgcGuFx4CftCpl8TYgAPntQhcZ2vfLQvZSiqv7GWSVGpUQNVikqQxf",
        },
      }
    );

    const breeds = response.data;

    res.json(breeds);
  } catch (error) {
    console.error("Error searching cat breeds:", error);
    res.status(500).json({ error: "Failed to search cat breeds" });
  }
});

app.get("/api/topBreeds", async (req, res) => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key":
          "live_4hxmTLEDReKgcGuFx4CftCpl8TYgAPntQhcZ2vfLQvZSiqv7GWSVGpUQNVikqQxf",
      },
    });
    const topBreeds = response.data
      .sort((a, b) => b.search_count - a.search_count)
      .slice(0, 10);

    res.json(topBreeds);
  } catch (error) {
    console.error("Error fetching top breeds:", error);
    res.status(500).json({ error: "Failed to fetch top breeds" });
  }
});

app.get("/api/breeds/:breedId", async (req, res) => {
  try {
    const { breedId } = req.params;
    const response = await axios.get(
      `https://api.thecatapi.com/v1/breeds/${breedId}`,
      {
        headers: {
          "x-api-key":
            "live_4hxmTLEDReKgcGuFx4CftCpl8TYgAPntQhcZ2vfLQvZSiqv7GWSVGpUQNVikqQxf",
        },
      }
    );

    const breedDetails = response.data;
    res.json(breedDetails);
  } catch (error) {
    console.error("Error fetching breed details:", error);
    res.status(500).json({ error: "Failed to fetch breed details" });
  }
});

app.get("/api/breedImages/:breedId", async (req, res) => {
  try {
    const { breedId } = req.params;
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedId}`,
      {
        headers: {
          "x-api-key":
            "live_4hxmTLEDReKgcGuFx4CftCpl8TYgAPntQhcZ2vfLQvZSiqv7GWSVGpUQNVikqQxf",
        },
      }
    );

    const breedImages = response.data;
    res.json(breedImages);
  } catch (error) {
    console.error("Error fetching breed images:", error);
    res.status(500).json({ error: "Failed to fetch breed images" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
