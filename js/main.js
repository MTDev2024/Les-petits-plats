// IMPORTS
// Import des données des recettes
import recipes from './data/recipes.js';

// Import composants
import './components/mainSearchBar.js';
import './components/dropdown.js';

// Import factory
import { createRecipeCard } from './components/recipeCard.js';

//  SÉLECTION DES ÉLÉMENTS DOM
// Récupération conteneur recettes
const recipesContainer = document.querySelector('#recipes-container');

// AFFICHAGE
// Affichage de la liste des recettes
export function displayRecipes(list) {
  // Vider conteneur avant affichage
  recipesContainer.innerHTML = '';

  // Pour chaque recette dans la liste
  list.forEach((recipe) => {
    // Création d'une carte de recette
    const card = createRecipeCard(recipe);
    // Ajout de la carte au conteneur
    recipesContainer.appendChild(card);
  });
}

// AFFICHAGE INITIAL
// Au chargement de la page, on affiche toutes les recettes
displayRecipes(recipes);
