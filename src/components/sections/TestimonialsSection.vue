<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import QuoteIcon from '@/assets/icons/quote.svg?component'
import { testimonials } from '@/data/testimonials'
import { useLocale } from '@/composables/useLocale'

/**
 * TestimonialsSection - Customer testimonials and reviews
 */
const sectionRef = ref<HTMLElement | null>(null)
const { t } = useLocale()
const selectedTestimonial = ref(0)
let autoRotateInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }

  // Auto-rotate testimonials every 5 seconds
  autoRotateInterval = setInterval(() => {
    nextTestimonial()
  }, 5000)
})

onUnmounted(() => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
  }
})

/**
 * Render star rating
 */
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}

/**
 * Navigate to previous testimonial
 */
const previousTestimonial = () => {
  selectedTestimonial.value =
    selectedTestimonial.value === 0 ? testimonials.length - 1 : selectedTestimonial.value - 1
}

/**
 * Navigate to next testimonial
 */
const nextTestimonial = () => {
  selectedTestimonial.value = (selectedTestimonial.value + 1) % testimonials.length
}
</script>

<template>
  <section ref="sectionRef" id="testemunhos" class="testimonials">
    <div class="testimonials__container container">
      <div class="testimonials__layout">
        <!-- Left Side: Title, Heading and Navigation -->
        <div class="testimonials__left">
          <p class="testimonials__subtitle">{{ t('testimonials.subtitle') }}</p>

          <h2 class="testimonials__heading text-h2">
            {{ t('testimonials.heading') }}
          </h2>

          <div class="testimonials__navigation">
            <button
              class="testimonials__nav-button"
              @click="previousTestimonial"
              aria-label="Anterior"
            >
              <FIcon name="chevron-left" :size="20" />
            </button>
            <button
              class="testimonials__nav-button testimonials__nav-button--active"
              @click="nextTestimonial"
              aria-label="Próximo"
            >
              <FIcon name="chevron-right" :size="20" />
            </button>
          </div>
        </div>

        <!-- Right: Featured Testimonial Card -->
        <div class="testimonials__featured">
					<QuoteIcon class="testimonials__quote-icon" />

          <transition name="testimonial-fade" mode="out-in">
            <div :key="selectedTestimonial" class="testimonials__content">
              <!-- Customer info (mobile only) -->
              <div class="testimonials__featured-info">
                <img
                  :src="testimonials[selectedTestimonial].avatarUrl"
                  :alt="testimonials[selectedTestimonial].customerName"
                  class="testimonials__featured-avatar"
                />
                <div class="testimonials__featured-details">
                  <span class="testimonials__featured-name">{{ testimonials[selectedTestimonial].customerName }}</span>
                  <span class="testimonials__featured-date">{{ testimonials[selectedTestimonial].date }}</span>
                </div>
              </div>

              <p class="testimonials__comment">
                {{ testimonials[selectedTestimonial].testimonialText }}
              </p>

              <div class="testimonials__rating">
                <FIcon
                  v-for="(filled, i) in renderStars(testimonials[selectedTestimonial].rating)"
                  :key="i"
                  :name="filled ? 'star-filled' : 'star'"
                  :size="24"
                  class="testimonials__star"
                  :class="{ 'testimonials__star--filled': filled }"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.testimonials {
  min-height: calc(100vh - $header-height);
  display: flex;
  align-items: center;
  padding: $spacing-6xl 0;
  color: var(--text-color-primary);
  opacity: 0;
  transition: opacity $transition-slow;

  &.fade-in {
    opacity: 1;
  }

  @include element('container') {
    @include container;
  }

  @include element('layout') {
    display: grid;
    gap: $spacing-4xl;
    align-items: flex-start;

    @include desktop {
      grid-template-columns: 1fr 1.5fr;
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
    background: $gradient-brand-dark-red;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
  }

  @include element('heading') {
    color: var(--text-color-primary);
    margin-bottom: $spacing-lg;
    line-height: 1.2;
  }

  @include element('navigation') {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-md;
  }

  @include element('nav-button') {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--surface-background);
    border: 1px solid var(--surface-border);
    border-radius: 50%;
    color: var(--text-color-primary);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $brand-red-dark;
      border-color: $brand-red-dark;
      color: $white;
      transform: scale(1.1);
    }

    @include modifier('disabled') {
      opacity: 0.3;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  @include element('featured') {
    background: var(--surface-background);
    border-radius: $radius-lg;
    padding: $spacing-3xl;
    position: relative;

    @include tablet {
      padding: $spacing-4xl;
    }
  }

  @include element('featured-info') {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  @include element('featured-avatar') {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid $brand-red-dark;
    flex-shrink: 0;
  }

  @include element('featured-details') {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @include element('featured-name') {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color-primary);
  }

  @include element('featured-date') {
    font-size: 13px;
    color: var(--text-color-tertiary);
  }

  @include element('quote-icon') {
    color: $brand-red-dark;
    margin-bottom: $spacing-xl;
  }

  @include element('comment') {
    color: var(--text-color-secondary);
    font-size: 15px;
    line-height: 1.8;
    margin-bottom: $spacing-2xl;

    @include tablet {
      font-size: 16px;
      line-height: 2;
    }
  }

  @include element('rating') {
    display: flex;
    gap: 8px;
  }

  @include element('star') {
    color: var(--text-color-tertiary) !important;

    @include modifier('filled') {
      color: #ffc107 !important;
    }
  }
}

// Testimonial transition
.testimonial-fade-enter-active,
.testimonial-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.testimonial-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.testimonial-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
