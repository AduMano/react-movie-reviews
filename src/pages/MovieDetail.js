import { useParams, Link } from "react-router-dom";
import { Image } from "../components/Image";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../App";
import StarConverter from "../helpers/StarConverter";

// CSS
import "./../styles/detail.css";

export const MovieDetail = () => {
  const {
    isDarkTheme,
    toggleTheme,
    updateMovies,
    movies,
    resultMovies,
    updateFavorites,
  } = useContext(DataContext);

  const { id } = useParams();
  const [movie, setMovie] = useState(
    movies.filter((accuMovie) => accuMovie.id == id)[0]
  );

  useEffect(() => {
    document.title = movie.title + " | Movie";
  });

  useEffect(
    () => setMovie(movies.filter((accuMovie) => accuMovie.id == id)[0]),
    [movies]
  );

  return (
    <div className="DetailContainer">
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
            <h1>{movie.title}</h1>

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
                  className={"DangerButton"}
                  data-id={id}
                >
                  Remove to Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
