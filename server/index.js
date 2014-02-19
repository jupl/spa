'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('../config');
var app = express();

module.exports = http.createServer(app);

// Add middleware
if(!config.production) {
  app.use(express.logger('dev'));
}
app.use(express.compress());
app.use(express.static(config.paths.public));

// Basic support for HTML5 pushState
var indexPath = path.join(config.paths.public, 'index.html');
app.get('*', function(request, response) {
  response.sendfile(indexPath);
});
