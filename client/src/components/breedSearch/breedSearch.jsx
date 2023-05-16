import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BreedSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [topBreeds, setTopBreeds] = useState(null);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching cat breeds:", error);
    }
  };
  const handleTopBreeds = async () => {
    try {
      const response = await axios.get(`/api/topBreeds`);
      setTopBreeds(response.data);
    } catch (error) {
      console.error("Error searching cat breeds:", error);
    }
  };

  useEffect(() => {
    handleTopBreeds();
  }, []);

  return (
    <div>
      {" "}
      <h1>CatWiki</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder="Search cat breeds..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((breed) => (
          <li key={breed.id}>
            {" "}
            <Link to={`/breeds/${breed.id}`}>{breed.name}</Link>
          </li>
        ))}
      </ul>
      <div>
        <h1>Top 10 Breeds</h1>
        {topBreeds &&
          topBreeds.map((topBreed) => (
            <div key={topBreed.id}>
              <Link to={`/breeds/${topBreed.id}`}>{topBreed.name}</Link>
              <p>
                <strong>Description:</strong> {topBreed.description}
              </p>
              <p>
                <strong>Temperament:</strong> {topBreed.temperament}
              </p>
              <p>
                <strong>Origin:</strong> {topBreed.origin}
              </p>
              <p>
                <strong>Life Span:</strong> {topBreed.life_span} years
              </p>
              <p>
                <strong>Weight:</strong> {topBreed.weight.metric} kg (
                {topBreed.weight.imperial} lbs)
              </p>
              <p>
                <strong>Country Code:</strong> {topBreed.country_code}
              </p>
              <p>
                <strong>Alt Names:</strong> {topBreed.alt_names}
              </p>
              <p>
                <strong>Adaptability:</strong> {topBreed.adaptability}
              </p>
              <p>
                <strong>Affection Level:</strong> {topBreed.affection_level}
              </p>
              <p>
                <strong>Child Friendly:</strong> {topBreed.child_friendly}
              </p>
              <p>
                <strong>Dog Friendly:</strong> {topBreed.dog_friendly}
              </p>
              <p>
                <strong>Energy Level:</strong> {topBreed.energy_level}
              </p>
              <p>
                <strong>Grooming:</strong> {topBreed.grooming}
              </p>
              <p>
                <strong>Health Issues:</strong> {topBreed.health_issues}
              </p>
              <p>
                <strong>Intelligence:</strong> {topBreed.intelligence}
              </p>
              <p>
                <strong>Shedding Level:</strong> {topBreed.shedding_level}
              </p>
              <p>
                <strong>Social Needs:</strong> {topBreed.social_needs}
              </p>
              <p>
                <strong>Stranger Friendly:</strong> {topBreed.stranger_friendly}
              </p>
              <p>
                <strong>Vocalisation:</strong> {topBreed.vocalisation}
              </p>
              <p>
                <strong>Wikipedia URL:</strong>{" "}
                <a href={topBreed.wikipedia_url}>{topBreed.wikipedia_url}</a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BreedSearch;
