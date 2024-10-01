import { useFetchData } from "./useFetchData";

export const useToggleFavorite = () => {
  const { putData } = useFetchData();

  const updateFavorites = async (e) => {
    let movieID = e.target.getAttribute("data-id");
    let url = "https://localhost:7294/api/Movies/" + movieID + "/favorite";

    switch (e.target.innerText) {
      case "Add to Favorite":
        putData(url, { is_favorite: true });
        break;
      case "Remove to Favorites":
        putData(url, { is_favorite: false });
        break;
    }
  };

  return {
    updateFavorites: updateFavorites,
  };
};
