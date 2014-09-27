'use strict';

var xtend = require('xtend');
var config = require('../config');
var webpack = require(config.paths.webpack);

var options = module.exports = {
  autoWatch: true,
  browsers: ['PhantomJS'],
  frameworks: ['mocha', 'chai'],
  files: [config.globs.tests],
  preprocessors: {},
  webpack: xtend({}, webpack, {
    context: undefined,
    entry: undefined,
    output: undefined
  })
};
options.preprocessors[config.globs.tests] = ['webpack'];
