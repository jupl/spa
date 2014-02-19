var config = require('./config');

module.exports = function(karmaConfig) {
  karmaConfig.set({
    frameworks: [
      'mocha',
      'chai',
      'sinon-chai',
      'browserify',
      'detectBrowsers'
    ],
    files: ['client/tests/*-test.js'],
    preprocessors: {'client/tests/*-test.js': ['browserify']},
    browserify: {
      transform: config.browserify.transforms,
      watch: true,
      debug: true
    }
  });
};
