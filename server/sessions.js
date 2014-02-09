'use strict';

var express = require('express');
var MongoStore = require('connect-mongo')(express);

module.exports = function(app) {
  // Set up sessions with MongoDB
  app.use(express.session({
    secret: 'PLACEHOLDER',
    store: new MongoStore({db: 'sessions'})
  }));
};
