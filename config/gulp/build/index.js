'use strict';

var gulp = require('gulp');

gulp.task('build', [
  'clean',
  'build:assets',
  'build:images',
  'build:styles',
  'build:scripts'
]);
