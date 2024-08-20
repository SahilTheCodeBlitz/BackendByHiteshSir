import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, // This ensures the request is seen as originating from the target server.
        
      },
      // jis request me /api hai us request ke piche
      // http:localhost:4000 append hoga and backend server ko lagega
      // ye request origin hui hai isi url se
  },
},
  plugins: [react()],
})
