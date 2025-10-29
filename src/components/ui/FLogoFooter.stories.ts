import type { Meta, StoryObj } from '@storybook/vue3'
import FLogoFooter from './FLogoFooter.vue'

const meta = {
  title: 'UI/FLogoFooter',
  component: FLogoFooter,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the footer logo',
    },
  },
} satisfies Meta<typeof FLogoFooter>

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

export const OnDarkBackground: Story = {
  args: {
    size: 'md',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}
