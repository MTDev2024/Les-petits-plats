const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

function closeAllDropdowns() {
  document.querySelectorAll('.dropdown__menu').forEach((menu) => {
    menu.classList.add('hidden');
  });

  document.querySelectorAll('.dropdown__toggle').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
}

// Action au clic
dropdownToggles.forEach((toggle, index) => {
  const dropdownMenu = toggle.nextElementSibling; // menu juste après le bouton dans le HTML

  // === ASSIGNATION ID POUR ACCESSIBILITÉ ===
  if (!dropdownMenu.id) {
    dropdownMenu.id = `dropdown-menu-${index}`; // id unique si pas déjà défini
  }
  toggle.setAttribute('aria-controls', dropdownMenu.id); // relie le bouton au menu

  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // empêche le clic de "remonter" au document

    const isOpen = toggle.getAttribute('aria-expanded') === 'true'; // vérifie si menu déjà ouvert

    closeAllDropdowns(); // ferme tous les menus avant d’en ouvrir un autre

    if (!isOpen) {
      toggle.setAttribute('aria-expanded', 'true'); // indique menu ouvert
      dropdownMenu.classList.remove('hidden'); // affiche menu

      // Focus 1er élément de la liste
      const firstItem = dropdownMenu.querySelector('li > button, li > a');
      if (firstItem) firstItem.focus();
    }
  });
});

// Fermeture dropdowns si clic extérieur
document.addEventListener('click', () => {
  closeAllDropdowns();
});

// == AFFICHAGE DES LISTES DANS LES DROPDOWNS
// Import données
import recipes from '../data/recipes.js';

// --- Sélection des conteneurs du DOM ---
const ingredientsList = document.querySelector('.ingredients-dropdown__list');
const appliancesList = document.querySelector('.appareils-dropdown__list');
const ustensilsList = document.querySelector('.ustensiles-dropdown__list');

// --- Extraction / dédoublonnage données ---
function getUniqueIngredients(recipes) {
  const ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => ingredientsSet.add(item.ingredient));
  });
  return Array.from(ingredientsSet).sort();
}

function getUniqueAppliances(recipes) {
  const appliancesSet = new Set();
  recipes.forEach((recipe) => appliancesSet.add(recipe.appliance));
  return Array.from(appliancesSet).sort();
}

function getUniqueUstensils(recipes) {
  const ustensilsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((u) => ustensilsSet.add(u));
  });
  return Array.from(ustensilsSet).sort();
}

// --- Injection ---
function fillDropdown(listElement, items) {
  listElement.innerHTML = '';

  items.forEach((item) => {
    const li = document.createElement('li');
    const button = document.createElement('button');

    button.className =
      'w-full text-left p-4 font-family-sans text-sm text-text-black font-normal hover:bg-primary-yellow focus:bg-primary-yellow focus:outline-none';
    button.setAttribute('role', 'menuitem');
    button.textContent = item;

    li.appendChild(button);
    listElement.appendChild(li);
  });
}

// --- Fonction principale ---
function initDropdowns() {
  const ingredients = getUniqueIngredients(recipes);
  const appliances = getUniqueAppliances(recipes);
  const ustensils = getUniqueUstensils(recipes);

  fillDropdown(ingredientsList, ingredients);
  fillDropdown(appliancesList, appliances);
  fillDropdown(ustensilsList, ustensils);
}

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', initDropdowns);
