import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/-TicketM_System_Front/',
  server: {
    port: 8080,
    open: true
  }
})