'use strict';

var path = require('path');

module.exports = {
  production: process.env.NODE_ENV === 'production',
  paths: {
    public: path.resolve(__dirname, 'public')
  },
  browserify: {
    transforms: ['envify', 'debowerify']
  }
};
