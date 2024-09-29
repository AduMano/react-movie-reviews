import { useState, useEffect, useCallback } from "react";

// movies and updateResultMovies is required from Home (Inside Context)
export const useSearchMovie = (movies, updateResultMovies) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    // Upon updates on inputs, it waits for .1 seconds before executing the filter
    const timer = setTimeout(() => {
      // Code Here to filter the movies...
      updateResultMovies(search, category);
    }, 100);

    return () => clearTimeout(timer);
  }, [search, category, movies]);

  // Logics
  const filterResult = useCallback((e) => {
    e.preventDefault();
  }, []);

  const updateSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const updateCategory = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  return {
    filterResult,
    updateSearch,
    updateCategory,
    search,
    category,
  };
};
