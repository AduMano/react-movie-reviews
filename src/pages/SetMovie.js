import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useContext,
  useRef,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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

export const SetMovie = ({ setType }) => {
  const { id } = useParams();

  // Navigation
  const navigate = useNavigate();

  // Context
  const {
    isDarkTheme,
    setToggleTheme,
    movies,
    addMovies,
    movieCount,
    updateMovies,
  } = useContext(DataContext);

  // Callback
  const fileInput = useRef();

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialStates);

  // State
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState(state.image);

  // Effect
  useEffect(() => {
    document.title = setType == "add" ? "Add Movie" : "Update Movie";

    switch (setType) {
      case "add":
        dispatch({ type: "title", value: initialStates.title });
        dispatch({ type: "description", value: initialStates.description });
        dispatch({ type: "category", value: initialStates.category });
        dispatch({ type: "rating", value: initialStates.rating });
        dispatch({ type: "year", value: initialStates.year });
        dispatch({ type: "id", value: initialStates.id });
        setImage("/MovieTemplate.png");

        break;
      case "update":
        const data = movies.filter((movie) => movie.id == id)[0];

        dispatch({ type: "title", value: data.title });
        dispatch({ type: "description", value: data.description });
        dispatch({ type: "category", value: data.genre });
        dispatch({ type: "rating", value: data.rating });
        dispatch({ type: "year", value: data.releaseYear });
        setImage(data.image);

        break;

      default:
        navigate("/");
    }
  }, [setType]);

  // Logic
  const handleFill = useCallback((e) => {
    const parent = e.target.parentNode;
    let children = parent.childNodes;
    let value = 0;

    try {
      value = parseInt(e.target.getAttribute("data-value"));
      children.forEach((node, index) => {
        if (index + 1 <= value) {
          node.innerText = "★";
        } else {
          node.innerText = "☆";
        }
      });
    } catch (error) {
      return;
    }
  });

  const handleDefault = useCallback((e) => {
    const parent = e.target.parentNode;
    let children = parent.childNodes;
    let value = state.rating;

    children.forEach((node, index) => {
      if (index + 1 <= value) {
        node.innerText = "★";
      } else {
        node.innerText = "☆";
      }
    });
  });

  const setMovie = useCallback(
    (e) => {
      e.preventDefault();

      // Validate
      const validate = () => {
        let title = validate_title(state.title);
        let description = validate_description(state.description);
        let year = validate_year(state.year);
        let movieImage = state.image == "/MovieTemplate.png" ? false : true;

        if (
          title &&
          description &&
          year &&
          (movieImage || setType == "update")
        ) {
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
          !movieImage && setType == "add" ? "\nPlease attach an image." : ""
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
          image: "",
          isFavorite: false,
          rating: parseInt(state.rating),
          releaseYear: state.year,
          title: state.title,
          id: 0,
        };

        switch (setType) {
          case "add":
            data.image = state.image;
            data.id = movieCount;

            if (addMovies(data)) {
              modalContent.title = "Successfully Added";
              modalContent.message = `Movie "${state.title} - ${state.year}" Added.`;

              modalContent.options.confirmButton = true;
              modalContent.options.onConfirm = () => {
                setModal(false);
                navigate("/");
              };

              setModal(true);
            }
            break;
          case "update":
            data.image =
              state.image == "/MovieTemplate.png" ? image : state.image;
            data.id = id;

            if (updateMovies(data)) {
              modalContent.title = "Successfully Updated";
              modalContent.message = `Movie "${state.title} - ${state.year}" Updated.`;

              modalContent.options.confirmButton = true;
              modalContent.options.onConfirm = () => {
                setModal(false);
                navigate("/");
              };

              setModal(true);
            }
            break;
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
    dispatch({
      type: e.target.getAttribute("name"),
      value:
        e.target.value != null
          ? e.target.value
          : e.target.getAttribute("data-value"),
    });
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

      <form onSubmit={setMovie}>
        <div className="ImagePicking">
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
          <h2>{setType == "add" ? "Add New" : "Update"} Movie</h2>
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
                <div className="ratings">
                  <i
                    data-value="1"
                    name="rating"
                    onMouseEnter={handleFill}
                    onMouseLeave={handleDefault}
                    onClick={handleInputs}
                  >
                    ★
                  </i>
                  {[...Array(4)].map((elem, index) => (
                    <i
                      key={index}
                      data-value={index + 2}
                      name="rating"
                      onMouseEnter={handleFill}
                      onMouseLeave={handleDefault}
                      onClick={handleInputs}
                    >
                      {index + 2 <= state.rating ? "★" : "☆"}
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ActionButtons">
            <Link to="/">
              <button>Cancel</button>
            </Link>
            {setType == "add" ? (
              <input className="PrimaryButton" type="submit" value="Add" />
            ) : (
              <input className="UpdateButton" type="submit" value="Update" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
