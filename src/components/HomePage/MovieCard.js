import { Link } from "react-router-dom";

// Helpers
import StarConverter from "../../helpers/StarConverter";

export const MovieCard = ({
  id,
  index,
  image,
  title,
  genre,
  rating,
  releaseYear,
  isFavorite,
  updateFavorites,
  removeMovie,
}) => {
  return (
    <div className="MovieCard" key={index}>
      <Link to={"/detail/" + id}>
        <div className="MovieHeader">
          <img className="MovieImage" src={image} alt={title} />

          <div className="MovieOverlay">
            <div className="MovieRate">
              {StarConverter(rating)} - {genre}
            </div>
            <h4>{releaseYear}</h4>
          </div>
        </div>

        <div className="MovieBody">
          <h3>{title}</h3>
        </div>
      </Link>

      <div className="MovieFooter">
        {!isFavorite ? (
          <button
            className={"PrimaryButton"}
            onClick={updateFavorites}
            data-id={id}
          >
            Add to Favorite
          </button>
        ) : (
          <button
            className={"SecondaryButton"}
            onClick={updateFavorites}
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
          data-name={`${title} - ${releaseYear}`}
        >
          Delete Movie
        </button>
      </div>
    </div>
  );
};
