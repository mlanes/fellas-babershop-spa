<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider.vue'

/**
 * BeforeAfterSection - Before and After image comparison section
 */
const sectionRef = ref<HTMLElement | null>(null)

// Placeholder images - to be replaced with actual barbershop before/after images
const beforeAfterPairs = [
  {
    before: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop',
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
      <p class="before-after-section__label">CONFIRA ESTE</p>

      <h2 class="before-after-section__heading text-h2">
        Antes <span class="before-after-section__heading-accent">&</span> Depois
      </h2>

      <p class="before-after-section__subtitle text-body-lg">
        Arraste a barra para algum dos lados
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
            before-label="Antes"
            after-label="Depois"
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
  background-color: $gray-1;
  color: $white;
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
    color: $brand-red;
    text-transform: uppercase;
    margin-bottom: $spacing-sm;
  }

  @include element('heading') {
    text-align: center;
    color: $white;
    margin-bottom: $spacing-md;
  }

  @include element('heading-accent') {
    color: $brand-red;
  }

  @include element('subtitle') {
    text-align: center;
    color: $gray-6;
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

    @include desktop {
      max-width: 1000px;
    }
  }

  @include element('item') {
    animation: scale-in $transition-base forwards;
    opacity: 0;
    animation-delay: 0.2s;
  }
}
</style>
