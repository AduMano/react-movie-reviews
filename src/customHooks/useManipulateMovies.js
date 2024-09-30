import { useEffect, useState } from "react";

// Data Movies
import { movieCounter } from "./../data/Movies";
import { useFetchData } from "./useFetchData";

// Movie List data required from data Movies.js
export const useManipulateMovies = () => {
  const { data, error, loading, getData, postData, putData, deleteData } =
    useFetchData();
  const [movies, setMovies] = useState([]);
  const [movieCount, setMovieCount] = useState(movieCounter);

  useEffect(() => {
    getData("https://localhost:7294/api/Movies/");
  }, []);

  useEffect(() => {
    if (data == null) {
      setMovies([]);
      return;
    }

    setMovies(data);
  }, [data]);

  const addMovies = (movie) => {
    if (postData("https://localhost:7294/api/Movies/", movie)) {
      return true;
    }

    return false;
  };

  const updateMovies = (selectedMovie, id) => {
    if (putData("https://localhost:7294/api/Movies/" + id, selectedMovie)) {
      return true;
    }

    return false;
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
    loading,
  };
};
