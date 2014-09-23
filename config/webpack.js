'use strict';

var glob = require('glob');
var path = require('path');
var qs = require('qs');
var webpack = require('webpack');
var ResolverPlugin = webpack.ResolverPlugin;
var DescPlugin = webpack.ResolverPlugin.DirectoryDescriptionFilePlugin;
var config = require('../config');
var loaders = {
  envify: 'transform-loader/cacheable?envify',
  traceur: 'traceur-loader?' + qs.stringify(config.traceur)
};

var options = module.exports = {
  entry: entries(),
  module: {
    loaders: [{
      test: /^(?!.*(bower_components|node_modules))+.+\.js$/,
      loader: [loaders.envify, loaders.traceur].join('!')
    }]
  },
  output: {
    path: config.paths.destination.scripts,
    filename: '[name].js'
  },
  plugins: [new ResolverPlugin(new DescPlugin('bower.json', ['main']))],
  resolve: {
    alias: config.aliases,
    modulesDirectories: ['node_modules', 'bower_components'],
    root: config.paths.source.scripts
  },
  watch: config.watch,
  watchDelay: 200
};

if(config.environment.development) {
  options.debug = true;
  options.devtool = 'inline-source-map';
}
else if(config.environment.production) {
  options.plugins = options.plugins || [];
  options.plugins.push(new webpack.optimize.UglifyJsPlugin(config.uglify));
  options.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

if(config.shared) {
  options.plugins = options.plugins || [];
  options.plugins.push(new webpack.optimize.CommonsChunkPlugin('shared.js'));
}

function entries() {
  return glob
  .sync(config.globs.scripts)
  .map(function(filename) {
    return path.basename(filename, path.extname(filename));
  })
  .reduce(function(obj, name) {
    obj[name] = name;
    return obj;
  }, {});
}
