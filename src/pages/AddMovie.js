import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import { Link, useNavigate } from "react-router-dom";

// Styles
import "./../styles/addMovie.css";

// Context
import { DataContext } from "../App";

// Reducer
import { initialStates, reducer } from "../reducer/AddMovieReducer";

// Helper
import {
  validate_title,
  validate_description,
  validate_year,
} from "../helpers/Validator";
import { modalContent } from "../components/Modal";

// Components
import { Modal } from "../components/Modal";

export const AddMovie = () => {
  // Callback
  const fileInput = useRef();

  // Effect
  useEffect(() => {
    document.title = "Add Movie";
  }, []);

  // Navigation
  const navigate = useNavigate();

  // Context
  const { isDarkTheme, setToggleTheme, movies, updateMovies, movieCount } =
    useContext(DataContext);

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialStates);

  // State
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(state.image);

  // Logic
  const addMovie = useCallback(
    (e) => {
      e.preventDefault();

      // Validate
      const validate = () => {
        let title = validate_title(state.title);
        let description = validate_description(state.description);
        let year = validate_year(state.year);
        let movieImage = state.image == "/MovieTemplate.png" ? false : true;

        if (title && description && year && movieImage) {
          return true;
        }

        modalContent.title = "Invalid Input";
        modalContent.message = `${
          !title ? "Movie Title must be 2 - 20 characters." : ""
        } ${
          !description
            ? "\nMovie Description must be 10 - 1000 characters."
            : ""
        } ${!year ? "\nYear must be 4 digits and number only." : ""} ${
          !movieImage ? "\nPlease attach an image." : ""
        }`;

        modalContent.options.confirmButton = true;
        modalContent.options.onConfirm = () => {
          setModal(false);
        };

        return false;
      };

      // If theres something wrong
      if (!validate()) {
        // Show Modal
        setModal(true);
      } else {
        let data = {
          description: state.description,
          genre: state.category,
          image: state.image,
          isFavorite: false,
          rating: parseInt(state.rating),
          releaseYear: state.year,
          title: state.title,
          id: movieCount,
        };

        if (updateMovies(data)) {
          modalContent.title = "Successfully Added";
          modalContent.message = `Movie "${state.title} - ${state.year}" Added.`;

          modalContent.options.confirmButton = true;
          modalContent.options.onConfirm = () => {
            setModal(false);
            navigate("/");
          };

          setModal(true);
        }
      }
    },
    [state]
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (file && validTypes.includes(file.type)) {
      dispatch({ type: "image_file", value: file, imageState: setImage });
    } else {
      setModal(true);

      modalContent.title = "Invalid Image";
      modalContent.message = `The Image you selected is invalid.`;

      modalContent.options.confirmButton = true;
      modalContent.options.onConfirm = () => {
        fileInput.current.value = "";
        setModal(false);
      };
    }
  };

  const handleInputs = (e) => {
    dispatch({ type: e.target.getAttribute("name"), value: e.target.value });
  };

  return (
    <div className="AddContainer">
      {/* Modal */}
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

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
            ref={fileInput}
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
              <textarea
                onChange={handleInputs}
                value={state.description}
                name="description"
              />
            </div>

            <div className="DropDown">
              <div className="FormGroup">
                <label>Year Released: </label>
                <input
                  type="number"
                  value={state.year}
                  onChange={handleInputs}
                  name="year"
                />
              </div>
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
