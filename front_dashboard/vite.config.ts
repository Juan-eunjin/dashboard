
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // 중요: 프론트의 /api를 백엔드의 /dashboard로 치환합니다.
        rewrite: (path) => path.replace(/^\/api/, '/dashboard')
      }
    }
  }
})