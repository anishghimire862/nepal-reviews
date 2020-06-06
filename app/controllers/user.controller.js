const User = require('../models/user.md.model');

const passport = require('../config/passport');
const jwtConfig = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const errorResponse = require('../response/error.response');
const successResponse = require('../response/success.response');

exports.new = function (req, res) {
  User.findOne({ email: req.body.email }, function(err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      if(data) {
         res.status(400).json({
          violator: "emailAddress", 
          errorMessage: errorResponse.EMAIL_ALREADY_EXISTS,
        });
      } else {
        User.findOne({ username: req.body.username }, function(err, data) {
          if(err) {
            res.json({
              message: err
            });
          } else {
            if(data) {
              res.status(400).json({
                violator: "username",
                errorMessage: errorResponse.USERNAME_ALREADY_EXISTS,
             });
           } else {
            let user = new User();
            user.username = req.body.username;
            user.email = req.body.email;
            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
              user.password = hash;
              user.save(function (err, data) {
                if(err) {
                  res.json({
                    message: err
                  });
                } else {
                  res.status(201).json({
                    message: successResponse.SUCCESSFUL_SIGNUP,
                    userInfo: {
                      id: data._id,
                      username: data.username,
                      email: data.email
                    }
                  })
                }
              })
            })
           }
          }
        })
      }
    }
  })
};

exports.login = (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    if(!user) {
      res.status(401).json({ violator: info.violator, errorMessage: info.message });
    }
    else {
      let email = req.body['email'];
      let userId = user.id
      const token = jwt.sign({email, userId}, jwtConfig.secret);
      res.status(200).json({ message: info.message, token: token, 
        userInfo: {
          username: user.username,
          email: user.email
        } 
      });
    }
  })(req, res);
};

exports.user = (req, res) => {
	if (req.headers && req.headers.authorization) {
  	var authorization = req.headers.authorization.split(' ')[1],
    	decoded;
    try {
    	decoded = jwt.verify(authorization, jwtConfig.secret);
    } catch (e) {
    	return res.status(401).json({
        violator: 'unauthorizedUser',
        errorMessage: errorResponse.UNAUTHORIZED
      });
    }
   	User.findOne({ email: decoded.email })
			.then(user => {
				if(user) {
			    res.status(200).json({ 
            loggedIn: true, 
            userInfo: {
              id: user._id,
              username: user.username,
              email: user.email
            } 
          })
				}
			})
  }
};
