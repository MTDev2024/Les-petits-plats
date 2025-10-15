import recipes from './data/recipes.js';
import { createRecipeCard } from './components/recipeCard.js';

const recipesContainer = document.querySelector('#recipes-container');

function displayRecipes(list) {
  recipesContainer.innerHTML = '';
  list.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipesContainer.appendChild(card);
  });
}

// console.log('main.js chargé — nombre de recettes :', recipes.length);
displayRecipes(recipes);

import './components/dropdown.js';

// Pour plus tard
// import { initDropdowns } from './dropdowns.js';
// import { initFilters } from './filters.js';

// document.addEventListener('DOMContentLoaded', () => {
//   initDropdowns();
//   initFilters();
// });

// <script src="./scripts/dropdowns.js"></script>
// <script src="./scripts/filters.js"></script>
// <script src="./scripts/main.js"></script>
