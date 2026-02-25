<script setup lang="ts">
import { ref, computed } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { ArrowRight } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  kicker?: string
  title: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  imagePosition?: 'left' | 'right'
  ctaText?: string
  ctaHref?: string
  textOnly?: boolean
  class?: string
}>(), {
  imageAlt: 'Section Image',
  imagePosition: 'right',
  textOnly: false,
  class: ''
})

const isImageLeft = computed(() => props.imagePosition === 'left')

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry?.isIntersecting && !isVisible.value) {
    isVisible.value = true
  }
}, { threshold: 0.1 })
</script>

<template>
  <section :class="[`py-24 relative overflow-hidden bg-white`, props.class]">
    <div ref="sectionRef" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        class="grid gap-12 lg:gap-20 items-center"
        :class="textOnly ? 'grid-cols-1 max-w-4xl mx-auto text-center' : 'grid-cols-1 lg:grid-cols-2'"
      >
        
        <!-- Text Content Column -->
        <div 
          class="flex flex-col justify-center transition-all duration-700 ease-out"
          :class="[
            isImageLeft && !textOnly ? 'lg:order-2' : 'lg:order-1',
            textOnly ? 'items-center' : '',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          ]"
        >
          <span 
            v-if="kicker"
            class="text-brand-green font-semibold tracking-wider uppercase text-sm mb-4 block transition-all duration-500 delay-100"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          >
            {{ kicker }}
          </span>
          
          <h2 
            class="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight transition-all duration-500 delay-200"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          >
            {{ title }}
          </h2>
          
          <div 
            class="text-lg text-neutral-600 leading-relaxed mb-8 transition-all duration-500 delay-300"
            :class="[
              textOnly ? 'max-w-2xl mx-auto text-center' : '',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            ]"
          >
            <!-- Slot for description, falls back to description prop -->
            <slot>{{ description }}</slot>
          </div>
          
          <div 
            v-if="ctaText && ctaHref"
            class="transition-all duration-500 delay-400"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          >
            <a 
              :href="ctaHref"
              class="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-brand-green text-white font-medium rounded-full hover:bg-brand-green-hover transition-colors duration-300 group shadow-sm hover:shadow-md"
            >
              <span>{{ ctaText }}</span>
              <ArrowRight :size="18" class="transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div 
          v-if="!textOnly && imageUrl"
          class="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-3xl overflow-hidden transition-all duration-1000 ease-out delay-300"
          :class="[
            isImageLeft ? 'lg:order-1' : 'lg:order-2',
            isVisible ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-md'
          ]"
        >
          <div class="absolute inset-0 border border-neutral-200 rounded-3xl z-10 pointer-events-none" />
          
          <img 
            :src="imageUrl" 
            :alt="imageAlt"
            class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

      </div>
    </div>
  </section>
</template>
