import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    return {
      define: {
        __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
};
  plugins: [react()],
})
