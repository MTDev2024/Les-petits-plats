export function createRecipeCard(recipe) {
  // Récupération template HTML dans le DOM
  const template = document.querySelector('#recipe-card-template');

  // Clonage contenu du template pour création nouvelle carte
  const fragment = template.content.cloneNode(true);

  // Sélection des éléments du fragment à remplir
  const article = fragment.querySelector('.recipe-card');
  const imgWrapper = fragment.querySelector('.recipe-card__image-wrapper'); // conteneur vide image
  const badge = fragment.querySelector('.recipe-card__badge'); // badge temps
  const title = fragment.querySelector('.recipe-card__title'); // titre recette
  const recipeText = fragment.querySelector('.recipe-card__description'); // description
  const ingredientsGrid = fragment.querySelector(
    '.recipe-card__ingredients-grid',
  ); // grille pour les ingrédients

  // Accessibilité - lecteurs d'écran
  // ID uniques pour chaque article et éléments
  article.id = `recipe-${recipe.id}`;
  title.id = `recipe-${recipe.id}-title`;
  recipeText.id = `recipe-${recipe.id}-desc`;

  //Article relié à son titre et description
  article.setAttribute('aria-labelledby', title.id);
  article.setAttribute('aria-describedby', recipeText.id);
  article.setAttribute('role', 'article'); // rôle article

  // <picture> contiendra WebP + fallback
  const picture = document.createElement('picture');

  picture.innerHTML = `
    <source srcset="./images/${recipe.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')}" type="image/webp">
    <img 
      src="./images/${recipe.image}" 
      alt="${recipe.name}" 
      loading="lazy" 
      class="recipe-card__image w-full h-[253px] object-cover"
    >
  `;

  // Ajout <picture> dans wrapper
  imgWrapper.appendChild(picture);

  // Remplissage données principales
  title.textContent = recipe.name;
  badge.textContent = `${recipe.time}min`;
  // Accessibilité
  badge.setAttribute(
    'aria-label',
    `Temps de préparation : ${recipe.time} minutes`,
  );
  recipeText.textContent = recipe.description; // description recette

  // Remplissage grille ingrédients
  ingredientsGrid.setAttribute('role', 'list'); // rôle pour accessibilité

  // On parcourt chaque ingrédient de la recette
  recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
    // Création conteneur pour chaque ingrédient
    const div = document.createElement('div');
    div.setAttribute('role', 'listitem'); // rôle pour accessibilité

    // Nom ingrédient
    const nameP = document.createElement('p');
    nameP.className = 'text-text-black text-sm font-medium';
    nameP.textContent = ingredient;

    // Quantité + unité
    const quantityP = document.createElement('p');
    quantityP.className = 'text-text-grey text-xs';
    // Si quantity ou unit vide -> tiret
    const quantityText = [quantity, unit].filter(Boolean).join(' ') || '-';
    quantityP.textContent = quantityText;

    // Ajout nom + quantité dans div
    div.appendChild(nameP);
    div.appendChild(quantityP);

    // Ajout div dans grille ingrédients
    ingredientsGrid.appendChild(div);
  });

  // Renvoi fragment complet
  return fragment;
}
