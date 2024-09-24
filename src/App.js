import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { Navigation } from "./components/Navigation";

// Pages
import { Home } from "./pages/Home";
import { AddMovie } from "./pages/AddMovie";

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
