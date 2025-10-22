// console.log('mainSearchBar.js chargé');

// Import recettes
import recipes from '../data/recipes.js';
// Import fonction pour affichage
import { displayRecipes } from '../main.js';

//
function normalizeString(str) {
  return str
    .toLowerCase() // tout en minuscules
    .normalize('NFD') // séparation lettres et accents
    .replace(/[\u0300-\u036f]/g, ''); // suppression des accents
}

// On attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  // Récupèration input principal
  const mainSearchInput = document.getElementById('main-search');

  // Ecoute chaque saisie user
  mainSearchInput.addEventListener('input', (event) => {
    // Texte brut saisie user
    const originalKeyword = event.target.value.trim();

    // Version normalisée pour la recherche
    const keyword = normalizeString(originalKeyword);

    // Si saisie < 3 lettres -> affichage de toutes les recettes
    if (keyword.length < 3) {
      displayRecipes(recipes);
      return; // stop
    }

    // Tableau recettes correspondantes à la recherche
    const filteredRecipes = [];

    // Traitement de chaque recette
    for (const recipe of recipes) {
      // Normalisation nom, description, ingrédients
      const nameNormalized = normalizeString(recipe.name);
      const descriptionNormalized = normalizeString(recipe.description);
      const ingredientsNormalized = recipe.ingredients.map((ing) =>
        normalizeString(ing.ingredient)
      );

      // Découpage en mots pour comparer mot par mot
      const nameWords = nameNormalized.split(/\s+/); // tableau des mots du nom
      const descriptionWords = descriptionNormalized.split(/\s+/); // tableau des mots de la description

      // Vérification si mot-clé = début d'un mot dans le nom
      const nameMatches = nameWords.some((word) => word.startsWith(keyword));

      // Vérification si mot-clé = début d'un mot dans la description
      const descriptionMatches = descriptionWords.some((word) =>
        word.startsWith(keyword)
      );

      // Vérification si mot-clé = début d'un mot dans les ingrédients
      const ingredientMatches = ingredientsNormalized.some((ingredient) =>
        ingredient.split(/\s+/).some((word) => word.startsWith(keyword))
      );

      // Si mot-clé trouvé dans le nom, la description ou les ingrédients
      if (nameMatches || descriptionMatches || ingredientMatches) {
        filteredRecipes.push(recipe); // Ajout recette à la liste des résultats filtrés
      }
    }

    // Affichage des recettes filtrées
    displayRecipes(filteredRecipes);
  });
});
