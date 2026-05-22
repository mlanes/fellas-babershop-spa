import type { StorybookConfig } from '@storybook-vue/nuxt'

const config: StorybookConfig = {
  // Stories live next to the reusable UI primitives only. Section
  // components are page-level and data-coupled — not Storybook material.
  stories: ['../components/ui/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook-vue/nuxt',
}

export default config