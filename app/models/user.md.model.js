var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true 
  },
  user_email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var User = module.exports = mongoose.model('user', userSchema);
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
}
