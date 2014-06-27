'use strict';

var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var karma = require('karma');
var path = require('path');
var plugin = require('gulp-load-plugins')();
var webpack = require('webpack');

var config = require('./config');
var karmaConfigFile = path.resolve(__dirname, 'karma.conf.js');
var webpackConfig = require('./webpack.config');
var watchFiles = false;

gulp.task('bower', function() {
  return plugin.bower();
});

gulp.task('build', [
  'clean',
  'build:assets',
  'build:styles',
  'build:scripts'
]);

gulp.task('build:assets', function() {
  return gulp
  .src([config.source.assets + '/**/*', '!**/.*'])
  .pipe(gulp.dest(config.destination.assets));
})

gulp.task('build:scripts', function(callback) {
  var compiler = webpack(webpackConfig);

  if(watchFiles) {
    compiler.watch(200, webpackCallback);
  }
  else {
    compiler.run(webpackCallback);
  }

  function webpackCallback(err, stats) {
    if(err) {
      throw new plugin.util.PluginError('build:scripts', err);
    }
    plugin.util.log(stats.toString({colors: true}));
    if(callback) {
      callback();
      callback = null;
    }
  }
});

gulp.task('build:styles', function() {
  return gulp
  .src([config.source.styles + '/*.less'])
  .pipe(plugin.less({
    paths: ['bower_components', config.source.styles],
    sourceMap: !config.production
  }))
  .pipe(plugin.autoprefixer({map: false}))
  .pipe((config.production ? plugin.csso : plugin.util.noop)())
  .pipe(gulp.dest(config.destination.styles));
});

gulp.task('clean', function() {
  del.sync(config.destination.root);
});

gulp.task('server', ['watch'], function(callback) {
  var files = config.destination.root + '/**/*';
  browserSync.init(null, {
    files: files,
    port: config.port,
    server: {
      baseDir: config.destination.root
    }
  }, callback);
});

gulp.task('unit:test', function(callback) {
  karma.server.start({
    singleRun: !watchFiles,
    configFile: karmaConfigFile
  }, function() {
    callback();
    if(!watchFiles) {
      process.exit();
    }
  });
});

gulp.task('unit:tdd', ['watch:setup', 'unit:test']);

gulp.task('unit:tdd:server', ['server', 'unit:test']);

gulp.task('watch', ['watch:setup', 'build'], function() {
  gulp.watch(config.source.assets + '/**/*', ['build:assets']);
  gulp.watch(config.source.styles + '/**/*', ['build:styles']);
});

gulp.task('watch:setup', function() {
  watchFiles = true;
});
