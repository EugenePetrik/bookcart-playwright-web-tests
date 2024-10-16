import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import playwright from 'eslint-plugin-playwright';

export default tseslint.config(
  {
    ignores: ['node_modules', 'logs', 'playwright-report'],
  },
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.ts', 'eslint.config.mjs'],
    plugins: {
      prettier: eslintPluginPrettierRecommended,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      // ...playwright.configs['flat/recommended'],
    ],
    rules: {
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      // '@typescript-eslint/no-floating-promises': 'error',
      // '@typescript-eslint/await-thenable': 'error',
      'playwright/expect-expect': 'off',
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      'func-names': 'off',
      'playwright/no-standalone-expect': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-empty-pattern': 'off',
    },
  },
);
