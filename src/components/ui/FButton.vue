<script setup lang="ts">
/**
 * FButton - Reusable button component with multiple variants and sizes
 */
interface Props {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Disable button */
  disabled?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
  type: 'button',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      'f-button',
      `f-button--${variant}`,
      `f-button--${size}`,
      {
        'f-button--full-width': fullWidth,
        'f-button--disabled': disabled,
      },
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.f-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $font-primary;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all $transition-base;
  white-space: nowrap;
  user-select: none;

  &:focus-visible {
    @include focus-indicator;
  }

  // Variants
  @include modifier('primary') {
    background: $gradient-brand-dark-red;
    color: $white;

    &:hover:not(:disabled) {
      filter: brightness(1.1);
      box-shadow: $shadow-glow-red;
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  @include modifier('secondary') {
    background-color: $gray-2;
    color: $white;

    &:hover:not(:disabled) {
      background-color: $gray-3;
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  @include modifier('gradient') {
    background: $gradient-brand-1;
    color: $white;

    &:hover:not(:disabled) {
      box-shadow: $shadow-glow-red;
      transform: translateY(-2px) scale(1.02);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(1);
    }
  }

  @include modifier('outline') {
    background-color: transparent;
    border: 2px solid $brand-red-dark;
    color: $brand-red-dark;

    &:hover:not(:disabled) {
      background-color: $brand-red-dark;
      color: $white;
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  // Sizes
  @include modifier('sm') {
    padding: $spacing-sm $spacing-md;
    font-size: 14px;
    border-radius: $radius-sm;
  }

  @include modifier('md') {
    padding: $spacing-md $spacing-xl;
    font-size: 16px;
  }

  @include modifier('lg') {
    padding: $spacing-lg $spacing-2xl;
    font-size: 18px;
    border-radius: $radius-lg;
  }

  // States
  @include modifier('full-width') {
    width: 100%;
  }

  @include modifier('disabled') {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
