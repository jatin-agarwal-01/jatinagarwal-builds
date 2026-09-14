import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  // Opt in with `VITE_EXPOSE_DEV_SERVER=true` when you need LAN or tunnel access.
  const exposeDevServer = env.VITE_EXPOSE_DEV_SERVER === 'true'

  return {
    plugins: [react()],
    server: {
      host: exposeDevServer ? '0.0.0.0' : '127.0.0.1',
      port: 5173,
      strictPort: true,
      ...(exposeDevServer ? { allowedHosts: true } : {}),
    },
  }
})
