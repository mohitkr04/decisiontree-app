import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-slot'
    ]
  },
  server: {
    watch: {
      usePolling: true
    }
  }
})
