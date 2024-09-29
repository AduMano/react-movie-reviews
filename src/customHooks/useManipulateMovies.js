import { useState } from "react";

// Data Movies
import { movieList, movieCounter } from "./../data/Movies";

// Movie List data required from data Movies.js
export const useManipulateMovies = () => {
  const [movies, setMovies] = useState(movieList);
  const [movieCount, setMovieCount] = useState(movieCounter);

  const addMovies = (movie) => {
    const newMovie = [...movies];
    newMovie.push(movie);

    setMovies(newMovie);
    setMovieCount((prev) => prev + 1);

    return true;
  };

  const updateMovies = (selectedMovie) => {
    setMovies((prev) =>
      prev.map((movie) => {
        if (movie.id == selectedMovie.id) {
          return {
            ...movie,
            isFavorite: false,
            title: selectedMovie.title,
            genre: selectedMovie.genre,
            releaseYear: parseInt(selectedMovie.releaseYear),
            rating: parseInt(selectedMovie.rating),
            description: selectedMovie.description,
            image: selectedMovie.image,
          };
        } else {
          return movie;
        }
      })
    );

    return true;
  };

  const deleteMovie = (movieID) => {
    setMovies((prev) => prev.filter((movie) => movie.id != movieID));
    return true;
  };

  return {
    deleteMovie,
    updateMovies,
    addMovies,
    setMovies,
    movies,
    movieCount,
  };
};
