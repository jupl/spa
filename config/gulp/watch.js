'use strict';

var gulp = require('gulp');
var config = require('../../config');
config.watch = false;

gulp.task('watch', ['watch:setup', 'build'], function() {
  gulp.watch(config.globs.assets, ['build:assets']);
  gulp.watch(config.globs.images, ['build:images']);
  gulp.watch(config.globs.styles.watch, ['build:styles']);
});

gulp.task('watch:setup', function() {
  config.watch = true;
});
