module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'], // отключает ; в конце
    'react/jsx-uses-react': 'off',
    // чтобы можно было использовать не только в jsx файлах
    // (по умолчанию предполагает, что все файлы, содержащие компоненты, должны оканчиваться на jsx)
    'react/react-in-jsx-scope': 'off', // до 16 версии первой строкой компонента обязательно должна быть import React from React
    'react/jsx-props-no-spreading': 0, // что-то с разворачиванием пропсов спредом
    'react/prop-types': 0, // по умолчанию требуется валидация пропсов
    'no-console': 0, // чтобы не ругался на console.log
    'import/no-cycle': 0, //
    'import/prefer-default-export': 0,
    'react/jsx-filename-extension': 0,
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', { code: 100, ignoreComments: true }],
    // ignoreComments: 0,
    // ignoreTrailingComments: 0,
    'react/jsx-no-constructed-context-values': 'warn',
  },
}
