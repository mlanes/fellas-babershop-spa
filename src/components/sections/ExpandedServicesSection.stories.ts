import type { Meta, StoryObj } from '@storybook/vue3'
import ExpandedServicesSection from './ExpandedServicesSection.vue'

const meta = {
  title: 'Sections/ExpandedServicesSection',
  component: ExpandedServicesSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ExpandedServicesSection>

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
