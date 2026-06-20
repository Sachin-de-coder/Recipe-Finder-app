import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data = await response.json();

      if (data.meals) {
        setRecipe(data.meals[0]);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="details-page">

      <Link to="/">
        <button className="back-btn">
          ← Back to Home
        </button>
      </Link>

      <h1>{recipe.strMeal}</h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="recipe-info">
        <h3>Category</h3>
        <p>{recipe.strCategory}</p>

        <h3>Area</h3>
        <p>{recipe.strArea}</p>

        <h3>Instructions</h3>
        <p>{recipe.strInstructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetails;