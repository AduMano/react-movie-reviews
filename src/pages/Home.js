import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

// Context
import { DataContext } from "../App";

// Helpers
import StarConverter from "../helpers/StarConverter";

// Components
import { Modal, modalContent } from "../components/Modal";

// CSS
import "./../styles/home.css";

// Custom Hooks
import { useConfirmRemoval } from "../customHooks/useConfirmRemoval";
import { useSearchMovie } from "../customHooks/useSearchMovie";
import { MovieCard } from "../components/HomePage/MovieCard";
import { FilterSection } from "../components/HomePage/FilterSection";

export const Home = () => {
  /// Initiation of Hooks
  const [modal, setModal] = useState(false);

  // Context
  const {
    movies,
    resultMovies,
    updateResultMovies,
    updateFavorites,
    deleteMovie,
  } = useContext(DataContext);

  // Custom Hook
  const { removeMovie } = useConfirmRemoval(
    modalContent,
    setModal,
    deleteMovie,
    false
  );

  const { filterResult, updateSearch, updateCategory, search, category } =
    useSearchMovie(movies, updateResultMovies);

  // On Load, Change the document's Title
  useEffect(() => {
    document.title = "Home - Movies";
  }, []);

  return (
    <div className="HomeContainer">
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

      <FilterSection
        filterResult={filterResult}
        search={search}
        updateSearch={updateSearch}
        updateCategory={updateCategory}
        category={category}
      />

      <h1 style={{ textAlign: "center" }}>MOVIES</h1>

      <div className="MovieSection">
        {resultMovies.map(
          (
            { isFavorite, title, id, genre, releaseYear, rating, image },
            index
          ) => (
            <MovieCard
              key={index}
              id={id}
              index={index}
              image={image}
              title={title}
              genre={genre}
              rating={rating}
              releaseYear={releaseYear}
              isFavorite={isFavorite}
              updateFavorites={updateFavorites}
              removeMovie={removeMovie}
            />
          )
        )}
      </div>
    </div>
  );
};
