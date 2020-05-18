var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  description: {
    type: String
  },
  rating: {
    type: Number,
  },
  images: {
    type: Array
  },
  thread_id: {
    type: Schema.ObjectId,
    ref: "Thread"
  },
  user_id: {
    type: Schema.ObjectId,
    ref: "User"
  }
});

var Review = module.exports = mongoose.model('review', reviewSchema);
module.exports.get = function (callback, limit) {
  Review.find(callback).limit(limit);
}
