//console.log('✅ main.js chargé');

import recipes from './data/recipes.js';

import './components/mainSearchBar.js';

import './components/dropdown.js';
// import './components/dropdownSearch.js';
import { createRecipeCard } from './components/recipeCard.js';

const recipesContainer = document.querySelector('#recipes-container');

export function displayRecipes(list) {
  recipesContainer.innerHTML = '';
  list.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipesContainer.appendChild(card);
  });
}

// console.log('main.js chargé — nombre de recettes :', recipes.length);
displayRecipes(recipes);
