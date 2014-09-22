'use strict';

var es6ify = require('es6ify');
var path = require('path');
var globs = {
  assets: '**/*.{html,txt}',
  images: '**/*.{gif,jpeg,jpg,png,svg}'
};

var config = module.exports = {
  browserify: {
    transforms: [
      es6ify.configure(/^(?!.*node_modules)+.+\.js$/),
      'aliasify',
      'debowerify',
      'deamdify',
      'envify'
    ]
  },
  client: {
    shared: false
  },
  environment: {
    value: (process.env.NODE_ENV || 'development').trim(),
    get development() { return this.value === 'development'; },
    get production()  { return this.value === 'production'; }
  },
  globs: {
    get assets()  { return path.join(config.paths.source.assets, globs.assets); },
    get images()  { return path.join(config.paths.source.images, globs.images); },
    get public()  { return path.join(config.paths.public, '**/*'); },
    get scripts() { return path.join(config.paths.source.scripts, '*.js'); },
    styles: {
      get build() { return path.join(config.paths.source.styles, '*.css'); },
      get watch() { return path.join(config.paths.source.styles, '**/*.css'); }
    }
  },
  paths: {
    base: path.join(__dirname, '..'),
    get gulp()    { return path.join(this.base, 'config/gulp'); },
    get public()  { return path.join(this.base, 'public'); },
    source: {
      get root()    { return path.join(config.paths.base, 'client'); },
      get assets()  { return path.join(this.root, 'assets'); },
      get images()  { return path.join(this.root, 'images'); },
      get scripts() { return path.join(this.root, 'scripts'); },
      get styles()  { return path.join(this.root, 'styles'); }
    },
    destination: {
      get root()    { return config.paths.public; },
      get assets()  { return this.root; },
      get images()  { return path.join(this.root, 'images'); },
      get scripts() { return path.join(this.root, 'scripts'); },
      get styles()  { return path.join(this.root, 'styles'); }
    }
  },
  server: {
    port: parseInt(process.env.PORT, 10) || 8000
  },
  traceur: {
    overrides: {
      blockBinding: true
    },
    runtime: false
  },
  uglify: {}
};
