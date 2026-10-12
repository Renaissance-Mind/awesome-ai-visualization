import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: { "/api": {
      target: "http://127.0.0.1:8787", changeOrigin: true,
      configure: proxy => proxy.on("proxyReq", request => request.removeHeader("origin")),
    } },
  },
  build: {
    sourcemap: true,
  },
});
