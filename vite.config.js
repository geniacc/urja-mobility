import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // This tells Vite your site is at /urja-mobility/ instead of the root
  base: '/urja-mobility/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-simple-maps', 'react-tooltip', 'prop-types']
  }
})