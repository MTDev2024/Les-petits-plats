/* eslint-env node */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest', // ou 2021 pour ES12
    sourceType: 'module',
  },
  rules: {
    // ============================================
    // STYLE DE CODE
    // ============================================
    quotes: ['error', 'single'], // utiliser quotes simples
    semi: ['error', 'always'], // point-virgule obligatoire
    'no-trailing-spaces': 'error', // pas d'espaces en fin de ligne
    'comma-dangle': ['error', 'always-multiline'], // virgule finale pour objets/tableaux multi-lignes

    // ============================================
    // BONNES PRATIQUES
    // ============================================
    'no-console': 'warn', // console autorisée mais warning
    'prefer-const': 'error', // toujours utiliser const si possible
    'no-var': 'error', // interdire var, utiliser let/const
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: true,
      },
    ], // encourager la déstructuration
    'no-param-reassign': 'error', // pas de modification des params de fonction
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // ++ et -- interdits sauf en boucle for
    // Cela permet de garder le code lisible et d'éviter les effets de bord dans les expressions complexes.
    'default-case': 'error', // les switch doivent gérer 'default'

    // ============================================
    // GREEN CODE (éco-conception)
    // ============================================
    'no-unreachable': 'error', // pas de code inaccessible
    'no-duplicate-imports': 'error', // pas d'imports dupliqués

    // ============================================
    // SÉCURITÉ (protection XSS)
    // ============================================
    'no-eval': 'error', // pas d'utilisation de eval()
    'no-implied-eval': 'error', // pas de eval() implicite

    // ============================================
    // PRETTIER (formatage automatique)
    // ============================================
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto', // auto pour éviter problèmes Windows/Unix
      },
    ],

    // ============================================
    // IMPORTS (si tu utilises des modules ES6)
    // ============================================
    'import/prefer-default-export': 'off', // autorise exports nommés même uniques
    'import/extensions': 'off', // pas besoin de .js dans les imports
  },
};
