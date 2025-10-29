import type { Meta, StoryObj } from '@storybook/vue3'
import BeforeAfterSlider from './BeforeAfterSlider.vue'

const meta = {
  title: 'UI/BeforeAfterSlider',
  component: BeforeAfterSlider,
  tags: ['autodocs'],
  argTypes: {
    beforeImage: {
      control: 'text',
      description: 'URL of the before image',
    },
    afterImage: {
      control: 'text',
      description: 'URL of the after image',
    },
    beforeLabel: {
      control: 'text',
      description: 'Label for before image',
    },
    afterLabel: {
      control: 'text',
      description: 'Label for after image',
    },
    initialPosition: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Initial slider position (0-100)',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof BeforeAfterSlider>

export default meta
type Story = StoryObj<typeof meta>

// Placeholder image URLs (to be replaced with actual barbershop images)
const beforeImageUrl =
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop'
const afterImageUrl =
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop'

export const Default: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
    beforeLabel: 'Antes',
    afterLabel: 'Depois',
    initialPosition: 50,
  },
}

export const StartAtBefore: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
    beforeLabel: 'Antes',
    afterLabel: 'Depois',
    initialPosition: 10,
  },
}

export const StartAtAfter: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
    beforeLabel: 'Antes',
    afterLabel: 'Depois',
    initialPosition: 90,
  },
}

export const CustomLabels: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
    beforeLabel: 'Original',
    afterLabel: 'Transformação',
    initialPosition: 50,
  },
}

export const Mobile: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}

export const Tablet: Story = {
  args: {
    beforeImage: beforeImageUrl,
    afterImage: afterImageUrl,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
}
