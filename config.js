'use strict';

var path = require('path');

module.exports = {
  production: process.env.NODE_ENV === 'production',
  paths: {
    public: path.resolve(__dirname, 'public'),
    pushState: path.resolve(__dirname, 'public/index.html')
  },
  session: {
    mongoUri: 'mongodb://localhost/sessions',
    secret: process.env.SESSION_SECRET || 'PLACEHOLDER'
  },
  server: {
    mongoUri: 'mongodb://localhost/models',
    port: process.env.PORT || 8000
  }
};
