module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    'jest/globals': true
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    // codeceptjs
    Feature: true,
    Scenario: true,
    actor: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'jest', 'jsx-a11y'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never'],
    'quote-props': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/react-in-jsx-scope': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
