import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // your backend URL
        changeOrigin: true,               // needed for CORS
        secure: false,                     // if backend is http
      },
    },
  },
});
