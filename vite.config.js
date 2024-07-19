import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// const baseUrl = process.env.VITE_SKILLSYNC_API_URL;
const baseUrl = "https://skill-sync-africa-api.vercel.app";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `${baseUrl}`,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
