const path = require('path');
const ClosurePlugin = require('closure-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

isProduction = true

module.exports = {
    mode: "production",
    entry: './src/antlr4/index.js',
    output: {
        filename: 'antlr4.js',
        path: path.resolve(__dirname, 'dist'),
        // the name of the exported antlr4
        library: "antlr4",
        libraryTarget: 'window',
    },
    devtool: 'source-map',
    node: {
    fs: 'empty',
    module: 'empty',
    net: 'empty'
  },
    optimization: {
        minimizer: [
      new ClosurePlugin({mode: 'STANDARD'}, {
        // compiler flags here
        //
        // for debugging help, try these:
        //
        // formatting: 'PRETTY_PRINT'
        // debug: true,
        // renaming: false
      })
    ],
        splitChunks: {
            minSize: 0
        },
        concatenateModules: false,
    },
    plugins: [
        new ClosurePlugin.LibraryPlugin({
      closureLibraryBase: require.resolve(
        'google-closure-library/closure/goog/base'
      ),
      deps: [
        require.resolve('google-closure-library/closure/goog/deps'),
        './node_modules/google-closure-library/closure/goog/deps.js',
      ],
    }),
        new ClosurePlugin.LibraryPlugin({
            closureLibraryBase: require.resolve('google-closure-library/closure/goog/base'),
            deps: [require.resolve('google-closure-library/closure/goog/deps')]
        }),
    ]
}