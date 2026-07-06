import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/.next/**',
      'dist/**',
      'coverage/**',
      'node_modules/**',
      'next-env.d.ts',
    ],
  },
  js.configs.recommended,
  // TypeScript + TSX: type-aware-friendly rules and consistent type imports.
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { '@typescript-eslint': tsEslintPlugin },
    rules: {
      ...tsEslintPlugin.configs.recommended.rules,
      // TypeScript itself resolves undefined names; no-undef is redundant and
      // produces false positives for globals/types (React, Vitest globals).
      'no-undef': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // React / Next / a11y for all app source.
  {
    files: ['**/*.{ts,tsx,jsx}'],
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // React Compiler / Rules-of-React lint (eslint-plugin-react-hooks v7).
      ...reactHooks.configs['recommended-latest'].rules,
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  // Node config files run in Node. The package is `"type": "module"`, so `.mjs`
  // and `*.config.ts` (next/postcss/tailwind/vitest/playwright) are ESM; only
  // explicit `.cjs` files are CommonJS.
  {
    files: ['**/*.mjs', '**/*.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
];
