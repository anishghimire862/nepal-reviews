var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewRepliesSchema = new Schema({
  description: {
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
  review_id: {
    type: Schema.ObjectId,
    ref: "Review"
  },
  created_at: {
    type: Date,
    default: new Date
  }
});

var ReviewReplies = module.exports = mongoose.model('reviewReplies', reviewRepliesSchema);
module.exports.get = function (callback, limit) {
  ReviewReplies.find(callback).limit(limit);
}
