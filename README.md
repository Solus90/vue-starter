# Lorien Premium Vue Starter Template

A high-performance, design-first Vue 3 starter template configured for building premium, modern web experiences. This boilerplate is engineered for speed, strict aesthetic guidelines, and rapid prototyping of marketing sites, landing pages, and single-page applications (SPAs).

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API & `<script setup>`)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:** [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Brand/Logos) & [Geist](https://vercel.com/font) (Body/UI)
- **Icons:** [Lucide Vue](https://lucide.dev/guide/packages/lucide-vue-next)
- **Animation/Carousels:** [Embla Carousel Vue](https://www.embla-carousel.com/)

## 🎨 Design System: The 90-8-2 Rule

This template strictly adheres to a premium, minimalist architectural color rule to ensure the interface never feels overwhelming:

- **90% Neutrals:** The foundation. Extensive use of `neutral-50` and `white` for clean, spacious layouts. Backgrounds heavily alternate between these two to create section rhythm without relying on borders.
- **8% Brand Green (`#00A878`):** The primary accent. Used exclusively for primary call-to-actions, active states, focus rings, hover effects on links, and specific semantic highlights (like kickers or roles).
- **2% Brand Orange (`#FF9800`):** The rare exception. Reserved _strictly_ for critical alerts or extremely specific conversion drivers that must break the green hierarchy.

_Note: Decorative background gradients, colored shadows, and glowing orbs are intentionally omitted from this template to maintain a sharp, "clean-tech" aesthetic._

## 💡 When to use this template?

This template is an **SPA (Single Page Application)**. It is perfect for:

- **Landing Pages:** High-conversion, single-page marketing sites.
- **Portfolios & Agency Sites:** Fast, interactive showcases with complex client-side animations or transitions.
- **B2B Dashboards:** Applications hidden behind a login screen where SEO is irrelevant and client-side interactivity is paramount.
- **Rapid Prototyping:** Quickly spinning up a highly-polished UI without worrying about server configuration.

## 🏗 When to graduate to Nuxt?

While this Vue + Vite template is incredibly fast for client-side rendering, you should **abandon this template and migrate to Nuxt** if your project hits any of the following requirements:

1.  **SEO Automation is Critical:** If you need dynamic meta tags, automated sitemaps, and server-side rendering (SSR) to fiercely compete on Google search rankings for content-heavy pages.
2.  **Content-Heavy Architecture:** If you are building a blog, documentation site, or e-commerce platform with hundreds/thousands of pages. Nuxt Content or Nuxt's file-based routing will save you immense configuration time.
3.  **Server API Requirements:** If you need to securely connect to a database or hide API keys directly within your frontend repository without spinning up a separate backend (using Nuxt's Nitro server `/server/api` routes).
4.  **Initial Load Performance on Slow Networks:** While this SPA is optimized, Nuxt's SSR serves fully painted HTML to the browser instantly, massively improving Core Web Vitals (LCP) for users on slow mobile networks.

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 📤 Deploying to Vercel

This template deploys as a static SPA on **Vercel** with no extra config. Vercel serves from the root, so the default Vite `base: '/'` is correct.

1. Push your repo to GitHub and import it in [Vercel](https://vercel.com).
2. Use the default settings: **Framework Preset** → Vite, **Build Command** → `npm run build`, **Output Directory** → `dist`.
3. Deploy. Preview and production URLs will work without base-path changes.
