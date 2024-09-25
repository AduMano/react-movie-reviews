import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { Navigation } from "./components/Navigation";

// Pages
import { Home } from "./pages/Home";
import { AddMovie } from "./pages/AddMovie";
import { MovieDetail } from "./pages/MovieDetail";

// Data Movies
import { movieList } from "./data/Movies";

export const DataContext = createContext();

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [movies, setMovies] = useState(movieList);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const updateMovies = (movie) => {
    const newMovie = [...movies];
    newMovie.push(movie);

    setMovies(newMovie);
    return true;
  };

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <DataContext.Provider
              value={{ isDarkTheme, toggleTheme, movies, updateMovies }}
            >
              <Home />
            </DataContext.Provider>
          }
        />
        <Route
          path="/add"
          element={
            <DataContext.Provider
              value={{ isDarkTheme, toggleTheme, movies, updateMovies }}
            >
              <AddMovie />
            </DataContext.Provider>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <DataContext.Provider
              value={{ isDarkTheme, toggleTheme, movies, updateMovies }}
            >
              <MovieDetail />
            </DataContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
