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

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
})
</script>

<template>
  <svg
    :width="name === 'see-more' ? size * 0.78 : size"
    :height="size"
    :style="{ color }"
    :viewBox="name === 'see-more' ? '0 0 25 32' : '0 0 24 24'"
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
    <g v-else-if="name === 'email'">
      <path
        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22 6L12 13L2 6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>

    <!-- Location/Pin -->
    <g v-else-if="name === 'location'">
      <path
        d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" />
    </g>

    <!-- Clock -->
    <g v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
      <path
        d="M12 6V12L16 14"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>

    <!-- Scissors -->
    <g v-else-if="name === 'scissors'">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="2" />
      <circle cx="6" cy="18" r="3" stroke="currentColor" stroke-width="2" />
    </g>

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

    <!-- See More (custom) -->
    <g v-else-if="name === 'see-more'">
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
    </g>
  </svg>
</template>

<style scoped lang="scss">
.f-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
