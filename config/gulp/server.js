'use strict';

var Promise = require('bluebird');
var gulp = require('gulp');
var config = require('../../config');

gulp.task('server', ['watch'], function() {
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

  return new Promise(function(resolve, reject) {
    browserSync.init(null, options, function(err) {
      !err ? resolve() : reject(err);
    });
  });
});
