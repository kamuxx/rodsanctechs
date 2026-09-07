import { spawn } from "node:child_process";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Opens a Cloudflare quick tunnel (`cloudflared tunnel --url`) when the dev
 * server starts, so the site is reachable from a public *.trycloudflare.com URL.
 */

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
