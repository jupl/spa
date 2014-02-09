'use strict';

var mongoose = require('mongoose');
var config = require('../../config');

module.exports = mongoose.createConnection(config.server.mongoUri);
