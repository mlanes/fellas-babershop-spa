<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FButton from '@/components/ui/FButton.vue'
import FellasAuthenticBadge from '@/assets/img/fellas-authentic.svg?component'

/**
 * AboutSection - About Fellas Barbershop with crown badge
 */
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section ref="sectionRef" id="sobre" class="about">
    <div class="about__container container">
      <div class="about__content">
        <div class="about__text">
          <p class="about__subtitle">SOBRE</p>

          <h2 class="about__heading text-h2">Fellas Barbershop</h2>

          <p class="about__description text-body-lg">
            A nossa paixão é fornecer aos nossos clientes masculinos o mais
            alto nível de cuidados pessoais, desde a barba até o cabelo. Na
            Fellas, você encontrará um ambiente acolhedor e profissional onde
            pode relaxar e aproveitar uma experiência personalizada em todos e
            cada um dos nossos serviços.
          </p>

          <FButton variant="gradient" size="lg">SABER MAIS</FButton>
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
    color: $brand-red;
    text-transform: uppercase;
    margin-bottom: $spacing-md;
  }

  @include element('heading') {
    color: $white;
    margin-bottom: $spacing-lg;
  }

  @include element('description') {
    color: $gray-6;
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
      width: 350px;
      height: 350px;
      background: radial-gradient(circle, rgba($brand-red, 0.8) 0%, transparent 70%);
      filter: blur(150px);
      z-index: -1;

      @include tablet {
        width: 400px;
        height: 400px;
        filter: blur(180px);
      }

      @include desktop {
        width: 450px;
        height: 450px;
        filter: blur(200px);
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

    // Animate the text paths and red dots around the circle
    :deep(path) {
      animation: rotate-text 20s linear infinite;
      transform-origin: 175px 175px; // Center of the SVG viewBox (350x350)
    }

    // Keep center white circle and comb/scissors static
    :deep(path[data-figma-bg-blur-radius]),
    :deep(path[fill="#121111"]) {
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
