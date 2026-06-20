function SearchBar({
  ingredient,
  setIngredient,
  searchRecipes,
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by ingredient..."
        value={ingredient}
        onChange={(e) =>
          setIngredient(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchRecipes();
          }
        }}
      />

      <button onClick={searchRecipes}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;