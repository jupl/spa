'use strict';

var changed = require('gulp-changed');
var clone = require('gulp-clone');
var filter = require('gulp-filter');
var gm = require('gulp-gm');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var path = require('path');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var util = require('gulp-util');
var config = require('../../../config');

gulp.task('build:images', function() {
  var cloneSink = clone.sink();
  var retinaFilter = filter(['**/*@2x.*']);

  return gulp
  .src(config.globs.images)
  .pipe((config.watch ? plumber : util.noop)())
  .pipe((config.watch ? changed : util.noop)(config.paths.destination.images))
  .pipe(retinaFilter)
  .pipe(cloneSink)
  .pipe(gm(function(gmfile, done) {
    gmfile.size(function(err, size) {
      done(null, gmfile.resize(size.width * 0.5, size.height * 0.5));
    });
  }))
  .pipe(rename(function(path) {
    path.basename = path.basename.replace(/@2x$/, '');
  }))
  .pipe(retinaFilter.restore())
  .pipe(cloneSink.tap())
  .pipe((config.environment.production ? imagemin : util.noop)())
  .pipe(gulp.dest(config.paths.destination.images));
});
