<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import FButton from '@/components/ui/FButton.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { useLocale } from '@/composables/useLocale'
import { services } from '@/data/services'

/**
 * ServicesSection - Popular services overview with images and call-to-action
 */
const { scrollTo } = useSmoothScroll()
const { t } = useLocale()
const sectionRef = ref<HTMLElement | null>(null)

const handleViewServices = () => {
  scrollTo('#expanded-services')
}

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section ref="sectionRef" id="services" class="services">
    <div class="services__container container">
      <div class="services__content">
        <div class="services__left">
          <p class="services__subtitle">{{ t('services.subtitle') }}</p>

          <h2 class="services__heading text-h2">
            {{ t('services.heading') }}
          </h2>

          <div class="services__list">
            <div
              v-for="(service, index) in services.slice(0, 6)"
              :key="index"
              class="services__item"
            >
              <FIcon name="checkmark" :size="24" class="services__icon" />
              <span class="services__item-title">{{ service.name }}</span>
            </div>
          </div>

          <FButton
            variant="gradient"
            size="md"
            class="services__button"
            @click="handleViewServices"
          >
            {{ t('services.viewPricing') }}
          </FButton>
        </div>

        <div class="services__images">
          <div class="services__image-row">
            <div class="services__image-placeholder services__image-placeholder--large services__image-placeholder--1">
              <p class="text-body-sm">Imagem 1</p>
            </div>
            <div class="services__image-placeholder services__image-placeholder--small services__image-placeholder--2">
              <p class="text-body-sm">Imagem 2</p>
            </div>
          </div>
          <div class="services__image-row">
            <div class="services__image-placeholder services__image-placeholder--small services__image-placeholder--3">
              <p class="text-body-sm">Imagem 3</p>
            </div>
            <div class="services__image-placeholder services__image-placeholder--large services__image-placeholder--4">
              <p class="text-body-sm">Imagem 4</p>
            </div>
          </div>
          <div class="services__image-row">
            <div class="services__image-placeholder services__image-placeholder--large services__image-placeholder--5">
              <p class="text-body-sm">Imagem 5</p>
            </div>
            <div class="services__image-placeholder services__image-placeholder--small services__image-placeholder--6">
              <p class="text-body-sm">Imagem 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.services {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: $spacing-6xl 0;
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

    @include tablet {
      grid-template-columns: 0.8fr 1.2fr;
      gap: $spacing-5xl;
      // align-items: center;
    }
  }

  @include element('left') {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
  }

  @include element('subtitle') {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    color: $brand-red-dark;
    text-transform: uppercase;
    margin-bottom: -$spacing-md;
  }

  @include element('heading') {
    color: var(--text-color-primary);
    line-height: 1.2;
    margin-bottom: $spacing-lg;
    transition: color $transition-base;
  }

  @include element('list') {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-lg;
    margin-bottom: $spacing-xl;

    @include tablet {
      gap: $spacing-xl;
    }
  }

  @include element('item') {
    display: flex;
    gap: $spacing-md;
    align-items: center;
    animation: slide-up $transition-base forwards;

    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
        opacity: 0;
      }
    }
  }

  @include element('icon') {
    color: $white !important;
    background-color: $brand-red-dark;
    border: 4px solid color.adjust($brand-red-dark, $lightness: 10%);
    border-radius: 50%;
    padding: 2px;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(svg) {
      color: $white;
      fill: currentColor;
    }
  }

  @include element('item-title') {
    color: var(--text-color-secondary);
    font-size: 15px;
    font-weight: 400;
    transition: color $transition-base;
  }

  @include element('button') {
    width: fit-content;
    min-width: auto;
  }

  @include element('images') {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  @include element('image-row') {
    display: flex;
    gap: $spacing-md;
    width: 100%;
  }

  @include element('image-placeholder') {
    aspect-ratio: 6 / 3;
    background: var(--surface-background);
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color-secondary);
    overflow: hidden;
    transition: background $transition-base, color $transition-base;
    animation: float 8s ease-in-out infinite;

    &:hover {
      animation-play-state: paused;
    }

    @include modifier('large') {
      width: 100%;

      @include tablet {
        width: 60%;
      }
    }

    @include modifier('small') {
      width: 100%;

      @include tablet {
        width: 37%;
      }
    }

    @include modifier('1') {
      animation-delay: 0s;
    }

    @include modifier('2') {
      animation-delay: 1.2s;
    }

    @include modifier('3') {
      animation-delay: 2.8s;
    }

    @include modifier('4') {
      animation-delay: 4.5s;
    }

    @include modifier('5') {
      animation-delay: 1.8s;
    }

    @include modifier('6') {
      animation-delay: 3.5s;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(0px, 0px);
  }
  25% {
    transform: translate(5px, -10px);
  }
  50% {
    transform: translate(0px, -15px);
  }
  75% {
    transform: translate(-5px, -10px);
  }
}
</style>
