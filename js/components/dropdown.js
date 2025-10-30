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
    'tag-element bg-primary-yellow cursor-pointer rounded-md inline-flex items-center gap-2 px-4 py-2 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500';

  // -- Forcer alignement horizontal (texte + icône)
  tagButton.style.display = 'flex';
  tagButton.style.flexDirection = 'row';
  tagButton.style.alignItems = 'center';
  tagButton.style.gap = '0.5rem';

  tagButton.setAttribute('data-tag', tagName);
  tagButton.setAttribute('aria-label', 'Supprimer le tag ' + tagName);

  // Texte du tag
  const tagText = document.createElement('span');
  tagText.textContent = tagName;

  // Icône de suppression
  const tagIcon = document.createElement('img');
  tagIcon.src = 'images/icons/vector.png';
  tagIcon.alt = '';
  tagIcon.setAttribute('aria-hidden', 'true');

  // Forcer l'image sur la même ligne que le texte
  tagIcon.style.display = 'inline-block';
  tagIcon.style.verticalAlign = 'middle';
  tagIcon.className = 'w-[12px] h-[12px] pl-1'; // Tailwind inchangé

  // Assemblage bouton
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

function removeTag(tagButton, type, tagName) {
  // Suppression du bouton du DOM
  tagButton.remove();

  // Suppression du tag du tableau global avec .filter()
  // .filter() parcourt chaque tag et garde seulement ceux qui passent le test
  window.activeTags = window.activeTags.filter((currentTag) => {
    // currentTag : un tag du tableau activeTags

    // Vérification si c'est le tag à supprimer :
    // - currentTag.type === type : le type correspond ?
    // - currentTag.value === tagName : la valeur correspond ?
    // - && : les DEUX doivent être vrais
    // - ! : on INVERSE le résultat
    //   → Si c'est le tag à supprimer (true) : !true = false → supprimé
    //   → Si ce n'est pas le tag (false) : !false = true → gardé
    return !(currentTag.type === type && currentTag.value === tagName);
  });

  // Réapplique tous les filtres (recherche + tags restants)
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
  items.forEach((item) => {
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
  });
}

// -- MÀJ DROPDOWNS SELON RECETTES FILTRÉES
function updateDropdowns(recipesArray) {
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
  recipes.forEach((recipe) => {
    // Récupère tous les ingrédients avec .forEach()
    recipe.ingredients.forEach((ing) => {
      ingredientsSet[ing.ingredient] = true;
    });

    // Récupère l'appareil (pas de boucle, valeur unique)
    appliancesSet[recipe.appliance] = true;

    // Récupère tous les ustensiles avec .forEach()
    recipe.ustensils.forEach((ustensil) => {
      ustensilsSet[ustensil] = true;
    });
  });

  // Supprime les items déjà ajoutés comme tags avec .forEach()
  window.activeTags.forEach((tag) => {
    if (tag.type === 'ingredient') {
      delete ingredientsSet[tag.value];
    } else if (tag.type === 'appliance') {
      delete appliancesSet[tag.value];
    } else if (tag.type === 'ustensil') {
      delete ustensilsSet[tag.value];
    }
  });

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
  const filtered = allItems.filter((item) => {
    const itemNormalized = normalizeString(item);
    return itemNormalized.includes(keyword);
  });

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
dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', function (event) {
    const button = event.currentTarget;
    const menuId = button.getAttribute('aria-controls');
    const menu = document.getElementById(menuId);
    const isOpen = !menu.classList.contains('hidden');

    // Ferme tous les menus
    const allMenus = document.querySelectorAll('.dropdown__menu');
    allMenus.forEach((menu) => {
      menu.classList.add('hidden');
    });

    // MàJ aria-expanded
    const allToggles = document.querySelectorAll('.dropdown__toggle');
    allToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
    });

    // Ouverture menu si il était fermé
    if (!isOpen) {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Fermeture dropdowns si clic à l'extérieur
document.addEventListener('click', function (event) {
  const allMenus = document.querySelectorAll('.dropdown__menu');

  // Vérification si clic sur un toggle ou dans un menu avec .some()
  const isClickInside =
    Array.from(dropdownToggles).some((toggle) =>
      toggle.contains(event.target),
    ) || Array.from(allMenus).some((menu) => menu.contains(event.target));

  // Fermeture menus si clic à l'extérieur
  if (!isClickInside) {
    allMenus.forEach((menu) => {
      menu.classList.add('hidden');
    });

    dropdownToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
});

// -- BARRES DE RECHERCHE INTERNES DES DROPDOWNS
document.addEventListener('DOMContentLoaded', function () {
  // Stockage des listes complètes pour chaque dropdown
  let allIngredients = [];
  let allAppliances = [];
  let allUstensils = [];

  function saveCurrentLists() {
    // Ingrédients : transformer boutons en textes avec .map()
    const ingredientsItems = ingredientsList.querySelectorAll('button');
    allIngredients = Array.from(ingredientsItems).map(
      (button) => button.textContent,
    );

    // Appareils : transformer boutons en textes avec .map()
    const appliancesItems = appliancesList.querySelectorAll('button');
    allAppliances = Array.from(appliancesItems).map(
      (button) => button.textContent,
    );

    // Ustensiles : transformer boutons en textes avec .map()
    const ustensilsItems = ustensilsList.querySelectorAll('button');
    allUstensils = Array.from(ustensilsItems).map(
      (button) => button.textContent,
    );
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
