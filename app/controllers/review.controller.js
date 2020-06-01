const Review = require('../models/review.md.model');
const ObjectId = require('mongodb').ObjectID;

function create (req, res) {
	Review.findOne({ $and: [{thread_id: req.body.threadId}, {user_id: req.user.userId}] }, function (err, data) {
    if(err) {
      res.json({
        message: err
      });
    } else {
      if(data) {
        res.json({
          message: "You have already reviewed this Thread."
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
              message: 'Review created successfully.',
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
}

exports.findOne = (req, res) => {
	let reviewId = req.params.reviewId;
	Review.findByPk(reviewId)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occured while retriving threads."
			});
		});
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
module.exports.create = create
