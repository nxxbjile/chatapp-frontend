import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '192.168.182.75', // Or use your local IP (e.g., '192.168.x.x')
  //   port: 5173, // Make sure it's a port that’s not blocked
  // },
})

