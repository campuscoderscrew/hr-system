import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    tsconfigPaths: true
  }
});

/**
 * 
 * export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});

 */