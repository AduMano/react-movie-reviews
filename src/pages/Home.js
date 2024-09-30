import React, { useState, useEffect, useContext } from "react";

// Context
import { DataContext } from "../App";

// Components
import { Modal, modalContent } from "../components/Modal";

// Helpers
import { DateConverter } from "../helpers/DateConverter";

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
    loading,
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
        {loading ? (
          <h1>Loading Data...</h1>
        ) : (
          resultMovies.map(
            (
              { is_favorite, title, id, genre, releaseYear, rating, image_url },
              index
            ) => (
              <MovieCard
                key={index}
                id={id}
                index={index}
                image={image_url}
                title={title}
                genre={genre}
                rating={rating}
                releaseYear={DateConverter(releaseYear)}
                isFavorite={is_favorite}
                updateFavorites={updateFavorites}
                removeMovie={removeMovie}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
