import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";

// Context
import { DataContext } from "../App";

// Components
import { Modal, modalContent } from "../components/Modal";
import { MovieCard } from "../components/HomePage/MovieCard";
import { FilterSection } from "../components/HomePage/FilterSection";

// Helpers
import { DateConverter } from "../helpers/DateConverter";

// CSS
import "./../styles/home.css";

// Custom Hooks
import { useConfirmRemoval } from "../customHooks/useConfirmRemoval";
import { useSearchMovie } from "../customHooks/useSearchMovie";
import { useFetchData } from "../customHooks/useFetchData";
import { useFilterMovies } from "../customHooks/useFilterMovies";
import { useToggleFavorite } from "../customHooks/useToggleFavorite";

export const Home = () => {
  /// Initiation of Hooks
  const [modal, setModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Filtering Movies
  const { updateResultMovies, resultMovies } = useFilterMovies(movies);

  // Context
  const { deleteMovie } = useContext(DataContext);

  // Custom Hook
  const { data, getData } = useFetchData();
  const { updateFavorites } = useToggleFavorite();

  const { removeMovie } = useConfirmRemoval(
    modalContent,
    setModal,
    deleteMovie,
    false
  );

  const { filterResult, updateSearch, updateCategory, search, category } =
    useSearchMovie(movies, updateResultMovies);

  // On Load, Change the document's Title
  useEffect(() => {
    document.title = "Home - Movies";

    setLoading(true);
    getData("https://localhost:7294/api/Movies/Page/" + page);
    setMovies([]);
  }, [page]);

  useEffect(() => {
    if (data == null) {
      setMovies([]);
      return;
    }

    // Set Result and Pages
    setMovies(data.movies);
    setTotalPages(Math.floor(parseInt(data.totalCount) / 2));
    setLoading(false);

    // Manage Pagination
  }, [data]);

  const updatePage = useCallback((e) => {
    const pressedPage = parseInt(e.target.getAttribute("data-page"));

    setPage(pressedPage);
  });

  return (
    <div className="HomeContainer">
      {modal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          options={modalContent.options}
        />
      )}

      <FilterSection
        filterResult={filterResult}
        search={search}
        updateSearch={updateSearch}
        updateCategory={updateCategory}
        category={category}
      />

      <h1 style={{ textAlign: "center" }}>MOVIES</h1>

      <div className="MovieSection">
        {loading ? (
          <h1>Loading Data...</h1>
        ) : (
          resultMovies.map(
            (
              { is_favorite, title, id, genre, releaseYear, rating, image_url },
              index
            ) => (
              <MovieCard
                key={index}
                id={id}
                index={index}
                image={image_url}
                title={title}
                genre={genre}
                rating={rating}
                releaseYear={DateConverter(releaseYear)}
                isFavorite={is_favorite}
                updateFavorites={updateFavorites}
                removeMovie={removeMovie}
              />
            )
          )
        )}
      </div>

      {/* Pagination */}
      <div className="MoviePagination">
        <button onClick={updatePage} data-page={1}>
          &lt;
        </button>

        {totalPages <= 10
          ? [...Array(totalPages)].map((_, index) => (
              <button key={index} data-page={index + 1} onClick={updatePage}>
                {index + 1}
              </button>
            ))
          : false}

        <button onClick={updatePage} data-page={totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};
