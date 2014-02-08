var http = require('http');
var app = require('./server');
var gulp = require('./gulpfile');

gulp.start('default');
http.createServer(app).listen(8000);
