import { useFetchData } from "./useFetchData";

// Movie List data required from data Movies.js
export const useManipulateMovies = () => {
  const { data, postData, putData, deleteData } = useFetchData();

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
    if (deleteData("https://localhost:7294/api/Movies/" + movieID)) {
      return true;
    }

    return false;
  };

  return {
    deleteMovie,
    updateMovies,
    addMovies,
  };
};
