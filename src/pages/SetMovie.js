import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useContext,
  useMemo,
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

// Custom Hooks
import { useRatingInput } from "../customHooks/useRatingInput";
import { useValidateMovieInputs } from "../customHooks/useValidateMovieInputs";
import { useSetMovie } from "../customHooks/useSetMovie";
import { useHandleInput } from "../customHooks/useHandleInput";
import { RatingSection } from "../components/SetMoviePage/RatingSection";
import { FormGroup } from "../components/SetMoviePage/FormGroup";

export const SetMovie = ({ setType }) => {
  const { id } = useParams();

  // Navigation
  const navigate = useNavigate();

  // Context
  const { movies, addMovies, movieCount, updateMovies } =
    useContext(DataContext);

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialStates);

  // State
  const [modal, setModal] = useState(false);

  const categoryOption = useMemo(() => {
    return ["Action", "Comedy", "Sci-Fi", "Horror", "Thriller"];
  }, []);

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
  const { handleFill, handleDefault } = useRatingInput(state);
  const { postMovie } = useSetMovie(addMovies, updateMovies);
  const { handleFileChange, handleInputs, setImage, fileInput, image } =
    useHandleInput(dispatch, modalContent, state, setModal);

  const setMovie = useCallback(
    (e) => {
      e.preventDefault();

      // Validate
      const { validate } = useValidateMovieInputs(
        validate_title,
        validate_description,
        validate_year,
        setModal,
        modalContent,
        state,
        setType
      );

      // If theres nothing wrong
      if (validate()) {
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

        postMovie(
          data,
          setType,
          movieCount,
          state,
          setModal,
          modalContent,
          id,
          image
        );

        return;
      } else {
        // Show Modal
        setModal(true);
      }
    },
    [state]
  );

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
            <FormGroup
              type="text"
              label="Title"
              value={state.title}
              onChange={handleInputs}
              name="title"
              options={[]}
            />

            <FormGroup
              type="textarea"
              label="Description"
              value={state.description}
              onChange={handleInputs}
              name="description"
              options={[]}
            />

            <div className="DropDown">
              <FormGroup
                type="number"
                label="Year Released"
                value={state.year}
                onChange={handleInputs}
                name="year"
                options={[]}
              />

              <FormGroup
                type="category"
                label="Category"
                value={state.category}
                onChange={handleInputs}
                name="category"
                options={categoryOption}
              />

              <div className="FormGroup">
                <label>Rating: </label>
                <RatingSection
                  handleFill={handleFill}
                  handleDefault={handleDefault}
                  handleInputs={handleInputs}
                  state={state}
                />
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
