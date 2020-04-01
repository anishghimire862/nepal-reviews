var passport = require('../config/passport');
var jwtConfig = require('../config/jwtConfig');
var jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = (req, res) => {

  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if(user) {
        res.status(409).send({
          message: 'Email already exists'
        });
      } else {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            const user = {
              email: req.body.email,
              password: hash
            }
            User.create(user)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occured while creating the Thread."
              })
            })
          })  
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
      const token = jwt.sign(email, jwtConfig.secret);
      res.status(200).json({ message: info.message, token: token });
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
   	User.findOne({where: {email: decoded} })
			.then(user => {
				if(user) {
			    res.status(200).json({ loggedIn: true, data: user })
				}
			})
		// res.status(200).json({ loggedIn: true, data: {email: 'anish'} })
  }
};
