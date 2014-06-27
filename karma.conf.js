'use strict';

require('sugar');
var config = require('./config');
var webpackConfig = require('./webpack.config');
var testFiles = config.source.scripts + '/**/*_test.js';

module.exports = function(karmaConfig) {
  var options = {
    autoWatch: true,
    frameworks: ['mocha', 'chai', 'detectBrowsers'],
    files: [testFiles],
    preprocessors: {},
    webpack: Object.reject(webpackConfig, 'context', 'entry', 'output')
  };

  options.preprocessors[testFiles] = ['webpack'];
  karmaConfig.set(options);
};
