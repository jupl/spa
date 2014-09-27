'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var util = require('gulp-util');
var webpack = require('webpack');
var xtend = require('xtend');
var config = require('../../../config');

gulp.task('build:scripts', function(callback) {
  var callbackCalled = false;
  var options = require(config.paths.karma);

  if(config.watch) {
    options = xtend(options, {watch: true});
  }

  webpack(options, function(error, stats) {
    if(error) {
      throw new util.PluginError('build:scripts', error);
    }
    if(callbackCalled) {
      util.log(stats.toString({
        assets: false,
        chunks: false,
        colors: chalk.supportsColor,
        hash: false,
        modules: false,
        reasons: false,
        source: false
      }));
    }
    else {
      callbackCalled = true;
      util.log(stats.toString({colors: chalk.supportsColor}));
      callback();
    }
  });
});
