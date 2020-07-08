const Thread = require('../models/thread.md.model');
const Review = require('../models/review.md.model');
const ObjectId = require('mongodb').ObjectID;

const errorResponse = require('../response/error.response');
const successResponse = require('../response/success.response');

const Utilities = require('../utility/utilities');
const ThreadDb = require('../db/ThreadDb');
const responseMapper = require('../utility/response.mapper');

function create (req, res) {
  ThreadDb.create(req).save(function(err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      res.json({
        message: successResponse.SUCCESSFUL_CREATION,
        data: responseMapper.threadCreationResponse(data)
      })
    }
  })
}

exports.findAll = (req, res) => {
  ThreadDb.findAll().exec(function(err, data) {
    if(data) {
      res.json(responseMapper.toGetAllThreadsResponse(data))
    }
    else {
      console.log(err)
    }
  });
};


exports.findOne = (req, res) => {
  let threadId = req.params.threadId;
  ThreadDb.findOne(threadId).exec(function (err, data) {
    if(data) {
      res.json(responseMapper.toGetOneThreadResponse(data[0]));
    } else {
      res.status(500).send({
        message: "Error retriving a thread."
      })
    }
  })
};

exports.update = (req, res) => {
  let threadId = req.params.threadId;
  Thread.findOne({_id: threadId}, function(err, data) {
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
        Thread.findById(threadId, function(err, thread) {
          if(err) 
            res.send(err)
          let updatedImages = images.concat(thread.images)
          if(images) updatedImages.concat(images);
          thread.description = req.body.description || thread.description
          thread.title = req.body.title || thread.title
          thread.category = req.body.category || thread.category
          thread.images = updatedImages
          thread.save(function(err, data) {
            if(err)
              res.send(err)
            res.json({
              data: responseMapper.threadCreationResponse(data),
              message: successResponse.SUCCESSFUL_UPDATE
            })
          })
        })
      } else {
        res.status(403).json({
          errorMessage: errorResponse.UNAUTHORIZED
        })
      }
    }
  })
};

exports.delete = (req, res) => {
  const threadId = req.params.threadId;

  Thread.findById(threadId, function(err, thread) {
    if(err) 
      res.send(err)
    let creator = thread.user_id
    let loggedInUser = req.user.userId
    if(creator == loggedInUser) {
      Thread.remove({
        _id: threadId
      }, function(err, data) {
        if(err)
          res.send(err)
        res.json({
          message: successResponse.SUCCESSFUL_DELETION
        })
      })
    } else {
      res.status(403).json({
        errorMessage: errorResponse.UNAUTHORIZED
      })
    }
  })
};

exports.findStarOfCurrentUser = (req, res) => {
  const threadId = req.params.threadId;
  const userId = req.params.userId;

	Review.findOne({ $and: [{thread_id: threadId}, {user_id: userId}] }, 'rating', function (err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      res.json({
        rating: data
      })
    }
  })
};

module.exports.create = create
