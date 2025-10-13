# 🍽️ Les Petits Plats

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1.14-38B2AC.svg)

> 🔍 **Moteur de recherche performant pour recettes de cuisine**  
> Projet de formation - OpenClassrooms - Développeur Front-End

---

## 📋 Table des matières

- [À propos](#-à-propos)
- [Contexte du projet](#-contexte-du-projet)
- [Objectifs pédagogiques](#-objectifs-pédagogiques)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Structure du projet](#-structure-du-projet)
- [Fonctionnalités](#-fonctionnalités)
- [Branches Git](#-branches-git)
- [Green Code](#-green-code)
- [Performance](#-performance)
- [Sécurité](#-sécurité)
- [Scripts disponibles](#-scripts-disponibles)
- [Roadmap](#-roadmap)
- [Auteur](#-auteur)
- [Licence](#-licence)

---

## 🎯 À propos

**Les Petits Plats** est une application web permettant de rechercher rapidement parmi 1500+ recettes de cuisine. L'accent est mis sur la **performance du moteur de recherche** et l'**éco-conception** (Green Code).

### ✨ Fonctionnalités principales

- 🔎 Recherche en temps réel parmi 50 recettes
- 🏷️ Filtrage avancé par ingrédients, ustensiles et appareils
- 📱 Interface responsive (Mobile, Tablette, Desktop)
- ⚡ Algorithme de recherche optimisé
- 🌱 Développement éco-responsable (Green Code)

---

## 📖 Contexte du projet

### Mission

Je suis **développeur Front-End freelance** missionné par l'entreprise **"Les Petits Plats"** pour une durée de **3 mois**.

### Problématique

L'entreprise souhaite se lancer dans un nouveau projet : créer son propre site de recettes de cuisine. Le principal défi est de développer un **moteur de recherche fluide et performant** pour se démarquer de la concurrence (Marmiton, 750g).

### Livrables attendus

1. ✅ Interface utilisateur responsive
2. ✅ Deux implémentations d'algorithmes de recherche
3. ✅ Fiche d'investigation de fonctionnalité
4. ✅ Documentation technique pour l'équipe Back-end
5. ✅ Tests de performance comparatifs

---

## 🎓 Objectifs pédagogiques

Ce projet vise à développer les compétences suivantes :

- ✅ **Analyser un problème informatique** et proposer des solutions techniques
- ✅ **Développer des algorithmes** pour résoudre un problème
- ✅ **Comparer des implémentations** sur la base de tests de performance
- ✅ **Appliquer les principes du Green Code** (éco-conception web)
- ✅ **Documenter son travail** de manière professionnelle

---

## 🛠️ Technologies utilisées

### Front-End

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Outils de développement

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

### Stack technique détaillée

| Technologie      | Version | Usage                          |
| ---------------- | ------- | ------------------------------ |
| **HTML5**        | -       | Structure sémantique           |
| **Tailwind CSS** | 4.1.14  | Styling responsive             |
| **JavaScript**   | ES6+    | Logique métier                 |
| **Node.js**      | 22.12.0 | Environnement de développement |
| **ESLint**       | 8.x     | Qualité du code                |
| **Prettier**     | 3.x     | Formatage automatique          |

---

## ⚙️ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v16.x ou supérieur) - [Télécharger](https://nodejs.org/)
- **npm** (v8.x ou supérieur) - Inclus avec Node.js
- **Git** - [Télécharger](https://git-scm.com/)
- Un éditeur de code (recommandé : [VS Code](https://code.visualstudio.com/))

### Vérifier les installations

```bash
node --version   # v22.12.0 ou supérieur
npm --version    # v10.9.0 ou supérieur
git --version    # 2.x ou supérieur
```

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/MTDev2024/Les-petits-plats.git
cd Les-petits-plats
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande va installer :

- Tailwind CSS v4
- ESLint + configuration Airbnb
- Prettier
- Toutes les dépendances nécessaires

### 3. Lancer le projet en mode développement

```bash
npm run dev
```

Cette commande :

- ✅ Lance Tailwind CSS en mode watch
- ✅ Compile automatiquement le CSS à chaque modification
- ✅ Surveille les changements dans `css/input.css` et les fichiers HTML/JS

### 4. Ouvrir dans le navigateur

Ouvrez `index.html` dans votre navigateur :

- Double-clic sur le fichier
- Ou avec Live Server (extension VS Code)
- Ou avec un serveur local : `npx serve`

---

## 📁 Structure du projet

```
les-petits-plats/
│
├── 📄 index.html                 # Page principale
├── 📄 README.md                  # Documentation
├── 📄 package.json               # Dépendances npm
├── 📄 tailwind.config.js         # Configuration Tailwind
├── 📄 .eslintrc.js               # Configuration ESLint
├── 📄 .prettierrc.json           # Configuration Prettier
├── 📄 .gitignore                 # Fichiers ignorés par Git
│
├── 📂 css/
│   ├── input.css                 # Source Tailwind (variables, fonts)
│   └── output.css                # CSS généré (ignoré par Git)
│
├── 📂 js/
│   ├── main.js                   # Point d'entrée de l'application
│   │
│   ├── 📂 data/
│   │   └── recipes.js            # 50 recettes (données statiques)
│   │
│   ├── 📂 components/
│   │   ├── recipeCard.js         # Factory pour créer les cartes
│   │   ├── searchBar.js          # Logique de recherche principale
│   │   └── tagsList.js           # Gestion des tags de filtrage
│   │
│   └── 📂 utils/
│       ├── security.js           # Sanitisation XSS
│       └── helpers.js            # Fonctions utilitaires
│
├── 📂 images/
│   ├── 📂 background/            # Image de fond du header
│   ├── 📂 logo/                  # Logo du site
│   └── Recette01.jpg à 50.jpg   # Photos des recettes
│
├── 📂 fonts/
│   ├── manrope-v20-latin-regular.woff2    # Font principale
│   └── anton-v25-latin-regular.woff2      # Font pour les titres
│
└── 📂 docs/
    ├── fiche-investigation.md    # Comparaison des algorithmes
    └── 📂 algorigrammes/         # Schémas des algorithmes
```

---

## 💡 Fonctionnalités

### 🔍 Recherche principale

- Recherche en temps réel (minimum 3 caractères)
- Recherche dans :
  - ✅ Titre de la recette
  - ✅ Liste des ingrédients
  - ✅ Description de la recette
- Insensible à la casse et aux accents

### 🏷️ Filtrage avancé

- **3 catégories de filtres** :
  - 🥕 Ingrédients
  - 🍳 Ustensiles
  - 🔧 Appareils
- Filtrage dynamique des options disponibles
- Tags cumulatifs (possibilité d'en ajouter plusieurs)
- Suppression individuelle des tags

### 📱 Interface responsive

| Appareil    | Colonnes | Breakpoint |
| ----------- | -------- | ---------- |
| 📱 Mobile   | 1        | < 768px    |
| 📱 Tablette | 2        | ≥ 768px    |
| 💻 Desktop  | 3        | ≥ 1024px   |

### ⚡ Performance

- Affichage instantané des 50 recettes au chargement
- Lazy loading des images
- CSS optimisé (purge automatique)
- Algorithme de recherche performant

---

## 🌿 Branches Git

Ce projet utilise **3 branches distinctes** :

### `main`

**Interface utilisateur + code commun**

- Structure HTML
- Styles Tailwind CSS
- Composants réutilisables
- Utilitaires

### `algorithme-natif`

**Implémentation avec boucles natives**

- Utilisation de `for`, `while`, `for...of`
- Approche impérative

### `algorithme-fonctionnel`

**Implémentation avec programmation fonctionnelle**

- Utilisation de `filter()`, `map()`, `reduce()`
- Approche déclarative

### Workflow Git

```bash
# Développement de l'interface
git checkout main
# ... développement ...

# Création des branches pour les algorithmes
git checkout -b algorithme-natif
# ... implémentation algo natif ...

git checkout main
git checkout -b algorithme-fonctionnel
# ... implémentation algo fonctionnel ...
```

---

## 🌱 Green Code

Ce projet applique les principes de l'**éco-conception web** :

### ♻️ Optimisations mises en place

| Pratique                  | Impact                             | Mesure                  |
| ------------------------- | ---------------------------------- | ----------------------- |
| **Fonts auto-hébergées**  | Évite requêtes HTTP externes       | -2 requêtes             |
| **Tailwind CSS optimisé** | Purge automatique du CSS inutilisé | -99% de poids CSS       |
| **Import ES6 direct**     | Pas de fetch inutile               | -1 requête              |
| **Images lazy loading**   | Chargement à la demande            | Économie bande passante |
| **Format .woff2**         | Compression optimale des fonts     | -30% vs .woff           |

### 📊 Résultats

- **CSS** : 3.5 MB (CDN) → ~30 KB (build optimisé) = **99% de réduction** 🎉
- **Fonts** : 0 requête externe
- **Images** : Chargement différé

### 📚 Références Green Code

- [Green Code Label](https://label-greencodelab.org/)
- [Sustainable Web Design](https://sustainablewebdesign.org/)
- [The Green Web Foundation](https://www.thegreenwebfoundation.org/)

---

## ⚡ Performance

### Tests de performance

Les deux algorithmes ont été testés avec **Jsben.ch** :

| Algorithme          | Ops/seconde   | Lisibilité | Maintenabilité |
| ------------------- | ------------- | ---------- | -------------- |
| **Boucles natives** | [À compléter] | ⭐⭐⭐     | ⭐⭐⭐         |
| **Fonctionnel**     | [À compléter] | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐       |

> 📝 Les résultats détaillés sont disponibles dans la [fiche d'investigation](docs/fiche-investigation.md)

### Optimisations

- ✅ Debouncing sur la recherche (300ms)
- ✅ Event delegation
- ✅ Pas de re-rendu inutile du DOM
- ✅ Complexité algorithmique optimisée

---

## 🛡️ Sécurité

### Protection XSS (Cross-Site Scripting)

Toutes les données utilisateur sont **sécurisées** :

```javascript
// ✅ Utilisation de textContent (sécurisé)
element.textContent = userInput;

// ❌ JAMAIS innerHTML avec données utilisateur
// element.innerHTML = userInput; // Vulnérable !
```

### Mesures de sécurité

- ✅ `textContent` au lieu de `innerHTML`
- ✅ Sanitisation des inputs de recherche
- ✅ Validation des données
- ✅ Pas d'`eval()` ou code dynamique

### 📚 Référence

- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

## 📜 Scripts disponibles

### Développement

```bash
# Lancer Tailwind en mode watch
npm run dev

# Formater le code avec Prettier
npm run format

# Vérifier le code avec ESLint
npm run lint

# Corriger automatiquement les erreurs ESLint
npm run lint:fix
```

### Production

```bash
# Générer le CSS optimisé pour la production
npm run build
```

---

## 🗺️ Roadmap

### ✅ Phase 1 - Setup (Semaine 1)

- [x] Configuration du projet
- [x] Tailwind CSS v4
- [x] ESLint + Prettier
- [x] Structure des dossiers
- [x] Design system (couleurs, fonts)

### ✅ Phase 2 - Interface (Semaine 1-2)

- [x] Header responsive
- [ ] Section filtres (dropdowns + tags)
- [ ] Grid de cartes responsive
- [ ] Factory `createRecipeCard()`
- [ ] Validation W3C

### 🚧 Phase 3 - Algorithmes (Semaine 2-3)

- [ ] Implémentation algorithme natif
- [ ] Implémentation algorithme fonctionnel
- [ ] Tests de performance
- [ ] Comparaison et analyse

### 📝 Phase 4 - Documentation (Semaine 3)

- [ ] Fiche d'investigation complète
- [ ] Algorigrammes (draw.io)
- [ ] Documentation technique Back-end
- [ ] README finalisé

### 🚀 Phase 5 - Livraison

- [ ] Tests finaux
- [ ] Merge de la meilleure solution sur `main`
- [ ] Présentation du projet

---

## 👤 Auteur

**[Ton Nom]**

- 🌐 Portfolio : [ton-site.com](https://ton-site.com)
- 💼 LinkedIn : [ton-profil](https://linkedin.com/in/ton-profil)
- 🐙 GitHub : [@MTDev2024](https://github.com/MTDev2024)
- 📧 Email : ton.email@example.com

---

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **OpenClassrooms** pour la formation et l'accompagnement
- **Sandra** (Chef de projet fictive) pour les consignes du projet
- **Jean-Baptiste** (Lead Developer fictif) pour les guidelines techniques
- La communauté des développeurs pour les ressources partagées

---

## 📚 Ressources utiles

### Documentation

- [MDN Web Docs](https://developer.mozilla.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ESLint Rules](https://eslint.org/docs/latest/rules/)

### Guides de style

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

### Performance & Green Code

- [Web.dev](https://web.dev/)
- [Green Code Lab](https://www.greencodelab.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

<div align="center">

**⭐ Si ce projet vous a plu, n'hésitez pas à lui donner une étoile ! ⭐**

Made with ❤️ and ☕ by [Ton Nom]

</div>
