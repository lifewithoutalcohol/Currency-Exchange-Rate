import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webpackConfig from './webpack.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
  ],
  configureWebpack: webpackConfig,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
