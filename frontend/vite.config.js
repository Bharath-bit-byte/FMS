import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000', // Replace 8080 if your Spring Boot uses a different port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})