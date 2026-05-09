import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // Use the subfolder only during 'build' (GitHub), use root '/' for 'dev' (Local)
  base: command === 'build' ? '/urja-mobility/' : '/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react-simple-maps', 'react-tooltip', 'prop-types']
  }
}))