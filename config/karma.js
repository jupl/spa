'use strict';

var config = require('../config');
var webpack = require(config.paths.webpack);

module.exports = function(karmaConfig) {
  var newWebpack = Object.create(webpack);
  var options = {
    autoWatch: true,
    frameworks: ['mocha', 'chai'],
    files: [config.globs.tests],
    preprocessors: {},
    webpack: newWebpack
  };

  newWebpack.context = null;
  newWebpack.entry = null;
  newWebpack.output = null;
  options.preprocessors[config.globs.tests] = ['webpack'];

  karmaConfig.set(options);
};
