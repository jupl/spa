'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.createConnection('localhost', 'models');
