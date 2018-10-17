const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
    module: {
        rules: [{
                test: /\.js$/,// 项目中的js文件
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.html$/,// 项目中的html文件
                use: [{
                    loader: "html-loader",
                    options: {
                        minimize: true
                    }
                }]
            }, {
                test: /\.md$/, // 项目中的markdown文件
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            pedantic: true,
                            renderer
                        }
                    }
                ]
            }, {
                test: /\.css$/, // 项目中的css文件
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/template/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};