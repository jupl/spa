'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var config = require('../config');
var setupPassport = require('./passport');
var setupPrerender = require('./prerender');
var setupRoutes = require('./routes');
var setupSession = require('./session');

module.exports = http.createServer(app);

// Add middleware
if(config.production) {
  app.use(express.logger('dev'));
}
app.use(express.compress());
// setupPrerender(app);
app.use(express.static(config.paths.public));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
setupSession(app);
setupPassport(app);
setupRoutes(app);

// Support for HTML5 pushState
app.get('*', function(request, response) {
  response.sendfile(config.paths.pushState);
});
