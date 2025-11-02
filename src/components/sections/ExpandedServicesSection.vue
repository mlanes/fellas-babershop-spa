<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import { services } from '@/data/services'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

/**
 * ExpandedServicesSection - Detailed service catalog with pricing
 */
const { scrollTo } = useSmoothScroll()
const sectionRef = ref<HTMLElement | null>(null)
const currentPage = ref(1)
const itemsPerPage = 10
const slideDirection = ref<'left' | 'right'>('right')

const totalPages = computed(() => Math.ceil(services.length / itemsPerPage))

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return services.slice(start, end)
})

const canGoPrev = computed(() => currentPage.value > 1)
const canGoNext = computed(() => currentPage.value < totalPages.value)

const nextPage = () => {
  if (canGoNext.value) {
    slideDirection.value = 'right'
    currentPage.value++
    scrollTo('#expanded-services')
  }
}

const prevPage = () => {
  if (canGoPrev.value) {
    slideDirection.value = 'left'
    currentPage.value--
    scrollTo('#expanded-services')
  }
}

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
        <div class="expanded-services__sidebar-content">
          <h2 class="expanded-services__heading text-h2">
            Todos os Serviços
          </h2>
          <p class="expanded-services__subtitle text-body-lg">
            Serviços profissionais de barbeiro com qualidade premium
          </p>

          <div class="expanded-services__pagination expanded-services__pagination--desktop">
            <button
              class="expanded-services__pagination-btn"
              :class="{ 'expanded-services__pagination-btn--disabled': !canGoPrev }"
              :disabled="!canGoPrev"
              @click="prevPage"
            >
              <FIcon name="chevron-left" :size="24" />
            </button>

            <div class="expanded-services__pagination-info">
              <span class="expanded-services__pagination-current">{{ currentPage }}</span>
              <span class="expanded-services__pagination-separator">/</span>
              <span class="expanded-services__pagination-total">{{ totalPages }}</span>
            </div>

            <button
              class="expanded-services__pagination-btn"
              :class="{ 'expanded-services__pagination-btn--disabled': !canGoNext }"
              :disabled="!canGoNext"
              @click="nextPage"
            >
              <FIcon name="chevron-right" :size="24" />
            </button>
          </div>
        </div>
      </div>

      <div class="expanded-services__content">
        <transition :name="`slide-${slideDirection}`" mode="out-in">
          <div :key="currentPage" class="expanded-services__grid">
            <div
              v-for="(service, index) in paginatedServices"
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
        </transition>

        <div class="expanded-services__pagination expanded-services__pagination--mobile">
          <button
            class="expanded-services__pagination-btn"
            :class="{ 'expanded-services__pagination-btn--disabled': !canGoPrev }"
            :disabled="!canGoPrev"
            @click="prevPage"
          >
            <FIcon name="chevron-left" :size="24" />
          </button>

          <div class="expanded-services__pagination-info">
            <span class="expanded-services__pagination-current">{{ currentPage }}</span>
            <span class="expanded-services__pagination-separator">/</span>
            <span class="expanded-services__pagination-total">{{ totalPages }}</span>
          </div>

          <button
            class="expanded-services__pagination-btn"
            :class="{ 'expanded-services__pagination-btn--disabled': !canGoNext }"
            :disabled="!canGoNext"
            @click="nextPage"
          >
            <FIcon name="chevron-right" :size="24" />
          </button>
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
      flex: 0 1 35%;
      min-width: 0;
      position: sticky;
      top: calc($header-height + $spacing-4xl);
      align-self: flex-start;
    }
  }

  @include element('sidebar-content') {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    align-items: center;
    text-align: left;

    @include desktop {
      align-items: flex-start;
    }
  }

  @include element('heading') {
    color: $white;
    margin-bottom: 0;
  }

  @include element('subtitle') {
    color: $gray-6;
    margin-bottom: 0;
  }

  @include element('content') {
    flex: 1;
    min-width: 0;

    @include desktop {
      flex: 1 1 auto;
    }
  }

  @include element('grid') {
    display: flex;
    flex-direction: column;
  }

  @include element('pagination') {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-lg;
    margin-top: $spacing-2xl;

    @include modifier('desktop') {
      display: none;

      @include desktop {
        display: flex;
        justify-content: flex-start;
      }
    }

    @include modifier('mobile') {
      display: flex;
      margin-top: $spacing-2xl;

      @include desktop {
        display: none;
      }
    }
  }

  @include element('pagination-btn') {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: $gray-2;
    border: 1px solid $gray-3;
    border-radius: 50%;
    color: $white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover:not(:disabled) {
      background: $brand-red;
      border-color: $brand-red;
      transform: scale(1.1);
    }

    @include modifier('disabled') {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  @include element('pagination-info') {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    font-size: 18px;
    font-weight: 600;
    color: $white;
  }

  @include element('pagination-current') {
    color: $brand-red;
  }

  @include element('pagination-separator') {
    color: $gray-5;
  }

  @include element('pagination-total') {
    color: $gray-5;
  }

  @include element('card') {
    background: transparent;
    border-bottom: 1px solid $gray-3;
    display: flex;
    flex-direction: row;
    padding: $spacing-xl 0;
    gap: $spacing-lg;
    align-items: center;
    justify-content: space-between;

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
    gap: $spacing-sm;
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
    font-size: 20px;
    line-height: 1.3;
    margin: 0;

    @include desktop {
      font-size: 22px;
    }
  }

  @include element('card-description') {
    color: $gray-6;
    font-size: 14px;
    line-height: 1.5;
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
    width: 120px;
    height: 100px;
    background: $gradient-dark-1;
    border-radius: $radius-md;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;

    @include tablet {
      width: 200px;
      height: 140px;
    }

    @include desktop {
      width: 220px;
      height: 150px;
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
