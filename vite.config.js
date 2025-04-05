import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@managers': path.resolve(__dirname, 'src/game/managers'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@subscriptions': path.resolve(__dirname, 'src/subscriptions'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@game': path.resolve(__dirname, 'src/game'),
    },
  },
})