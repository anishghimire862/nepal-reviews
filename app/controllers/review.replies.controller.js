const ReviewReplies = require('../models/review.replies.md.model');
const ObjectId = require('mongodb').ObjectID;

const responseMapper = require('../utility/response.mapper');

const errorResponse = require('../response/error.response');
const successResponse = require('../response/success.response');

const ReplyDb = require('../db/ReplyDb');

function create (req, res) {
  ReplyDb.create(req).save(function(err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      res.json({
        message: successResponse.SUCCESSFUL_CREATION,
        data: responseMapper.replyCreationResponse(data)
      })
    }
  })
}

exports.findAll = (req, res) => {
  ReplyDb.findAll(req.params.reviewId).exec(function(err, data) {
    if(data) {
      res.json(responseMapper.toGetAllReplyResponse(data))
    }
    else {
      console.log(err)
    }
  });
};

exports.update = (req, res) => {
  let replyId = req.params.replyId;

  ReviewReplies.findOne({_id: replyId }, function(err, data) {
    console.log(replyId)
    if(err) {
      res.json({
        message: err
      })
    } else {
      console.log(data)
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
        ReviewReplies.findById(replyId, function(err, reply) {
          if(err) 
            res.send(err)
          let updatedImages = images.concat(reply.images)
          if(images) updatedImages.concat(images);
          reply.description = req.body.description || reply.description
          reply.images = updatedImages
          reply.save(function(err, data) {
            if(err)
              res.send(err)
            res.json({data: responseMapper.replyCreationResponse(data), message: successResponse.SUCCESSFUL_UPDATE })
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
  const replyId = req.params.replyId;

  ReviewReplies.findById(replyId, function(err, reply) {
    if(err) 
      res.send(err)
    let creator = reply.user_id
    let loggedInUser = req.user.userId
    if(creator == loggedInUser) {
      ReviewReplies.remove({
        _id: replyId
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

exports.deleteReplyImage = (req, res) => {
  const replyId = req.params.replyId;
  const image = req.params.image;
  ReviewReplies.findById(replyId, function(err, reply) {
    if(err) 
      res.send(err)
    console.log(reply)
    let creator = reply.user_id
    let loggedInUser = req.user.userId
    if(creator == loggedInUser) {
      ReviewReplies.update(
        { _id: replyId }, { $pull: { images:  image  } }, { safe: true, upsert: true },
        function (err, data) {
          if(err)
            console.log(err)
            res.json({
              message: successResponse.SUCCESSFUL_DELETION
            })
        }
      )
    } else {
      res.status(403).json({
        errorMessage: errorResponse.UNAUTHORIZED
      })
    }
  })
}

module.exports.create = create