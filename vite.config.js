import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   base: '/pomodoro-timer/', 
   server:{
    port:3200,
    open:true
  },
  plugins: [react()],
})
