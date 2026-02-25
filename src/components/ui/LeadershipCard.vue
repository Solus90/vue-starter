<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Linkedin, Twitter } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

export interface TeamMember {
  id: string
  name: string
  role: string
  email?: string
  bio: string
  imageUrl: string
  socials?: {
    linkedin?: string
    twitter?: string
  }
}

const props = defineProps<{
  member: TeamMember
  class?: string
}>()

const isFlipped = ref(false)

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    isFlipped.value = !isFlipped.value
  }
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    @click="isFlipped = !isFlipped"
    @keydown="handleKeyDown"
    :aria-label="isFlipped ? `Show front of card for ${props.member.name}` : `Flip card to read bio for ${props.member.name}`"
    :class="cn('relative group perspective-[1000px] w-full max-w-sm mx-auto h-[450px] cursor-pointer rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white', props.class)"
  >
    <div
      class="w-full h-full relative preserve-3d transition-all duration-700 ease-in-out"
      :style="{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
    >
      <!-- Front of Card -->
      <div class="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden border border-neutral-200 shadow-lg bg-white group-hover:shadow-xl transition-shadow duration-500">
        <div class="relative w-full h-[65%] overflow-hidden">
          <div class="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent z-10" />
          <img 
            :src="member.imageUrl" 
            :alt="member.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        <div class="relative z-20 -mt-10 p-6 pt-0 text-center flex flex-col items-center">
          <h3 class="text-2xl font-bold text-neutral-900 mb-1">{{ member.name }}</h3>
          <p class="text-brand-green font-medium mb-4">{{ member.role }}</p>
          
          <a
            v-if="member.email"
            :href="`mailto:${member.email}`"
            class="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded"
            @click.stop
          >
            <Mail :size="16" aria-hidden="true" />
            <span>{{ member.email }}</span>
          </a>
          
          <p class="text-xs text-neutral-400 uppercase tracking-widest mt-6 font-semibold flex items-center gap-2">
            <span class="w-8 h-px bg-neutral-200" />
            Click to meet {{ member.name.split(' ')[0] }}
            <span class="w-8 h-px bg-neutral-200" />
          </p>
        </div>
      </div>

      <!-- Back of Card -->
      <div class="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden border border-neutral-200 bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col p-8" style="transform: rotateY(180deg);">
        

        <div class="flex items-center gap-4 border-b border-neutral-100 pb-6 mb-6">
          <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-light shrink-0">
            <img :src="member.imageUrl" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-neutral-900">{{ member.name }}</h3>
            <p class="text-sm text-brand-green">{{ member.role }}</p>
          </div>
        </div>
        
        <div class="grow overflow-y-auto pr-2 custom-scrollbar">
          <p class="text-neutral-600 leading-relaxed font-light text-sm">
            {{ member.bio }}
          </p>
        </div>
        
        <!-- Social Links -->
        <div class="mt-6 pt-6 border-t border-neutral-100 flex justify-center gap-4">
          <a
            v-if="member.socials?.linkedin"
            :href="member.socials.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-brand-green transition-all transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            @click.stop
            :aria-label="`${member.name} on LinkedIn`"
          >
            <Linkedin :size="20" aria-hidden="true" />
          </a>
          <a
            v-if="member.socials?.twitter"
            :href="member.socials.twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-brand-green transition-all transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            @click.stop
            :aria-label="`${member.name} on Twitter`"
          >
            <Twitter :size="20" aria-hidden="true" />
          </a>
          <a
            v-if="member.email"
            :href="`mailto:${member.email}`"
            class="p-2 rounded-full bg-neutral-50 hover:bg-neutral-100 text-neutral-500 hover:text-brand-green transition-all transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            @click.stop
            :aria-label="`Email ${member.name}`"
          >
            <Mail :size="20" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
