'use strict';

var csso = require('gulp-csso');
var gulp = require('gulp');
var myth = require('gulp-myth');
var path = require('path');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var config = require('../../../config');

gulp.task('build:styles', function() {
  return gulp
  .src(config.globs.styles.build)
  .pipe((config.watch ? plumber : util.noop)())
  .pipe(myth({sourcemap: config.environment.development}))
  .pipe((config.environment.production ? csso : util.noop)())
  .pipe(gulp.dest(config.paths.destination.styles));
});
