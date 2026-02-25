<script setup lang="ts">
import Navbar from './components/ui/Navbar.vue'
import ParallaxHero from './components/ui/ParallaxHero.vue'
import TestimonialCarousel from './components/ui/TestimonialCarousel.vue'
import PhotoGallery from './components/ui/PhotoGallery.vue'
import LeadershipSection from './components/ui/LeadershipSection.vue'
import ContentSection from './components/ui/ContentSection.vue'
import FeaturesSection from './components/ui/FeaturesSection.vue'
import FaqSection from './components/ui/FaqSection.vue'
import ContactSection from './components/ui/ContactSection.vue'
import Footer from './components/ui/Footer.vue'
import heroImage from './assets/image.png'
import { Sparkles, Zap, Shield, Smartphone, Globe, Code } from 'lucide-vue-next'

const sampleFeatures = [
  {
    id: "f1",
    title: "Lightning Fast Performance",
    description: "Built on Vite and Vue 3, delivering sub-second page loads and near-instant navigation speeds for your users.",
    icon: Zap,
    color: "#eab308" // Yellow
  },
  {
    id: "f2",
    title: "Premium Aesthetics",
    description: "Carefully crafted with glassmorphism, subtle gradients, and custom utility classes to stand out from generic templates.",
    icon: Sparkles,
    color: "#a855f7" // Purple
  },
  {
    id: "f3",
    title: "Enterprise Grade Scalability",
    description: "Built with standard Vue composition API and modern structural patterns to keep your application and users safe.",
    icon: Shield,
    color: "#22c55e" // Green
  },
  {
    id: "f4",
    title: "Fully Responsive Layout",
    description: "Pixel-perfect rendering across all devices, from ultrawide desktop monitors down to the smallest mobile screens.",
    icon: Smartphone,
    color: "#3b82f6" // Blue
  },
  {
    id: "f5",
    title: "Global Edge Delivery",
    description: "Ready to deploy to the edge for minimum latency, ensuring your site is blazing fast no matter where your customers are located.",
    icon: Globe,
    color: "#ec4899" // Pink
  },
  {
    id: "f6",
    title: "Developer Experience",
    description: "Clean, well-documented TypeScript code that makes extending and maintaining the application an absolute joy.",
    icon: Code,
    color: "#f97316" // Orange
  }
]

const sampleTestimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "TechFlow",
    content: "Lorien transformed our complex legacy system into a blazing fast, intuitive platform. Their engineering rigor is unmatched in the agency world. The new Vue 3 architecture is incredible.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Founder & CEO",
    company: "Lumina",
    content: "Working with this team felt like having an elite internal squad. They didn't just build what we asked for, they challenged our assumptions and delivered something 10x better.",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Product Director",
    company: "Nova Systems",
    content: "The attention to detail—from the micro-interactions to the absolute pixel-perfect implementation of our design system—blew us away. Highly recommended for premium tier software.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "David Kim",
    role: "CTO",
    company: "Zephyr Tech",
    content: "They understand both the aesthetic requirements of modern interfaces and the deep technical requirements of scalable systems. A rare combination.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Emily White",
    role: "Lead Developer",
    company: "Innovate Corp",
    content: "An incredible toolkit for quickly spinning up high-performance, beautiful websites. Highly recommended for any dev team.",
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  }
]

const sampleGalleryImages = [
  {
    id: "img1",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3544&auto=format&fit=crop",
    alt: "Developer coding",
    title: "Engineering Excellence",
    description: "Our team working on complex architecture problems."
  },
  {
    id: "img2",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=3540&auto=format&fit=crop",
    alt: "Code on screen",
    title: "Clean Code",
    description: "We believe in maintainable, scalable, and well-documented codebases."
  },
  {
    id: "img3",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=3540&auto=format&fit=crop",
    alt: "Team collaboration",
    title: "Collaborative Spirit",
    description: "Solving problems together with our clients."
  }
]

const samplePhotos = [
  {
    id: "p1",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    alt: "Developer coding on multiple screens",
    title: "Engineering Excellence",
    description: "Our core engineering team working on scalable microservices."
  },
  {
    id: "p2",
    src: "https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern office interior",
    title: "Creative Space",
    description: "Where our design and engineering teams collaborate."
  },
  {
    id: "p3",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    alt: "Code on screen close up",
    title: "Clean Architecture",
    description: "We enforce strict quality control and clean code practices."
  },
  {
    id: "p4",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    alt: "Team meeting around a table",
    title: "Strategy Sessions",
    description: "Aligning technical execution with business strategy."
  },
  {
    id: "p5",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    alt: "Designers looking at tablet",
    title: "UX Research",
    description: "User testing drives our interface decisions."
  },
  {
    id: "p6",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    alt: "Laptop on desk",
    title: "Continuous Delivery",
    description: "Automated pipelines ensuring rapid, safe deployments."
  }
]

const sampleTeam = [
  {
    id: "t1",
    name: "Alex Rivera",
    role: "CEO & Founder",
    email: "alex@lorien.test",
    bio: "Alex brings over 15 years of experience in leading high-performance engineering teams. Previous experience includes technical leadership at top Silicon Valley firms where he pioneered new practices in front-end architecture. He holds a Master's degree in Computer Science from Stanford University.",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    }
  },
  {
    id: "t2",
    name: "Samantha Wu",
    role: "Chief Design Officer",
    email: "samantha@lorien.test",
    bio: "Samantha's design philosophy centers on the intersection of human psychology and digital interfaces. She has won multiple awards for her work in interactive experiences and has spoken at global design conferences. She ensures every pixel serves a purpose.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop",
    socials: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: "t3",
    name: "Jordan Hayes",
    role: "CTO",
    email: "jordan@lorien.test",
    bio: "An obsessive problem solver, Jordan architects the core systems that power our clients' most demanding applications. With a background in distributed systems and performance optimization, he ensures our codebases are robust, scalable, and furiously fast.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
    socials: {
      twitter: "https://twitter.com"
    }
  }
]
</script>

<template>
  <div class="antialiased text-neutral-900 bg-white min-h-screen selection:bg-brand-green-light selection:text-neutral-900">
    <a
      href="#main-content"
      class="fixed top-4 left-[-9999px] z-[100] rounded-md bg-white px-4 py-2 text-black font-medium shadow-lg focus:outline-none focus-visible:left-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      Skip to main content
    </a>
    
    <Navbar />
    
    <main id="main-content">
      <ParallaxHero 
        title="Experience the Vue Port" 
        subtitle="This is a fully-ported Vue 3 adaptation of the Next.js Lorien template." 
        :background-image-url="heroImage"
        cta-text="Discover More"
      />
      
      <TestimonialCarousel id="testimonials" :testimonials="sampleTestimonials" />

      <ContentSection 
        kicker="The Lorien Approach"
        title="We don't just build websites. We engineer digital experiences."
        image-url="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        image-alt="Developer coding premium interfaces"
        cta-text="Learn About Our Process"
        cta-href="#"
        image-position="right"
      >
        <p class="mb-4">
          Our approach bridges the gap between stunning visual design and hard-core software engineering. Every component is meticulously crafted not just to look good, but to perform flawlessly under load.
        </p>
        <p>
          We leverage the latest capabilities of Vue 3 and Vite, including the Composition API and modern structural patterns, to deliver experiences that feel instantly native in the browser.
        </p>
      </ContentSection>

      <PhotoGallery 
        id="gallery"
        :images="sampleGalleryImages" 
        title="Inside Lorien"
        subtitle="A glimpse into our process and culture."
      />

      <FeaturesSection id="features" :features="sampleFeatures" />

      <PhotoGallery :images="samplePhotos" />

      <LeadershipSection id="leadership" :members="sampleTeam" />

      <FaqSection id="faq" />

      <ContactSection id="contact" />
    </main>
    
    <Footer />
  </div>
</template>
