module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'unicorn'],
  rules: {
    'react/self-closing-comp': 'warn',
    'react/jsx-curly-brace-presence': [1, 'never'],
    '@typescript-eslint/no-var-requires': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-module': 'off',
  },
}
