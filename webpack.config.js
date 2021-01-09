const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const WebpackCleanPlugin = require("webpack-clean");

const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js"),
        bcdclock: path.resolve(__dirname, "./src/BcdClock.js"),
        critical: path.resolve(__dirname, "./src/critical.js")
    },
    plugins:
        [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                title: "BCD Clock",
                description: "Web component version of a BCD Clock",
                template: "src/index.html",
                inject: true,
            }),
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/critical/]),
            new HTMLInlineCSSWebpackPlugin({
                filter(fileName) {
                    console.log(fileName, fileName.includes('crit') || fileName.includes('index'));
                    return fileName.includes('crit') || fileName.includes('index');
                },
                leaveCSSFile: false,
            }),
            new WebpackCleanPlugin([
                'dist/critical.js',
            ])
        ],
    module:
        {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                }, {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/img',
                                name: '[name].[ext]?[contenthash]',
                            },
                        },
                    ],
                },

            ]
        },
    devServer: {
        publicPath: '/'
    }
};

