// devServer
exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});

// Babel
exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: "babel-loader",
      },
    ],
  },
});

// css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
exports.loadCSS = ({ include, exclude, mode="", use = [] }) => {
  const plugin = new MiniCssExtractPlugin({
    filename: "[name].[hash].css",
  });
  
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: [
            mode === 'production'? MiniCssExtractPlugin.loader : "style-loader",
          ].concat(use),
        },
      ],
    },
    plugins: [plugin],
  };
};

// autoprefixing
exports.autoprefix = () => ({
  loader: "postcss-loader",
  options: {
    plugins: () => [
      require("autoprefixer")(),
      require("postcss-import")(),
      require("stylelint")()
    ],
  },
});

// purifyCSS
const PurifyCSSPlugin = require("purifycss-webpack");

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({
      paths,
      minimize: true,
    })],
});

// images
exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: "url-loader",
          options,
        },
      },
    ],
  },
});

// multi-page
const HtmlWebpackPlugin = require("html-webpack-plugin");
exports.page = (
  {
    path = "",
    template = require.resolve(
      "html-webpack-plugin/default_index.ejs"
    ),
    title,
    entry,
  } = {}
) => ({
  entry,
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${path && path + "/"}index.html`,
      title,
    }),
  ],
});