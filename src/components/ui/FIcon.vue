<script setup lang="ts">
import { computed } from 'vue'
import feather from 'feather-icons'
import type { IconName } from '@/types/icons'

/**
 * FIcon - SVG icon component using Feather Icons
 * Provides a consistent icon system across the application
 */
interface Props {
  /** Icon name */
  name: IconName
  /** Icon size in pixels */
  size?: number
  /** Icon color (CSS color value) */
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
})

// Custom icons that aren't in feather-icons
const customIcons = ['quote', 'see-more', 'checkmark', 'close', 'star-filled', 'email', 'location', 'crown']

const isCustomIcon = computed(() => customIcons.includes(props.name))

// Get feather icon SVG
const featherIconSvg = computed(() => {
  if (isCustomIcon.value) return ''

  try {
    const iconName = props.name as keyof typeof feather.icons
    const icon = feather.icons[iconName]
    if (!icon) {
      console.warn(`Icon "${props.name}" not found in feather-icons`)
      return ''
    }
    return icon.toSvg({
      width: props.size,
      height: props.size,
      color: props.color,
      'stroke-width': 2,
    })
  } catch (error) {
    console.error(`Error loading icon "${props.name}":`, error)
    return ''
  }
})
</script>

<template>
  <!-- Custom Icons -->
  <svg
    v-if="name === 'quote'"
    :width="size"
    :height="size"
    :style="{ color }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="f-icon"
    :aria-label="name"
  >
    <path
      d="M3 21C3 17.134 5.134 14 9 14V11C9 7.13401 6.86599 4 3 4V7C5.20914 7 7 8.79086 7 11V14C7 16.2091 5.20914 18 3 18V21ZM16 21C16 17.134 18.134 14 22 14V11C22 7.13401 19.866 4 16 4V7C18.2091 7 20 8.79086 20 11V14C20 16.2091 18.2091 18 16 18V21Z"
      fill="currentColor"
    />
  </svg>

  <svg
    v-else-if="name === 'see-more'"
    :width="size * 0.78"
    :height="size"
    :style="{ color }"
    viewBox="0 0 25 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="f-icon"
    :aria-label="name"
  >
    <path
      d="M11.1578 3.2C8.68594 3.2 7.42812 3.4704 6.27031 4.104C5.30472 4.62424 4.51586 5.43204 4.00781 6.4208C3.38906 7.6048 3.125 8.8944 3.125 11.424V20.5728C3.125 23.104 3.38906 24.392 4.00781 25.5776C4.53438 26.5856 5.28594 27.3552 6.27031 27.8944C7.42656 28.528 8.68594 28.7984 11.1578 28.7984H13.8422C16.3141 28.7984 17.5719 28.528 18.7297 27.8944C19.6953 27.3742 20.4841 26.5664 20.9922 25.5776C21.6109 24.3936 21.875 23.104 21.875 20.5728V11.424C21.875 8.8928 21.6109 7.6048 20.9922 6.4192C20.4841 5.43044 19.6953 4.62264 18.7297 4.1024C17.5734 3.4704 16.3141 3.2 13.8437 3.2H11.1563H11.1578ZM11.1578 0H13.8422C16.9891 0 18.6766 0.4448 20.2047 1.2816C21.7145 2.09998 22.9492 3.36431 23.7484 4.9104C24.5656 6.4752 25 8.2032 25 11.4256V20.5744C25 23.7968 24.5656 25.5248 23.7484 27.0896C22.9492 28.6357 21.7145 29.9 20.2047 30.7184C18.6766 31.5552 16.9891 32 13.8422 32H11.1563C8.00938 32 6.32187 31.5552 4.79375 30.7184C3.28389 29.9 2.0492 28.6357 1.25 27.0896C0.434375 25.5248 0 23.7968 0 20.5744V11.424C0 8.2016 0.434375 6.4736 1.25156 4.9088C2.05143 3.36307 3.28667 2.0993 4.79688 1.2816C6.32344 0.4448 8.01094 0 11.1578 0ZM10.9375 6.4H14.0625V14.4H10.9375V6.4Z"
      fill="url(#paint0_linear_see_more)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_see_more"
        x1="12.5"
        y1="0"
        x2="12.5"
        y2="32"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#D4203B" />
        <stop offset="1" stop-color="#E83752" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>

  <!-- Feather Icons -->
  <span
    v-else
    class="f-icon"
    :aria-label="name"
    v-html="featherIconSvg"
  />
</template>

<style scoped lang="scss">
.f-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;

  :deep(svg) {
    display: block;
  }
}
</style>
