var express = require('express');
var path = require('path');
var config = require('../config');
var connectMongo = require('connect-mongo');
var setupPassport = require('./passport');
var setupPrerender = require('./prerender');
var setupRoutes = require('./routes');
var setupSessions = require('./sessions');
var app = module.exports = express();
var MongoStore = connectMongo(express);

// Add middleware
if(process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
}
app.use(express.compress());
// setupPrerender(app);
app.use(express.static(config.public));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.cookieParser());
setupSessions(app);
setupPassport(app);
setupRoutes(app);

// Support for HTML5 pushState
var index = path.resolve(config.public, 'index.html');
app.get('*', function(request, response) {
  response.sendfile(index);
});
