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
    if(callbackCalled) {
      util.log(stats.toString({
        assets: false,
        chunks: false,
        colors: chalk.supportsColor,
        reasons: false,
        timings: false
      }));
    }
    else {
      callbackCalled = true;
      util.log(stats.toString({colors: chalk.supportsColor}));
      callback();
    }
  });
});
