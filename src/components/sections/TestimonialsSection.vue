<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FIcon from '@/components/ui/FIcon.vue'
import QuoteIcon from '@/assets/icons/quote.svg?component'
import { testimonials } from '@/data/testimonials'

/**
 * TestimonialsSection - Customer testimonials and reviews
 */
const sectionRef = ref<HTMLElement | null>(null)
const selectedTestimonial = ref(0)

onMounted(() => {
  if (sectionRef.value) {
    sectionRef.value.classList.add('fade-in')
  }
})

/**
 * Render star rating
 */
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}

/**
 * Select a testimonial to display in the featured card
 */
const selectTestimonial = (index: number) => {
  selectedTestimonial.value = index
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
          <p class="testimonials__subtitle">DEPOIMENTOS</p>

          <h2 class="testimonials__heading text-h2">
            O que estão dizendo sobre a Fellas
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

        <!-- Center: Customer Avatars List -->
        <div class="testimonials__list">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonials__list-item"
            :class="{ 'testimonials__list-item--active': selectedTestimonial === index }"
            @click="selectTestimonial(index)"
          >
            <img
              :src="testimonial.avatarUrl"
              :alt="testimonial.customerName"
              class="testimonials__avatar"
            />
            <div class="testimonials__info">
              <span class="testimonials__name">{{ testimonial.customerName }}</span>
              <span class="testimonials__date">{{ testimonial.date }}</span>
            </div>
          </button>
        </div>

        <!-- Right: Featured Testimonial Card -->
        <div class="testimonials__featured">
          <QuoteIcon class="testimonials__quote-icon" />

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

  @include element('layout') {
    display: grid;
    gap: $spacing-4xl;
    align-items: flex-start;

    @include tablet {
      grid-template-columns: 1fr auto 1.2fr;
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
  }

  @include element('heading') {
    color: $white;
    margin-bottom: $spacing-lg;
    line-height: 1.2;
  }

  @include element('navigation') {
    display: flex;
    gap: $spacing-md;
    margin-top: $spacing-lg;
  }

  @include element('nav-button') {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid rgba($white, 0.2);
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      border-color: $brand-red;
      background-color: rgba($brand-red, 0.1);
    }

    @include modifier('active') {
      background-color: $brand-red;
      border-color: $brand-red;

      &:hover {
        background-color: $brand-red-dark;
      }
    }
  }

  @include element('list') {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;
    padding: $spacing-lg 0;
  }

  @include element('list-item') {
    display: flex;
    align-items: center;
    gap: $spacing-lg;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    transition: all $transition-base;

    &:hover {
      .testimonials__avatar {
        transform: scale(1.05);
      }

      .testimonials__name {
        color: $white;
      }
    }

    @include modifier('active') {
      .testimonials__avatar {
        border-color: $brand-red;
        box-shadow: 0 0 0 3px rgba($brand-red, 0.3);
      }

      .testimonials__name {
        color: $brand-red;
      }

      .testimonials__date {
        color: $brand-red;
        opacity: 0.8;
      }
    }
  }

  @include element('avatar') {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid transparent;
    transition: all $transition-base;
    flex-shrink: 0;
  }

  @include element('info') {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  @include element('name') {
    font-size: 16px;
    font-weight: 600;
    color: $gray-6;
    transition: all $transition-base;
  }

  @include element('date') {
    font-size: 13px;
    color: $gray-5;
    transition: all $transition-base;
  }

  @include element('featured') {
    background: $gray-2;
    border-radius: $radius-lg;
    padding: $spacing-3xl;
    position: relative;

    @include tablet {
      padding: $spacing-4xl;
    }
  }

  @include element('quote-icon') {
    color: $brand-red;
    margin-bottom: $spacing-xl;
  }

  @include element('comment') {
    color: $gray-7;
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
    color: $gray-5 !important;

    @include modifier('filled') {
      color: #ffc107 !important;
    }
  }
}
</style>
