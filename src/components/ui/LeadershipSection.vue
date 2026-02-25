<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import LeadershipCard from './LeadershipCard.vue'
import type { TeamMember } from './LeadershipCard.vue'

const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  members: TeamMember[]
}>(), {
  title: 'Our Leadership',
  subtitle: 'The visionaries driving us forward.'
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
  <section class="py-24 px-4 relative overflow-hidden bg-white" ref="sectionRef">
    <div class="max-w-7xl mx-auto">
      <div 
        class="text-center mb-16 relative z-10 transition-all duration-700 ease-out" 
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <h2 class="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4">
          {{ title }}
        </h2>
        <p class="text-xl text-neutral-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ease-out">
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        <div
          v-for="(member, index) in members"
          :key="member.id"
          class="transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
          :style="{ transitionDelay: `${index * 100 + 300}ms` }"
        >
          <LeadershipCard :member="member" />
        </div>
      </div>
    </div>

  </section>
</template>
