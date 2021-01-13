const path = require('path')
const { merge } = require('webpack-merge')

// 当前环境是生成环境
const IS_PRO = process.env.NODE_ENV === 'production'

const base = {
    entry: path.resolve(__dirname, 'src'),
    output: {
        filename: IS_PRO ? 'index.min.js' : 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'ImageHistory',
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['babel-loader', 'ts-loader'],
                include: /src/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 500 * 1024, // <=500kb 则使用 base64 （即，希望字体文件一直使用 base64 ，而不单独打包）
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.sass', '.scss', '.css'],
    },
}

// development
const dev = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
}

// production
const pro = {
    mode: 'production',
    devtool: 'source-map',
}

module.exports = merge(base, IS_PRO ? pro : dev)
