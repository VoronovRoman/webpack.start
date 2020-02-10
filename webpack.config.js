const path = require('path')
const HTMLPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: "bundle.[chunkhash].js",
        path: path.resolve(__dirname, "public"),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            //exclude: /(node_modules|bower_components)/,
            include: path.resolve(__dirname, 'src/js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }, {
            test: /\.s[ac]ss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                        plugins: [
                            autoprefixer({
                                //browsers:['ie >= 8', 'last 4 version']
                            })
                        ],
                    }
                },
                'sass-loader'
            ],
        },{
            test: /\.(png|jpe?g|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    //publicPath: "./src/img/",
                    name: 'img/[name].[ext]'
                }
            }, ],
        },
     ],
    },
    devServer: {
        port: 8080
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style[chunkhash].css',
        }),
        new HTMLPlugin({
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(),

    ]
}