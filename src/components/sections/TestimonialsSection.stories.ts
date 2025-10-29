import type { Meta, StoryObj } from '@storybook/vue3'
import TestimonialsSection from './TestimonialsSection.vue'

const meta = {
  title: 'Sections/TestimonialsSection',
  component: TestimonialsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TestimonialsSection>

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
