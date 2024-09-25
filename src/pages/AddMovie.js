import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

// Styles
import "./../styles/addMovie.css";

// Reducer
import { initialStates, reducer } from "../reducer/AddMovieReducer";

export const AddMovie = () => {
  useEffect(() => {
    document.title = "Add Movie";
  }, []);

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialStates);

  // State
  const [image, setImage] = useState(state.image);

  const addMovie = useCallback((e) => {
    e.preventDefault();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch({ type: "image_file", value: file, imageState: setImage });
  };

  const handleInputs = (e) => {
    dispatch({ type: e.target.getAttribute("name"), value: e.target.value });
  };

  return (
    <div className="AddContainer">
      <form onSubmit={addMovie}>
        <div className="ImagePicking">
          {/* <Image title={"Mega Mega"} src={state.image} selector={"Drummm"} /> */}
          <div className="ImageContainer">
            <img className="Image" src={image} alt={"Mega Man"} />
          </div>

          <input
            name="image_file"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
        </div>

        <div className="Information">
          <h2>Add New Movie</h2>
          <div className="MovieCredentials">
            <div className="FormGroup">
              <label>Title: </label>
              <input
                type="text"
                value={state.title}
                onChange={handleInputs}
                name="title"
              />
            </div>

            <div className="FormGroup">
              <label>Description: </label>
              <textarea onChange={handleInputs} name="description" />
            </div>

            <div className="DropDown">
              <div className="FormGroup">
                <label>Category: </label>
                <select
                  value={state.category}
                  onChange={handleInputs}
                  name="category"
                >
                  <option value="Action">Action</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Horror">Horror</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>

              <div className="FormGroup">
                <label>Rating: </label>
                <select
                  value={state.rating}
                  onChange={handleInputs}
                  name="rating"
                >
                  <option value="0">☆☆☆☆☆</option>
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
                </select>
              </div>
            </div>
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
