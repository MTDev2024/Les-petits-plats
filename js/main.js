// IMPORTS
// Import des données des recettes
import recipes from './data/recipes.js';
// Import composants
import './components/mainSearchBar.js';
import './components/dropdown.js';
// Import factory
import { createRecipeCard } from './components/recipeCard.js';

// SÉLECTION DES ÉLÉMENTS DOM
// Récupération conteneur recettes
const recipesContainer = document.querySelector('#recipes-container');

// VARIABLES POUR VIRTUAL SCROLLING
let allRecipes = recipes; // Liste complète recettes
let displayedRecipes = []; // Recettes actuellement affichées
const RECIPES_PER_LOAD = 12; // Nombre de recettes à charger par batch
let isLoading = false; // Flag pour éviter les chargements multiples

// FONCTION DE CHARGEMENT PROGRESSIF
function loadMoreRecipes() {
  // Calculer l'index de départ et de fin
  const start = displayedRecipes.length;
  const end = Math.min(start + RECIPES_PER_LOAD, allRecipes.length);

  // Récupérer le prochain batch de recettes
  const newRecipes = allRecipes.slice(start, end);

  // Créer et ajouter chaque carte
  newRecipes.forEach((recipe) => {
    const card = createRecipeCard(recipe);
    recipesContainer.appendChild(card);
  });

  // Mettre à jour la liste des recettes affichées
  displayedRecipes = displayedRecipes.concat(newRecipes);

  // Mettre à jour le compteur de recettes
  updateRecipeCount();
}

// FONCTION DE MISE À JOUR DU COMPTEUR
function updateRecipeCount() {
  const counter = document.querySelector('.recipes-total p');
  if (counter) {
    const total = allRecipes.length;
    const displayed = displayedRecipes.length;
    counter.textContent = `${displayed}/${total} recettes`;
  }
}

// DÉTECTION DU SCROLL POUR CHARGER PLUS
window.addEventListener('scroll', () => {
  // Si déjà en train de charger, on attend
  if (isLoading) return;

  // Si toutes les recettes sont déjà affichées, on arrête
  if (displayedRecipes.length >= allRecipes.length) return;

  // Calcul de la position du scroll
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  // Si on atteint 80% de la page, on charge plus de recettes
  if (scrollTop + clientHeight >= scrollHeight * 0.8) {
    isLoading = true;
    loadMoreRecipes();
    isLoading = false;
  }
});

// AFFICHAGE (fonction exportée pour compatibilité avec les filtres)
export function displayRecipes(list) {
  // Mise à jour de la liste complète
  allRecipes = list;

  // Réinitialisation
  displayedRecipes = [];
  recipesContainer.innerHTML = '';

  // Chargement initial
  loadMoreRecipes();

  // Si moins de recettes que RECIPES_PER_LOAD, on peut charger plus directement
  if (allRecipes.length <= RECIPES_PER_LOAD) {
    updateRecipeCount();
  }
}

// CHARGEMENT INITIAL
// Au chargement de la page, on affiche le premier batch de recettes
displayRecipes(recipes);
