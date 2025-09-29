import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This is the correct configuration.
// It separates the production build from the local development server.
export default defineConfig(async ({ command }) => {
  // This config is used for the 'build' command on Netlify
  if (command === 'build') {
    return {
      plugins: [react()],
    };
  }

  // This config is used for the 'dev' command on your local computer.
  // IMPORTANT: Make sure this path to your server file is correct!
  const { createServer } = await import('./src/server');

  return {
    plugins: [react()],
    server: {
      // This uses your server code as middleware for local development
      middleware: createServer(),
    },
  };
});
