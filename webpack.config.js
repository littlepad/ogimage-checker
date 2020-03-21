const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isEnvDevelopment = argv.mode === 'development';
  const sourceMap = isEnvDevelopment;

  return {
    mode: isEnvDevelopment ? 'development' : 'production',
    entry: {
      'js/index': './resources/js/checker.js',
      'css/index': './resources/scss/index.scss',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './app/public'),
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                url: false,
                sourceMap,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  outputStyle: 'compressed',
                  sourceMap,
                }
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    devtool: isEnvDevelopment ? 'source-map' : 'nosources-source-map',
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
    },
  };
};