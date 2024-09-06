import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Config from './src/configs/config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Config.PORT
  }
})
