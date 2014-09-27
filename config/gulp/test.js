'use strict';

var gulp = require('gulp');
var config = require('../../config');

gulp.task('test', ['test:setup'], function(callback) {
  var karma = require('karma');
  var karmaConfigRunner = require(config.paths.karma);
  var options = {};
  var karmaConfig = {
    set: function(karmaOptions) {
      options = karmaOptions;
    }
  };

  options.singleRun = !config.watch;
  karmaConfigRunner(karmaConfig);
  karma.server.start(options, callback);
});

gulp.task('test:watch', ['watch:setup', 'test']);

gulp.task('test:setup', function() {
  config.test = true;
});
