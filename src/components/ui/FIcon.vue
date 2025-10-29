<script setup lang="ts">
import type { IconName } from '@/types/icons'

/**
 * FIcon - SVG icon component
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
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :style="{ color }"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="f-icon"
    :aria-label="name"
  >
    <!-- Checkmark -->
    <path
      v-if="name === 'checkmark'"
      d="M20 6L9 17L4 12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Chevron Down -->
    <path
      v-else-if="name === 'chevron-down'"
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Chevron Up -->
    <path
      v-else-if="name === 'chevron-up'"
      d="M18 15L12 9L6 15"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Chevron Left -->
    <path
      v-else-if="name === 'chevron-left'"
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Chevron Right -->
    <path
      v-else-if="name === 'chevron-right'"
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Close/X -->
    <path
      v-else-if="name === 'close'"
      d="M18 6L6 18M6 6L18 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Menu/Hamburger -->
    <path
      v-else-if="name === 'menu'"
      d="M3 12H21M3 6H21M3 18H21"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Star (outline) -->
    <path
      v-else-if="name === 'star'"
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Star (filled) -->
    <path
      v-else-if="name === 'star-filled'"
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      fill="currentColor"
    />

    <!-- Instagram -->
    <g v-else-if="name === 'instagram'">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        stroke-width="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </g>

    <!-- Phone -->
    <path
      v-else-if="name === 'phone'"
      d="M22 16.92V19.92C22 20.48 21.56 20.92 21 20.92C10.07 20.48 2 12.41 2 1.48C2 0.92 2.44 0.48 3 0.48H6C6.56 0.48 7 0.92 7 1.48V5.48L5 7.48C6.5 10.48 9.5 13.48 12.5 14.98L14.5 12.98H18.5C19.06 12.98 19.5 13.42 19.5 13.98V16.48Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Email -->
    <path
      v-else-if="name === 'email'"
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else-if="name === 'email'"
      d="M22 6L12 13L2 6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />

    <!-- Location/Pin -->
    <path
      v-else-if="name === 'location'"
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      v-else-if="name === 'location'"
      cx="12"
      cy="10"
      r="3"
      stroke="currentColor"
      stroke-width="2"
    />

    <!-- Clock -->
    <circle
      v-else-if="name === 'clock'"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="2"
    />
    <path
      v-else-if="name === 'clock'"
      d="M12 6V12L16 14"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />

    <!-- Scissors -->
    <path
      v-else-if="name === 'scissors'"
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle
      v-else-if="name === 'scissors'"
      cx="6"
      cy="6"
      r="3"
      stroke="currentColor"
      stroke-width="2"
    />
    <circle
      v-else-if="name === 'scissors'"
      cx="6"
      cy="18"
      r="3"
      stroke="currentColor"
      stroke-width="2"
    />

    <!-- Crown -->
    <path
      v-else-if="name === 'crown'"
      d="M2 20H22L20 8L16 12L12 4L8 12L4 8L2 20Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />

    <!-- Quote -->
    <path
      v-else-if="name === 'quote'"
      d="M3 21C3 17.134 5.134 14 9 14V11C9 7.13401 6.86599 4 3 4V7C5.20914 7 7 8.79086 7 11V14C7 16.2091 5.20914 18 3 18V21ZM16 21C16 17.134 18.134 14 22 14V11C22 7.13401 19.866 4 16 4V7C18.2091 7 20 8.79086 20 11V14C20 16.2091 18.2091 18 16 18V21Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped lang="scss">
.f-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
