'use strict';

var config = require('./config');
var gulp = require('./gulpfile');
var server = require('./server');

// Start Gulp and server
gulp.start('default');
server.listen(config.server.port, function() {
  console.log('Server started on port', config.server.port);
});
