'use strict';

var glob = require('glob');
var path = require('path');
var qs = require('qs');
var webpack = require('webpack');
var ResolverPlugin = webpack.ResolverPlugin;
var DescPlugin = webpack.ResolverPlugin.DirectoryDescriptionFilePlugin;
var config = require('../config');
var commonsChunk;
var commonsFile;
var loaders = {
  envify: 'transform-loader/cacheable?envify',
  traceur: 'traceur-loader?' + qs.stringify(config.traceur)
};

var options = module.exports = {
  entry: glob.sync(config.globs.scripts).reduce(function(obj, filename) {
    obj[path.basename(filename, path.extname(filename))] = filename;
    return obj;
  }, {}),
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
  }
};

if(config.environment.development) {
  options.debug = true;
  options.devtool = 'inline-source-map';
  options.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]';
}
else if(config.environment.production) {
  options.plugins = options.plugins || [];
  options.plugins.push(new webpack.optimize.UglifyJsPlugin(config.uglify));
  options.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

if(typeof config.commons === 'string') {
  commonsChunk = path.basename(config.shared, '.js');
  commonsFile = commonsChunk + '.js';
  options.plugins = options.plugins || [];
  options.plugins.push(new webpack.optimize.CommonsChunkPlugin(commonsChunk,
                                                               commonsFile));
}
