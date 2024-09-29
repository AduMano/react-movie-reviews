import { useState } from "react";

// Movies required from "App" (State)
export const useFilterMovies = (movies) => {
  const [resultMovies, setResultMovies] = useState(movies);

  const updateResultMovies = (search, category) => {
    setResultMovies(() => {
      if (category == "All") {
        return movies.filter((movie) =>
          movie.title.toLowerCase().includes(search.toLowerCase())
        );
      } else {
        return movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase()) &&
            movie.genre == category
        );
      }
    });
  };

  return {
    updateResultMovies,
    resultMovies,
  };
};
