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
      { find: 'react-courier', replacement: path.resolve(__dirname, '../package/index.ts') },
      { find: 'react-courier/types', replacement: path.resolve(__dirname, '../package/types/index.ts') },
    ],
  },
})
