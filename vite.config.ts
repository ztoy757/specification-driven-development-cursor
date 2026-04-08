import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/specification-driven-development-cursor/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // devcontainer用の設定
    host: '0.0.0.0',  // コンテナ外からアクセス可能にする
    port: 5173,       // デフォルトポート
    strictPort: true, // ポートが使用中の場合はエラーにする
    hmr: {
      port: 5173      // HMRも同じポートを使用
    }
  },
  test: {
    environment: 'jsdom'
  }
})
