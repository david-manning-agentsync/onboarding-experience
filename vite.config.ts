import { defineConfig } from 'vite'

export default defineConfig({
  base: '/onboarding-experience/',
  plugins: [],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})