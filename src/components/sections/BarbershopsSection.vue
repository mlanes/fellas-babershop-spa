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
  instagram?: string
  facebook?: string
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
    instagram: 'https://www.instagram.com/fellasbarbersalameda',
    facebook: 'https://www.facebook.com/FellasBarberAlameda',
    scheduleWeekday: 'Seg - Sex: 09:00 - 19:00',
    scheduleWeekend: 'Sábado e Feriados: 09:00 - 17:00',
    scheduleSunday: 'Domingo: Fechado',
    mapsUrl: 'https://maps.app.goo.gl/D83DuiVBsqQ4mith6',
    bookingUrl: 'https://sites.appbarber.com.br/fellasbarbersho-auei',
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
    instagram: 'https://www.instagram.com/fellasbarber2.pt?igsh=MW',
    facebook: 'https://www.facebook.com/people/Fellas-Barber-Premium-II/61562815660848/?rdid=nEF4vgUgQpGM7Q6g&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Eky6MhsaA%2F%3Fmibexti',
    scheduleWeekday: 'Seg - Sex: 10:00 - 20:00',
    scheduleWeekend: 'Sábado e Feriados: 10:00 - 18:00',
    scheduleSunday: 'Domingo: Fechado',
    mapsUrl: 'https://maps.app.goo.gl/ykdUubmgE2FxJQph9',
    bookingUrl: 'https://sites.appbarber.com.br/fellasbarberpre-81lr',
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
const intervals = ref<Record<string, ReturnType<typeof setInterval> | null>>({
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
  }, 400)

  resetAutoPlay(shopId, totalImages)
}

const prevImage = (shopId: string, totalImages: number) => {
  if (isTransitioning.value[shopId]) return

  isTransitioning.value[shopId] = true
  currentImageIndex.value[shopId] = (currentImageIndex.value[shopId] - 1 + totalImages) % totalImages

  setTimeout(() => {
    isTransitioning.value[shopId] = false
  }, 400)

  resetAutoPlay(shopId, totalImages)
}

const goToImage = (shopId: string, index: number, totalImages: number) => {
  if (isTransitioning.value[shopId] || currentImageIndex.value[shopId] === index) return

  isTransitioning.value[shopId] = true
  currentImageIndex.value[shopId] = index

  setTimeout(() => {
    isTransitioning.value[shopId] = false
  }, 400)

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
  <section id="barbershops" class="barbershops-section">
    <div class="container">
      <!-- Section Header -->
      <div class="barbershops-section__header">
        <span class="barbershops-section__label">{{ t('barbershops.label') }}</span>
        <h2 class="barbershops-section__title text-h2">{{ t('barbershops.title') }}</h2>
        <p class="barbershops-section__subtitle text-body-lg">{{ t('barbershops.subtitle') }}</p>
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
                loading="lazy"
              />
            </div>

            <!-- Navigation Arrows -->
            <button
              class="barbershop-card__nav barbershop-card__nav--prev"
              @click="prevImage(shop.id, shop.images.length)"
              aria-label="Previous image"
            >
              <FIcon name="chevron-left" :size="20" />
            </button>
            <button
              class="barbershop-card__nav barbershop-card__nav--next"
              @click="nextImage(shop.id, shop.images.length)"
              aria-label="Next image"
            >
              <FIcon name="chevron-right" :size="20" />
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
            <div v-if="shop.phone || shop.whatsapp || shop.instagram || shop.facebook" class="barbershop-card__contacts">
              <a
                v-if="shop.phone"
                :href="`tel:${shop.phone}`"
                class="barbershop-card__contact-icon-button"
                :aria-label="`Call ${shop.phone}`"
              >
                <FIcon name="phone" :size="20" />
              </a>
              <a
                v-if="shop.whatsapp"
                :href="`https://wa.me/${shop.whatsapp.replace(/\s/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="barbershop-card__contact-icon-button barbershop-card__contact-icon-button--whatsapp"
                :aria-label="`WhatsApp ${shop.whatsapp}`"
              >
                <FIcon name="whatsapp" :size="20" />
              </a>
              <a
                v-if="shop.instagram"
                :href="shop.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="barbershop-card__contact-icon-button barbershop-card__contact-icon-button--instagram"
                :aria-label="`Instagram ${shop.name}`"
              >
                <FIcon name="instagram" :size="20" />
              </a>
              <a
                v-if="shop.facebook"
                :href="shop.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="barbershop-card__contact-icon-button barbershop-card__contact-icon-button--facebook"
                :aria-label="`Facebook ${shop.name}`"
              >
                <FIcon name="facebook" :size="20" />
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
  position: relative;
  padding: $spacing-6xl 0;
  background-color: var(--section-background);
  overflow: hidden;

  // Bottom blur (centered)
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba($brand-red-dark, 0.8) 0%, transparent 70%);
    filter: blur(200px);
    -webkit-filter: blur(200px);
    z-index: 0;
    pointer-events: none;
    transform: translate(-50%, 50%);
    animation: pulse-blur-bottom 6s ease-in-out infinite;
    animation-delay: 3s; // Offset from the shared blur

    @include tablet {
      width: 800px;
      height: 800px;
      filter: blur(250px);
      -webkit-filter: blur(250px);
    }
  }

  @keyframes pulse-blur-bottom {
    0%, 100% {
      opacity: 0.8;
      transform: translate(-50%, 50%) scale(1);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, 50%) scale(1.1);
    }
  }

  > .container {
    position: relative;
    z-index: 1;
  }

  &__header {
    text-align: center;
    margin-bottom: $spacing-5xl;
  }

  &__label {
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    background: $gradient-brand-light-red;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    margin-bottom: $spacing-sm;

    @at-root [data-theme='dark'] & {
      background: $gradient-brand-dark-red;
      background-clip: text;
      -webkit-background-clip: text;
    }
  }

  &__title {
    text-align: center;
    color: var(--text-color-primary);
    margin-bottom: $spacing-md;
  }

  &__subtitle {
    text-align: center;
    color: var(--text-color-secondary);
    margin-bottom: $spacing-4xl;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @include tablet {
      margin-bottom: $spacing-5xl;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
    gap: $spacing-lg;
    margin: 0 auto;
    width: 100%;

    @include tablet {
      gap: 48px;
    }

    @include desktop {
      width: 70%;
    }
  }
}

.barbershop-card {
  background: var(--footer-background);
  border-radius: $radius-xl;
  overflow: hidden;
  transition: transform $transition-base;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
  }

  &__carousel {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: $gray-1;
    border-radius: $radius-lg $radius-lg 0 0;
  }

  &__images {
    display: flex;
    width: 100%;
    height: 100%;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    background: rgba($black, 0.6);
    backdrop-filter: blur(4px);
    color: $white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all $transition-fast;
    z-index: 10;

    &:hover {
      background: rgba($brand-red-dark, 0.95);
      transform: translateY(-50%) scale(1.1);
    }

    &--prev {
      left: $spacing-sm;
    }

    &--next {
      right: $spacing-sm;
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
    padding: $spacing-xl $spacing-xl $spacing-md;
  }

  &__name {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--page-color);
    margin-bottom: $spacing-md;
    display: flex;
    align-items: center;
    gap: $spacing-sm;

    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: $gradient-brand-dark-red;
      border-radius: 2px;
    }
  }

  &__info,
  &__schedule {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
  }

  &__icon {
    color: $brand-red-dark;
    flex-shrink: 0;
    margin-top: 2px;
  }

  &__address {
    color: var(--text-muted);
    line-height: 1.5;
    font-size: 0.875rem;
  }

  &__contacts {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: $spacing-lg;
  }

  &__schedule-times {
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
    flex: 1;
  }

  &__schedule-item {
    display: flex;
    justify-content: space-between;
    gap: $spacing-md;
    padding: $spacing-xs 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--surface-border);
    }
  }

  &__schedule-day {
    color: var(--text-muted);
    font-size: 0.8125rem;
    font-weight: 500;
  }

  &__schedule-time {
    color: var(--page-color);
    font-size: 0.8125rem;
    font-weight: 700;
  }

  &__footer {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-xl;
    border-top: 1px solid var(--border-color);
    background: var(--section-background);

    @media (max-width: $breakpoint-tablet) {
      flex-direction: column;
    }
  }

  &__contact-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    text-decoration: none;
    border: none;
    border-radius: 50%;
    background: $brand-red-dark;
    color: $white;
    transition: all $transition-base;

    &:hover {
      transform: translateY(-2px) scale(1.1);
      box-shadow: 0 4px 12px rgba($brand-red-dark, 0.3);
    }

    @include modifier('whatsapp') {
      background: #25D366;

      &:hover {
        box-shadow: 0 4px 12px rgba(#25D366, 0.3);
      }
    }

    @include modifier('instagram') {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);

      &:hover {
        box-shadow: 0 4px 12px rgba(#dc2743, 0.4);
      }
    }

    @include modifier('facebook') {
      background: #1877F2;

      &:hover {
        box-shadow: 0 4px 12px rgba(#1877F2, 0.4);
      }
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-xs;
    padding: $spacing-md $spacing-lg;
    border-radius: $radius-md;
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    transition: all $transition-base;
    cursor: pointer;

    &--primary {
      position: relative;
      background: $gradient-brand-light-red;
      color: $white;
      border: none;
      overflow: hidden;
      z-index: 1;

      @at-root [data-theme='dark'] & {
        background: $gradient-brand-dark-red;
      }

      // Inverted gradient layer (hidden by default)
      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #c41e3a 0%, #e63946 100%); // Inverted light gradient
        opacity: 0;
        transition: opacity $transition-base;
        z-index: -1;

        @at-root [data-theme='dark'] & {
          background: linear-gradient(90deg, #8b0000 0%, #e63946 100%); // Inverted dark gradient
        }
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
      color: $brand-red-dark;
      border: 2px solid $brand-red-dark;

      &:hover {
        background: rgba($brand-red-dark, 0.1);
        transform: translateY(-2px);
      }
    }
  }
}
</style>
