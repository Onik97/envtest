import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { env } from "process";

const target = env.ASPNETCORE_HTTPS_PORT
  ? `http://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:8080";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "^/api": {
        target,
        secure: false,
      },
    },
    port: 5129,
  },
  build: {
    outDir: path.resolve(__dirname, "../EnvTestReactDotnet.Server/wwwroot"),
    emptyOutDir: true,
  },
});
