// Export fonction pour utiliser partout
export function createRecipeCard(recipe) {
  // Récupération template HTML
  const template = document.querySelector('#recipe-card-template');

  // Duplication contenu template -> fragment
  const fragment = template.content.cloneNode(true);

  // Sélection éléments du fragment
  // Eléments à remplir avec infos de recette
  const article = fragment.querySelector('.recipe-card');
  const img = fragment.querySelector('.recipe-card__image');
  const badge = fragment.querySelector('.recipe-card__badge');
  const title = fragment.querySelector('.recipe-card__title');
  const recipeText = fragment.querySelector('.recipe-card__description');
  const ingredientsGrid = fragment.querySelector(
    '.recipe-card__ingredients-grid'
  ); // grille d’ingrédients

  // === ACCESSIBILITÉ ===
  // Ajout id pour lecteurs d’écran
  article.id = `recipe-${recipe.id}`;
  title.id = `recipe-${recipe.id}-title`;
  recipeText.id = `recipe-${recipe.id}-desc`;

  // On relie l’article à son titre et à sa description pour donner du sens sémantique
  article.setAttribute('aria-labelledby', title.id);
  article.setAttribute('aria-describedby', recipeText.id);
  article.setAttribute('role', 'article');

  // === DONNÉES PRINCIPALES ===
  // Insertion données reçues depuis objet "recipe"
  img.src = `./images/${recipe.image}`;
  img.alt = recipe.name;
  title.textContent = recipe.name;
  badge.textContent = `${recipe.time}min`;
  badge.setAttribute(
    'aria-label',
    `Temps de préparation : ${recipe.time} minutes`
  ); // aide vocale
  recipeText.textContent = recipe.description; // texte descriptif

  // === INGRÉDIENTS ===
  ingredientsGrid.setAttribute('role', 'list');

  recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
    // Création bloc pour afficher un ingrédient
    const div = document.createElement('div');
    div.setAttribute('role', 'listitem');

    // Nom ingrédient
    const nameP = document.createElement('p');
    nameP.className = 'text-text-black text-sm font-medium';
    nameP.textContent = ingredient;

    // Quantité et unité
    const quantityP = document.createElement('p');
    quantityP.className = 'text-text-grey text-xs';

    // Si quantité ou unité absentes, affichage tiret "-"
    const quantityText = [quantity, unit].filter(Boolean).join(' ') || '-';
    quantityP.textContent = quantityText;

    // Ajout nom + quantité dans div ingrédient
    div.appendChild(nameP);
    div.appendChild(quantityP);

    // Ajout div dans grille ingrédients
    ingredientsGrid.appendChild(div);
  });

  // retourne le fragment complet prêt à être ajouté dans la page
  // utilisation : container.appendChild(createRecipeCard(recipe));
  return fragment;
}
