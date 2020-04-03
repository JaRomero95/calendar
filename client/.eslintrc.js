module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "object-curly-spacing": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    "react/jsx-filename-extension": "off",
    "no-use-before-define": ["error", { "functions": false }],
    "react/prefer-stateless-function": "off",
    "react/jsx-props-no-spreading": "off",
    "react/sort-comp": [1, {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        'everything-else',
        'render',
      ]
    }]
  },
};
