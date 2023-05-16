import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BreedDetails from "./components/breedDetails/breedDetails";
import BreedSearch from "./components/breedSearch/breedSearch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<BreedSearch />} />
          <Route path="/breeds/:breedId" element={<BreedDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
