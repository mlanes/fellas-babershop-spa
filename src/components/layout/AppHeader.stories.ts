import type { Meta, StoryObj } from '@storybook/vue3'
import AppHeader from './AppHeader.vue'

const meta = {
  title: 'Layout/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Scrolled: Story = {
  render: () => ({
    components: { AppHeader },
    template: `
      <div>
        <AppHeader class="header--scrolled" />
        <div style="height: 2000px; background: linear-gradient(to bottom, #1e1e1e, #2a2a2a);"></div>
      </div>
    `,
  }),
}

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
