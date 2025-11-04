// Export fonction pour utiliser partout
export function createRecipeCard(recipe) {
  // Récupération template HTML
  const template = document.querySelector('#recipe-card-template');
  // Duplication contenu template → fragment
  const fragment = template.content.cloneNode(true);

  // Sélection éléments du fragment
  const article = fragment.querySelector('.recipe-card');
  const imgWrapper = fragment.querySelector('.recipe-card__image-wrapper');
  const img = fragment.querySelector('.recipe-card__image');
  const badge = fragment.querySelector('.recipe-card__badge');
  const title = fragment.querySelector('.recipe-card__title');
  const recipeText = fragment.querySelector('.recipe-card__description');
  const ingredientsGrid = fragment.querySelector(
    '.recipe-card__ingredients-grid',
  );

  // === ACCESSIBILITÉ ===
  article.id = `recipe-${recipe.id}`;
  title.id = `recipe-${recipe.id}-title`;
  recipeText.id = `recipe-${recipe.id}-desc`;
  article.setAttribute('aria-labelledby', title.id);
  article.setAttribute('aria-describedby', recipeText.id);
  article.setAttribute('role', 'article');

  // === IMAGE AVEC SUPPORT WEBP + FALLBACK ===
  // Création de l'élément <picture> pour supporter WebP avec fallback
  const picture = document.createElement('picture');

  // Source WebP
  const sourceWebP = document.createElement('source');
  const webpPath = recipe.image.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  sourceWebP.srcset = `./images/${webpPath}`;
  sourceWebP.type = 'image/webp';

  // Configuration image fallback
  img.src = `./images/${recipe.image}`;
  img.alt = recipe.name;
  img.loading = 'lazy';
  img.className = 'recipe-card__image w-full h-[253px] object-cover';

  // Assemblage picture + sources
  picture.appendChild(sourceWebP);
  picture.appendChild(img);

  // Remplacement image par picture dans wrapper
  imgWrapper.innerHTML = '';
  imgWrapper.appendChild(picture);

  // === DONNÉES PRINCIPALES ===
  title.textContent = recipe.name;
  badge.textContent = `${recipe.time}min`;
  badge.setAttribute(
    'aria-label',
    `Temps de préparation : ${recipe.time} minutes`,
  );
  recipeText.textContent = recipe.description;

  // === INGRÉDIENTS ===
  ingredientsGrid.setAttribute('role', 'list');
  recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
    // Création bloc pour affichage ingrédient
    const div = document.createElement('div');
    div.setAttribute('role', 'listitem');

    // Nom ingrédient
    const nameP = document.createElement('p');
    nameP.className = 'text-text-black text-sm font-medium';
    nameP.textContent = ingredient;

    // Quantité et unité
    const quantityP = document.createElement('p');
    quantityP.className = 'text-text-grey text-xs';
    const quantityText = [quantity, unit].filter(Boolean).join(' ') || '-';
    quantityP.textContent = quantityText;

    // Ajout dans div ingrédient
    div.appendChild(nameP);
    div.appendChild(quantityP);

    // Ajout dans grille
    ingredientsGrid.appendChild(div);
  });

  return fragment;
}
