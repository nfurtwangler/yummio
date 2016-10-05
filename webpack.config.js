module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin/',
    filename: 'bundle.js',
    sourceMapFilename: '[file].map',
    publicPath: '/bin/',
    devtoolModuleFilenameTemplate: 'webpack:///[resource-path]?[loaders]',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      }
    ],
  },
};