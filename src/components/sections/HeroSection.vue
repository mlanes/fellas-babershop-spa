<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FLogo from '@/components/ui/FLogo.vue'
import FIcon from '@/components/ui/FIcon.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

/**
 * HeroSection - Full-screen hero section with brand identity and scroll indicator
 */
const { scrollTo } = useSmoothScroll()
const heroRef = ref<HTMLElement | null>(null)

const handleScrollClick = () => {
  scrollTo('#services', 80)
}

onMounted(() => {
  // Trigger fade-in animation
  if (heroRef.value) {
    heroRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section ref="heroRef" id="home" class="hero">
    <div class="hero__container container">
      <div class="hero__content">
        <FLogo size="lg" class="hero__logo" />

        <h1 class="hero__title text-h1">
          FELLAS BARBERSHOP
        </h1>

        <p class="hero__tagline text-h5">
          A SUA BARBEARIA DE CONFIANÇA
        </p>

        <p class="hero__description text-body-lg">
          Cuidados pessoais de excelência. Combine tradição e inovação em um ambiente acolhedor, com barbeiros especializados em estilo e confiança.
        </p>
      </div>

      <button
        class="hero__scroll-indicator"
        aria-label="Scroll to services section"
        @click="handleScrollClick"
      >
        <FIcon name="chevron-down" :size="32" />
        <span class="sr-only">Ver serviços</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gray-1;
  color: $white;
  overflow: hidden;

  @include element('container') {
    @include container;
    position: relative;
    z-index: 1;
    padding-top: $spacing-6xl;
    padding-bottom: $spacing-6xl;
    text-align: center;
  }

  @include element('content') {
    max-width: 1000px;
    margin: 0 auto;
    opacity: 0;
    animation: fade-in $transition-slow forwards;
    animation-delay: 0.2s;
  }

  @include element('logo') {
    margin: 0 auto $spacing-xl;
    color: $brand-red;
  }

  @include element('title') {
    margin-bottom: $spacing-md;
    background: $gradient-brand-1;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.4s;
    opacity: 0;

    @include tablet {
      margin-bottom: $spacing-lg;
    }
  }

  @include element('tagline') {
    margin-bottom: $spacing-xl;
    color: $white;
    font-weight: 600;
    opacity: 0;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.6s;

    @include tablet {
      margin-bottom: $spacing-2xl;
    }
  }

  @include element('description') {
    margin-bottom: $spacing-3xl;
    color: $gray-7;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    opacity: 0;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.8s;

    @include tablet {
      margin-bottom: $spacing-4xl;
    }
  }

  @include element('scroll-indicator') {
    position: absolute;
    bottom: $spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    color: $brand-red;
    cursor: pointer;
    padding: $spacing-md;
    border-radius: $radius-full;
    transition: all $transition-base;
    opacity: 0;
    animation: fade-in $transition-base forwards, pulse 2s ease-in-out infinite;
    animation-delay: 1s;

    &:hover {
      background: rgba($brand-red, 0.1);
      transform: translateX(-50%) scale(1.1);
    }

    &:focus-visible {
      @include focus-indicator;
    }

    @include tablet {
      bottom: $spacing-2xl;
    }
  }
}

// Fade-in class for root element
.fade-in {
  opacity: 1;
}
</style>
