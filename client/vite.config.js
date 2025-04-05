import { defineConfig } from "vite";
import path from "path"
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  esbuild: {
    loader: "jsx", // ✅ Fix JSX syntax error
    include: /src\/.*\.jsx?$/, // ✅ Include .js and .jsx
    exclude: /node_modules/,
  },
});
