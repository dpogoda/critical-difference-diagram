const path = require('path');

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: { app: ['core-js/stable', './src/index.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 
            {
                loader: 'babel-loader'
            }
        ,
        exclude: /node_modules/,
      } 
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      })
    ]
  },
  output: {
    filename: 'critical-difference-diagram-1.0.0.js',
    path: path.resolve(__dirname, './dist'),
  }
  
};
