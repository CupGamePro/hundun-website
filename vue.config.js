const CompressionPlugin = require('compression-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {
  ElementPlusResolver
} = require('unplugin-vue-components/resolvers')
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: 5000,
    proxy: {
      '/api': {
        target: 'http://192.168.2.103:3000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
      }
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }]
    },
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|.\css$|\.png/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false // 不删除源文件
      }),
      AutoImport({
        resolvers: [ElementPlusResolver({importStyle: false})],
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
