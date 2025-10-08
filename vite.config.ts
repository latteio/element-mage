import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import {fileURLToPath, URL} from "node:url";
import * as path from "path";
import globalComponents from "./vite-plugin-global-components.ts";

export default defineConfig(({mode}) => {
  return {
    root: process.cwd(),
    plugins: [
      vue(),
      vueJsx(),
      globalComponents({
        mode: mode,
        libraryName: 'element-mage',
        output: 'src/components.d.ts',
        prefix: 'Mag'
      }),
      dts({
        outDir: "dist/dist/types",
        entryRoot: "src",
        include: ["src/**/*", "src/components.d.ts"],
        staticImport: true,
        insertTypesEntry: true,
        rollupTypes: true,
        copyDtsFiles: true,
        compilerOptions: {
          declarationMap: false
        }
      })],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Prevent duplicate warnings of Sass
          api: 'modern-compiler'
        }
      }
    },
    build: {
      outDir: 'dist',
      lib: {
        entry: path.resolve(__dirname, 'src/element-mage.ts'),
        name: 'element-mage',
        formats: ['es', 'umd'],
        fileName: (format) => `dist/index.${format}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          entryFileNames: 'dist/index.es.js',
          assetFileNames: 'dist/index.css'
        }
      },
      sourcemap: false,
      emptyOutDir: true
    },
    /* 服务代理 */
    server: {
      host: '0.0.0.0',
      port: 8000,
      cors: true,
      hmr: true,
      proxy: {
        '/api': {
          target: 'http://localhost:18080/platform/',
          changeOrigin: true
        }
      }
    }
  }
})
