'use strict';

var gulp = require('gulp');
var path = require('path');
var through = require('through2');
var config = require('./config');
var runServer = false;
var useLivereload = false;
var watchFiles = false;

// Set up Browserify transform modules
var transforms = config.browserify.transforms.slice();
if(config.production) {
  transforms.push('uglifyify');
}

// Gulp plugins
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var livereload;
var noop = function() { return through.obj(); };
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');

gulp.task('build', [
  'clean',
  'build:assets',
  'build:css',
  'build:js'
]);

gulp.task('watch', ['watch:setup', 'build'], function() {
  gulp.watch('client/assets/**/*', ['build:assets']);
  gulp.watch('client/**/*.scss', ['build:css']);
  gulp.watch(['client/**/*.js', '!client/{assets,tests}/**/*'], ['build:js']);
});

gulp.task('server', ['server:setup', 'watch'], function() {
  require('./server').listen(config.ports.server);
});

gulp.task('clean', function() {
  return gulp
  .src(path.join(config.paths.public, '*'), {read: false})
  .pipe(rimraf());
});

// TODO: Handle processing HTML, images, JSON, etc.
gulp.task('build:assets', function() {
  return gulp
  .src('client/assets/**/*')
  .pipe(gulp.dest(config.paths.public))
  .pipe((useLivereload ? livereload : noop)());
});

gulp.task('build:css', function() {
  return gulp
  .src(['client/*.scss', '!**/_*'])
  .pipe(sass({
    imagePath: './images',
    errLogToConsole: watchFiles,
    sourceComments: config.production ? '' : 'map'
  }))
  .pipe(autoprefixer())
  .pipe(config.production ? csso() : noop())
  .pipe(gulp.dest(config.paths.public))
  .pipe((useLivereload ? livereload : noop)());
});

gulp.task('build:js', function() {
  return gulp
  .src(['client/*.js', '!**/_*'], {read: false})
  .pipe(watchFiles ? plumber() : noop())
  .pipe(browserify({debug: !config.production, transform: transforms}))
  .pipe(gulp.dest(config.paths.public))
  .pipe((useLivereload ? livereload : noop)());
});

gulp.task('watch:setup', function() {
  watchFiles = true;
});

gulp.task('server:setup', function() {
  runServer = true;
  if(!config.production) {
    useLivereload = true;
    livereload = require('gulp-livereload');
  }
});
