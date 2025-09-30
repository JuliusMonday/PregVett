import { defineConfig, transformWithEsbuild } from 'vite' // Added transformWithEsbuild
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Place React plugin first

    // START: Workaround to enable JSX in .js files
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        // Only apply to files in the src directory with a .js extension
        if (!id.match(/src\/.*\.js$/)) return null

        // Use Vite's exposed transform utility to run esbuild with the correct loader
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic', 
        })
      },
    },
    // END: Workaround
  ],
  
  // This is the second part of the fix, for dependency pre-bundling
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx', // Force esbuild to use the JSX loader for .js files
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})