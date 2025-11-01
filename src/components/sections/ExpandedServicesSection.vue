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
      <h2 class="expanded-services__heading text-h2">
        Todos os Serviços
      </h2>

      <p class="expanded-services__subtitle text-body-lg">
        Serviços profissionais de barbeiro com qualidade premium
      </p>

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
  }

  @include element('heading') {
    text-align: center;
    color: $white;
    margin-bottom: $spacing-md;
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
    gap: $spacing-xl;

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(4, 1fr);
      gap: $spacing-xl;
    }
  }

  @include element('card') {
    background: $gray-2;
    border-radius: $radius-lg;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: $shadow-glow-red;
    }
  }

  @include element('card-image') {
    width: 100%;
    height: 240px;
    background: $gradient-dark-1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    @include desktop {
      height: 220px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }

  @include element('card') {
    &:hover {
      .expanded-services__card-image img {
        transform: scale(1.1);
      }
    }
  }

  @include element('card-content') {
    padding: $spacing-lg;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: $spacing-sm;
    flex: 1;

    @include desktop {
      padding: $spacing-md;
    }
  }

  @include element('card-title') {
    color: $white;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;

    @include desktop {
      font-size: 15px;
    }
  }

  @include element('card-price') {
    font-size: 20px;
    font-weight: 700;
    color: $brand-red;
    margin-top: auto;

    @include desktop {
      font-size: 18px;
    }
  }

  @include element('card-meta') {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    color: $gray-6;
    font-size: 13px;
    padding-top: $spacing-sm;
    border-top: 1px solid $gray-3;
    width: 100%;
    justify-content: center;
  }
}
</style>
