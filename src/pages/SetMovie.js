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

// Custom Hooks
import { useRatingInput } from "../customHooks/useRatingInput";
import { useValidateMovieInputs } from "../customHooks/useValidateMovieInputs";
import { useSetMovie } from "../customHooks/useSetMovie";
import { useHandleInput } from "../customHooks/useHandleInput";
import { useFetchData } from "../customHooks/useFetchData";

// Components
import { RatingSection } from "../components/SetMoviePage/RatingSection";
import { FormGroup } from "../components/SetMoviePage/FormGroup";
import { modalContent, Modal } from "../components/Modal";
import { DateConverter } from "../helpers/DateConverter";

export const SetMovie = ({ setType }) => {
  const { id } = useParams();

  // Navigation
  const navigate = useNavigate();

  // Context
  const { addMovies, movieCount, updateMovies } = useContext(DataContext);

  // Reducer
  const [state, dispatch] = useReducer(reducer, initialStates);

  // State
  const [movieSelected, setMovieSelected] = useState({});
  const [modal, setModal] = useState(false);

  const categoryOption = useMemo(() => {
    return ["Action", "Comedy", "Sci-Fi", "Horror", "Thriller"];
  }, []);

  // Fetch
  const { data, loading, getData } = useFetchData();

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
        dispatch({ type: "title", value: movieSelected.title });
        dispatch({ type: "description", value: movieSelected.description });
        dispatch({ type: "category", value: movieSelected.genre });
        dispatch({ type: "rating", value: movieSelected.rating });
        dispatch({
          type: "year",
          value: movieSelected.releaseYear,
        });
        setImage(movieSelected.image_url);

        break;

      default:
        navigate("/");
    }
  }, [setType, movieSelected]);

  useEffect(() => {
    const getMovie = async () => {
      await getData("https://localhost:7294/api/Movies/" + id);
    };
    getMovie();
  }, []);

  useEffect(() => {
    if (data == null) {
      setMovieSelected([]);
      return;
    }

    setMovieSelected(data);
  }, [data]);

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
          image_url: "",
          is_favorite: false,
          rating: parseInt(state.rating),
          releaseYear: state.year,
          title: state.title,
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
              value={state.title || ""}
              onChange={handleInputs}
              name="title"
              options={[]}
            />

            <FormGroup
              type="textarea"
              label="Description"
              value={state.description || ""}
              onChange={handleInputs}
              name="description"
              options={[]}
            />

            <div className="DropDown">
              <FormGroup
                type="date"
                label="Date Released"
                value={state.year || ""}
                onChange={handleInputs}
                name="year"
                options={[]}
              />

              <FormGroup
                type="category"
                label="Category"
                value={state.category || ""}
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
