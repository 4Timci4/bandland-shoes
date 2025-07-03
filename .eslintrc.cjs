module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off', // PropTypes kullanmıyorsak kapatabiliriz
    'react/react-in-jsx-scope': 'off' // Vite projelerinde React import etmeye gerek yok
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};