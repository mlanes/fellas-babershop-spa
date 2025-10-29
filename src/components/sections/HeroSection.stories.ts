import type { Meta, StoryObj } from '@storybook/vue3'
import HeroSection from './HeroSection.vue'

const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}
