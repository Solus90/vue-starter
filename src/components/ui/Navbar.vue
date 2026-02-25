<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { Menu, X } from 'lucide-vue-next'

const navLinks = [
  { title: 'Home', href: '#' },
  { title: 'Testimonials', href: '#testimonials' },
  { title: 'Gallery', href: '#gallery' },
  { title: 'Features', href: '#features' },
  { title: 'Leadership', href: '#leadership' },
  { title: 'FAQ', href: '#faq' },
]

const isOpen = ref(false)
const isHidden = ref(false)
const menuTriggerRef = ref<HTMLButtonElement | null>(null)

const { y } = useWindowScroll()

watch(y, (latest, previous) => {
  if (latest > (previous ?? 0) && latest > 150) {
    isHidden.value = true
    isOpen.value = false // Close mobile menu if open while scrolling down
  } else {
    isHidden.value = false
  }
})

// Focus returning and body scroll locking
watch(isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
    menuTriggerRef.value?.focus()
  }
})

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = 'auto'
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 inset-x-0 z-50 px-4 py-4 md:py-6 transition-transform duration-300 ease-in-out',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      
      <a 
        href="/" 
        class="relative z-50 text-2xl tracking-tighter text-neutral-900 select-none mix-blend-difference font-space-grotesk font-medium"
        @click="isOpen = false"
      >
        LORIEN.
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1 bg-white/70 border border-neutral-200/50 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg">
        <a
          v-for="link in navLinks"
          :key="link.title"
          :href="link.href"
          class="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors relative group"
        >
          {{ link.title }}
          <span class="absolute inset-x-4 -bottom-1 h-px bg-neutral-900/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out duration-300" />
        </a>
        <div class="w-px h-4 bg-neutral-300 mx-2" />
        <a href="#contact" class="px-5 py-2 text-sm font-semibold text-white bg-brand-green rounded-full hover:bg-brand-green-hover transition-colors shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent">
          Get Started
        </a>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <button
        ref="menuTriggerRef"
        type="button"
        @click="isOpen = !isOpen"
        class="md:hidden relative z-50 p-2 text-neutral-900 mix-blend-difference focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isOpen"
        aria-controls="mobile-nav-menu"
      >
        <component :is="isOpen ? X : Menu" :size="28" aria-hidden="true" />
      </button>
    </div>
  </nav>

  <!-- Full-Screen Mobile Menu Overlay -->
  <Transition
    enter-active-class="transition duration-300 ease-in-out"
    enter-from-class="opacity-0 -translate-y-5"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-300 ease-in-out"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-5"
  >
    <nav
      v-if="isOpen"
      id="mobile-nav-menu"
      aria-label="Mobile navigation"
      class="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
    >
      <div class="flex flex-col items-center gap-8">
        <div
          v-for="(link, i) in navLinks"
          :key="link.title"
          class="fade-up-enter"
          :style="{ animationDelay: `${i * 0.1}s`, opacity: 0 }"
        >
          <a
            :href="link.href"
            @click="isOpen = false"
            class="text-4xl font-bold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            {{ link.title }}
          </a>
        </div>
        
        <div 
          class="fade-up-enter mt-8"
          :style="{ animationDelay: `${navLinks.length * 0.1}s`, opacity: 0 }"
        >
          <a 
            href="#contact"
            @click="isOpen = false"
            class="px-8 py-4 text-lg font-semibold text-white bg-brand-green rounded-full hover:bg-brand-green-hover active:scale-95 transition-colors shadow-md"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.fade-up-enter {
  animation: fadeUp 0.4s ease-out forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
