import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import ViteSVGIcons from 'vite-plugin-svg-icons'

import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    Vue({ refTransform: true }),
    ViteSVGIcons({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/gallery/icons')],
      symbolId: '[name]'
    })
  ]
})
