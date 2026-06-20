import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [message, setMessage] = useState("");

  // Load suggested recipes when page opens
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );

        const data = await response.json();

        if (data.meals) {
          setSuggestedRecipes(data.meals.slice(0, 8));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuggestions();
  }, []);

  const searchRecipes = async () => {
    if (!ingredient.trim()) {
      setMessage("Please enter an ingredient");
      return;
    }

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setMessage("");
      } else {
        setRecipes([]);
        setMessage("No recipes found");
      }
    } catch (error) {
        console.log(error);
      setMessage("Failed to fetch recipes");
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <div className="hero">
        <h1>🍲 Find Recipes With Ingredients You Have</h1>

        <p>
          Search recipes using ingredients
          available in your kitchen and get
          delicious meal ideas instantly.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        ingredient={ingredient}
        setIngredient={setIngredient}
        searchRecipes={searchRecipes}
      />

      {/* Message */}
      {message && (
        <h2 className="message">
          {message}
        </h2>
      )}

      {/* Section Title */}
      <h2 className="section-title">
        {recipes.length > 0
          ? "Search Results"
          : "Popular Recipe Suggestions"}
      </h2>

      {/* Recipes */}
      <div className="recipe-grid">
        {(recipes.length > 0
          ? recipes
          : suggestedRecipes
        ).map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
          />
        ))}
      </div>
    </>
  );
}

export default Home;