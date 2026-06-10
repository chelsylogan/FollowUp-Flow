import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // In local dev, proxy relative /api calls to the Express dev server
  // (server/index.js). In production these resolve to same-origin Vercel
  // serverless functions, so no proxy is needed.
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
