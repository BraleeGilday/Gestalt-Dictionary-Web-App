import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The following is so that when React sends requests to the URL scripts,
  // the host will be local host and port will be 3000...
  server: {
    proxy: {
      '/scripts': {
        target: 'http://localhost:3000'
      }
    }
  }
})
