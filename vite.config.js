import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080,
    open: true,
    proxy: {
      // 本地开发时代理 API 请求到 Vercel dev server
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})