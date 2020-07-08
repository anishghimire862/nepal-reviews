const Review = require('../models/review.md.model');
const ObjectId = require('mongodb').ObjectID;

exports.create = function(req) {
  let review = new Review();
  review.images = [];
  review.description = req.body.description
  review.rating = req.body.rating
  review.user_id = req.user.userId
  review.thread_id = req.body.threadId
  
  if(req.files) {
    const files = req.files;
    for(let file of files) {
      review.images.push(file.filename);
    }
  }
  return review
}

exports.findAll = function(threadId) {
  return Review.aggregate([
    {
      $match: {
        thread_id: ObjectId(threadId)
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: {path: '$user', "preserveNullAndEmptyArrays": true }},
    {
      $group: {
        _id: '$_id',
        description: {$first: '$description'},
        images: {$first: '$images'},
        rating: {$first: '$rating'},
        user_id: {$first: '$user_id'},
        user: {$first: '$user'}
      }
    },
    {
      "$project": {
        "_id": 1,
        "description": 1,
        "images": 1,
        "rating": 1,
        "user_id": 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1
      }
    }
  ])
}