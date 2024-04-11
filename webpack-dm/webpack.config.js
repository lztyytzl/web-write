const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.join(__dirname, 'src', 'index.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: '/node-modules/'
            }
        ]
    },
    devServer: {
        port: 8090,
        static: false,
        proxy: [
            {
                target: 'https://music.163.com',
                changeOrigin: true,
                context: '/api',
                pathRewrite: { '^/api': '' }
            }
        ]
    }
}