import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://primeplace-pr6i.onrender.com", // Replace with the correct remote API URL
        changeOrigin: true, // Ensure the Host header is correctly set
        secure: true, // If the target server uses HTTPS, set to true
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: strip /api from the request URL if necessary
      },
    },
  },
  plugins: [react()],
});
