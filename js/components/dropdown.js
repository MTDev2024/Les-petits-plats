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
