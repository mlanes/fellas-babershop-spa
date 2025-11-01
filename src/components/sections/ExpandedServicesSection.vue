<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import { services } from '@/data/services'

/**
 * ExpandedServicesSection - Detailed service catalog with pricing
 */
const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})
</script>

<template>
  <section ref="sectionRef" id="expanded-services" class="expanded-services">
    <div class="expanded-services__container container">
      <div class="expanded-services__sidebar">
        <h2 class="expanded-services__heading text-h2">
          Todos os Serviços
        </h2>

        <p class="expanded-services__subtitle text-body-lg">
          Serviços profissionais de barbeiro com qualidade premium
        </p>
      </div>

      <div class="expanded-services__grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="expanded-services__card"
        >
          <div class="expanded-services__card-content">
            <h6 class="expanded-services__card-category">
              {{ service.duration }}
            </h6>
            <h3 class="expanded-services__card-title">
              {{ service.name }}
            </h3>
            <p class="expanded-services__card-description">
              {{ service.description }}
            </p>
            <div class="expanded-services__card-price">
              {{ service.price }}
            </div>
          </div>

          <div class="expanded-services__card-image">
            <!-- Placeholder for service image -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.expanded-services {
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
    display: flex;
    flex-direction: column;
    gap: $spacing-4xl;

    @include desktop {
      flex-direction: row;
      gap: $spacing-6xl;
      align-items: flex-start;
    }
  }

  @include element('sidebar') {
    @include desktop {
      flex: 0 0 35%;
      position: sticky;
      top: calc($header-height + $spacing-4xl);
      align-self: flex-start;
    }
  }

  @include element('heading') {
    color: $white;
    margin-bottom: $spacing-md;
  }

  @include element('subtitle') {
    color: $gray-6;
    margin-bottom: 0;
  }

  @include element('grid') {
    display: flex;
    flex-direction: column;
    flex: 1;

    @include desktop {
      flex: 0 0 65%;
    }
  }

  @include element('card') {
    background: transparent;
    border-bottom: 1px solid $gray-3;
    display: flex;
    flex-direction: column;
    padding: $spacing-3xl 0;
    gap: $spacing-2xl;

    @include tablet {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }

    &:hover {
      .expanded-services__card-image {
        &::before {
          opacity: 1;
        }

        img {
          transform: scale(1.08);
        }
      }

      .expanded-services__card-price {
        transform: translate3d(5px, 0, 0);
      }
    }
  }

  @include element('card-content') {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }

  @include element('card-category') {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: $gray-6;
    margin: 0;
  }

  @include element('card-title') {
    color: $white;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.3;
    margin: 0;

    @include desktop {
      font-size: 28px;
    }
  }

  @include element('card-description') {
    color: $gray-6;
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
  }

  @include element('card-price') {
    font-size: 18px;
    font-weight: 700;
    color: $brand-red;
    margin-top: $spacing-sm;
    transform: translate3d(0, 0, 0);
    opacity: 1;
    transition: transform 0.3s ease;

    @include desktop {
      font-size: 20px;
    }
  }

  @include element('card-image') {
    width: 100%;
    height: 200px;
    background: $gradient-dark-1;
    border-radius: $radius-md;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;

    @include tablet {
      width: 240px;
      height: 180px;
    }

    @include desktop {
      width: 280px;
      height: 200px;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: 1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: scale(1);
    }
  }
}
</style>
