module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['@nuxt/eslint-config', 'plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': ['warn', { singleline: 3 }],
    'no-unused-vars': ['warn'],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
}
