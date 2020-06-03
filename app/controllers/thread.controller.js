const Thread = require('../models/thread.md.model');
const Review = require('../models/review.md.model');
const User = require('../models/user.md.model');
const ObjectId = require('mongodb').ObjectID;

function create (req, res) {
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
  thread.save(function(err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      res.json({
        message: 'Thread created successfully.',
        data: data
      })
    }
  })
}

exports.findAll = (req, res) => {
  Thread.aggregate([
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
        reviews: {$push: {
          review: '$reviews',
          user: '$user'
        }}
      }
    }
  ]).exec(function(err, data) {
    if(data) {
      res.send(data)
    }
    else {
      res.send(err)
    }
  });
};

exports.findOne = (req, res) => {
  let threadId = req.params.threadId;
  Thread.aggregate([
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
        reviews: {$push: {
          review: '$reviews',
          user: '$user'
        }}
      }
    }
  ]).exec(function (err, data) {
    if(data) {
      res.send(data);
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
            res.send(data)
          })
        })
      } else {
        res.json({
          message: "Forbidden!!"
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
          status: "success",
          message: "Deleted successfully"
        })
      })
    } else {
      res.json({
        message: "Forbidden!!"
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
