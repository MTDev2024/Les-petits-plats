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
