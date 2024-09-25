import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import { Navigation } from "./components/Navigation";
import { Modal } from "./components/Modal";

// Pages
import { Home } from "./pages/Home";
import { AddMovie } from "./pages/AddMovie";
import { MovieDetail } from "./pages/MovieDetail";

// Data Movies
import { movieList, movieCounter } from "./data/Movies";

// Helper
import { modalContent } from "./components/Modal";

// COntext
export const DataContext = createContext();

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [movies, setMovies] = useState(movieList);
  const [movieCount, setMovieCount] = useState(movieCounter);
  const [resultMovies, setResultMovies] = useState(movies);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setResultMovies(movies);
  }, [movies]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const updateMovies = (movie) => {
    const newMovie = [...movies];
    newMovie.push(movie);

    setMovies(newMovie);
    setMovieCount((prev) => prev + 1);

    return true;
  };

  const updateResultMovies = (search, category) => {
    setResultMovies(() => {
      if (category == "All") {
        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) &&
            movie.genre == category
        );
      }
    });
  };

  const updateFavorites = (e) => {
    let movieID = parseInt(e.target.getAttribute("data-id"));

    switch (e.target.innerText) {
      case "Add to Favorite":
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieID ? { ...movie, isFavorite: true } : movie
          )
        );
        break;
      case "Remove to Favorites":
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieID ? { ...movie, isFavorite: false } : movie
          )
        );
        break;
    }
  };

  return (
    <Router>
      {/* Modal */}
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <DataContext.Provider
              value={{
                isDarkTheme,
                toggleTheme,
                movies,
                updateMovies,
                resultMovies,
                updateResultMovies,
                updateFavorites,
              }}
            >
              <Home />
            </DataContext.Provider>
          }
        />
        <Route
          path="/add"
          element={
            <DataContext.Provider
              value={{
                isDarkTheme,
                toggleTheme,
                movies,
                updateMovies,
                movieCount,
              }}
            >
              <AddMovie />
            </DataContext.Provider>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <DataContext.Provider
              value={{
                isDarkTheme,
                toggleTheme,
                movies,
                updateMovies,
                resultMovies,
                updateFavorites,
              }}
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
