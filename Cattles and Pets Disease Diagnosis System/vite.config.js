import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables access via the local network
  },
  optimizeDeps: {
    include: ['@tensorflow/tfjs-tflite'],
  },
  resolve: {
    alias: {
      './tflite_web_api_client': path.resolve(
        __dirname,
        'node_modules/@tensorflow/tfjs-tflite/dist/tflite_web_api_client.js'
      ),
    },
  },
});
