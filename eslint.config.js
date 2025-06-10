// eslint.config.js
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  // Configuración base de ESLint
  js.configs.recommended,

  // Configuración global
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },

  // Reglas de estilo Standard (adaptadas manualmente para emular 'standard')
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Reglas de formato
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'never'],
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'space-before-function-paren': ['error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always'
      }],

      // Reglas específicas para controlar espacios en blanco (como en standard)
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'padded-blocks': ['error', 'never'],
      'space-before-blocks': 'error',
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
      'space-infix-ops': 'error',
      'no-multi-spaces': 'error',
      'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],

      // Otras reglas comunes en standard
      'no-console': 'off',
      'camelcase': 'off',
      'no-extra-boolean-cast': 'error',
      'no-empty': 'error',
      'no-undef': 'error',
      'no-useless-return': 'error',
      'complexity': ['error', { 'max': 30 }]
    }
  },

  // Configuración específica para React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    settings: {
      react: {
        version: '19'
      }
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off', // Desactivado como en tu configuración
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',

      // Reglas de Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Refresh (mantenida igual que en tu configuración)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  },

  // Configuraciones específicas para archivos de prueba
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      'no-unused-expressions': 'off'
    }
  },

  // Archivos a ignorar (basado en tu ignorePatterns anterior)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '.pnpm-store/**',
      '.vscode/**',
      'public/**',
      '**/*.min.js',
      '*.test.js',
      '/ecosystem.config.js',
      '/autoScaler.js',
      '/vitest.config.js',
      '*.yml'
    ]
  }
]
