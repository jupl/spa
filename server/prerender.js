'use strict';

var middleware = require('prerender-node');

/**
 * Connect Prerender to our application.
 * @param {Express} app Express application to add Passport to.
 */
module.exports = function(app) {
  // Set up Prerender middleware and link to server
  middleware.set('prerenderServiceUrl', 'http://127.0.0.1:3000');
  app.use(middleware);
};
