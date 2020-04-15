const db = require("../models");
const Rating = db.ratings;
const Review = db.reviews;
const ReviewImages = db.reviewImages;
const ThreadImages = db.threadImages;
const Thread = db.threads;
const User = db.users;

const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  const rating = {
    star: req.body.star,
    userId: req.user.userId,
    threadId: req.body.threadId
  }

  Rating.findOne({ where: { [Op.and]: [{threadId: rating.threadId}, {userId: rating.userId}] } })
    .then(data => {
      if(data) {
        let creator = data.userId
        let loggedInUser = req.user.userId

        if(creator === loggedInUser) {
          Rating.update(req.body, {
            where: { [Op.and]: [{threadId: rating.threadId}, {userId: rating.userId}] }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "Rating updated successfully."
                });
              } else {
                res.send({
                  message: `Cannot update Rating. Maybe Rating was not found or req.body is empty!`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating Rating"
              });
            });
        } else {
          res.status(403).send({
            message: "Forbidden!!"
          })  
        }
      } else {
        Rating.create(rating)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occured while creating the Thread."
          })
        })  
      }
    })
};

// find ratings by threadId
// ratings of a thread
exports.findAll = (req, res) => {
  let threadId = req.params.threadId;
  Thread.findAll({where: { id: threadId},
    include: [
      { model: ThreadImages },
      { 
        model: Review,
        include: [
          {
            model: ReviewImages
          },
          {
            model: User,
            as: 'users',
            include: [
              {
                model: Rating,
                as: 'ratings',
                required: false,
                where: { threadId: threadId }
              }
            ]
          },
        ]
      }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retriving threads."
      });
    });
};

exports.findReviewsAndRatings = (req, res) => {
  Thread.findAll({  
    where: { id: 8 },
    // include: [{
      // model: Review,
      // as: 'reviews',
      include: [{
        // model: User,
        // as: 'users',
        // required: false
        nested: true,
        all: true
      }],
      // nested: true
    // }]
  })
  .then(data => {
    console.log(typeof(data))
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message: err.message || "Some error occured while retriving threads."
    });
  })
};

exports.findStarOfCurrentUser = (req, res) => {
	let threadId = req.params.threadId;
	let currentUser = req.params.userId;
  Rating.findOne({ where: { [Op.and]: [{threadId: threadId}, {userId: currentUser}] } })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
	    res.status(500).send({
  	    message: err.message || "Some error occured while retriving threads."
    	});
		})
}
