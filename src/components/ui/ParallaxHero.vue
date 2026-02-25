<script setup lang="ts">
import { computed } from 'vue'
import { useWindowScroll, useWindowSize, usePreferredReducedMotion } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  title: string
  subtitle: string
  backgroundImageUrl: string
  ctaText?: string
}>(), {
  ctaText: 'Explore'
})

const emit = defineEmits<{
  ctaClick: []
}>()

const { y } = useWindowScroll()
const { height: windowHeight } = useWindowSize()
const prefersReducedMotion = usePreferredReducedMotion()

// Calculate progress: 0 when top of page, 1 when scrolled down by 1 viewport height
const progress = computed(() => {
  if (!windowHeight.value) return 0
  return Math.min(Math.max(y.value / windowHeight.value, 0), 1)
})

// Parallax and fade transforms
const backgroundStyle = computed(() => ({
  transform: prefersReducedMotion.value === 'reduce' 
    ? 'translateY(0)' 
    : `translateY(${progress.value * 50}%)`
}))

const contentStyle = computed(() => ({
  opacity: prefersReducedMotion.value === 'reduce' 
    ? 1 
    : Math.max(1 - (progress.value / 0.8), 0),
  transform: prefersReducedMotion.value === 'reduce'
    ? 'translateY(0) scale(1)'
    : `translateY(${progress.value * 100}%) scale(${1 - progress.value * 0.1})`
}))
</script>

<template>
  <section 
    class="relative w-full h-screen overflow-hidden bg-white"
  >
    <!-- Background Image Layer with Parallax Y offset -->
    <div 
      class="absolute inset-0 w-full h-full pointer-events-none"
      :style="backgroundStyle"
    >
      <div class="absolute inset-0 bg-white/30 z-10" /> <!-- Light Overlay -->
      <div class="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent z-10" /> <!-- Gradient Overlays -->
      <img
        :src="backgroundImageUrl"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Foreground Content Layer -->
    <div 
      class="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center"
      :style="contentStyle"
    >
      <div class="fade-up-enter" style="animation-delay: 0.2s; opacity: 0;">
        <span class="inline-block py-1 px-3 rounded-full bg-neutral-900/10 backdrop-blur-md border border-neutral-900/20 text-neutral-800 text-sm font-medium tracking-widest uppercase mb-6">
          Welcome to the Future
        </span>
      </div>

      <h1 
        class="fade-up-enter text-5xl md:text-7xl lg:text-8xl font-black text-neutral-900 tracking-tighter mb-6 max-w-5xl text-balance"
        style="animation-delay: 0.4s; opacity: 0;"
      >
        {{ title }}
      </h1>

      <p 
        class="fade-up-enter text-xl md:text-2xl text-neutral-600 max-w-2xl font-light mb-10 text-balance"
        style="animation-delay: 0.6s; opacity: 0;"
      >
        {{ subtitle }}
      </p>

      <button
        @click="emit('ctaClick')"
        class="fade-up-enter group relative px-8 py-4 bg-brand-green text-white rounded-full font-bold uppercase tracking-wider overflow-hidden shadow-sm hover:bg-brand-green-hover hover:shadow-md active:scale-95 transition-all"
        style="animation-delay: 0.8s; opacity: 0;"
      >
        <span class="relative z-10 flex items-center gap-2">
          {{ ctaText }}
          <ChevronDown :size="18" class="group-hover:translate-y-1 transition-transform" aria-hidden="true" />
        </span>
      </button>
    </div>

    <!-- Scroll indicator -->
    <div
      class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-neutral-900/50"
      :style="{ opacity: contentStyle.opacity, transition: prefersReducedMotion === 'reduce' ? 'none' : 'opacity 1s 1.5s' }"
    >
      <span class="text-xs uppercase tracking-widest">Scroll</span>
      <div class="w-[30px] h-[50px] rounded-full border-2 border-neutral-900/20 flex justify-center p-2 relative">
        <div
          class="w-1.5 h-3 rounded-full bg-neutral-900/50"
          :class="{ 'scroll-indicator-anim': prefersReducedMotion !== 'reduce' }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-up-enter {
  animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-indicator-anim {
  animation: scrollBounce 1.5s ease-in-out infinite;
}

@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(15px);
    opacity: 0;
  }
}
</style>
