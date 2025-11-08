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

// Define media item type
type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt: string
  order: number
}

// Automatically import all gallery images using Vite's glob import
const galleryImages = import.meta.glob('../../assets/img/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default'
})

// Automatically import all gallery videos using Vite's glob import
const galleryVideos = import.meta.glob('../../assets/img/gallery/*.{mp4,webm}', {
  eager: true,
  import: 'default'
})

// Convert the imported images to an array and sort them
const imageItems: MediaItem[] = Object.entries(galleryImages)
  .map(([path, url]) => {
    // Extract filename from path
    const filename = path.split('/').pop() || ''
    // Extract number from filename for sorting (e.g., "gallery-01.jpeg" -> 1)
    const match = filename.match(/gallery-(\d+)/)
    const imageNumber = match ? parseInt(match[1]) : 0

    return {
      type: 'image' as const,
      src: url as string,
      alt: `Gallery image ${imageNumber}`,
      order: imageNumber
    }
  })

// Convert the imported videos to an array
const videoItems: MediaItem[] = Object.entries(galleryVideos)
  .map(([path, url]) => {
    // Extract filename from path
    const filename = path.split('/').pop() || ''
    // Extract number from filename for sorting (e.g., "gallery-01.mp4" -> 1)
    const match = filename.match(/gallery-(\d+)/)
    const videoNumber = match ? parseInt(match[1]) : 0

    return {
      type: 'video' as const,
      src: url as string,
      alt: `Gallery video ${videoNumber}`,
      order: videoNumber
    }
  })

// Combine images and videos, then sort them
const galleryItems = [...imageItems, ...videoItems]
  .sort((a, b) => a.order - b.order) // Sort by number

// Distribute items across 3 rows - divide into thirds
const thirdIndex = Math.ceil(galleryItems.length / 3)
const row1Items = galleryItems.slice(0, thirdIndex)
const row2Items = galleryItems.slice(thirdIndex, thirdIndex * 2)
const row3Items = galleryItems.slice(thirdIndex * 2)

const row1Ref = ref<HTMLElement | null>(null)
const row2Ref = ref<HTMLElement | null>(null)
const row3Ref = ref<HTMLElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)

// Performance: use requestAnimationFrame for smooth updates
let ticking = false

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

  // Clamp progress to prevent going beyond the duplicated items
  // This ensures smooth scrolling without modulo jumps
  const clampedProgress = Math.max(0, Math.min(progress, 0.999))

  // Row 1: moves left - simple linear scroll through one set
  const scroll1 = clampedProgress * row1HalfWidth
  row1Ref.value.style.transform = `translate3d(-${scroll1}px, 0px, 0px)`

  // Row 2: moves right - starts at -halfWidth and moves toward 0
  const scroll2 = clampedProgress * row2HalfWidth
  row2Ref.value.style.transform = `translate3d(-${row2HalfWidth - scroll2}px, 0px, 0px)`

  // Row 3: moves left - same as row 1
  const scroll3 = clampedProgress * row3HalfWidth
  row3Ref.value.style.transform = `translate3d(-${scroll3}px, 0px, 0px)`
}

const onScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      handleScroll()
      ticking = false
    })
    ticking = true
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  handleScroll() // Initial call
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section ref="sectionRef" id="gallery" class="gallery-scroll">
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

  @include element('title') {
    color: var(--text-color-primary);
    margin-bottom: $spacing-md;
  }

  @include element('subtitle') {
    color: var(--text-color-secondary);
    max-width: 600px;
    margin: 0 auto;

    @include desktop {
      margin: 0 auto $spacing-4xl auto;
    }
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
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
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
      -webkit-filter: blur(80px);
      filter: blur(80px);
      z-index: -1;
      // Force hardware acceleration for iOS
      transform: translate(-50%, -50%) translateZ(0);
      pointer-events: none;
      opacity: 0.8;
      animation: pulse-glow 3s ease-in-out infinite;
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

@keyframes pulse-glow {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) translateZ(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) translateZ(0) scale(1.15);
  }
}
</style>
