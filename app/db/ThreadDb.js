const Thread = require('../models/thread.md.model');
const ObjectId = require('mongodb').ObjectID;

exports.findAll = function() {
  return Thread.aggregate([
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
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "thread_id",
        as: "reviews"
      }
    },
    { $unwind: {path: '$reviews', "preserveNullAndEmptyArrays": true }},
    {
      $group: {
        _id: '$_id',
        title: {$first: '$title'},
        description: {$first: '$description'},
        category: {$first: '$category'},
        images: {$first: '$images'},
        user_id: {$first: '$user_id'},
        user: {$first: '$user'},
        average_rating: { $avg : '$reviews.rating' },
        created_at: { $first: '$created_at' }
        // reviews: {$push: {
        //   review: '$reviews',
        //   user: '$user'
        // }}
      }
    },
    {
      "$project": {
        "_id": 1,
        "title": 1,
        "description": 1,
        "category": 1,
        "images": 1,
        "user_id": 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1,
        "average_rating": 1,
        "created_at": 1
      }
    }
  ])
}

exports.findOne = function(threadId) {
  return Thread.aggregate([
    {
      $match: {
        _id: ObjectId(threadId)
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
    { $unwind: {path: '$user', preserveNullAndEmptyArrays: true} },
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "thread_id",
        as: "reviews"
      }
    },
    {$unwind: {path: '$reviews', preserveNullAndEmptyArrays: true}},
    {
      $group: {
        _id: '$_id',
        title: {$first: '$title'},
        description: {$first: '$description'},
        category: {$first: '$category'},
        images: {$first: '$images'},
        user_id: {$first: '$user_id'},
        user: {$first: '$user'},
        average_rating: { $avg : '$reviews.rating' },
        created_at: { $first: '$created_at' }
        // reviews: {$push: {
        //   review: '$reviews',
        //   user: '$user'
        // }}
      }
    },
    {
      "$project": {
        "_id": 1,
        "title": 1,
        "description": 1,
        "category": 1,
        "images": 1,
        "user_id": 1,
        "user._id": 1,
        "user.username": 1,
        "user.email": 1,
        "average_rating": 1,
        "created_at": 1
      }
    }
  ])
}

exports.create = function(req) {
  let thread = new Thread();
  thread.images = [];
  thread.title = req.body.title;
  thread.description = req.body.description;
  thread.category = req.body.category;
  thread.user_id = req.user.userId;

  if(req.files) {
    const files = req.files;
    for(let file of files) {
      thread.images.push(file.filename);
    }
  }
  return thread
}