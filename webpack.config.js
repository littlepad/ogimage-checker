const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env, argv) => {
  const isEnvDevelopment = argv.mode === 'development';
  const sourceMap = isEnvDevelopment;

  return {
    mode: isEnvDevelopment ? 'development' : 'production',
    entry: {
      'js/index': './resources/js/checker.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './app/public'),
    },
    plugins: [
      new VueLoaderPlugin(),
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
      ],
    },
    devtool: isEnvDevelopment ? 'source-map' : 'nosources-source-map',
    devServer: {
      host: '0.0.0.0',
      contentBase: path.join(__dirname, './app/public'),
      watchContentBase: true,
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      },
    },
  };
};