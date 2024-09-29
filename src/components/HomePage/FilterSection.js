export const FilterSection = ({
  filterResult,
  search,
  updateSearch,
  updateCategory,
  category,
}) => {
  return (
    <div className="FilterSection">
      <form onSubmit={filterResult}>
        <input
          type="search"
          value={search}
          placeholder="Search Movie..."
          onChange={updateSearch}
        />

        <select onChange={updateCategory} value={category}>
          <option value="All">All Categories</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
        </select>
      </form>
    </div>
  );
};
