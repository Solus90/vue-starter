<script setup lang="ts">
import { ref } from 'vue'
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-vue-next'
import { useIntersectionObserver } from '@vueuse/core'

const formState = ref<'idle' | 'submitting' | 'success'>('idle')

const handleSubmit = (e: Event) => {
  e.preventDefault()
  formState.value = 'submitting'

  // Simulate API call
  setTimeout(() => {
    formState.value = 'success'
    setTimeout(() => { formState.value = 'idle' }, 3000)
  }, 1500)
}

const sectionRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(sectionRef, ([entry]) => {
  if (entry?.isIntersecting && !isVisible.value) {
    isVisible.value = true
  }
}, { threshold: 0.1 })

const contactInfo = [
  { icon: Mail, title: "Email Us", details: "hello@example.com", link: "mailto:hello@example.com" },
  { icon: Phone, title: "Call Us", details: "+1 (555) 123-4567", link: "tel:+15551234567" },
  { icon: MapPin, title: "Visit Us", details: "123 Innovation Drive, Tech City, TC 10101", link: "#" },
]
</script>

<template>
  <section 
    class="py-24 relative overflow-hidden bg-white" 
    id="contact" 
    aria-labelledby="contact-heading"
    ref="sectionRef"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        class="text-center mb-16 transition-all duration-700 ease-out"
        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      >
        <p class="text-brand-green font-semibold tracking-wide uppercase text-sm mb-3">
          Get in Touch
        </p>
        <h2 id="contact-heading" class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
          Let's Start a <span class="text-brand-green">Conversation</span>
        </h2>
        <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
          Have a question, a project idea, or just want to say hi? We'd love to hear from you.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        <!-- Contact Information -->
        <div 
          class="flex flex-col gap-8 transition-all duration-700 delay-200 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
        >
          <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 backdrop-blur-sm shadow-md">
            <h3 class="text-2xl font-semibold text-neutral-900 mb-6">Contact Information</h3>
            <ul class="space-y-6">
              <li 
                v-for="(item, index) in contactInfo" 
                :key="index"
                class="flex items-start gap-4 group transition-all duration-500"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
                :style="{ transitionDelay: `${index * 100 + 300}ms` }"
              >
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 border border-neutral-200 group-hover:border-brand-green/30 group-hover:bg-brand-green-light transition-colors duration-300 shadow-sm">
                  <component :is="item.icon" class="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <p class="text-sm font-medium text-neutral-500 mb-1">{{ item.title }}</p>
                  <a :href="item.link" class="text-lg text-neutral-900 hover:text-brand-green transition-colors duration-200">
                    {{ item.details }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
          
          <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 relative overflow-hidden transition-all duration-700 delay-500 ease-out shadow-md" :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'">
             <h3 class="text-xl font-semibold text-neutral-900 mb-4 relative z-10">Business Hours</h3>
             <div class="space-y-2 text-neutral-600 relative z-10">
               <div class="flex justify-between items-center">
                 <span>Monday - Friday</span>
                 <span class="text-neutral-900 font-medium">9:00 AM - 6:00 PM (EST)</span>
               </div>
               <div class="flex justify-between items-center text-neutral-400">
                 <span>Saturday - Sunday</span>
                 <span>Closed</span>
               </div>
             </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 backdrop-blur-md relative transition-all duration-700 delay-300 ease-out shadow-xl"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'"
        >
          <form @submit="handleSubmit" class="space-y-6" aria-label="Contact form">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label for="firstName" class="text-sm font-medium text-neutral-700">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  required
                  class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-all duration-300"
                  placeholder="John"
                />
              </div>
              <div class="space-y-2">
                <label for="lastName" class="text-sm font-medium text-neutral-700">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  required
                  class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-neutral-700">Email Address</label>
              <input 
                type="email" 
                id="email" 
                required
                class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <div class="space-y-2">
              <label for="inquiryType" class="text-sm font-medium text-neutral-700">Inquiry Type</label>
              <select 
                id="inquiryType" 
                class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-all duration-300 cursor-pointer"
                defaultValue="general"
              >
                <option value="general" class="bg-white">General Inquiry</option>
                <option value="sales" class="bg-white">Sales & Pricing</option>
                <option value="support" class="bg-white">Technical Support</option>
                <option value="partnership" class="bg-white">Partnership</option>
              </select>
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-neutral-700">Message</label>
              <textarea 
                id="message" 
                required
                rows="4"
                class="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green/50 transition-all duration-300 resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              class="sr-only"
              id="form-status"
            >
              <span v-if="formState === 'submitting'">Sending your message...</span>
              <span v-if="formState === 'success'">Message sent successfully.</span>
            </div>

            <button
              type="submit"
              :disabled="formState !== 'idle'"
              class="w-full relative group overflow-hidden rounded-xl bg-neutral-900 text-white font-semibold py-4 px-8 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-h-[44px] shadow-lg shadow-neutral-200/50 hover:shadow-xl"
              :aria-busy="formState === 'submitting'"
              :aria-disabled="formState !== 'idle'"
            >
              <div class="absolute inset-0 bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <Transition mode="out-in" name="fade">
                <div v-if="formState === 'idle'" class="flex items-center justify-center gap-2 relative z-10">
                  <Send class="w-5 h-5" aria-hidden="true" />
                  <span>Send Message</span>
                </div>
                <div v-else-if="formState === 'submitting'" class="flex items-center justify-center gap-2 relative z-10">
                  <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </div>
                <div v-else-if="formState === 'success'" class="flex items-center justify-center gap-2 text-green-600 relative z-10">
                  <CheckCircle2 class="w-5 h-5" aria-hidden="true" />
                  <span>Message Sent!</span>
                </div>
              </Transition>
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
