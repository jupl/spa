'use strict';

var gulp = require('gulp');
var config = require('../../config');

gulp.task('test', ['test:setup'], function(callback) {
  var karma = require('karma');
  karma.server.start({configFile: config.paths.karma}, callback);
});

gulp.task('test:watch', ['watch:setup', 'test']);

gulp.task('test:setup', function() {
  config.test = true;
});
