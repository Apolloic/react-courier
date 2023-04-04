import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'rest-hook', replacement: path.resolve(__dirname, '../package/index.ts') },
      { find: 'rest-hook/types', replacement: path.resolve(__dirname, '../package/types/index.ts') },
    ],
  },
})
