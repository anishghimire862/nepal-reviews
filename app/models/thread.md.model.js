var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  user_id: {
    type: Schema.ObjectId,
    ref: "User"
  },
  created_at: {
    type: Date,
    default: new Date
  }
});

var Thread = module.exports = mongoose.model('thread', threadSchema);
module.exports.get = function (callback, limit) {
  Thread.find(callback).limit(limit);
}
