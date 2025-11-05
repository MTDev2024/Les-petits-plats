// Fonction pour créer une carte de recette
// Export pour pouvoir l'utiliser dans d'autres fichiers JS
export function createRecipeCard(recipe) {
  // Récupération e template HTML caché dans le DOM
  const template = document.querySelector('#recipe-card-template');

  // 2️⃣ On clone le contenu du template pour créer une nouvelle carte
  const fragment = template.content.cloneNode(true);

  // 3️⃣ On sélectionne les éléments du fragment qu'on va remplir
  const article = fragment.querySelector('.recipe-card'); // l'article complet
  const imgWrapper = fragment.querySelector('.recipe-card__image-wrapper'); // conteneur vide pour l'image
  const badge = fragment.querySelector('.recipe-card__badge'); // badge pour le temps
  const title = fragment.querySelector('.recipe-card__title'); // titre de la recette
  const recipeText = fragment.querySelector('.recipe-card__description'); // description
  const ingredientsGrid = fragment.querySelector(
    '.recipe-card__ingredients-grid',
  ); // grille pour les ingrédients

  // Accessibilité - lecteurs d'écran
  // ID uniques pour chaque article et éléments
  article.id = `recipe-${recipe.id}`;
  title.id = `recipe-${recipe.id}-title`;
  recipeText.id = `recipe-${recipe.id}-desc`;

  // On relie l'article à son titre et sa description
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
