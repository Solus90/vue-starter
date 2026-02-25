<script setup lang="ts">
import { Quote } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatarUrl?: string
  rating?: number
}

const props = defineProps<{
  testimonial: Testimonial
  class?: string
}>()
</script>

<template>
  <div
    :class="cn(
      'relative flex flex-col justify-between h-full bg-white border border-neutral-200 p-8 rounded-3xl shadow-lg shadow-neutral-200/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200/80 hover:border-neutral-300 hover:-translate-y-1 group',
      props.class
    )"
  >
    <div class="absolute top-0 right-0 -mt-4 -mr-4 text-neutral-100 transition-transform duration-500 group-hover:scale-110 group-hover:text-neutral-200" aria-hidden="true">
      <Quote :size="120" fill="currentColor" />
    </div>

    <div class="relative z-10 grow mb-8 text-neutral-700 text-lg leading-relaxed font-light">
      "{{ testimonial.content }}"
    </div>

    <div class="relative z-10 flex items-center gap-4 mt-auto">
      <div class="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.1)]">
        <img
          v-if="testimonial.avatarUrl"
          :src="testimonial.avatarUrl"
          :alt="testimonial.name"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-else class="w-full h-full bg-linear-to-b from-brand-green-light to-white flex items-center justify-center text-brand-green font-semibold text-lg">
          {{ testimonial.name.charAt(0) }}
        </div>
      </div>
      <div>
        <h4 class="font-semibold text-neutral-900 text-base">
          {{ testimonial.name }}
        </h4>
        <p class="text-sm text-neutral-500 font-medium">
          {{ testimonial.role }}
          <span v-if="testimonial.company" class="opacity-70">
            @ {{ testimonial.company }}
          </span>
        </p>
      </div>
    </div>

    <!-- Subtle bottom gradient -->
    <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-neutral-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-multiply" />
  </div>
</template>
