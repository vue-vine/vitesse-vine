// @ts-check
import antfu from '@antfu/eslint-config'
import VueVine from '@vue-vine/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    pnpm: true,
  },
  ...VueVine(),
  {
    ignores: [
      'dist',
      'node_modules',
      'coverage',
      'pnpm-lock.yaml',
      'package-lock.json',
      'pnpm-workspace.yaml',
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'off',
    },
  },
  {
    files: ['src/main.ts'],
    rules: {
      'antfu/no-top-level-await': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'no-restricted-syntax': 'off',
    },
  },
)
