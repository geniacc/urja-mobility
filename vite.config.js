import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Now that you have a custom domain, the base is ALWAYS the root
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-simple-maps', 'react-tooltip', 'prop-types']
  }
})