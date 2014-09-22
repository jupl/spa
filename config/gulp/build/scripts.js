'use strict';

var browserify = require('browserify');
var es = require('event-stream');
var es6ify = require('es6ify');
var glob = require('glob');
var gulp = require('gulp');
var path = require('path');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var unreachify = require('unreachable-branch');
var unpathify = require('gulp-unpathify');
var util = require('gulp-util');
var watchify = require('watchify');
var config = require('../../../config');
es6ify.traceurOverrides = config.traceur.overrides;

gulp.task('build:scripts', function(callback) {
  var streams = glob.sync(config.globs.scripts).map(browserifier);
  return es.merge.apply(null, streams);
});

function browserifier(filename) {
  var bundler = browserify(filename, {
    cache: {},
    debug: config.environment.development,
    packageCache: {},
    fullPaths: config.watch
  });

  if(config.watch) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  if(config.traceur.runtime) {
    bundler.add(es6ify.runtime);
  }

  config.browserify.transforms.forEach(function(transform) {
    bundler.transform(transform);
  });

  if(config.environment.production) {
    bundler.transform(unreachify);
  }

  return rebundle();

  function rebundle() {
    return bundler
    .bundle()
    .pipe(source(path.relative(config.paths.source.scripts, filename)))
    .pipe((config.environment.production ? unpathify : util.noop)())
    .pipe((config.environment.production ? uglifier : util.noop)(config.uglify))
    .pipe(gulp.dest(config.paths.destination.scripts));
  }
}

function uglifier() {
  return streamify(uglify.apply(null, arguments));
}
