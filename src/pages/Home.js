import React, {
  useState,
  useEffect,
  useCallback,
  useReducer,
  useContext,
} from "react";

import { Link } from "react-router-dom";

// Context
import { DataContext } from "../App";

// Components
import { Image } from "../components/Image";

// Helpers
import StarConverter from "../helpers/StarConverter";

// CSS
import "./../styles/home.css";

export const Home = () => {
  // Initiation of Hooks
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const { isDarkTheme, toggleTheme, movies, updateMovies } =
    useContext(DataContext);

  // On Load, Change the document's Title
  useEffect(() => {
    document.title = "Home - Movies";
  }, []);

  useEffect(() => {
    // Upon updates on inputs, it waits for .5 seconds before executing the filter
    const timer = setTimeout(() => {
      // Code Here to filter the movies...
    }, 1500);

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
            <option value="">All Categories</option>
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
        {movies.map(
          ({ isFavorite, title, genre, releaseYear, rating, image }, index) => (
            <div className="MovieCard" key={index}>
              <Link to={"/detail/" + index}>
                <div className="MovieHeader">
                  <Image selector="MovieImage" src={image} title={title} />

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
                  <button>Add to Favorite</button>
                ) : (
                  <button disabled={true}>Added to Favorites.</button>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
