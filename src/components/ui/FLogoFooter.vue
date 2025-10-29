<script setup lang="ts">
import FellasLogoFooter from '@/assets/img/logo-footer.svg?component'

/**
 * FLogoFooter - Fellas Barbershop footer logo component
 * Displays the square footer logo with optional size variants
 */
interface Props {
  /** Size variant of the logo */
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  size: 'md',
})
</script>

<template>
  <div :class="['f-logo-footer', `f-logo-footer--${size}`]">
    <FellasLogoFooter class="f-logo-footer__svg" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.f-logo-footer {
  display: inline-flex;
  align-items: center;
  color: $white;

  @include element('svg') {
    display: block;

    :deep(svg) {
      display: block;
      width: auto;
      height: auto;
    }
  }

  @include modifier('sm') {
    .f-logo-footer__svg {
      :deep(svg) {
        width: 80px;
        height: 80px;
      }
    }
  }

  @include modifier('md') {
    .f-logo-footer__svg {
      :deep(svg) {
        width: 120px;
        height: 120px;
      }
    }
  }

  @include modifier('lg') {
    .f-logo-footer__svg {
      :deep(svg) {
        width: 180px;
        height: 180px;
      }
    }
  }
}
</style>
