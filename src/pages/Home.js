import React, { useState, useEffect, useCallback, useReducer } from "react";

// Image
import image from "./../../public/logo192.png";

export const Home = () => {
  // Initiation of Hooks
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
            type="text"
            value={search}
            placeholder="Search..."
            onChange={updateSearch}
          />

          <select onChange={updateCategory} value={category}>
            <option value="">All</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Horror">Horror</option>
          </select>
        </form>
      </div>

      <div className="MovieSection">
        <div className="MovieCard">
          <div className="MovieHeader">
            <img className="MovieImage" src={image} alt="Movie" />

            <div className="MovieOverlay">
              <div className="MovieRate">★★★★☆</div>
              <h4>2010</h4>
            </div>
          </div>

          <div className="MovieBody">
            <h3>Insterstellar</h3>
          </div>

          <div className="MovieFooter">
            <button>Add to Favorite</button>
          </div>
        </div>
        <div className="MovieCard">
          <div className="MovieHeader">
            <img className="MovieImage" src={image} alt="Movie" />

            <div className="MovieOverlay">
              <div className="MovieRate">★★★★☆</div>
              <h4>2010</h4>
            </div>
          </div>

          <div className="MovieBody">
            <h3>Insterstellar</h3>
          </div>

          <div className="MovieFooter">
            <button>Add to Favorite</button>
          </div>
        </div>
        <div className="MovieCard">
          <div className="MovieHeader">
            <img className="MovieImage" src={image} alt="Movie" />

            <div className="MovieOverlay">
              <div className="MovieRate">★★★★☆</div>
              <h4>2010</h4>
            </div>
          </div>

          <div className="MovieBody">
            <h3>Insterstellar</h3>
          </div>

          <div className="MovieFooter">
            <button>Add to Favorite</button>
          </div>
        </div>
        <div className="MovieCard">
          <div className="MovieHeader">
            <img className="MovieImage" src={image} alt="Movie" />

            <div className="MovieOverlay">
              <div className="MovieRate">★★★★☆</div>
              <h4>2010</h4>
            </div>
          </div>

          <div className="MovieBody">
            <h3>Insterstellar</h3>
          </div>

          <div className="MovieFooter">
            <button>Add to Favorite</button>
          </div>
        </div>
        <div className="MovieCard">
          <div className="MovieHeader">
            <img className="MovieImage" src={image} alt="Movie" />

            <div className="MovieOverlay">
              <div className="MovieRate">★★★★☆</div>
              <h4>2010</h4>
            </div>
          </div>

          <div className="MovieBody">
            <h3>Insterstellar</h3>
          </div>

          <div className="MovieFooter">
            <button>Add to Favorite</button>
          </div>
        </div>
      </div>
    </div>
  );
};
