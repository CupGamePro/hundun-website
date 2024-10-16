import { defineConfig } from 'vite';  
import vue from '@vitejs/plugin-vue';  
import viteCompression from 'vite-plugin-compression';  
import AutoImport from 'unplugin-auto-import/vite';  
import Components from 'unplugin-vue-components/vite';  
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';  
import { ViteCodeInspectorPlugin } from 'vite-code-inspector-plugin';
  
// Vite 配置  
export default defineConfig({  
  plugins: [  
    vue(),  
    viteCompression({  
      ext: '.js|.html|.css|.png', // 匹配文件名  
      threshold: 10240, // 对超过10k的数据压缩  
      minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理  
      deleteOriginalAssets: false, // 不删除源文件  
    }),  
    AutoImport({  
      resolvers: [ElementPlusResolver({ importStyle: false })],  
      imports: ['vue'], // 自动导入Vue（如果需要）  
    }),  
    Components({  
      resolvers: [ElementPlusResolver()],  
    }),  
    ViteCodeInspectorPlugin({
      showSwitch: false,
      hotKeys: ['altKey', 'shiftKey'],
      autoToggle: true,
    }),  
  ],  
  resolve: {  
    alias: {  
      '@': '/src', // 别名配置，根据需求调整  
    },  
  },  
  server: {  
    hot: true,  
    port: 5000,  
    proxy: {  
      '/api': {  
        target: 'http://192.168.2.100:3000',  
        rewrite: (path) => path.replace(/^\/api/, ''),  
        changeOrigin: true,  
      },  
    },  
  },  
  build: {  
    outDir: 'dist', // 输出目录  
    rollupOptions: {  
      output: {  
        manualChunks(id) {  
          // 自定义代码分割逻辑（如果需要）  
          if (id.includes('node_modules')) {  
            return id.toString().split('node_modules/')[1].split('/')[0].toString();  
          }  
        },  
      },  
    },  
  },  
  optimizeDeps: {  
    include: ['element-plus'], // 如果需要预构建依赖  
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern", "legacy"
      },
    },
  },
});