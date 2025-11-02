<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import MediaPreviewDialog from '@/components/ui/MediaPreviewDialog.vue'

/**
 * GalleryScrollSection - Infinite scrolling gallery with 3 rows
 * Row 1: Scrolls left on page scroll
 * Row 2: Scrolls right on page scroll
 * Row 3: Scrolls left on page scroll
 */

const { t } = useLocale()

// Media preview state
const isPreviewOpen = ref(false)
const previewMediaType = ref<'image' | 'video'>('image')
const previewMediaSrc = ref('')
const previewMediaAlt = ref('')

const openPreview = (type: string, src: string, alt: string) => {
  previewMediaType.value = type as 'image' | 'video'
  previewMediaSrc.value = src
  previewMediaAlt.value = alt
  isPreviewOpen.value = true
}

const closePreview = () => {
  isPreviewOpen.value = false
}

// Import all gallery images and videos dynamically
const getImageUrl = (name: string) => {
  return new URL(`../../assets/img/gallery/${name}`, import.meta.url).href
}

const galleryItems = [
  // Images
  ...Array.from({ length: 42 }, (_, i) => ({
    type: 'image',
    src: getImageUrl(`gallery-${String(i + 1).padStart(2, '0')}.jpeg`),
    alt: `Gallery image ${i + 1}`
  })),
  // Videos
  ...Array.from({ length: 5 }, (_, i) => ({
    type: 'video',
    src: getImageUrl(`gallery-video-${String(i + 1).padStart(2, '0')}.mp4`),
    alt: `Gallery video ${i + 1}`
  }))
]

// Distribute items across 3 rows - divide into thirds
const thirdIndex = Math.ceil(galleryItems.length / 3)
const row1Items = galleryItems.slice(0, thirdIndex)
const row2Items = galleryItems.slice(thirdIndex, thirdIndex * 2)
const row3Items = galleryItems.slice(thirdIndex * 2)

const row1Ref = ref<HTMLElement | null>(null)
const row2Ref = ref<HTMLElement | null>(null)
const row3Ref = ref<HTMLElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (!sectionRef.value || !row1Ref.value || !row2Ref.value || !row3Ref.value) return

  const rect = sectionRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Calculate continuous progress
  let progress = 0

  if (rect.top <= 0 && rect.bottom >= windowHeight) {
    // Section is in viewport - calculate progress
    const totalDistance = rect.height - windowHeight
    const scrolled = -rect.top
    progress = scrolled / totalDistance
  } else if (rect.bottom < windowHeight) {
    // Section has passed - keep at final position
    progress = 1
  }

  // Get half width (one set of items) for smooth looping
  const row1HalfWidth = row1Ref.value.scrollWidth / 2
  const row2HalfWidth = row2Ref.value.scrollWidth / 2
  const row3HalfWidth = row3Ref.value.scrollWidth / 2

  // Use a continuous loop without modulo jump
  // Multiply progress by a large number to scroll through multiple cycles
  const cycles = 2 // Number of complete loops during scroll

  // Row 1: moves left continuously
  const scroll1 = (progress * row1HalfWidth * cycles) % row1HalfWidth
  row1Ref.value.style.transform = `translate3d(-${scroll1}px, 0px, 0px)`

  // Row 2: moves right continuously
  const scroll2 = (progress * row2HalfWidth * cycles) % row2HalfWidth
  row2Ref.value.style.transform = `translate3d(-${row2HalfWidth - scroll2}px, 0px, 0px)`

  // Row 3: moves left continuously
  const scroll3 = (progress * row3HalfWidth * cycles) % row3HalfWidth
  row3Ref.value.style.transform = `translate3d(-${scroll3}px, 0px, 0px)`
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <section ref="sectionRef" class="gallery-scroll">
    <div class="gallery-scroll__header-wrapper">
      <div class="gallery-scroll__header-sticky">
        <div class="gallery-scroll__header">
          <div class="gallery-scroll__header-container container">
            <div class="gallery-scroll__label">
              {{ t('gallery.label') }}
            </div>
            <h2 class="gallery-scroll__title text-h2">
              {{ t('gallery.title') }}
            </h2>
            <p class="gallery-scroll__subtitle text-body-lg">
              {{ t('gallery.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="gallery-scroll__pin-spacer">
      <div class="gallery-scroll__sticky">
        <div class="gallery-scroll__row-container">
          <!-- Row 1: Scrolls left (duplicated for infinite scroll) -->
          <div ref="row1Ref" class="gallery-scroll__row gallery-scroll__row--left">
            <div
              v-for="(item, index) in [...row1Items, ...row1Items]"
              :key="`row1-${index}`"
              class="gallery-scroll__item"
              @click="openPreview(item.type, item.src, item.alt)"
            >
              <video
                v-if="item.type === 'video'"
                :src="item.src"
                class="gallery-scroll__media"
                muted
                loop
                playsinline
                @mouseenter="(e) => (e.target as HTMLVideoElement).play()"
                @mouseleave="(e) => (e.target as HTMLVideoElement).pause()"
              />
              <img
                v-else
                :src="item.src"
                :alt="item.alt"
                class="gallery-scroll__media"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Row 2: Scrolls right (duplicated for infinite scroll) -->
          <div ref="row2Ref" class="gallery-scroll__row gallery-scroll__row--right">
            <div
              v-for="(item, index) in [...row2Items, ...row2Items]"
              :key="`row2-${index}`"
              class="gallery-scroll__item"
              @click="openPreview(item.type, item.src, item.alt)"
            >
              <video
                v-if="item.type === 'video'"
                :src="item.src"
                class="gallery-scroll__media"
                muted
                loop
                playsinline
                @mouseenter="(e) => (e.target as HTMLVideoElement).play()"
                @mouseleave="(e) => (e.target as HTMLVideoElement).pause()"
              />
              <img
                v-else
                :src="item.src"
                :alt="item.alt"
                class="gallery-scroll__media"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Row 3: Scrolls left (duplicated for infinite scroll) -->
          <div ref="row3Ref" class="gallery-scroll__row gallery-scroll__row--left">
            <div
              v-for="(item, index) in [...row3Items, ...row3Items]"
              :key="`row3-${index}`"
              class="gallery-scroll__item"
              @click="openPreview(item.type, item.src, item.alt)"
            >
              <video
                v-if="item.type === 'video'"
                :src="item.src"
                class="gallery-scroll__media"
                muted
                loop
                playsinline
                @mouseenter="(e) => (e.target as HTMLVideoElement).play()"
                @mouseleave="(e) => (e.target as HTMLVideoElement).pause()"
              />
              <img
                v-else
                :src="item.src"
                :alt="item.alt"
                class="gallery-scroll__media"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Media Preview Dialog -->
    <MediaPreviewDialog
      :is-open="isPreviewOpen"
      :media-type="previewMediaType"
      :media-src="previewMediaSrc"
      :media-alt="previewMediaAlt"
      @close="closePreview"
    />
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.gallery-scroll {
  width: 100%;
  position: relative;
  padding: $spacing-4xl 0;

  @include element('header') {
    // No margin needed as spacing is handled by sticky wrapper
  }

  @include element('header-container') {
    @include container;
    text-align: center;
  }

  @include element('label') {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2.5px;
    background: $gradient-brand-dark-red;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-transform: uppercase;
    margin-bottom: $spacing-sm;
  }

  @include element('title') {
    color: var(--text-color-primary);
    margin-bottom: $spacing-md;
  }

  @include element('subtitle') {
    color: var(--text-color-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  @include element('pin-spacer') {
    // This creates the scroll height - taller = more scroll distance
    height: 300vh;
    position: relative;

    @include tablet {
      height: 350vh;
    }

    @include desktop {
      height: 250vh;
    }
  }

  @include element('header-wrapper') {
    position: relative;
  }

  @include element('header-sticky') {
    position: sticky;
    top: 0;
    z-index: 2;
    background: var(--background-primary);
  }

  @include element('sticky') {
    @include container;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba($brand-red-dark, 1) 0%, rgba($brand-red-dark, 0.8) 30%, transparent 70%);
      -webkit-filter: blur(110px);
      filter: blur(110px);
      z-index: -1;
      // Force hardware acceleration for iOS
      transform: translate(-50%, -50%) translateZ(0);
      pointer-events: none;
      opacity: 0.8;

      @include tablet {
        width: 600px;
        height: 600px;
        -webkit-filter: blur(130px);
        filter: blur(130px);
      }

      @include desktop {
        width: 700px;
        height: 700px;
        -webkit-filter: blur(150px);
        filter: blur(150px);
      }
    }
  }

  @include element('row-container') {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    width: 100%;
    justify-content: center;
  }

  @include element('row') {
    display: flex;
    gap: $spacing-lg;
    will-change: transform;
    align-items: baseline;

    @include modifier('right') {
      // Initial position will be set by JavaScript
      transform: translate3d(0, 0, 0);
    }

    @include modifier('left') {
      // Initial position will be set by JavaScript
      transform: translate3d(0, 0, 0);
    }
  }

  @include element('item') {
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: var(--surface-border);
    cursor: pointer;
    transition: transform $transition-base;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.98);
    }

    @include tablet {
      width: 200px;
      height: 200px;
    }

    @include desktop {
      width: 240px;
      height: 240px;
    }
  }

  @include element('media') {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
