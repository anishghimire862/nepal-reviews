const Review = require('../models/review.md.model');
const ObjectId = require('mongodb').ObjectID;

const errorResponse = require('../response/error.response');
const successResponse = require('../response/success.response');

function create (req, res) {
	Review.findOne({ $and: [{thread_id: req.body.threadId}, {user_id: req.user.userId}] }, function (err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      if(data) {
        res.json({
          violator: "thread",
          errorMessage: errorResponse.REVIEW_ALREADY_EXISTS
        })
      } else {
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

        review.save(function(err, data) {
          if(err) {
            res.json({
              message: err
            });
          } else {
            res.json({
              message: successResponse.SUCCESSFUL_CREATION,
              data: data
            })
          }
        })
      }
    }
  })
}

exports.findAll = (req, res) => {
  let threadId = req.params.threadId;
  Review.aggregate([
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
  ]).exec(function (err, data) {
    if(data) {
      res.send(data);
    } else {
      res.status(500).send({
        message: err
      })
    }
  })
}

exports.findOne = (req, res) => {
	let reviewId = req.params.reviewId;
	Review.findOne({_id: reviewId}, function(err, data) {
    if(err)
      res.json(err)
    res.json(data)
  })
};

exports.update = (req, res) => {
  let reviewId = req.params.reviewId;

  Review.findOne({_id: reviewId }, function(err, data) {
    if(err) {
      res.json({
        message: err
      })
    } else {
      let creator = data.user_id
      let loggedInUser = req.user.userId
      let images = []
      if(creator == loggedInUser) {
        if(req.files) {
          const files = req.files;
          for(let file of files) {
            images.push(file.filename);
          }
        }
        Review.findById(reviewId, function(err, review) {
          if(err) 
            res.send(err)
          let updatedImages = images.concat(review.images)
          if(images) updatedImages.concat(images);
          review.description = req.body.description || review.description
          review.rating = req.body.rating || review.rating
          review.images = updatedImages
          review.save(function(err, data) {
            if(err)
              res.send(err)
            res.json({data: data, message: successResponse.SUCCESSFUL_UPDATE })
          })
        })
      } else {
        res.json({
          errorMessage: errorResponse.UNAUTHORIZED
        })
      }
    }
  })
};

exports.delete = (req, res) => {
  const reviewId = req.params.reviewId;

  Review.findById(reviewId, function(err, review) {
    if(err) 
      res.send(err)
    let creator = review.user_id
    let loggedInUser = req.user.userId
    if(creator == loggedInUser) {
      Review.remove({
        _id: reviewId
      }, function(err, data) {
        if(err)
          res.send(err)
        res.json({
          message: successResponse.SUCCESSFUL_DELETION
        })
      })
    } else {
      res.json({
        errorMessage: errorResponse.UNAUTHORIZED
      })
    }
  })
};
module.exports.create = create
