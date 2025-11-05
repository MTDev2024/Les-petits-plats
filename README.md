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

- 🔎 Recherche instantanée parmi 50 recettes
- 🏷️ Filtrage par ingrédients, appareils et ustensiles
- ⚡ Double algorithme de recherche (comparaison de performance)
- 🧩 Tags dynamiques avec suppression individuelle
- 🌱 Développement éco-responsable (Green Code)

---

### Problématique

L'entreprise souhaite se lancer dans un nouveau projet : créer son propre site de recettes de cuisine.
Le principal défi est de développer un **moteur de recherche fluide et performant** pour se démarquer de la concurrence (Marmiton, 750g).

---

## 🎓 Objectifs pédagogiques

Ce projet vise à développer les compétences suivantes :

- ✅ **Analyser un besoin** fonctionnel et le traduire en **logique algorithmique**
- ✅ **Développer des algorithmes** pour résoudre un problème
- ✅ **Comparer des implémentations** sur la base de tests de performance
- ✅ **Documenter et mesurer la performance** via [jsben.ch](https://jsben.ch/)
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
| **HTML**         | 5.x     | Structure sémantique           |
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
├── 📄 index.html
├── 📄 README.md
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 tailwind.config.js
├── 📄 .eslintrc.js
├── 📄 .eslintignore
├── 📄 .prettierrc.json
├── 📄 .gitignore
│
├── 📂 css/
│   ├── input.css                # Source Tailwind
│   └── output.css               # CSS généré automatiquement
│
├── 📂 docs/
│   ├── fiche-investigation-recherche.md    # Comparatif d’algorithmes
│   └── screenshots/                        # Captures pour la documentation
│
├── 📂 fonts/
│   ├── anton-v27-latin-regular.woff2       # Font principale
│   └── manrope-v20-latin-regular.woff2     # Font pour les titres
│
├── 📂 images/
│   ├── background/
│   ├── icons/
│   ├── logo/
│   ├── Recette01. à 50.webp     # Photos des recettes
│   └── Recette01.jpg à 50.jpg   # Fallback photos des recettes
│
├── 📂 js/
│   ├── main.js                  # Point d’entrée global
│   │
│   ├── 📂 data/
│   │   └── recipes.js           # Données des recettes (50)
│   │
│   └── 📂 components/
│       ├── dropdown.js          # Gestion des menus déroulants
│       ├── mainSearchBar.js     # Algorithme principal de recherche
│       └── recipeCard.js        # Génération des cartes recettes
│
└── 📂 node_modules/

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
- Tags cumulatifs
- Suppression individuelle des tags

### ⚡ Performance

- Affichage instantané des 50 recettes au chargement
- Lazy loading des images
- Lazy loading des recettes
- CSS optimisé
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

**⭐ Si ce projet vous a plu, n'hésitez pas à lui donner une étoile ! ⭐**
