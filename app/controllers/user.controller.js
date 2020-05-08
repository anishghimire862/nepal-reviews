var passport = require('../config/passport');
var jwtConfig = require('../config/jwtConfig');
var jwt = require('jsonwebtoken');

// const db = require("../models");
// const User = db.users;
const User = require('../models/user.md.model');
// const Op = db.Sequelize.Op;

var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.new = function (req, res) {
  console.log(req.body)
  User.findOne({ email: req.body.email }, function(err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      if(data) {
        res.json({
          message: 'Email already exists'
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
              res.json({
                message: 'User created successfully.',
                data: data
              })
            }
          })
        })
      }
    }
  })
};

exports.login = (req, res) => {
  passport.authenticate('local', function(err, user, info) {
    if(!user) {
      res.status(401).json({ message: info.message });
    }
    else {
      let email = req.body['email'];
      let userId = user.id
      const token = jwt.sign({email, userId}, jwtConfig.secret);
      res.status(200).json({ message: info.message, token: token, user: user });
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
    	return res.status(401).send('unauthorized');
    }
   	User.findOne({ email: decoded.email })
			.then(user => {
				if(user) {
			    res.status(200).json({ loggedIn: true, data: user })
				}
			})
  }
};
