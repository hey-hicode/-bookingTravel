import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()

    
  ],
 build: {
    sourcemap: true,
    rollupOptions: {
      onwarn: (warning, warn) => {
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        warn(warning);
      }
    }
  },
  esbuild: {
    ignoreAnnotations: true,
  
  }

})
