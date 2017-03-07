import PATH from './gulp/config';

module.exports = {
  entry: {
    index: `${PATH.js}app.js`
  },
  output: {
    path: require('path').resolve(`${PATH.public}js/`),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
