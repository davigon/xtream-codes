import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") }

  return defineConfig({
    plugins: [react()],
    server: {
      port: parseInt(process.env.PORT),
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  })
}
