'use strict';

module.exports = {
  production: process.env.NODE_ENV === 'production',
  port: parseInt(process.env.PORT) || 8000,
  source: {
    scripts: 'src/scripts',
    styles: 'src/styles',
    assets: 'src/assets'
  },
  destination: {
    root: 'dist',
    assets: 'dist',
    scripts: 'dist/scripts',
    styles: 'dist/styles'
  }
};
