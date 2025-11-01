<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FLogo from '@/components/ui/FLogo.vue'
import FIcon from '@/components/ui/FIcon.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

/**
 * HeroSection - Full-screen hero section with brand identity and scroll indicator
 */
const { scrollTo } = useSmoothScroll()
const heroRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

const handleScrollClick = () => {
  scrollTo('#sobre')
}

onMounted(() => {
  // Trigger fade-in animation
  if (heroRef.value) {
    heroRef.value.classList.add('fade-in')
  }

  // Start video from second 7 and ensure it plays (iOS Safari fix)
  if (videoRef.value) {
    videoRef.value.currentTime = 7

    // Reset to second 7 when video loops
    videoRef.value.addEventListener('timeupdate', () => {
      if (videoRef.value && videoRef.value.currentTime < 7) {
        videoRef.value.currentTime = 7
      }
    })

    videoRef.value.play().catch(() => {
      // Autoplay failed, video will show poster instead
    })
  }
})
</script>

<template>
  <section id="home" ref="heroRef" class="hero">
    <!-- Background Video -->
    <video
      ref="videoRef"
      class="hero__video"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="@/assets/videos/fellas-barbershop-header-video.webm" type="video/webm" />
      <source src="@/assets/videos/fellas-barbershop-header-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Dark overlay for better text readability -->
    <div class="hero__overlay"></div>

    <div class="hero__container container">
      <div class="hero__content">
        <FLogo size="lg" class="hero__logo" />

        <h1 class="hero__title text-h1">FELLAS BARBERSHOP</h1>

        <p class="hero__tagline text-h5">A SUA BARBEARIA DE CONFIANÇA</p>

        <p class="hero__description text-body-lg">
          Cuidados pessoais de excelência. Combine tradição e inovação em um ambiente acolhedor, com
          barbeiros especializados em estilo e confiança.
        </p>
      </div>

      <button
        class="hero__scroll-indicator"
        aria-label="Scroll to services section"
        @click="handleScrollClick"
      >
        <FIcon name="see-more" :size="28" />
        <span class="hero__scroll-text">Ver Mais</span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $gray-1;
  color: $white;
  overflow: hidden;

  @include element('video') {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  @include element('overlay') {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba($gray-1, 0.7) 0%,
      rgba($gray-1, 0.85) 100%
    );
    z-index: 1;
  }

  @include element('container') {
    @include container;
    position: relative;
    z-index: 2;
    padding-top: $spacing-6xl;
    padding-bottom: $spacing-6xl;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  @include element('content') {
    max-width: 1000px;
    width: 100%;
    opacity: 0;
    animation: fade-in $transition-slow forwards;
    animation-delay: 0.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-md;

    @include tablet {
      gap: $spacing-lg;
    }
  }

  @include element('logo') {
    color: $brand-red;
    height: auto;

    :deep(.f-logo__svg) {
      width: 100px;
      height: auto;
    }
  }

  @include element('title') {
    background: $gradient-brand-1;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.4s;
    opacity: 0;
  }

  @include element('tagline') {
    color: $white;
    font-weight: 600;
    opacity: 0;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.6s;
  }

  @include element('description') {
    color: $gray-7;
    max-width: 600px;
    opacity: 0;
    animation: slide-up $transition-base forwards;
    animation-delay: 0.8s;
  }

  @include element('scroll-indicator') {
    position: absolute;
    bottom: $spacing-lg;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    color: $brand-red;
    cursor: pointer;
    padding: $spacing-sm;
    border-radius: $radius-full;
    transition: all $transition-base;
    opacity: 0;
    animation: fade-in $transition-base forwards, pulse 2s ease-in-out infinite;
    animation-delay: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;

    &:hover {
      transform: translateX(-50%) translateY(-8px);
    }

    &:focus-visible {
      @include focus-indicator;
    }

    @include tablet {
      bottom: $spacing-2xl;
      padding: $spacing-md;
    }
  }

  @include element('scroll-text') {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: $white;

    @include tablet {
      font-size: 1rem;
    }
  }
}

// Fade-in class for root element
.fade-in {
  opacity: 1;
}
</style>
