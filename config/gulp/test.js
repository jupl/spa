'use strict';

var gulp = require('gulp');
var xtend = require('xtend');
var config = require('../../config');

gulp.task('test', ['test:setup'], function(callback) {
  var karma = require('karma');
  var options = xtend(require(config.paths.karma), {
    singleRun: !config.watch
  });

  options.webpack.watch = config.watch;
  karma.server.start(options);
});

gulp.task('test:watch', ['watch:setup', 'test']);

gulp.task('test:setup', function() {
  config.test = true;
});
