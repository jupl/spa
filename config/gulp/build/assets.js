'use strict';

var changed = require('gulp-changed');
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var util = require('gulp-util');
var config = require('../../../config');

gulp.task('build:assets', function() {
  return gulp
  .src(config.globs.assets)
  .pipe((config.watch ? plumber : util.noop)())
  .pipe((config.watch ? changed : util.noop)(config.paths.destination.assets))
  .pipe(gulp.dest(config.paths.destination.assets));
});
