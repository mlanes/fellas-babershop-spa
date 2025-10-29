<script setup lang="ts">
import FellasLogo from '@/assets/img/logo.svg?component'

/**
 * FLogo - Fellas Barbershop logo component
 * Displays the brand logo with optional size variants
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
  <div :class="['f-logo', `f-logo--${size}`]">
    <FellasLogo class="f-logo__svg" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.f-logo {
  display: inline-flex;
  align-items: center;
  color: $gray-1;

  @include modifier('sm') {
    height: 24px;
  }

  @include modifier('md') {
    height: 32px;
  }

  @include modifier('lg') {
    height: 48px;
  }

  @include element('svg') {
    height: 100%;
    width: auto;
    display: block;
  }
}
</style>
