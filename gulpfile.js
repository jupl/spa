'use strict';

var gulp = require('gulp');
var through = require('through2');
var config = require('./config');
var useBrowserSync = false;
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
  gulp.watch('assets/**/*', ['build:assets']);
  gulp.watch('client/**/*.scss', ['build:css']);
  gulp.watch(['client/**/*.js', '!client/tests/**/*'], ['build:js']);
});

gulp.task('server', ['watch'], function() {
  require('./server').listen(config.ports.server, function() {
    if(!config.production) {
      require('browser-sync').init(config.paths.public + '/**/*', {
        proxy: {
          host: '0.0.0.0',
          port: config.ports.server
        }
      });
    }
  });
});

gulp.task('clean', function() {
  return gulp
  .src(config.paths.public + '/*', {read: false})
  .pipe(rimraf());
});

// TODO: Handle processing HTML, images, JSON, etc.
gulp.task('build:assets', function() {
  return gulp
  .src(['assets/**/*', '!**/.*'])
  .pipe(gulp.dest(config.paths.public));
});

gulp.task('build:css', function() {
  return gulp
  .src(['client/*.scss', '!**/_*'])
  .pipe(sass({
    imagePath: '../images',
    includePath: '.',
    errLogToConsole: watchFiles,
    sourceComments: config.production ? 'none' : 'map'
  }))
  .pipe(autoprefixer())
  .pipe((config.production ? csso : noop)())
  .pipe(gulp.dest(config.paths.public + '/styles'));
});

gulp.task('build:js', function() {
  return gulp
  .src(['client/*.js', '!**/_*'], {read: false})
  .pipe((watchFiles ? plumber : noop)())
  .pipe(browserify({debug: !config.production, transform: transforms}))
  .pipe(gulp.dest(config.paths.public + '/scripts'));
});

gulp.task('watch:setup', function() {
  watchFiles = true;
});
