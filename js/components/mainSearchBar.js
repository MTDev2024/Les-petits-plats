// -- IMPORTS
import recipes from '../data/recipes.js'; // Import recettes
import { displayRecipes } from '../main.js'; // Import fonction affichage

// -- VARIABLES GLOBALES
window.allRecipes = recipes; // toutes les recettes
window.filteredRecipes = recipes; // recettes filtrées après tous les filtres
window.activeTags = []; // tags actifs {type, value}
window.mainSearchKeyword = ''; // mot-clé barre principale

// -- NORMALISATION SAISIE
function normalizeString(str) {
  return str
    .toLowerCase() // tout en minuscules
    .normalize('NFD') // sépare lettres et accents
    .replace(/[\u0300-\u036f]/g, ''); // supprime accents
}

// -- AFFICHAGE CONSIGNE UTILISATEUR

// -- AFFICHAGE MESSAGE D'ERREUR

function displayNoResultsMessage(show, searchTerm) {
  const messageElement = document.getElementById('no-results-message');
  const searchTermElement = document.getElementById('search-term');
  const recipesContainer = document.getElementById('recipes-container');

  if (show) {
    // Affiche le message
    searchTermElement.textContent = '"' + searchTerm + '"';
    messageElement.classList.remove('hidden');
    recipesContainer.classList.add('hidden'); // Cacher conteneur vide
  } else {
    // Cacher message
    messageElement.classList.add('hidden');
    recipesContainer.classList.remove('hidden'); // Afficher conteneur
  }
}

function applyAllFilters() {
  let filtered = window.allRecipes; // On part de toutes les recettes
  // Normaliser le mot-clé de recherche
  const keyword = normalizeString(window.mainSearchKeyword.trim());

  // TODO : Partie 1 - Filtrage par recherche principale
  if (keyword.length >= 3) {
    const keywords = keyword.split(/\s+/);
    filtered = filtered.filter((recipe) => {
      // Normaliser les données de la recette
      const nameNormalized = normalizeString(recipe.name);
      const descriptionNormalized = normalizeString(recipe.description);

      // TODO : normaliser les ingrédients (avec .map())
      const ingredientsNormalized = recipe.ingredients.map((ing) => {
        return normalizeString(ing.ingredient);
      });

      // TODO : vérifier si TOUS les mots-clés correspondent (avec .every())
      // TODO : vérifier si la recette correspond aux mots-clés
      return true; // Pour l'instant on garde tout
    });
  }
  // TODO : Partie 2 - Filtrage par tags

  // TODO : Partie 3 - Mise à jour de l'affichage
}
