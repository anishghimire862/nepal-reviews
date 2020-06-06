const User = require('../models/user.md.model');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JwtConfig = require('./jwtConfig.js');

const errorResponse = require('../response/error.response');
const successResponse = require('../response/success.response');


const bcrypt = require('bcrypt');
const saltRounds = 10;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {

    User.findOne({ $or: [{email: email}, {username: email}] })
      .then(user => {
        if(user) {
          bcrypt.compare(password, user.password, function(err, result) {
            if(result == true) {
              return done(null, user, { 
                message: successResponse.SUCCESSFUL_LOGIN 
              });
            } else {
              return done(null, false, {
                message: errorResponse.INVALID_LOGIN_DETAILS 
              });
            }
          })
        } else {
          return done(null, false, { 
            violator: email.includes('@') ? 'emailAddress' : 'username',
            message: errorResponse.INVALID_LOGIN_DETAILS 
          });
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

