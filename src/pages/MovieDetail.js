import { useParams, Link, useNavigate } from "react-router-dom";
import { Image } from "../components/Image";
import { useEffect, useContext, useState, useCallback } from "react";
import { DataContext } from "../App";
import StarConverter from "../helpers/StarConverter";

import { Modal, modalContent } from "../components/Modal";

// CSS
import "./../styles/detail.css";

export const MovieDetail = () => {
  const {
    isDarkTheme,
    toggleTheme,
    addMovies,
    movies,
    resultMovies,
    updateFavorites,
    deleteMovie,
  } = useContext(DataContext);

  const { id } = useParams();
  const [movie, setMovie] = useState(
    movies.filter((accuMovie) => accuMovie.id == id)[0]
  );
  const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = movie.title + " | Movie";
  }, []);

  useEffect(
    () => setMovie(movies.filter((accuMovie) => accuMovie.id == id)[0]),
    [movies]
  );

  const removeMovie = useCallback((e) => {
    const movieID = parseInt(e.target.getAttribute("data-id"));
    const message = e.target.getAttribute("data-name");

    modalContent.title = `Delete Movie`;
    modalContent.message = `Are you sure you want to delete ${message}?`;
    modalContent.options.cancelButton = true;
    modalContent.options.confirmButton = true;
    modalContent.options.onCancel = () => {
      setModal(false);
    };
    modalContent.options.onConfirm = async () => {
      await setModal(false);

      modalContent.title = `Successfully Deleted`;
      modalContent.message = `Movie ${message} deleted.`;
      modalContent.options.cancelButton = false;
      modalContent.options.confirmButton = true;
      modalContent.options.onConfirm = () => {
        deleteMovie(movieID);
        navigate("/");
      };

      await setModal(true);
    };

    setModal(true);
  });

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
            <Image
              src={movie.image}
              title={movie.title}
              selector="MovieImage"
            />
          </div>
        </div>

        <div className="MovieInfo">
          <div>
            <h1>
              {movie.title} - {movie.releaseYear}
            </h1>

            <br />
            <br />

            <p>{movie.description}</p>

            <div className="MovieStatus">
              <h3>
                {movie.genre} - {StarConverter(movie.rating)}
              </h3>
              {!movie.isFavorite ? (
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
