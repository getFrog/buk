import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled'],
  },
  build: {
    outDir: "build",
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 443, // Run the websocket server on the SSL port
    },
  },
  commonjsOptions: { include: [] },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@pages", replacement: "/src/pages" },
    ],
  },
});
