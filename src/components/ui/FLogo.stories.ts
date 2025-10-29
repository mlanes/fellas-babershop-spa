import type { Meta, StoryObj } from '@storybook/vue3'
import FLogo from './FLogo.vue'

const meta = {
  title: 'UI/FLogo',
  component: FLogo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the logo',
    },
  },
} satisfies Meta<typeof FLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}
