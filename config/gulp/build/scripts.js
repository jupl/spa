'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var webpack = require('webpack');
var util = require('gulp-util');
var config = require('../../../config');

gulp.task('build:scripts', function(callback) {
  var callbackCalled = false;

  webpack(require(config.paths.webpack), function(err, stats) {
    if(err) {
      throw new util.PluginError('build:scripts', err);
    }
    util.log(stats.toString({
      assets: false,
      chunks: false,
      colors: chalk.supportsColor,
      timings: false
    }));
    if(!callbackCalled) {
      callbackCalled = true;
      callback();
    }
  });
});
