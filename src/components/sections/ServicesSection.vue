<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import FButton from '@/components/ui/FButton.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { services } from '@/data/services'

/**
 * ServicesSection - Popular services overview with images and call-to-action
 */
const { scrollTo } = useSmoothScroll()
const sectionRef = ref<HTMLElement | null>(null)

const handleViewServices = () => {
  scrollTo('#expanded-services', 80)
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
          <p class="services__subtitle">NOSSOS</p>

          <h2 class="services__heading text-h2">
            Serviços<br>Populares
          </h2>

          <div class="services__list">
            <div
              v-for="(service, index) in services.slice(0, 4)"
              :key="index"
              class="services__item"
            >
              <FIcon name="checkmark" :size="24" class="services__icon" />
              <span class="services__item-title">{{ service.name }}</span>
            </div>
          </div>

          <FButton
            variant="primary"
            size="lg"
            @click="handleViewServices"
          >
            VER PREÇÁRIO
          </FButton>
        </div>

        <div class="services__images">
          <div class="services__image-placeholder services__image-placeholder--1">
            <p class="text-body-sm">Imagem 1</p>
          </div>
          <div class="services__image-placeholder services__image-placeholder--2">
            <p class="text-body-sm">Imagem 2</p>
          </div>
          <div class="services__image-placeholder services__image-placeholder--3">
            <p class="text-body-sm">Imagem 3</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.services {
  padding: $spacing-6xl 0;
  background-color: $gray-1;
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
      grid-template-columns: 1fr 1fr;
      gap: $spacing-5xl;
      align-items: center;
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
    color: $brand-red;
    text-transform: uppercase;
    margin-bottom: -$spacing-md;
  }

  @include element('heading') {
    color: $white;
    line-height: 1.2;
    margin-bottom: $spacing-lg;
  }

  @include element('list') {
    display: flex;
    flex-direction: column;
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

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
        opacity: 0;
      }
    }
  }

  @include element('icon') {
    color: $white !important;
    background-color: $brand-red;
    border: 4px solid lighten($brand-red, 10%);
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
    color: $gray-6;
    font-size: 15px;
    font-weight: 400;
  }

  @include element('images') {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-md;

    @include tablet {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
      gap: $spacing-lg;
    }
  }

  @include element('image-placeholder') {
    aspect-ratio: 4 / 3;
    background: $gradient-dark-1;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $white;
    overflow: hidden;
    transition: transform $transition-base;

    &:hover {
      transform: scale(1.02);
    }

    @include modifier('1') {
      @include tablet {
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        aspect-ratio: 3 / 4;
      }
    }

    @include modifier('2') {
      @include tablet {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
      }
    }

    @include modifier('3') {
      @include tablet {
        grid-column: 2 / 3;
        grid-row: 2 / 3;
      }
    }
  }
}
</style>
