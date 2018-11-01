const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const merge = require("webpack-merge");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const glob = require("glob");
const path = require("path");
const marked = require("marked");
const renderer = new marked.Renderer();


const parts = require("./webpack.parts");

const commonConfig = mode => merge([{
    module: {
        rules: [{
            test: /\.html$/, // 项目中的html文件
            use: [{
                loader: "html-loader",
                options: {
                    minimize: true
                }
            }]
        }, {
            test: /\.md$/, // 项目中的markdown文件
            use: [{
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
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./src/template/index.html"),
            filename: "./index.html"
        }),
    ],
},
parts.loadCSS({
    use: [
        "css-loader",
        // parts.autoprefix()
    ],
    mode: mode
})]);

const productionConfig = merge([
    parts.loadJavaScript({exclude: '/node_modules/'}),
    parts.loadImages({
        options: {
          limit: 25000,
          name: "[name]-[hash].[ext]",
        },
    }),
    parts.purifyCSS({
        paths: glob.sync(path.join(__dirname, 'src/*.js'), { nodir: true }),
    }),
    {
        plugins: [
            new ImageminPlugin({
                minFileSize: 10000, // Only apply this one to files over 10kb
                jpegtran: { progressive: true }
            })
        ]
    },
    {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendor",
                        chunks: "initial",
                    },
                },
            },
        },
    },
    {
        entry: {
            app: './src/index.js'
        },
        output: {
            filename: '[name].[hash].bundle.js'
        }
    }
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),
    parts.loadImages(),
    {
        plugins: [new FriendlyErrorsWebpackPlugin()]
    },
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig(mode), productionConfig, {
            mode
        });
    }

    return merge(commonConfig(mode), developmentConfig, {
        mode
    });
};