'use strict';

module.exports = {
  production: process.env.NODE_ENV === 'production',
  paths: {
    public: 'public'
  },
  ports: {
    server: process.env.PORT || 8000
  },
  browserify: {
    transforms: ['envify', 'debowerify']
  }
};
