// Mode : if, for, else

// -- SÉLECTION DES ÉLÉMENTS

const ingredientsList = document.querySelector('.ingredients-dropdown__list');
const appliancesList = document.querySelector('.appareils-dropdown__list');
const ustensilsList = document.querySelector('.ustensiles-dropdown__list');
const tagsDisplay = document.querySelector('.tags-display');

// -- NORMALISATION

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// -- AJOUT D'UN TAG

function addTag(tagName, type) {
  // Vérification si tag existe déjà (éviter doublons)
  const existingTag = tagsDisplay.querySelector('[data-tag="' + tagName + '"]');
  if (existingTag) return;

  // Création bouton / tag
  const tagButton = document.createElement('button');
  tagButton.type = 'button';
  tagButton.className =
    'tag-element bg-primary-yellow cursor-pointer rounded-md inline-flex items-center gap-2 px-3 py-1.5 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500';
  tagButton.setAttribute('data-tag', tagName);
  tagButton.setAttribute('aria-label', 'Supprimer le tag ' + tagName);

  const tagText = document.createElement('span');
  tagText.textContent = tagName;

  const tagIcon = document.createElement('img');
  tagIcon.src = 'images/icons/vector.png';
  tagIcon.alt = '';
  tagIcon.setAttribute('aria-hidden', 'true');
  tagIcon.className = 'w-[12px] h-[12px] pl-1';

  tagButton.appendChild(tagText);
  tagButton.appendChild(tagIcon);
  tagsDisplay.appendChild(tagButton);

  // Ajout aux tags globaux
  window.activeTags.push({ type: type, value: tagName });

  // Réapplique tous les filtres (input principal + tags)
  if (window.reapplyFilters) {
    window.reapplyFilters();
  }

  // Suppression tag au clic
  tagButton.addEventListener('click', function () {
    removeTag(tagButton, type, tagName);
  });
}

// -- SUPPRESSION D'UN TAG

function removeTag(tagButton, type, tagName) {
  // Supprime le bouton du DOM
  tagButton.remove();

  // Supprime le tag du tableau global
  const newTags = [];
  for (let i = 0; i < window.activeTags.length; i++) {
    const currentTag = window.activeTags[i];
    // On garde uniquement les tags différents
    if (!(currentTag.type === type && currentTag.value === tagName)) {
      newTags.push(currentTag);
    }
  }
  window.activeTags = newTags;

  // Réapplique tous les filtres
  if (window.reapplyFilters) {
    window.reapplyFilters();
  }
}

// -- REMPLISSAGE D'UN DROPDOWN
function fillDropdown(listElement, items, type) {
  listElement.innerHTML = ''; // vide la liste

  // Si aucun item, affiche un message
  if (items.length === 0) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.className = 'block p-4 text-sm text-gray-500 italic';
    span.textContent = 'Aucun résultat';
    li.appendChild(span);
    listElement.appendChild(li);
    return;
  }

  // Création bouton pour chaque item
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className =
      'w-full text-left p-4 text-sm hover:bg-primary-yellow focus:bg-primary-yellow focus:outline-none';
    button.textContent = item;
    button.setAttribute('role', 'menuitem');

    // Ajout du tag au clic
    button.addEventListener('click', function () {
      addTag(item, type);
    });

    li.appendChild(button);
    listElement.appendChild(li);
  }
}

// -- MÀJ DROPDOWNS SELON RECETTES FILTRÉES

function updateDropdowns(recipesArray) {
  // Utilise une variable locale au lieu de modifier le paramètre
  let recipes = recipesArray;

  // Si aucune recette, utilisation de toutes les recettes
  if (!recipes || recipes.length === 0) {
    recipes = window.allRecipes;
  }

  // Utilisation objets comme "sets" -> éviter les doublons
  const ingredientsSet = {};
  const appliancesSet = {};
  const ustensilsSet = {};

  // Parcours de toutes les recettes filtrées
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    // Récupère tous les ingrédients
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientsSet[recipe.ingredients[j].ingredient] = true;
    }

    // Récupère l'appareil
    appliancesSet[recipe.appliance] = true;

    // Récupère tous les ustensiles
    for (let j = 0; j < recipe.ustensils.length; j++) {
      ustensilsSet[recipe.ustensils[j]] = true;
    }
  }

  // Supprime les items déjà ajoutés comme tags
  for (let t = 0; t < window.activeTags.length; t++) {
    const tag = window.activeTags[t];
    if (tag.type === 'ingredient') {
      delete ingredientsSet[tag.value];
    }
    if (tag.type === 'appliance') {
      delete appliancesSet[tag.value];
    }
    if (tag.type === 'ustensil') {
      delete ustensilsSet[tag.value];
    }
  }

  // Conversion en tableau et tri alphabétique
  const ingredientsArray = Object.keys(ingredientsSet).sort();
  const appliancesArray = Object.keys(appliancesSet).sort();
  const ustensilsArray = Object.keys(ustensilsSet).sort();

  // Remplit les dropdowns
  fillDropdown(ingredientsList, ingredientsArray, 'ingredient');
  fillDropdown(appliancesList, appliancesArray, 'appliance');
  fillDropdown(ustensilsList, ustensilsArray, 'ustensil');
}

// -- FILTRAGE DES DROPDOWNS (BARRES DE RECHERCHE INTERNES)
function filterDropdownItems(searchInput, listElement, allItems, type) {
  const keyword = normalizeString(searchInput.value.trim());

  // Si vide, affiche tous les items
  if (keyword.length === 0) {
    fillDropdown(listElement, allItems, type);
    return;
  }

  // Filtre items contenant mot-clé
  const filtered = [];
  for (let i = 0; i < allItems.length; i++) {
    const itemNormalized = normalizeString(allItems[i]);
    if (itemNormalized.indexOf(keyword) !== -1) {
      filtered.push(allItems[i]);
    }
  }

  fillDropdown(listElement, filtered, type);
}

// -- ÉVÉNEMENT RECIPES FILTRÉES

// Écoute les changements de recettes filtrées
document.addEventListener('recipesFiltered', function (e) {
  updateDropdowns(e.detail);
});

// -- DROPDOWNS OUVERTURE / FERMETURE

const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

// Gestion clic boutons dropdown
for (let i = 0; i < dropdownToggles.length; i++) {
  dropdownToggles[i].addEventListener('click', function (event) {
    const button = event.currentTarget;
    const menuId = button.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);

    const isOpen = !menu.classList.contains('hidden');

    // Ferme tous les menus
    const allMenus = document.querySelectorAll('.dropdown__menu');
    for (let j = 0; j < allMenus.length; j++) {
      allMenus[j].classList.add('hidden');
      // MàJ aria-expanded
      const allToggles = document.querySelectorAll('.dropdown__toggle');
      for (let k = 0; k < allToggles.length; k++) {
        allToggles[k].setAttribute('aria-expanded', 'false');
      }
    }

    // Ouverture menu si il était fermé
    if (!isOpen) {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
    }
  });
}

// Fermeture dropdowns si clic à l'extérieur
document.addEventListener('click', function (event) {
  let isClickInside = false;

  // Vérification si clic sur un toggle ou dans un menu
  for (let i = 0; i < dropdownToggles.length; i++) {
    if (dropdownToggles[i].contains(event.target)) {
      isClickInside = true;
      break;
    }
  }

  const allMenus = document.querySelectorAll('.dropdown__menu');
  for (let i = 0; i < allMenus.length; i++) {
    if (allMenus[i].contains(event.target)) {
      isClickInside = true;
      break;
    }
  }

  // Fermeture menus si clic à l'extérieur
  if (!isClickInside) {
    for (let i = 0; i < allMenus.length; i++) {
      allMenus[i].classList.add('hidden');
    }
    for (let i = 0; i < dropdownToggles.length; i++) {
      dropdownToggles[i].setAttribute('aria-expanded', 'false');
    }
  }
});

// -- BARRES DE RECHERCHE INTERNES DES DROPDOWNS
document.addEventListener('DOMContentLoaded', function () {
  // Stockage des listes complètes pour chaque dropdown
  let allIngredients = [];
  let allAppliances = [];
  let allUstensils = [];

  // Fonction pour sauvegarder les listes actuelles
  function saveCurrentLists() {
    allIngredients = [];
    allAppliances = [];
    allUstensils = [];

    // Ingrédients
    const ingredientsItems = ingredientsList.querySelectorAll('button');
    for (let i = 0; i < ingredientsItems.length; i++) {
      allIngredients.push(ingredientsItems[i].textContent);
    }

    // Appareils
    const appliancesItems = appliancesList.querySelectorAll('button');
    for (let i = 0; i < appliancesItems.length; i++) {
      allAppliances.push(appliancesItems[i].textContent);
    }

    // Ustensiles
    const ustensilsItems = ustensilsList.querySelectorAll('button');
    for (let i = 0; i < ustensilsItems.length; i++) {
      allUstensils.push(ustensilsItems[i].textContent);
    }
  }

  // Sauvegarde initiale
  updateDropdowns(window.allRecipes);
  saveCurrentLists();

  // Re-sauvegarde à chaque MàJ des recettes
  document.addEventListener('recipesFiltered', function () {
    // Délai pour MàJ du DOM
    setTimeout(saveCurrentLists, 0);
  });

  // Barre de recherche Ingrédients
  const ingredientsSearch = document.getElementById('ingredients-search');
  if (ingredientsSearch) {
    ingredientsSearch.addEventListener('input', function () {
      filterDropdownItems(this, ingredientsList, allIngredients, 'ingredient');
    });
  }

  // Barre de recherche Appareils
  const appliancesSearch = document.getElementById('appareils-search');
  if (appliancesSearch) {
    appliancesSearch.addEventListener('input', function () {
      filterDropdownItems(this, appliancesList, allAppliances, 'appliance');
    });
  }

  // Barre de recherche Ustensiles
  const ustensilsSearch = document.getElementById('ustensiles-search');
  if (ustensilsSearch) {
    ustensilsSearch.addEventListener('input', function () {
      filterDropdownItems(this, ustensilsList, allUstensils, 'ustensil');
    });
  }
});
