<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Maximize2, X } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'
import { cn } from '@/lib/utils'

export interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<{
  images: GalleryImage[]
  title?: string
  subtitle?: string
  class?: string
}>(), {
  title: 'Our Work',
  subtitle: 'Examples of our craftsmanship.',
  class: ''
})

const selectedImage = ref<GalleryImage | null>(null)
const previousFocusRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

watch(selectedImage, async (newVal) => {
  if (newVal) {
    previousFocusRef.value = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButtonRef.value?.focus()
  } else {
    document.body.style.overflow = 'unset'
    previousFocusRef.value?.focus()
    previousFocusRef.value = null
  }
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (!selectedImage.value) return
  if (e.key === 'Escape') {
    selectedImage.value = null
    return
  }
  if (e.key !== 'Tab') return
  const dialog = document.getElementById('photo-gallery-dialog')
  if (!dialog) return
  const focusable = dialog.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  if (focusable.length === 0) return

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  
  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault()
      last?.focus()
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
  }
}

watch(selectedImage, (newVal) => {
  if (newVal) {
    window.addEventListener('keydown', handleKeyDown)
  } else {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry?.isIntersecting && !isVisible.value) {
    isVisible.value = true
  }
}, { threshold: 0.1 })
</script>

<template>
  <section :class="cn('py-24 px-4 relative', props.class)" ref="sectionRef">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 
          class="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4 transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          {{ title }}
        </h2>
        <p 
          class="text-xl text-neutral-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
        <div
          v-for="(img, index) in images"
          :key="img.id"
          role="listitem"
          class="relative group aspect-square sm:aspect-4/3 rounded-3xl overflow-hidden shadow-xl bg-white border border-neutral-200 transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'"
          :style="{ transitionDelay: `${index * 100 + 300}ms` }"
        >
          <button
            type="button"
            @click="selectedImage = img"
            class="absolute inset-0 w-full h-full cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-green/50 focus:ring-offset-2 focus:ring-offset-white rounded-3xl"
            :aria-label="`View ${img.title || img.alt} in lightbox`"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              loading="lazy"
              decoding="async"
            />
            <span class="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
              <span class="transform translate-y-4 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-300 block">
                <span class="flex items-center justify-between mb-2">
                  <span v-if="img.title" class="text-xl font-bold text-white tracking-wide">
                    {{ img.title }}
                  </span>
                  <span class="bg-white/20 backdrop-blur-md p-2 rounded-full text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 delay-100 inline-flex">
                    <Maximize2 :size="18" aria-hidden="true" />
                  </span>
                </span>
                <span v-if="img.description" class="text-sm text-neutral-200 line-clamp-2 font-light block">
                  {{ img.description }}
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedImage"
          id="photo-gallery-dialog"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="selectedImage.title ? 'lightbox-title' : undefined"
          :aria-label="selectedImage.title ? undefined : selectedImage.alt"
          :aria-describedby="selectedImage.description ? 'lightbox-desc' : undefined"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
          @click="selectedImage = null"
        >
          <button
            ref="closeButtonRef"
            type="button"
            class="absolute top-6 right-6 p-3 bg-white hover:bg-neutral-100 rounded-full text-neutral-900 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:ring-offset-2 focus:ring-offset-white shadow-lg"
            @click.stop="selectedImage = null"
            aria-label="Close lightbox"
          >
            <X :size="24" aria-hidden="true" />
          </button>

          <Transition
            appear
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 translate-y-5"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 translate-y-5"
          >
            <div
              v-if="selectedImage"
              class="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              @click.stop
            >
              <div class="relative w-full h-full max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex justify-center items-center">
                <img
                  :src="selectedImage.src"
                  :alt="selectedImage.alt"
                  class="w-full h-full object-contain bg-black"
                />
              </div>

              <div v-if="selectedImage.title || selectedImage.description" class="w-full mt-6 text-center">
                <h3 v-if="selectedImage.title" id="lightbox-title" class="text-2xl font-bold text-white mb-2">
                  {{ selectedImage.title }}
                </h3>
                <p v-if="selectedImage.description" id="lightbox-desc" class="text-neutral-400 max-w-2xl mx-auto">
                  {{ selectedImage.description }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

  </section>
</template>
