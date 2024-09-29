import React, { useState, useEffect, useCallback, useContext } from "react";

import { Link } from "react-router-dom";

// Context
import { DataContext } from "../App";

// Helpers
import StarConverter from "../helpers/StarConverter";

// Components
import { Modal, modalContent } from "../components/Modal";

// CSS
import "./../styles/home.css";

export const Home = () => {
  // Initiation of Hooks
  const {
    isDarkTheme,
    toggleTheme,
    movies,
    addMovies,
    resultMovies,
    updateResultMovies,
    updateFavorites,
    deleteMovie,
  } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [modal, setModal] = useState(false);

  // On Load, Change the document's Title
  useEffect(() => {
    document.title = "Home - Movies";
  }, []);

  useEffect(() => {
    // Upon updates on inputs, it waits for .5 seconds before executing the filter
    const timer = setTimeout(() => {
      // Code Here to filter the movies...
      updateResultMovies(search, category);
    }, 100);

    return () => clearTimeout(timer);
  }, [search, category, movies]);

  // Logics
  const filterResult = useCallback((e) => {
    e.preventDefault();
  }, []);

  const updateSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const updateCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const removeMovie = useCallback((e) => {
    const movieID = parseInt(e.target.getAttribute("data-id"));
    const message = e.target.getAttribute("data-name");

    modalContent.title = `Delete Movie`;
    modalContent.message = `Are you sure you want to delete ${message}?`;
    modalContent.options.cancelButton = true;
    modalContent.options.confirmButton = true;
    modalContent.options.onCancel = () => {
      setModal(false);
    };
    modalContent.options.onConfirm = async () => {
      await setModal(false);

      modalContent.title = `Successfully Deleted`;
      modalContent.message = `Movie ${message} deleted.`;
      modalContent.options.cancelButton = false;
      modalContent.options.confirmButton = true;
      modalContent.options.onConfirm = () => {
        deleteMovie(movieID);
        setModal(false);
      };

      await setModal(true);
    };

    setModal(true);
  });

  return (
    <div className="HomeContainer">
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

      <div className="FilterSection">
        <form onSubmit={filterResult}>
          <input
            type="search"
            value={search}
            placeholder="Search Movie..."
            onChange={updateSearch}
          />

          <select onChange={updateCategory} value={category}>
            <option value="All">All Categories</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
          </select>
        </form>
      </div>

      <h1 style={{ textAlign: "center" }}>MOVIES</h1>

      <div className="MovieSection">
        {resultMovies.map(
          (
            { isFavorite, title, id, genre, releaseYear, rating, image },
            index
          ) => (
            <div className="MovieCard" key={index}>
              <Link to={"/detail/" + id}>
                <div className="MovieHeader">
                  <img className="MovieImage" src={image} alt={title} />

                  <div className="MovieOverlay">
                    <div className="MovieRate">
                      {StarConverter(rating)} - {genre}
                    </div>
                    <h4>{releaseYear}</h4>
                  </div>
                </div>

                <div className="MovieBody">
                  <h3>{title}</h3>
                </div>
              </Link>

              <div className="MovieFooter">
                {!isFavorite ? (
                  <button
                    className={"PrimaryButton"}
                    onClick={updateFavorites}
                    data-id={id}
                  >
                    Add to Favorite
                  </button>
                ) : (
                  <button
                    className={"SecondaryButton"}
                    onClick={updateFavorites}
                    data-id={id}
                  >
                    Remove to Favorites
                  </button>
                )}

                <Link to={"/update/" + id}>
                  <button className={"UpdateButton"} data-id={id}>
                    Update Movie
                  </button>
                </Link>

                <button
                  className={"DangerButton"}
                  onClick={removeMovie}
                  data-id={id}
                  data-name={`${title} - ${releaseYear}`}
                >
                  Delete Movie
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
