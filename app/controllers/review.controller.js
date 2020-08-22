const Review = require('../models/review.md.model');
const ObjectId = require('mongodb').ObjectID;

const ReviewDb = require('../db/ReviewDb');
const responseMapper = require('../utility/response.mapper');

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
        ReviewDb.create(req).save(function(err, data) {
          if(err) {
            res.json({
              message: err
            });
          } else {
            res.json({
              message: successResponse.SUCCESSFUL_CREATION,
              data: responseMapper.reviewCreationResponse(data)
            })
          }
        })
      }
    }
  })
}

exports.findAll = (req, res) => {
  let threadId = req.params.threadId;
  ReviewDb.findAll(threadId).exec(function (err, data) {
    if(data) {
      res.json(responseMapper.toGetAllReviewsResponse(data));
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
      console.log(data)
    res.json(responseMapper.toGetOneReviewResponse(data))
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
            res.json({data: responseMapper.reviewCreationResponse(data), message: successResponse.SUCCESSFUL_UPDATE })
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
