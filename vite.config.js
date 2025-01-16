import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

// https://vitejs.dev/config/
export default defineConfig({
plugins: [
    vue(),
    process.env.ELECTRON === 'true' && electron([
    {
        entry: 'electron/main.js',
    },
    {
        entry: 'electron/preload.js',
        onstart(options) {
        options.reload()
        },
    }
    ]),
    process.env.ELECTRON === 'true' && renderer()
].filter(Boolean),
build: {
    emptyOutDir: true,
    outDir: 'dist'
}
})
