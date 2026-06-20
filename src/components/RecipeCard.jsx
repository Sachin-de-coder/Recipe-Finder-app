import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="card">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
      />

      <div className="card-body">
        <h3>{recipe.strMeal}</h3>

        <Link to={`/recipe/${recipe.idMeal}`}>
          <button>View Recipe</button>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;