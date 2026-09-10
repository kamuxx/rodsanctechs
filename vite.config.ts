import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    open: true,
    allowedHosts: [
      ".trycloudflare.com", // El punto inicial permite cualquier subdominio de Cloudflare
    ],
  },
});
