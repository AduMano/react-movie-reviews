// setMovies function definition required from ManipulateMovies hook
export const useToggleFavorite = (setMovies) => {
  const updateFavorites = (e) => {
    let movieID = parseInt(e.target.getAttribute("data-id"));

    switch (e.target.innerText) {
      case "Add to Favorite":
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieID ? { ...movie, isFavorite: true } : movie
          )
        );
        break;
      case "Remove to Favorites":
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieID ? { ...movie, isFavorite: false } : movie
          )
        );
        break;
    }
  };

  return {
    updateFavorites,
  };
};
