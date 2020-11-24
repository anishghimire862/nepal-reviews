const Reply = require('../models/review.replies.md.model');
const ObjectId = require('mongodb').ObjectID;

exports.create = function(req) {
  let reply = new Reply();
  reply.images = [];
  reply.description = req.body.description;
  reply.user_id = req.user.userId;
  reply.review_id = req.body.reviewId;

  if(req.files) {
    const files = req.files;
    for(let file of files) {
      reply.images.push(file.filename);
    }
  }
  return reply
}

exports.findAll = function(reviewId) {
  console.log(reviewId)
  return Reply.aggregate([
    {
      $match: {
        review_id: ObjectId(reviewId)
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
        user_id: {$first: '$user_id'},
        created_at: {$first: '$created_at'},
        user: {$first: '$user'}
      }
    },
    {
      "$project": {
        "_id": 1,
        "description": 1,
        "images": 1,
        "created_at": 1,
        "user_id": 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1
      }
    }
  ])
}