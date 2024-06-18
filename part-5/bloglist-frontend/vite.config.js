import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
// import path from "path";
// import { fileURLToPath } from "url";
// import { resolve } from "node:path";

//const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./testSetup.js",
  },
  // resolve: {
  //   alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  // },
});
