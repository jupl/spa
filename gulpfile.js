'use strict';

var gulp = module.exports = require('gulp');
var config = require('./config');

// Check for production
var production = require('gulp-util').env.production;
production = production || (process.env.NODE_ENV === 'production');

// Gulp plugins. For production, livereload is set to a placeholder.
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var livereload = require(production ? 'gulp-plumber' : 'gulp-livereload');
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('assets', function() {
  return gulp
  .src('client/assets/**/*')
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('browserify', function() {
  return gulp
  .src('client/*.js', {read: false})
  .pipe(plumber())
  .pipe(browserify({debug: !production, transform: ['envify']}))
  .pipe(gulpif(production, uglify()))
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('clean', function() {
  return gulp
  .src(config.public + '/*', {read: false})
  .pipe(rimraf());
});

gulp.task('stylesheets', function() {
  return gulp
  .src('client/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulpif(production, csso()))
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('default', [
  'clean',
  'watch',
  'assets',
  'stylesheets',
  'browserify'
]);

gulp.task('watch', function() {
  gulp.watch('client/assets/**/*', ['assets']);
  gulp.watch(['client/**/*.js', '!client/assets/**/*'], ['browserify']);
  gulp.watch(['client/**/*.{s,}css', '!client/assets/**/*'], ['stylesheets']);
});
