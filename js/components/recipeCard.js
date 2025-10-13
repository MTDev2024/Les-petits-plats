export function createRecipeCard(recipe) {
  const template = document.querySelector('#recipe-card-template');
  const fragment = template.content.cloneNode(true);

  const article = fragment.firstElementChild;
  const img = fragment.querySelector('img');
  const badge = fragment.querySelector('span');
  const title = fragment.querySelector('h3');
  const recipeText = fragment.querySelector('.mb-6 p');
  const ingredientsGrid = fragment.querySelector('.grid');

  // Accessibilité
  article.id = `recipe-${recipe.id}`;
  title.id = `recipe-${recipe.id}-title`;
  recipeText.id = `recipe-${recipe.id}-desc`;
  article.setAttribute('aria-labelledby', title.id);
  article.setAttribute('aria-describedby', recipeText.id);
  article.setAttribute('role', 'article');

  // Données principales
  img.src = `./images/${recipe.image}`;
  img.alt = recipe.name;
  title.textContent = recipe.name;
  badge.textContent = `${recipe.time}min`;
  badge.setAttribute(
    'aria-label',
    `Temps de préparation : ${recipe.time} minutes`
  );
  recipeText.textContent = recipe.description;

  // Ingrédients
  ingredientsGrid.setAttribute('role', 'list');
  recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
    const div = document.createElement('div');
    div.setAttribute('role', 'listitem');

    const nameP = document.createElement('p');
    nameP.className = 'text-text-black text-sm font-medium';
    nameP.textContent = ingredient;

    const quantityP = document.createElement('p');
    quantityP.className = 'text-text-grey text-xs';

    // Gestion quantité/unité/absents
    const quantityText = [quantity, unit].filter(Boolean).join(' ') || '-';
    quantityP.textContent = quantityText;

    div.appendChild(nameP);
    div.appendChild(quantityP);
    ingredientsGrid.appendChild(div);
  });

  return fragment;
}
