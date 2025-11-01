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
          <div class="expanded-services__card-header">
            <FIcon name="scissors" :size="32" class="expanded-services__card-icon" />
            <h3 class="expanded-services__card-title text-h5">
              {{ service.name }}
            </h3>
          </div>

          <p class="expanded-services__card-description text-body">
            {{ service.detailedDescription }}
          </p>

          <div class="expanded-services__card-meta">
            <div class="expanded-services__card-meta-item">
              <FIcon name="clock" :size="20" />
              <span>{{ service.duration }}</span>
            </div>
            <div class="expanded-services__card-price">
              {{ service.price }}
            </div>
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
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-2xl;
    }
  }

  @include element('card') {
    background: $gray-2;
    border-radius: $radius-lg;
    padding: $spacing-xl;
    transition: transform $transition-base, box-shadow $transition-base;
    animation: scale-in $transition-base forwards;

    @for $i from 1 through 4 {
      &:nth-child(#{$i}) {
        animation-delay: #{$i * 0.1}s;
        opacity: 0;
      }
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-xl;
    }

    @include tablet {
      padding: $spacing-2xl;
    }
  }

  @include element('card-header') {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  @include element('card-icon') {
    color: $brand-red;
    flex-shrink: 0;
  }

  @include element('card-title') {
    color: $white;
    font-weight: 700;
  }

  @include element('card-description') {
    color: $gray-6;
    margin-bottom: $spacing-xl;
    line-height: 1.6;
  }

  @include element('card-meta') {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: $spacing-lg;
    border-top: 1px solid $gray-3;
  }

  @include element('card-meta-item') {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    color: $gray-6;
    font-size: 14px;
  }

  @include element('card-price') {
    font-size: 24px;
    font-weight: 700;
    color: $brand-red;
  }
}
</style>
