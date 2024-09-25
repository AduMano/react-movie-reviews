import React, { useState, useEffect, useCallback, useContext } from "react";

import { Link } from "react-router-dom";

// Context
import { DataContext } from "../App";

// Helpers
import StarConverter from "../helpers/StarConverter";

// CSS
import "./../styles/home.css";

export const Home = () => {
  // Initiation of Hooks
  const {
    isDarkTheme,
    toggleTheme,
    movies,
    updateMovies,
    resultMovies,
    updateResultMovies,
    updateFavorites,
  } = useContext(DataContext);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
  }, [search, category]);

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

  return (
    <div className="HomeContainer">
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
                    className={"DangerButton"}
                    onClick={updateFavorites}
                    data-id={id}
                  >
                    Remove to Favorites
                  </button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
