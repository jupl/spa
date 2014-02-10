'use strict';

var gulp = module.exports = require('gulp');
var config = require('./config');

// Environment-specific configurations
var livereloadPackage = config.production ? 'gulp-plumber' : 'gulp-livereload';
var browserifyTransform = ['envify'];
if(config.production) {
  browserifyTransform.push('uglifyify');
}

// Gulp plugins
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var gulpif = require('gulp-if');
var livereload = require(livereloadPackage);
var plumber = require('gulp-plumber');
var rimraf = require('gulp-rimraf');
var sass = require('gulp-sass');

gulp.task('assets', function() {
  return gulp
  .src('client/assets/**/*')
  .pipe(gulp.dest(config.paths.public))
  .pipe(gulpif(!config.production, livereload()));
});

gulp.task('browserify', function() {
  return gulp
  .src(['client/*.js', '!client/_*'], {read: false})
  .pipe(plumber())
  .pipe(browserify({
    debug: !config.production,
    transform: browserifyTransform
  }))
  .pipe(gulp.dest(config.paths.public))
  .pipe(gulpif(!config.production, livereload()));
});

gulp.task('clean', function() {
  return gulp
  .src(config.paths.public + '/*', {read: false})
  .pipe(rimraf());
});

gulp.task('stylesheets', function() {
  return gulp
  .src(['client/*.scss', '!client/_*'])
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulpif(config.production, csso()))
  .pipe(gulp.dest(config.paths.public))
  .pipe(gulpif(!config.production, livereload()));
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
  gulp.watch([
    'client/**/*.js',
    '!client/{assets,tests}/**/*'
  ], ['browserify']);
  gulp.watch([
    'client/**/*.{s,}css',
    '!client/{assets,tests}/**/*'
  ], ['stylesheets']);
});
