# 🍽️ Les Petits Plats

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1.14-38B2AC.svg)

> 🔍 **Moteur de recherche performant pour recettes de cuisine**  
> Projet de formation - Développeur d'applications

---

---

## 🎯 À propos

**Les Petits Plats** est une application web permettant de rechercher rapidement une recette de cuisine.
L'accent est mis sur la **performance du moteur de recherche** et l'**éco-conception** (Green Code).

### ✨ Fonctionnalités principales

- 🔎 Recherche en temps réel parmi 50 recettes
- 🏷️ Filtrage avancé par ingrédients, ustensiles et appareils
- ⚡ Algorithme de recherche optimisé
- 🌱 Développement éco-responsable (Green Code)

---

### Problématique

L'entreprise souhaite se lancer dans un nouveau projet : créer son propre site de recettes de cuisine.
Le principal défi est de développer un **moteur de recherche fluide et performant** pour se démarquer de la concurrence (Marmiton, 750g).

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

### ⚡ Performance

- Affichage instantané des 50 recettes au chargement
- Lazy loading des images
- CSS optimisé (purge automatique)
- Algorithme de recherche performant

---

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

## 🗺️ Roadmap

### ✅ Phase 1 - Setup (Semaine 1)

- [x] Configuration du projet
- [x] Tailwind CSS v4
- [x] ESLint + Prettier
- [x] Structure des dossiers
- [x] Design system (couleurs, fonts)

### ✅ Phase 2 - Interface (Semaine 1-2)

- [x] Header
- [ ] Section filtres (dropdowns + tags)
- [x] Grid de cartes responsive
- [x] Factory `createRecipeCard()`
- [x] Validation W3C

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

---

<div align="center">

**⭐ Si ce projet vous a plu, n'hésitez pas à lui donner une étoile ! ⭐**

</div>
