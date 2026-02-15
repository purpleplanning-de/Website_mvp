import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Wir wandeln das Config-Objekt in eine Funktion um, um Zugriff auf den 'mode' zu erhalten
export default defineConfig(({ mode }) => {
  
  // Erkennt, ob der Build-Befehl "--mode staging" enthält (für GitHub Pages)
  const isStaging = mode === 'staging';

  return {
    // DIE WEICHE:
    // Staging (GitHub Pages) -> '/Website_mvp/'
    // Production (IONOS/Main) -> '/' (Root)
    base: isStaging ? '/Website_mvp/' : '/',

    plugins: [react(), tailwindcss()],

    build: {
      // Code splitting optimization (Deine bestehenden Einstellungen)
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
      
      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
      
      // Enable source maps for production debugging (optional)
      sourcemap: false,
      
      // Minification
      minify: 'terser',
      terserOptions: {
        compress: {
          // PROFI-LOGIK:
          // Auf IONOS (Live) wollen wir keine Logs -> drop_console: true
          // Auf GitHub Pages (Staging) wollen wir Logs zum Debuggen -> drop_console: false
          drop_console: !isStaging, 
          drop_debugger: !isStaging,
        },
      },
    },

    // Performance optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'lucide-react'],
    },
  };
});

