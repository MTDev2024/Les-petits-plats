// Sélection boutons dropdown
const dropdownToggles = document.querySelectorAll('.dropdown__toggle');

// Fermeture des menus ouverts
function closeAllDropdowns() {
  document.querySelectorAll('.dropdown__menu').forEach((menu) => {
    menu.classList.add('hidden');
  });
  document.querySelectorAll('.dropdown__toggle').forEach((button) => {
    button.setAttribute('aria-expanded', 'false');
  });
}

// Fonction principale : ouverture / fermeture des dropdowns
dropdownToggles.forEach((toggle) => {
  const dropdownMenu = toggle.nextElementSibling;

  // Clic sur le bouton
  toggle.addEventListener('click', (e) => {
    e.stopPropagation(); // empêche la fermeture immédiate

    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    // Fermer dropdowns avant d’en ouvrir un autre
    closeAllDropdowns();

    // Si pas déjà ouvert, ouvrir
    if (!isOpen) {
      toggle.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.remove('hidden');
    }
  });
});

// Clic en dehors -> fermer dropdowns
document.addEventListener('click', () => {
  closeAllDropdowns();
});
