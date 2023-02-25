import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// const webpackConfig = require('../currencyConverter-decomp/webpack.config.js')
// const { serve } = require('webpack-plugin-serve')
// import { serve } from 'vite'
// import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      // serve(webpackConfig, {
      //   port: 8080,
      //   static: './dist'
      // })
  ],
  configureWebpack: webpackConfig,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
