module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'linebreak-style': 0,
    "vue/max-len": ["error", { "code": 140, }],
    "max-len": ["error", { "code": 140 }],
    // 'print-width': 999,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
