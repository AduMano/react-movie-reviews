import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home";
import { SetMovie } from "./pages/SetMovie";
import { MovieDetail } from "./pages/MovieDetail";
import { Navigation } from "./components/Navigation";

// Custom Hooks
import { useManipulateMovies } from "./customHooks/useManipulateMovies";
import { useFilterMovies } from "./customHooks/useFilterMovies";
import { useToggleFavorite } from "./customHooks/useToggleFavorite";

// Context
export const DataContext = createContext();

function App() {
  /// Custom Hooks
  // Movie CRUD
  const {
    deleteMovie,
    updateMovies,
    addMovies,
    setMovies,
    movies,
    movieCount,
    loading,
  } = useManipulateMovies();

  // Filtering Movies
  const { updateResultMovies, resultMovies } = useFilterMovies(
    movies,
    movieCount
  );

  // Toggle Favorites
  const { updateFavorites } = useToggleFavorite(setMovies);

  return (
    <Router>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={
            <DataContext.Provider
              value={{
                movies,
                resultMovies,
                updateResultMovies,
                updateFavorites,
                deleteMovie,
                loading,
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
                movies,
                addMovies,
                movieCount,
                updateMovies,
              }}
            >
              <SetMovie setType={"add"} />
            </DataContext.Provider>
          }
        />

        <Route
          path="/detail/:id"
          element={
            <DataContext.Provider
              value={{
                updateFavorites,
                deleteMovie,
                loading,
              }}
            >
              <MovieDetail />
            </DataContext.Provider>
          }
        />

        <Route
          path="/update/:id"
          element={
            <DataContext.Provider
              value={{
                movies,
                addMovies,
                resultMovies,
                updateFavorites,
                updateMovies,
              }}
            >
              <SetMovie setType={"update"} />
            </DataContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
