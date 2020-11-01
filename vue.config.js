const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    // 指定端口号打开
    port: 8086,
    // 自动打开浏览器
    open: true,
  },
  // 部署到gitee pages 才需要写这一行代码，prettrymusic是远程仓库路径
  // 如果是在生产环境下用服务器启动项目，npm run build压缩时一定要注释掉这一行代码
  publicPath: process.env.NODE_ENV === 'production' ? '/prettrymusic/' : '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      // 通过externals加载外部CDN资源
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT',
        swiper: 'Swiper',
        'better-scroll': 'BetterScroll',
      })
      // index.html自定制（生产开发模式下可显示不同的title，生产时CDN，开发时不需要CDN）
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
}
