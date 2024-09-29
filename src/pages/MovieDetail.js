import { useParams, Link } from "react-router-dom";
import { Image } from "../components/Image";
import { useEffect, useContext, useState, useMemo } from "react";

// Context
import { DataContext } from "../App";

// Helpers
import StarConverter from "../helpers/StarConverter";

// Components
import { Modal, modalContent } from "../components/Modal";

// CSS
import "./../styles/detail.css";

// Custom Hooks
import { useConfirmRemoval } from "../customHooks/useConfirmRemoval";

export const MovieDetail = () => {
  // URL Parameter
  const { id } = useParams();

  // Context
  const { movies, updateFavorites, deleteMovie } = useContext(DataContext);

  // State
  const [modal, setModal] = useState(false);

  // Memo
  const movie = useMemo(() => {
    return movies.filter((accuMovie) => accuMovie.id == id)[0];
  }, [movies]);

  useEffect(() => {
    document.title = movie.title + " | Movie";
  }, []);

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
