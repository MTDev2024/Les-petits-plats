// Mode : if, else, for, etc.

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

// -- FILTRAGE COMPLET (BARRE + TAGS)

// Application filtres
// 1. Filtre barre principale
// 2. Filtre tags actifs (intersection)
function applyAllFilters() {
  let filtered = window.allRecipes; // toutes les recettes

  // 1. FILTRE INPUT PRINCIPAL

  const keyword = normalizeString(window.mainSearchKeyword.trim());

  // Si 3 caractères ou plus, filtrage
  if (keyword.length >= 3) {
    const keywords = keyword.split(/\s+/); // découpage en mots
    const tempFiltered = [];

    // Parcours de toutes les recettes
    for (let i = 0; i < filtered.length; i++) {
      const recipe = filtered[i];

      const nameNormalized = normalizeString(recipe.name);
      const descriptionNormalized = normalizeString(recipe.description);
      const ingredientsNormalized = [];
      for (let j = 0; j < recipe.ingredients.length; j++) {
        ingredientsNormalized.push(
          normalizeString(recipe.ingredients[j].ingredient)
        );
      }

      let allWordsMatch = true;

      // Vérification que CHAQUE mot de la recherche correspond
      for (let k = 0; k < keywords.length; k++) {
        const kw = keywords[k];
        let found = false;

        // Recherche dans nom
        const nameWords = nameNormalized.split(/\s+/);
        for (let n = 0; n < nameWords.length; n++) {
          if (nameWords[n].startsWith(kw)) {
            found = true;
            break;
          }
        }

        // Recherche dans description
        if (!found) {
          const descWords = descriptionNormalized.split(/\s+/);
          for (let n = 0; n < descWords.length; n++) {
            if (descWords[n].startsWith(kw)) {
              found = true;
              break;
            }
          }
        }

        // Recherche dans ingrédients
        if (!found) {
          for (let n = 0; n < ingredientsNormalized.length; n++) {
            const ingWords = ingredientsNormalized[n].split(/\s+/);
            for (let m = 0; m < ingWords.length; m++) {
              if (ingWords[m].startsWith(kw)) {
                found = true;
                break;
              }
            }
            if (found) break;
          }
        }

        // Si un mot ne correspond pas -> recette est exclue
        if (!found) {
          allWordsMatch = false;
          break;
        }
      }

      // Si tous les mots correspondent -> recette inclue
      if (allWordsMatch) {
        tempFiltered.push(recipe);
      }
    }

    filtered = tempFiltered;
  }

  // 2. FILTRAGE TAGS (INTERSECTION)
  // Chaque tag ajouté réduit progressivement les résultats
  for (let i = 0; i < window.activeTags.length; i++) {
    const tag = window.activeTags[i];
    const tempFiltered = [];

    for (let j = 0; j < filtered.length; j++) {
      const recipe = filtered[j];
      let matches = false;

      if (tag.type === 'ingredient') {
        // Vérification si recette contient ingrédient
        for (let k = 0; k < recipe.ingredients.length; k++) {
          if (
            normalizeString(recipe.ingredients[k].ingredient) ===
            normalizeString(tag.value)
          ) {
            matches = true;
            break;
          }
        }
      } else if (tag.type === 'appliance') {
        // Vérifie si recette utilise appareil
        if (normalizeString(recipe.appliance) === normalizeString(tag.value)) {
          matches = true;
        }
      } else if (tag.type === 'ustensil') {
        // Vérifie si recette utilise ustensile
        for (let k = 0; k < recipe.ustensils.length; k++) {
          if (
            normalizeString(recipe.ustensils[k]) === normalizeString(tag.value)
          ) {
            matches = true;
            break;
          }
        }
      }

      // Si recette correspond au tag -> recette inclue
      if (matches) {
        tempFiltered.push(recipe);
      }
    }

    filtered = tempFiltered; // intersection progressive
  }

  // 3. MISE À JOUR ET AFFICHAGE
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

  // Affichage
  applyAllFilters();
});
