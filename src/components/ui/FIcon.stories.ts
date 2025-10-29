import type { Meta, StoryObj } from '@storybook/vue3'
import FIcon from './FIcon.vue'
import type { IconName } from '@/types/icons'

const meta = {
  title: 'UI/FIcon',
  component: FIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'checkmark',
        'chevron-down',
        'chevron-left',
        'chevron-right',
        'chevron-up',
        'close',
        'menu',
        'star',
        'star-filled',
        'instagram',
        'phone',
        'email',
        'location',
        'clock',
        'scissors',
        'crown',
      ] as IconName[],
      description: 'Icon name',
    },
    size: {
      control: 'number',
      description: 'Icon size in pixels',
    },
    color: {
      control: 'color',
      description: 'Icon color',
    },
  },
} satisfies Meta<typeof FIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Checkmark: Story = {
  args: {
    name: 'checkmark',
    size: 24,
  },
}

export const ChevronDown: Story = {
  args: {
    name: 'chevron-down',
    size: 24,
  },
}

export const ChevronLeft: Story = {
  args: {
    name: 'chevron-left',
    size: 24,
  },
}

export const ChevronRight: Story = {
  args: {
    name: 'chevron-right',
    size: 24,
  },
}

export const Star: Story = {
  args: {
    name: 'star',
    size: 24,
  },
}

export const StarFilled: Story = {
  args: {
    name: 'star-filled',
    size: 24,
    color: '#FFD700',
  },
}

export const Instagram: Story = {
  args: {
    name: 'instagram',
    size: 24,
  },
}

export const AllIcons: Story = {
  render: () => ({
    components: { FIcon },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 24px; padding: 24px;">
        <div style="text-align: center;">
          <FIcon name="checkmark" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">checkmark</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="chevron-down" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">chevron-down</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="chevron-left" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">chevron-left</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="chevron-right" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">chevron-right</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="chevron-up" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">chevron-up</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="close" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">close</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="menu" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">menu</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="star" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">star</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="star-filled" :size="32" color="#FFD700" />
          <p style="margin-top: 8px; font-size: 12px;">star-filled</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="instagram" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">instagram</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="phone" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">phone</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="email" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">email</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="location" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">location</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="clock" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">clock</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="scissors" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">scissors</p>
        </div>
        <div style="text-align: center;">
          <FIcon name="crown" :size="32" />
          <p style="margin-top: 8px; font-size: 12px;">crown</p>
        </div>
      </div>
    `,
  }),
}
