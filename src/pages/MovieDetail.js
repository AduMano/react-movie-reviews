import { useParams, Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

// Context
import { DataContext } from "../App";

// Helpers
import StarConverter from "../helpers/StarConverter";
import { DateConverter } from "../helpers/DateConverter";

// Components
import { Modal, modalContent } from "../components/Modal";

// Fetch
import { useFetchData } from "../customHooks/useFetchData";

// CSS
import "./../styles/detail.css";

// Custom Hooks
import { useConfirmRemoval } from "../customHooks/useConfirmRemoval";

export const MovieDetail = () => {
  // URL Parameter
  const { id } = useParams();

  // Context
  const { updateFavorites, deleteMovie } = useContext(DataContext);

  // State
  const [modal, setModal] = useState(false);
  const [movie, setMovie] = useState({});

  // Fetch
  const { data, getData } = useFetchData();

  useEffect(() => {
    document.title = movie.title + " | Movie";

    const getMovie = async () => {
      await getData("https://localhost:7294/api/Movies/" + id);
    };

    getMovie();
  }, []);

  useEffect(() => {
    if (data == null) {
      setMovie([]);
      return;
    }

    setMovie(data);
  }, [data]);

  // Custom Hook
  const { removeMovie } = useConfirmRemoval(
    modalContent,
    setModal,
    deleteMovie,
    true
  );

  return (
    <div className="DetailContainer">
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

      <Link to="/">
        <button className="BackButton">GO BACK</button>
      </Link>

      <div className="MovieCard">
        <div className="MoviePoster">
          <div className="MovieImageContainer">
            <img
              className={"MovieImage"}
              src={movie.image_url}
              alt={movie.title}
            />
          </div>
        </div>

        <div className="MovieInfo">
          <div>
            <h1>
              {movie.title} - {DateConverter(movie.releaseYear)}
            </h1>

            <br />
            <br />

            <p>{movie.description}</p>

            <div className="MovieStatus">
              <h3>
                {movie.genre} - {StarConverter(movie.rating)}
              </h3>
              {!movie.is_favorite ? (
                <button
                  onClick={updateFavorites}
                  className={"PrimaryButton"}
                  data-id={movie.id}
                >
                  Add to Favorite
                </button>
              ) : (
                <button
                  onClick={updateFavorites}
                  className={"SecondaryButton"}
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
                data-name={`${movie.title} - ${movie.releaseYear}`}
              >
                Delete Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
