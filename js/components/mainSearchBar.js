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
  // Normaliser mot-clé
  const keyword = normalizeString(window.mainSearchKeyword.trim());

  // Partie 1 - Filtrage par recherche principale
  if (keyword.length >= 3) {
    const keywords = keyword.split(/\s+/);

    filtered = filtered.filter((recipe) => {
      // Normaliser données recette
      const nameNormalized = normalizeString(recipe.name);
      const descriptionNormalized = normalizeString(recipe.description);

      // Normaliser ingrédients
      const ingredientsNormalized = recipe.ingredients.map((ing) => {
        return normalizeString(ing.ingredient);
      });

      // Vérifier si TOUS les mots-clés correspondent
      const allWordsMatch = keywords.every((kw) => {
        let found = false; // ← AJOUTÉ

        // 1. Chercher dans nom
        const nameWords = nameNormalized.split(/\s+/);
        if (nameWords.some((word) => word.startsWith(kw))) {
          found = true;
        }

        // 2. Chercher dans description (si pas encore trouvé)
        if (!found) {
          const descWords = descriptionNormalized.split(/\s+/);
          if (descWords.some((word) => word.startsWith(kw))) {
            found = true;
          }
        }

        // 3. Chercher dans ingrédients (si pas encore trouvé)
        if (!found) {
          found = ingredientsNormalized.some((ingredient) => {
            const ingWords = ingredient.split(/\s+/);
            return ingWords.some((word) => word.startsWith(kw));
          });
        }

        return found;
      });

      return allWordsMatch;
    });

    // TESTS TEMPORAIRES
    // console.log('Recherche:', window.mainSearchKeyword);
    // console.log('Recettes trouvées:', filtered.length);
    // console.log(filtered);
  }

  // TODO : Partie 2 - Filtrage par tags

  // TODO : Partie 3 - MàJ affichage
  window.filteredRecipes = filtered;

  // Gestion message "Aucune recette"
  // Utilisation de 'keyword' existant déjà au début de la fonction
  if (filtered.length === 0 && keyword.length >= 3) {
    displayNoResultsMessage(true, window.mainSearchKeyword.trim());
  } else {
    displayNoResultsMessage(false, '');
    displayRecipes(filtered);
  }

  // MàJ compteur recettes
  const recipesTotal = document.querySelector('.recipes-total p');
  if (recipesTotal) {
    recipesTotal.textContent =
      filtered.length + ' recette' + (filtered.length > 1 ? 's' : '');
  }

  // Dispatch pour dropdown.js (mise à jour des listes)
  document.dispatchEvent(
    new CustomEvent('recipesFiltered', { detail: filtered })
  );
}

// -- FONCTION GLOBALE RÉAPPLIQUER LES FILTRES
// Fonction appelée depuis dropdown.js
window.reapplyFilters = function () {
  applyAllFilters();
};

// -- INITIALISATION
document.addEventListener('DOMContentLoaded', function () {
  const mainSearchInput = document.getElementById('main-search');

  // Écoute saisie utilisateur dans input principal
  mainSearchInput.addEventListener('input', function (event) {
    window.mainSearchKeyword = event.target.value;
    applyAllFilters();
  });

  // Affichage initial (toutes les recettes)
  applyAllFilters();
});
