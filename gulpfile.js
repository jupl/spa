'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require('./config');
var runServer = false;

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
var gulpif = require('gulp-if');
var livereload = require(config.production ? 'gulp-plumber' : 'gulp-livereload');
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');

gulp.task('build', [
  'clean',
  'build:assets',
  'build:css',
  'build:js'
]);

gulp.task('watch', ['build'], function() {
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
  .pipe(gulpif(runServer, livereload()));
});

gulp.task('build:css', function() {
  return gulp
  .src(['client/*.scss', '!**/_*'])
  .pipe(plumber())
  .pipe(sass({imagePath: './images', sourceComments: config.production ? '' : 'map'}))
  .pipe(autoprefixer())
  .pipe(gulpif(config.production, csso()))
  .pipe(gulp.dest(config.paths.public))
  .pipe(gulpif(runServer, livereload()));
});

gulp.task('build:js', function() {
  return gulp
  .src(['client/*.js', '!**/_*'], {read: false})
  .pipe(plumber())
  .pipe(browserify({debug: !config.production, transform: transforms}))
  .pipe(gulp.dest(config.paths.public))
  .pipe(gulpif(runServer, livereload()));
});

gulp.task('server:setup', function() {
  runServer = true;
});
