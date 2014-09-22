'use strict';

var del = require('del');
var gulp = require('gulp');
var config = require('../../config');

gulp.task('clean', function() {
  del.sync(config.paths.destination.root);
});
