<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  isOpen: boolean
  mediaType: 'image' | 'video'
  mediaSrc: string
  mediaAlt?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const dialogRef = ref<HTMLDivElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

const closeDialog = () => {
  emit('close')
}

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === dialogRef.value) {
    closeDialog()
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeDialog()
  }
}

watch(() => props.isOpen, (newValue) => {
  if (!import.meta.client) return

  if (newValue) {
    document.body.style.overflow = 'hidden'
    // Auto-play video when dialog opens
    if (props.mediaType === 'video' && videoRef.value) {
      videoRef.value.play()
    }
  } else {
    document.body.style.overflow = ''
    // Pause video when dialog closes
    if (props.mediaType === 'video' && videoRef.value) {
      videoRef.value.pause()
    }
  }
})

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeyDown)
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="dialog-fade">
      <div
        v-if="isOpen"
        ref="dialogRef"
        class="media-preview-dialog"
        @click="handleBackdropClick"
      >
        <div class="media-preview-dialog__content">
          <button
            class="media-preview-dialog__close"
            @click="closeDialog"
            aria-label="Close preview"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="media-preview-dialog__media-wrapper">
            <video
              v-if="mediaType === 'video'"
              ref="videoRef"
              :src="mediaSrc"
              class="media-preview-dialog__media"
              controls
              loop
              playsinline
            />
            <img
              v-else
              :src="mediaSrc"
              :alt="mediaAlt"
              class="media-preview-dialog__media"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use '~/assets/styles/variables' as *;
@use '~/assets/styles/mixins' as *;

.media-preview-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.95);
  padding: $spacing-md;

  @include tablet {
    padding: $spacing-xl;
  }

  @include desktop {
    padding: $spacing-2xl;
  }

  @include element('content') {
    position: relative;
    width: 100%;
    max-width: 1200px;
    max-height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @include tablet {
      max-height: 90vh;
    }
  }

  @include element('close') {
    position: absolute;
    top: -$spacing-sm;
    right: -$spacing-sm;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #000;
    transition: all $transition-base;
    z-index: 10;

    @include tablet {
      width: 48px;
      height: 48px;
      top: -$spacing-md;
      right: -$spacing-md;
    }

    @include desktop {
      top: -$spacing-lg;
      right: -$spacing-lg;
    }

    &:hover {
      background: rgba(255, 255, 255, 1);
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 24px;
      height: 24px;
      stroke-width: 2.5;

      @include tablet {
        width: 26px;
        height: 26px;
      }
    }
  }

  @include element('media-wrapper') {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include element('media') {
    max-width: 100%;
    max-height: 85vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

    @include tablet {
      max-height: 90vh;
      border-radius: 12px;
    }
  }
}

// Transition animations
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity $transition-base;

  .media-preview-dialog__content {
    transition: transform $transition-base;
  }
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;

  .media-preview-dialog__content {
    transform: scale(0.9);
  }
}

.dialog-fade-enter-to,
.dialog-fade-leave-from {
  opacity: 1;

  .media-preview-dialog__content {
    transform: scale(1);
  }
}
</style>
