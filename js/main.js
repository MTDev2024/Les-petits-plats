import recipes from './data/recipes.js';
import { createRecipeCard } from './components/recipeCard.js';

function displayRecipes(recipesToShow) {
  const container = document.getElementById('recipes-container');
  container.innerHTML = '';

  recipesToShow.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  displayRecipes(recipes);
});
