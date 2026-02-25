<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'
import TestimonialCard from './TestimonialCard.vue'
import type { Testimonial } from './TestimonialCard.vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  class?: string
}>(), {
  title: 'What Our Clients Say',
  subtitle: "Don't just take our word for it.",
  class: ''
})

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'center',
  skipSnaps: false
})

const prevBtnDisabled = ref(true)
const nextBtnDisabled = ref(true)
const selectedIndex = ref(0)

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)

const onSelect = () => {
  if (!emblaApi.value) return
  selectedIndex.value = emblaApi.value.selectedScrollSnap()
  prevBtnDisabled.value = !emblaApi.value.canScrollPrev()
  nextBtnDisabled.value = !emblaApi.value.canScrollNext()
}

// Dummy read to satisfy ts-plugin unused ref error
watchEffect(() => {
  if (emblaRef.value) { /* */ }
})

watchEffect(() => {
  if (!emblaApi.value) return
  onSelect()
  emblaApi.value.on('reInit', onSelect)
  emblaApi.value.on('select', onSelect)
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
  <section :class="cn('py-24 px-4 overflow-hidden relative', props.class)" ref="sectionRef">
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

      <div class="relative">
        <!-- Embla Viewport -->
        <div class="overflow-hidden cursor-grab active:cursor-grabbing" ref="emblaRef">
          <div class="flex -ml-4 md:-ml-6 items-stretch">
            <div 
              v-for="(testimonial, index) in testimonials"
              :key="testimonial.id"
              class="pl-4 md:pl-6 min-w-[300px] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div
                class="transition-all duration-700 ease-out h-full"
                :class="isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'"
                :style="{ transitionDelay: `${index * 100 + 300}ms` }"
              >
                <TestimonialCard :testimonial="testimonial" class="h-full" />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-center items-center gap-4 mt-12 w-full max-w-sm mx-auto">
          <button
            @click="scrollPrev"
            :disabled="prevBtnDisabled"
            class="p-4 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm"
            aria-label="Previous testimonial"
          >
            <ChevronLeft class="w-6 h-6 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          
          <!-- Dots -->
          <div class="hidden md:flex items-center justify-center gap-2 grow">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="scrollTo(index)"
              :class="cn(
                'h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-w-[44px] min-h-[44px] flex items-center justify-center',
                index === selectedIndex 
                  ? 'bg-neutral-900 w-8 shadow-[0_0_10px_rgba(0,0,0,0.2)]' 
                  : 'bg-neutral-300 hover:bg-neutral-400 w-2.5'
              )"
              :aria-label="`Go to slide ${index + 1}`"
            >
              <!-- To maintain button height for accessibility -->
            </button>
          </div>

          <button
            @click="scrollNext"
            :disabled="nextBtnDisabled"
            class="p-4 rounded-full bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-w-[44px] min-h-[44px] flex items-center justify-center shadow-sm"
            aria-label="Next testimonial"
          >
            <ChevronRight class="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
    
  </section>
</template>
