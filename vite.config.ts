import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
// GitHub Pages serves from https://<user>.github.io/vue-starter/
const base = process.env.NODE_ENV === 'production' ? '/vue-starter/' : '/'

export default defineConfig({
  base,
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
