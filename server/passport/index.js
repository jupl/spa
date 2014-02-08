var passport = require('passport');
var User = require('../models/user');
var strategies = [
  require('./local')
];

module.exports = function(app) {
  // Hook in with user model
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findOne({_id: id}, '-password').exec(done);
  });

  // Add any strategies required
  strategies.forEach(function(strategy) {
    passport.use(strategy);
  });

  // Connect middleware
  app.use(passport.initialize());
  app.use(passport.session());
};
