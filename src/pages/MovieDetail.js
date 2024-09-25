import { useParams, Link } from "react-router-dom";
import { Image } from "../components/Image";
import { useEffect, useContext, useState } from "react";
import { DataContext } from "../App";
import StarConverter from "../helpers/StarConverter";

// CSS
import "./../styles/detail.css";

export const MovieDetail = () => {
  const { isDarkTheme, toggleTheme, movies, updateMovies } =
    useContext(DataContext);

  const { id } = useParams();
  const [movie, setMovie] = useState(movies[id]);

  useEffect(() => {
    document.title = movies[id].title + " | Movie";
  }, []);

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

            <p>{movie.description}</p>

            <div className="MovieStatus">
              <h3>
                {movie.genre} - {StarConverter(movie.rating)}
              </h3>
              {!movie.isFavorite ? (
                <button>Add to Favorite</button>
              ) : (
                <button disabled={true}>Added to Favorites.</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
