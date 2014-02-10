module.exports = function(config) {
  config.set({
    autoWatch: true,
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
      transform: ['envify'],
      watch: true,
      debug: true
    }
  });
};
