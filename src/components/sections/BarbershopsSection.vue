<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import FIcon from '@/components/ui/FIcon.vue'

const { t } = useI18n()

interface Barbershop {
  id: string
  name: string
  address: string
  phone?: string
  whatsapp?: string
  scheduleWeekday: string
  scheduleWeekend: string
  scheduleSunday: string
  mapsUrl: string
  bookingUrl: string
  images: string[]
}

const barbershops = ref<Barbershop[]>([
  {
    id: 'alameda',
    name: `${t('barbershops.unit')} Alameda`,
    address: 'Alameda Dom Afonso Henriques, 47A - 1000-123 Alameda - Lisboa/LI - Portugal',
    phone: '+351 215 860 238',
    whatsapp: '+351 912 286 442',
    scheduleWeekday: 'Seg - Sex: 09:00 - 19:00',
    scheduleWeekend: 'Sábado e Feriados: 09:00 - 17:00',
    scheduleSunday: 'Domingo: Fechado',
    mapsUrl: 'https://maps.app.goo.gl/D83DuiVBsqQ4mith6',
    bookingUrl: '#booking',
    images: [
      new URL('@/assets/img/barbershops/alameda/fellas-barbers-alameda-interior-1.png', import.meta.url).href,
      new URL('@/assets/img/barbershops/alameda/fellas-barbers-alameda-interior-2.png', import.meta.url).href,
      new URL('@/assets/img/barbershops/alameda/fellas-barbers-alameda-interior-3.png', import.meta.url).href,
    ]
  },
  {
    id: 'campo-grande',
    name: `${t('barbershops.unit')} Campo Grande`,
    address: 'Campo Grande, 296 B - 1700-097 Alvalade - Lisboa/LI - Portugal',
    phone: '+351 215 904 241',
    whatsapp: '+351 910 452 767',
    scheduleWeekday: 'Seg - Sex: 10:00 - 20:00',
    scheduleWeekend: 'Sábado e Feriados: 10:00 - 18:00',
    scheduleSunday: 'Domingo: Fechado',
    mapsUrl: 'https://maps.app.goo.gl/ykdUubmgE2FxJQph9',
    bookingUrl: '#booking',
    images: [
      new URL('@/assets/img/barbershops/campo-grande/fellas-barbers-campo-grande-interior-1.png', import.meta.url).href,
      new URL('@/assets/img/barbershops/campo-grande/fellas-barbers-campo-grande-interior-2.png', import.meta.url).href,
      new URL('@/assets/img/barbershops/campo-grande/fellas-barbers-campo-grande-interior-3.png', import.meta.url).href,
      new URL('@/assets/img/barbershops/campo-grande/fellas-barbers-campo-grande-interior-4.png', import.meta.url).href,
    ]
  }
])

const currentImageIndex = ref<Record<string, number>>({
  alameda: 0,
  'campo-grande': 0
})

// Track transition state to handle infinite loop
const isTransitioning = ref<Record<string, boolean>>({
  alameda: false,
  'campo-grande': false
})

// Auto-play intervals for each carousel
const intervals = ref<Record<string, NodeJS.Timeout | null>>({
  alameda: null,
  'campo-grande': null
})

const startAutoPlay = (shopId: string, totalImages: number) => {
  // Clear existing interval
  if (intervals.value[shopId]) {
    clearInterval(intervals.value[shopId]!)
  }

  // Start new interval
  intervals.value[shopId] = setInterval(() => {
    nextImage(shopId, totalImages)
  }, 5000) // Change image every 5 seconds
}

const resetAutoPlay = (shopId: string, totalImages: number) => {
  startAutoPlay(shopId, totalImages)
}

const nextImage = (shopId: string, totalImages: number) => {
  if (isTransitioning.value[shopId]) return

  isTransitioning.value[shopId] = true
  currentImageIndex.value[shopId] = (currentImageIndex.value[shopId] + 1) % totalImages

  setTimeout(() => {
    isTransitioning.value[shopId] = false
  }, 600)

  resetAutoPlay(shopId, totalImages)
}

const prevImage = (shopId: string, totalImages: number) => {
  if (isTransitioning.value[shopId]) return

  isTransitioning.value[shopId] = true
  currentImageIndex.value[shopId] = (currentImageIndex.value[shopId] - 1 + totalImages) % totalImages

  setTimeout(() => {
    isTransitioning.value[shopId] = false
  }, 600)

  resetAutoPlay(shopId, totalImages)
}

const goToImage = (shopId: string, index: number, totalImages: number) => {
  if (isTransitioning.value[shopId] || currentImageIndex.value[shopId] === index) return

  isTransitioning.value[shopId] = true
  currentImageIndex.value[shopId] = index

  setTimeout(() => {
    isTransitioning.value[shopId] = false
  }, 600)

  resetAutoPlay(shopId, totalImages)
}

// Start auto-play on mount
onMounted(() => {
  barbershops.value.forEach(shop => {
    startAutoPlay(shop.id, shop.images.length)
  })
})

onUnmounted(() => {
  // Clean up intervals
  Object.values(intervals.value).forEach(interval => {
    if (interval) clearInterval(interval)
  })
})
</script>

<template>
  <section class="barbershops-section">
    <div class="container">
      <!-- Section Header -->
      <div class="barbershops-section__header">
        <span class="barbershops-section__label">{{ t('barbershops.label') }}</span>
        <h2 class="barbershops-section__title">{{ t('barbershops.title') }}</h2>
        <p class="barbershops-section__subtitle">{{ t('barbershops.subtitle') }}</p>
      </div>

      <!-- Barbershop Cards -->
      <div class="barbershops-section__grid">
        <article
          v-for="shop in barbershops"
          :key="shop.id"
          class="barbershop-card"
        >
          <!-- Image Carousel -->
          <div class="barbershop-card__carousel">
            <div
              class="barbershop-card__images"
              :style="{ transform: `translate3d(-${currentImageIndex[shop.id] * 100}%, 0, 0)` }"
            >
              <img
                v-for="(image, index) in shop.images"
                :key="index"
                :src="image"
                :alt="`${shop.name} - Interior ${index + 1}`"
                class="barbershop-card__image"
              />
            </div>

            <!-- Navigation Arrows -->
            <button
              class="barbershop-card__nav barbershop-card__nav--prev"
              @click="prevImage(shop.id, shop.images.length)"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              class="barbershop-card__nav barbershop-card__nav--next"
              @click="nextImage(shop.id, shop.images.length)"
              aria-label="Next image"
            >
              ›
            </button>

            <!-- Dots Indicator -->
            <div class="barbershop-card__dots">
              <button
                v-for="(_, index) in shop.images"
                :key="index"
                class="barbershop-card__dot"
                :class="{ 'barbershop-card__dot--active': currentImageIndex[shop.id] === index }"
                @click="goToImage(shop.id, index, shop.images.length)"
                :aria-label="`Go to image ${index + 1}`"
              ></button>
            </div>
          </div>

          <!-- Card Content -->
          <div class="barbershop-card__content">
            <h3 class="barbershop-card__name">{{ shop.name }}</h3>

            <!-- Address -->
            <div class="barbershop-card__info">
              <FIcon name="map-pin" :size="20" class="barbershop-card__icon" />
              <p class="barbershop-card__address">{{ shop.address }}</p>
            </div>

            <!-- Schedule -->
            <div class="barbershop-card__schedule">
              <FIcon name="calendar" :size="20" class="barbershop-card__icon" />
              <div class="barbershop-card__schedule-times">
                <div class="barbershop-card__schedule-item">
                  <span class="barbershop-card__schedule-day">{{ shop.scheduleWeekday.split(':')[0] }}</span>
                  <span class="barbershop-card__schedule-time">{{ shop.scheduleWeekday.split(':').slice(1).join(':').trim() }}</span>
                </div>
                <div class="barbershop-card__schedule-item">
                  <span class="barbershop-card__schedule-day">{{ shop.scheduleWeekend.split(':')[0] }}</span>
                  <span class="barbershop-card__schedule-time">{{ shop.scheduleWeekend.split(':').slice(1).join(':').trim() }}</span>
                </div>
                <div class="barbershop-card__schedule-item">
                  <span class="barbershop-card__schedule-day">{{ shop.scheduleSunday.split(':')[0] }}</span>
                  <span class="barbershop-card__schedule-time">{{ shop.scheduleSunday.split(':').slice(1).join(':').trim() }}</span>
                </div>
              </div>
            </div>

            <!-- Contact Buttons -->
            <div v-if="shop.phone || shop.whatsapp" class="barbershop-card__contacts">
              <a
                v-if="shop.phone"
                :href="`tel:${shop.phone}`"
                class="barbershop-card__contact-button"
                :aria-label="`Call ${shop.phone}`"
              >
                <span class="barbershop-card__contact-number">{{ shop.phone.replace('+351 ', '') }}</span>
                <span class="barbershop-card__contact-icon">
                  <FIcon name="phone" :size="20" />
                </span>
              </a>
              <a
                v-if="shop.whatsapp"
                :href="`https://wa.me/${shop.whatsapp.replace(/\s/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="barbershop-card__contact-button barbershop-card__contact-button--whatsapp"
                :aria-label="`WhatsApp ${shop.whatsapp}`"
              >
                <span class="barbershop-card__contact-icon">
                  <FIcon name="whatsapp" :size="20" />
                </span>
                <span class="barbershop-card__contact-number">{{ shop.whatsapp.replace('+351 ', '') }}</span>
              </a>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="barbershop-card__footer">
            <a
              :href="shop.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="barbershop-card__button barbershop-card__button--secondary"
            >
              <FIcon name="map-pin" :size="18" />
              <span>{{ t('barbershops.viewMap') }}</span>
            </a>
            <a
              :href="shop.bookingUrl"
              class="barbershop-card__button barbershop-card__button--primary"
            >
              <FIcon name="calendar" :size="18" />
              <span>{{ t('barbershops.bookNow') }}</span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.barbershops-section {
  padding: $spacing-6xl 0;
  background-color: var(--section-background);

  &__header {
    text-align: center;
    margin-bottom: $spacing-5xl;
  }

  &__label {
    display: inline-block;
    padding: $spacing-xs $spacing-md;
    background: $gradient-brand-dark-red;
    color: $white;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: $radius-sm;
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: $spacing-md;
    color: var(--page-color);

    @media (max-width: $breakpoint-mobile) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: var(--text-muted);
    max-width: 600px;
    margin: 0 auto;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
    gap: 48px;
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: $breakpoint-mobile) {
      gap: $spacing-lg;
    }
  }
}

.barbershop-card {
  background: var(--footer-background);
  border-radius: $radius-xl;
  overflow: hidden;
  box-shadow: $shadow-md;
  transition: transform $transition-base, box-shadow $transition-base;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-xl, 0 0 0 1px rgba($brand-red-dark, 0.1);
  }

  &__carousel {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
    background: $gray-1;
  }

  &__images {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-shrink: 0;
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba($black, 0.5);
    color: $white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background $transition-fast;
    z-index: 10;

    &:hover {
      background: rgba($brand-red-dark, 0.9);
    }

    &--prev {
      left: $spacing-md;
    }

    &--next {
      right: $spacing-md;
    }
  }

  &__dots {
    position: absolute;
    bottom: $spacing-md;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: $spacing-sm;
    z-index: 10;
  }

  &__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba($white, 0.5);
    border: none;
    cursor: pointer;
    transition: background $transition-fast, transform $transition-fast;

    &:hover {
      background: rgba($white, 0.8);
      transform: scale(1.2);
    }

    &--active {
      background: $brand-red-dark;
      transform: scale(1.2);
    }
  }

  &__content {
    padding: $spacing-2xl $spacing-2xl $spacing-lg;
  }

  &__name {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--page-color);
    margin-bottom: $spacing-lg;
  }

  &__info,
  &__schedule {
    display: flex;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__icon {
    color: $brand-red-dark;
    flex-shrink: 0;
  }

  &__address {
    color: var(--text-muted);
    line-height: 1.6;
    min-height: 52px;
    font-size: 18px;
  }

  &__contacts {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__schedule-times {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    flex: 1;
  }

  &__schedule-item {
    display: flex;
    justify-content: space-between;
    gap: $spacing-lg;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid var(--surface-border);
    transition: border-color $transition-base;
  }

  &__schedule-day {
    color: var(--text-muted);
    font-size: 18px;
  }

  &__schedule-time {
    color: var(--page-color);
    font-size: 18px;
    font-weight: 600;
  }

  &__footer {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-xl $spacing-2xl;
    border-top: 1px solid var(--border-color);
    background: var(--section-background);

    @media (max-width: $breakpoint-tablet) {
      flex-direction: column;
    }
  }

  &__contact-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    border: 2px solid $brand-red-dark;
    border-radius: 22px;
    overflow: hidden;
    transition: all $transition-base;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba($brand-red-dark, 0.2);
    }

    &--whatsapp {
      border-color: #25D366;

      &:hover {
        box-shadow: 0 4px 8px rgba(#25D366, 0.2);
      }

      .barbershop-card__contact-icon {
        background: #25D366;
        border-color: #25D366;
      }

      .barbershop-card__contact-number {
        color: #25D366;
        background: rgba(#25D366, 0.1);
      }
    }
  }

  &__contact-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: $brand-red-dark;
    color: $white;
    flex-shrink: 0;

    svg {
      flex-shrink: 0;
    }
  }

  &__contact-number {
    padding: 0 $spacing-md;
    color: $brand-red-dark;
    background: rgba($brand-red-dark, 0.1);
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    height: 44px;
    display: flex;
    align-items: center;
  }

  &__button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-sm;
    padding: $spacing-md $spacing-lg;
    border-radius: $radius-md;
    font-weight: 600;
    text-decoration: none;
    transition: all $transition-base;
    cursor: pointer;

    &--primary {
      position: relative;
      background: $gradient-brand-dark-red;
      color: $white;
      border: none;
      overflow: hidden;
      z-index: 1;

      // Inverted gradient layer (hidden by default)
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #8b0000 0%, #e63946 100%); // Inverted dark gradient
        opacity: 0;
        transition: opacity $transition-base;
        z-index: -1;
      }

      &:hover {
        box-shadow: $shadow-glow-red;
        transform: translateY(-2px);

        &::before {
          opacity: 1;
        }
      }

      &:active {
        transform: translateY(0);
      }
    }

    &--secondary {
      background: transparent;
      color: var(--page-color);
      border: 2px solid $brand-red-dark;

      &:hover {
        background: rgba($brand-red-dark, 0.1);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
