const fs = require('fs')
module.exports = {
    devServer: {
        port: 8888,// 端口
    },
    // 部署应用包时的基本 URL
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: './',
    //配置sass全局变量
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/static/style/mixin.scss";`
            }
        }
    },
    lintOnSave:false
}
