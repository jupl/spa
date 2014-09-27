'use strict';

var chalk = require('chalk');
var gulp = require('gulp');
var webpack = require('webpack');
var util = require('gulp-util');
var config = require('../../../config');

gulp.task('build:scripts', function(callback) {
  var callbackCalled = false;
  var compiler = webpack(require(config.paths.webpack));

  if(config.watch) {
    compiler.watch(200, afterCompilation);
  }
  else {
    compiler.run(afterCompilation);
  }

  function afterCompilation(error, stats) {
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
  }
});
