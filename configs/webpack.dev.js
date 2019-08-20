const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const friendlyerrorswebpackplugin = require('friendly-errors-webpack-plugin'); // 错误提示插件

module.exports = merge(common, {
    mode: 'development',
    // 开发服务器的配置
    devServer: {
        host: '0.0.0.0', // ip和localhost都可以访问
        port: 3000, // 端口号，默认 8080
        open: true, // 默认打开浏览器
        progress: true, // 进度条
        contentBase: '../dist', // 指定默认目录
        compress: true, // gzip 压缩
        hot: true, // 开启热更新
        overlay: true, // 在浏览器页面上显示错误
        stats: 'errors-only', // 只打印错误
        quiet: true, // 禁止显示devServer的console信息
    },
    // 监听 webpack 变动
    watch: true,
    // 监控的选项
    watchOptions: {
        poll: 1000, // 每秒检查一次变动
        aggregateTimeout: 500, // 防抖 我一直输入代码
        ignored: /node_modules/ // 不需要进行监控哪个文件
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        // new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        // new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new friendlyerrorswebpackplugin({
            // 运行成功
            compilationSuccessInfo: {
                messages: [`你的应用程序在这里运行：http://localhost:3000`],
                notes: ['有些附加说明要在成功编辑时显示']
            },
            // 运行错误
            onErrors: function(severity, errors) {

            },
            // 是否每次编译之间清除控制台(默认为true)
            clearConsole: true,
        }),
    ]
})