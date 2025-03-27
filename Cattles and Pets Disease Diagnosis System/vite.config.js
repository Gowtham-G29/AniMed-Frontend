import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from "vite-plugin-pwa";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AniMed',
        short_name: 'AniMed',
        icons: [
          {
            src: '/icons/icon192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#007bff'
      }
    })],
  server: {
    host: true, // Enables access via the local network
  },
  publicDir: 'public',  // Ensure public folder is used

 

});
