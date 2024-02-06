import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  // your other configuration...
  build: {
    outDir:'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        soup: './soup.html',
      }
    }
  },
});