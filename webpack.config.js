const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    context: __dirname + '/develop',
    devServer: {
        historyApiFallback: {
            rewrites: [{
                from: /.*/,
                to: '/index.html'
            }]
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Calculator for byndyusoft'
        }),
        new MiniCssExtractPlugin({
            filename: "styleshets/application.css"
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }],
            },
            canPrint: true
        }),
        new CopyWebpackPlugin([{
            cache: true,
            from: './favicon.ico',
            to: './favicon.ico'
        }], {
            copyUnmodified: true
        })
    ],
    module: {
        rules: [{
            test: /fonts.\.(woff(2)?|ttf|eot|svg)([?#]+\w+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    useRelativePath: true
                }
            }]
        }, {
            test: /images.+\.(jpe?g|png|gif|svg|ico)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    useRelativePath: true
                }
            }]
        }, {
            test: /\.styl$/i,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer'),
                        require('cssnano')({
                            preset: ['default']
                        })
                    ],
                    sourceMap: true
                }
            }, {
                loader: 'stylus-loader'
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../'
                }
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')
                    ],
                    sourceMap: true
                }
            }]
        }, {
            test: /\.imba$/,
            loader: 'imba/loader',
        }]
    },
    resolve: {
        extensions: [".imba", ".js", ".json"]
    },
    entry: "./index.imba",
    output: {
        path: __dirname + "/public",
        filename: "javascripts/application.js"
    }
}
