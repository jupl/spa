'use strict';

var gulp = require('gulp');
var config = require('../../config');

gulp.task('server', ['watch'], function(callback) {
  var browserSync = require('browser-sync');
  var options = {
    ghostMode: config.environment.development,
    notify: config.environment.development,
    online: false,
    port: config.server.port,
    server: {
      baseDir: config.paths.public
    }
  };

  if(config.environment.development) {
    options.files = config.globs.public;
  }

  browserSync.init(null, options, done);
});
