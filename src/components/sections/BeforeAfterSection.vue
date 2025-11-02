<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider.vue'
import { useLocale } from '@/composables/useLocale'

/**
 * BeforeAfterSection - Before and After image comparison section
 */
const sectionRef = ref<HTMLElement | null>(null)
const { t } = useLocale()

// Before and after images from Fellas Barbershop
const beforeAfterPairs = [
  {
    before: new URL('@/assets/img/before-after/fellas-barbers-haircut-after-1.jpg', import.meta.url).href,
    after: new URL('@/assets/img/before-after/fellas-barbers-haircut-after-2.jpg', import.meta.url).href,
  },
  {
    before: new URL('@/assets/img/before-after/fellas-barbers-haircut-before-3.jpg', import.meta.url).href,
    after: new URL('@/assets/img/before-after/fellas-barbers-haircut-after-3.jpg', import.meta.url).href,
  },
]

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section ref="sectionRef" id="antes-depois" class="before-after-section">
    <div class="before-after-section__container container">
      <p class="before-after-section__label">{{ t('beforeAfter.label') }}</p>

      <h2 class="before-after-section__heading text-h2">
        Antes <span class="before-after-section__heading-accent">&</span> Depois
      </h2>

      <p class="before-after-section__subtitle text-body-lg">
        {{ t('beforeAfter.subtitle') }}
      </p>

      <div class="before-after-section__grid">
        <div
          v-for="(pair, index) in beforeAfterPairs"
          :key="index"
          class="before-after-section__item"
        >
          <BeforeAfterSlider
            :before-image="pair.before"
            :after-image="pair.after"
            :before-label="t('beforeAfter.before')"
            :after-label="t('beforeAfter.after')"
            :initial-position="50"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.before-after-section {
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

  @include element('label') {
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    background: $gradient-brand-dark-red;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    margin-bottom: $spacing-sm;
  }

  @include element('heading') {
    text-align: center;
    color: var(--text-color-primary);
    margin-bottom: $spacing-md;
  }

  @include element('heading-accent') {
    color: $brand-red-dark;
  }

  @include element('subtitle') {
    text-align: center;
    color: var(--text-color-secondary);
    margin-bottom: $spacing-4xl;

    @include tablet {
      margin-bottom: $spacing-5xl;
    }
  }

  @include element('grid') {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-2xl;
    max-width: 800px;
    margin: 0 auto;
    justify-items: center;

    @include tablet {
      grid-template-columns: 1fr 1fr;
      gap: $spacing-xl;
      max-width: 100%;
    }

    @include desktop {
      gap: $spacing-2xl;
      width: 70%;
    }
  }

  @include element('item') {
    animation: scale-in $transition-base forwards;
    opacity: 0;
    animation-delay: 0.2s;
    width: 100%;
  }
}
</style>
