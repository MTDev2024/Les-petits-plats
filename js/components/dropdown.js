// Sélection boutons dropdown
const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

// === Fermeture des menus ouverts ===
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown__menu').forEach((menu) => {
    menu.classList.add('hidden');
  });
  document.querySelectorAll('.dropdown__toggle').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
}

// === GESTION PRINCIPALE : ouverture / fermeture des dropdowns ===
dropdownToggles.forEach((toggle, index) => {
  const dropdownMenu = toggle.nextElementSibling;

  // Ajout ID à chaque menu si pas déjà présent
  if (!dropdownMenu.id) {
    dropdownMenu.id = `dropdown-menu-${index}`;
  }

  // Création lien bouton / menu
  toggle.setAttribute('aria-controls', dropdownMenu.id);

  // === Clic bouton ===
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // empêche la fermeture immédiate quand on clique sur le bouton

    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    // Fermeture de tous les dropdowns avant d’en ouvrir un autre
    closeAllDropdowns();

    // Si pas déjà ouvert, ouvrir
    if (!isOpen) {
      toggle.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.remove('hidden');
    }
  });
});

// === Fermeture au clic extérieur ===
document.addEventListener('click', () => {
  closeAllDropdowns();
});

// === Fermeture avec Echap ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllDropdowns();
  }
});
