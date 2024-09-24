import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "../components/Image";

export const AddMovie = () => {
  useEffect(() => {
    document.title = "Add Movie";
  }, []);

  const addMovie = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="AddContainer">
      <form onSubmit={addMovie}>
        <div className="ImagePicking">
          <Image title={""} src={""} selector={""} />

          <input type="file" accept="image/png, image/jpeg, image/jpg" />
        </div>

        <div className="Information">
          <div className="MovieCredentials">
            <input type="text" />
            <textarea />
            <select>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Horror">Horror</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>

          <div className="ActionButtons">
            <Link to="/">
              <button>Cancel</button>
            </Link>

            <input type="submit" value="Add" />
          </div>
        </div>
      </form>
    </div>
  );
};
