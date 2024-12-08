// vite.config.js
import { defineConfig } from "file:///E:/Abhishek/RealEstate/client/node_modules/vite/dist/node/index.js";
import react from "file:///E:/Abhishek/RealEstate/client/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://primeplace-pr6i.onrender.com",
        // Replace with the correct remote API URL
        changeOrigin: true,
        // Ensure the Host header is correctly set
        secure: true,
        // If the target server uses HTTPS, set to true
        rewrite: (path) => path.replace(/^\/api/, "")
        // Optional: strip /api from the request URL if necessary
      }
    }
  },
  plugins: [react()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxBYmhpc2hla1xcXFxSZWFsRXN0YXRlXFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQWJoaXNoZWtcXFxcUmVhbEVzdGF0ZVxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0FiaGlzaGVrL1JlYWxFc3RhdGUvY2xpZW50L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgdGFyZ2V0OiBcImh0dHBzOi8vcHJpbWVwbGFjZS1wcjZpLm9ucmVuZGVyLmNvbVwiLCAvLyBSZXBsYWNlIHdpdGggdGhlIGNvcnJlY3QgcmVtb3RlIEFQSSBVUkxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBFbnN1cmUgdGhlIEhvc3QgaGVhZGVyIGlzIGNvcnJlY3RseSBzZXRcbiAgICAgICAgc2VjdXJlOiB0cnVlLCAvLyBJZiB0aGUgdGFyZ2V0IHNlcnZlciB1c2VzIEhUVFBTLCBzZXQgdG8gdHJ1ZVxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLCAvLyBPcHRpb25hbDogc3RyaXAgL2FwaSBmcm9tIHRoZSByZXF1ZXN0IFVSTCBpZiBuZWNlc3NhcnlcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlSLFNBQVMsb0JBQW9CO0FBQzlTLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUE7QUFBQSxRQUNSLGNBQWM7QUFBQTtBQUFBLFFBQ2QsUUFBUTtBQUFBO0FBQUEsUUFDUixTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ25CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
