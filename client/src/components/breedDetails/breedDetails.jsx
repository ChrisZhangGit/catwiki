import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BreedDetails() {
  const { breedId } = useParams();
  const [breedDetails, setBreedDetails] = useState(null);
  const [breedImages, setBreedImages] = useState(null);

  const fetchBreedDetails = async () => {
    try {
      const response = await axios.get(`/api/breeds/${breedId}`);
      setBreedDetails(response.data);
    } catch (error) {
      console.error("Error fetching breed details:", error);
    }
  };

  const fetchBreedImages = async () => {
    try {
      const response = await axios.get(`/api/breedImages/${breedId}`);
      setBreedImages(response.data);
    } catch (error) {
      console.error("Error fetching breed images:", error);
    }
  };

  useEffect(() => {
    fetchBreedDetails();
  }, [breedId]);

  useEffect(() => {
    fetchBreedImages();
  }, [breedId]);

  if (!breedDetails) {
    return <div>Loading breed details...</div>;
  }

  return (
    <div>
      <h2>{breedDetails.name}</h2>
      <p>
        <strong>Description:</strong> {breedDetails.description}
      </p>
      <p>
        <strong>Temperament:</strong> {breedDetails.temperament}
      </p>
      <p>
        <strong>Origin:</strong> {breedDetails.origin}
      </p>
      <p>
        <strong>Life Span:</strong> {breedDetails.life_span} years
      </p>
      <p>
        <strong>Weight:</strong> {breedDetails.weight.metric} kg (
        {breedDetails.weight.imperial} lbs)
      </p>
      <p>
        <strong>Country Code:</strong> {breedDetails.country_code}
      </p>
      <p>
        <strong>Alt Names:</strong> {breedDetails.alt_names}
      </p>
      <p>
        <strong>Adaptability:</strong> {breedDetails.adaptability}
      </p>
      <p>
        <strong>Affection Level:</strong> {breedDetails.affection_level}
      </p>
      <p>
        <strong>Child Friendly:</strong> {breedDetails.child_friendly}
      </p>
      <p>
        <strong>Dog Friendly:</strong> {breedDetails.dog_friendly}
      </p>
      <p>
        <strong>Energy Level:</strong> {breedDetails.energy_level}
      </p>
      <p>
        <strong>Grooming:</strong> {breedDetails.grooming}
      </p>
      <p>
        <strong>Health Issues:</strong> {breedDetails.health_issues}
      </p>
      <p>
        <strong>Intelligence:</strong> {breedDetails.intelligence}
      </p>
      <p>
        <strong>Shedding Level:</strong> {breedDetails.shedding_level}
      </p>
      <p>
        <strong>Social Needs:</strong> {breedDetails.social_needs}
      </p>
      <p>
        <strong>Stranger Friendly:</strong> {breedDetails.stranger_friendly}
      </p>
      <p>
        <strong>Vocalisation:</strong> {breedDetails.vocalisation}
      </p>
      <p>
        <strong>Wikipedia URL:</strong>{" "}
        <a href={breedDetails.wikipedia_url}>{breedDetails.wikipedia_url}</a>
      </p>
      <h3>More Photos:</h3>
      <div>
        {breedImages &&
          breedImages.map((image) => (
            <img
              src={image.url}
              alt={breedDetails.name}
              key={image.id}
              height="1165px"
              width="1231px"
              style={{ objectFit: "cover", margin: "10px" }}
            />
          ))}
      </div>
    </div>
  );
}

export default BreedDetails;
