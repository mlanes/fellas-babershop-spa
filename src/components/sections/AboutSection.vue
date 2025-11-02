<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FButton from '@/components/ui/FButton.vue'
import FellasAuthenticBadge from '@/assets/img/fellas-authentic.svg?component'
import { useLocale } from '@/composables/useLocale'

/**
 * AboutSection - About Fellas Barbershop with crown badge
 */
const sectionRef = ref<HTMLElement | null>(null)
const { t } = useLocale()

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section id="sobre" ref="sectionRef" class="about">
    <div class="about__container container">
      <div class="about__content">
        <div class="about__text">
          <p class="about__subtitle">{{ t('about.subtitle') }}</p>

          <h2 class="about__heading text-h2">{{ t('about.heading') }}</h2>

          <p class="about__description text-body-lg">
            {{ t('about.description') }}
          </p>

          <FButton variant="gradient" size="md">{{ t('about.learnMore') }}</FButton>
        </div>

        <div class="about__badge">
          <FellasAuthenticBadge class="about__badge-svg" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.about {
  min-height: calc(100vh - $header-height);
  display: flex;
  align-items: center;
  padding: $spacing-6xl 0;
  color: var(--text-color-primary);
  opacity: 0;
  transition: opacity $transition-slow;

  &.fade-in {
    opacity: 1;
  }

  @include element('container') {
    @include container;
  }

  @include element('content') {
    display: grid;
    gap: $spacing-4xl;
    align-items: center;

    @include tablet {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-5xl;
    }
  }

  @include element('text') {
    animation: slide-up $transition-base forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }

  @include element('subtitle') {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: $brand-red-dark;
    text-transform: uppercase;
    margin-bottom: $spacing-md;
  }

  @include element('heading') {
    color: var(--text-color-primary);
    margin-bottom: $spacing-lg;
  }

  @include element('description') {
    color: var(--text-color-secondary);
    margin-bottom: $spacing-3xl;
    line-height: 1.8;

    @include tablet {
      margin-bottom: $spacing-4xl;
    }
  }

  @include element('badge') {
    display: flex;
    justify-content: center;
    animation: scale-in $transition-base forwards;
    animation-delay: 0.4s;
    opacity: 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba($brand-red-dark, 1) 0%, transparent 70%);
      filter: blur(250px);
      z-index: -1;

      @include tablet {
        width: 600px;
        height: 600px;
        filter: blur(300px);
      }

      @include desktop {
        width: 700px;
        height: 700px;
        filter: blur(350px);
      }
    }
  }

  @include element('badge-svg') {
    width: 100%;
    max-width: 300px;
    height: auto;
    display: block;
    position: relative;
    z-index: 1;

    @include tablet {
      max-width: 350px;
    }

    @include desktop {
      max-width: 400px;
    }

    // Change text stroke to match theme
    :deep(path[stroke="#F7F9FC"]) {
      stroke: var(--text-color-primary);
    }

    // Change text fill to match theme (but not the center white circle)
    :deep(path[fill="#F7F9FC"]:not([data-figma-bg-blur-radius])) {
      fill: var(--text-color-primary);
    }

    // Center white circle background - inverted (dark in light mode, light in dark mode)
    :deep(path[data-figma-bg-blur-radius][fill="#F7F9FC"]) {
      fill: var(--text-color-primary);
    }

    // Center logo (comb/scissors) - inverted color for contrast
    :deep(path[fill="#121111"]) {
      fill: var(--page-background);
      animation: none;
    }

    // Animate the text paths and red dots around the circle
    :deep(path) {
      animation: rotate-text 20s linear infinite;
      transform-origin: 175px 175px; // Center of the SVG viewBox (350x350)
    }

    // Keep center circle static
    :deep(path[data-figma-bg-blur-radius]) {
      animation: none;
    }
  }
}

@keyframes rotate-text {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
