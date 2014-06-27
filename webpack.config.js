'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var config = require('./config');

var options = module.exports = {
  debug: !config.production,
  entry: entries(),
  plugins: [],
  resolve: {
    root: path.resolve(__dirname, config.source.scripts),
    modulesDirectories: ['node_modules', 'bower_components']
  },
  output: {
    path: config.destination.scripts,
    filename: '[name].js'
  }
};

if(config.production) {
  options.plugins.push(new webpack.optimize.UglifyJsPlugin({
    dropDebugger: true,
    dropConsole: true
  }));
  options.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}
else {
  options.devtool = 'inline-source-map';
}

function entries() {
  return fs
  .readdirSync(config.source.scripts)
  .filter(function(fileOrDir) {
    if(fileOrDir !== 'shared') {
      return fs
      .statSync(path.join(config.source.scripts, fileOrDir))
      .isFile();
    }
    return false;
  })
  .filter(function(file) {
    return /\.js$/.test(file);
  })
  .map(function(file) {
    return file.replace(/\.js$/g, '');
  })
  .reduce(function(obj, file) {
    obj[file] = file;
    return obj;
  }, {});
}
