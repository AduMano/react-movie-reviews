import { Link } from "react-router-dom";
import { useCallback, useState } from "react";

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
  // State for Rendering
  const [isFave, setIsFave] = useState(isFavorite);
  const [isDisplayed, setIsDisplayed] = useState(true);

  // To update the button
  const updateFave = useCallback((e) => {
    if (e.target.innerText == "Add to Favorite") {
      setIsFave(true);
      updateFavorites(e);
    } else {
      setIsFave(false);
      updateFavorites(e);
    }
  });

  // To destroy (Remove)
  const destroySelf = useCallback((e) => {
    removeMovie(e, () => {
      setIsDisplayed(false);
    });
  });

  return (
    isDisplayed && (
      <div className="MovieCard" key={index}>
        {/* When Clicked will view the detail of the movie */}
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
          {!isFave ? (
            <button
              className={"PrimaryButton"}
              onClick={updateFave}
              data-id={id}
            >
              Add to Favorite
            </button>
          ) : (
            <button
              className={"SecondaryButton"}
              onClick={updateFave}
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
            onClick={destroySelf}
            data-id={id}
            data-name={`${title} - ${releaseYear}`}
          >
            Delete Movie
          </button>
        </div>
      </div>
    )
  );
};
