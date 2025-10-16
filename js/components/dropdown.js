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
