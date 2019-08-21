const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin/dist/clean-webpack-plugin'); // 输出打包目录前先把 dist/ 删掉
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将 HTML 引用路径和我们的构建结果关联起来
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离 css 文件，以 link 形式引入
const Jarvis = require("webpack-jarvis"); // 图形化分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
        index: "../src/index.js",
        utils: '../src/utils.js',
    },
    context: path.resolve(__dirname),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].bundle.js", // 输出 index.js 和 utils.js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 创建一个 link 标签
                    'css-loader', // css-loader 负责解析 CSS 代码, 处理 CSS 中的依赖
                ],
            },
        ]
    },
    plugins: [
        //每次构建之前把dist目录清空
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html', // 配置输出文件名和路径
            template: '../src/index.html', // 配置文件模板
        }),

        // 用 MiniCssExtractPlugin 抽离出 css 文件，以 link 标签的形式引入样式文件
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css' // 输出的 css 文件名为 index.css
        }),

        //web图形化分析
        new Jarvis({
            port: 1337
        }),
        new BundleAnalyzerPlugin()
        // 默认配置的具体配置项
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'server',
        //     analyzerHost: '127.0.0.1',
        //     analyzerPort: '8888',
        //     reportFilename: 'report.html',
        //     defaultSizes: 'parsed',
        //     openAnalyzer: true,
        //     generateStatsFile: false,
        //     statsFilename: 'stats.json',
        //     statsOptions: null,
        //     excludeAssets: null,
        //     logLevel: info
        // })
    ]
}
