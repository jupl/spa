'use strict';

var gulp = module.exports = require('gulp');
var config = require('./config');

// Gulp plugins
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var livereload = require('gulp-plumber'); // Placeholder for non-production
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Check for production
var production = gutil.env.production || (process.env.NODE_ENV === 'production');

// Set up live reload if available
try {
  if(!production) {
    livereload = require('gulp-livereload');
  }
}
catch(e) {}

gulp.task('assets', function() {
  return gulp
  .src('client/assets/*')
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('browserify', function() {
  return gulp
  .src('client/index.js', {read: false})
  .pipe(plumber())
  .pipe(browserify({debug: !production}))
  .pipe(gulpif(production, uglify()))
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('clean', function() {
  return gulp
  .src(config.public, {read: false})
  .pipe(rimraf());
});

gulp.task('stylesheets', function() {
  return gulp
  .src('client/index.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulpif(production, csso()))
  .pipe(gulp.dest(config.public))
  .pipe(gulpif(!production, livereload()));
});

gulp.task('default', [
  'clean',
  'assets',
  'stylesheets',
  'browserify',
  'watch'
]);

gulp.task('watch', function() {
  gulp.watch('client/assets/*', ['assets']);
  gulp.watch(['client/**/*.js', '!client/assets/*'], ['browserify']);
  gulp.watch(['client/**/*.{css,scss}', '!client/assets/*'], ['stylesheets']);
});
