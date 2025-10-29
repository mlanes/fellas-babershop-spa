import type { Meta, StoryObj } from '@storybook/vue3'
import FButton from './FButton.vue'

const meta = {
  title: 'UI/FButton',
  component: FButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'gradient', 'outline'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
} satisfies Meta<typeof FButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">AGENDAR</FButton>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">VER SERVIÇOS</FButton>',
  }),
}

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    size: 'md',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">SOBRE MAIS</FButton>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">CONTACTOS</FButton>',
  }),
}

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">Small Button</FButton>',
  }),
}

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">Large Button</FButton>',
  }),
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">Disabled Button</FButton>',
  }),
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: true,
  },
  render: (args) => ({
    components: { FButton },
    setup() {
      return { args }
    },
    template: '<FButton v-bind="args">Full Width Button</FButton>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { FButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 24px; max-width: 400px;">
        <FButton variant="primary">Primary Button</FButton>
        <FButton variant="secondary">Secondary Button</FButton>
        <FButton variant="gradient">Gradient Button</FButton>
        <FButton variant="outline">Outline Button</FButton>
        <hr />
        <FButton size="sm">Small Button</FButton>
        <FButton size="md">Medium Button</FButton>
        <FButton size="lg">Large Button</FButton>
        <hr />
        <FButton disabled>Disabled Button</FButton>
        <FButton full-width>Full Width Button</FButton>
      </div>
    `,
  }),
}
