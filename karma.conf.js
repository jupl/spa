'use strict';

var config = require('./config');

module.exports = function(karmaConfig) {
  karmaConfig.set(require(config.paths.karma));
};
