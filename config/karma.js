'use strict';

var xtend = require('xtend');
var config = require('../config');
var webpack = require(config.paths.webpack);

module.exports = function(karmaConfig) {
  var newWebpack = xtend({}, webpack, {
    context: undefined,
    entry: undefined,
    output: undefined
  });
  var options = {
    autoWatch: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
    files: [config.globs.tests],
    preprocessors: {},
    webpack: newWebpack
  };

  options.preprocessors[config.globs.tests] = ['webpack'];
  karmaConfig.set(options);
};
