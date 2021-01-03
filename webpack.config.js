const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js"),
        critical: path.resolve(__dirname, "./src/critical.js")
    },
    plugins:
        [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new HtmlWebpackPlugin({
                title: "Webpack 101",
                description: "A brief introduction to webpack",
                template: "src/index.html",
                inject: true,
            }),
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/critical/]),
            new HTMLInlineCSSWebpackPlugin({
                filter(fileName) {
                    return !fileName.includes('main');
                },
                leaveCSSFile: false,

            }),
        ],
    module:
        {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ]
        }
};

