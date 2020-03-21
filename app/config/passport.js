const db = require("../models");
const User = db.users;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportJWT = require("passport-jwt");
var JWTStrategy   = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;
var JwtConfig = require('./jwtConfig.js');
const Op = db.Sequelize.Op;

var bcrypt = require('bcrypt');
const saltRounds = 10;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    // Using AND
    // User.findOne({ where: {[Op.and]: [{email: email}, {password: password}]} }) 

    User.findOne({ where: {email: email} })
      .then(user => {
        if(user) {
          bcrypt.compare(password, user.password, function(err, result) {
            if(result == true) {
              return done(null, user, { message: 'Logged in successfully.' });
            } else {
              return done(null, false, {message: 'Incorrect email or password.'});
            }
          })
        } else {
          return done(null, false, {message: 'Incorrect email or password.'});
        }
      })
      .catch(err => done(err))
  }
));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey   : JwtConfig.secret
  },

  function (jwtPayload, cb) {
    return cb(null, jwtPayload)
  }
));



passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;

