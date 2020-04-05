const db = require("../models");
const Review = db.reviews;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const review = {
    description: req.body.description,
    userId: req.user.userId,
    threadId: req.body.threadId
  }

  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Thread."
      })
    })  
};

// find reviews by threadId
// reviews of a thread
exports.findAll = (req, res) => {
  let threadId = req.params.threadId;
  Review.findAll({where: {threadId: threadId}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while retriving threads."
      });
    });
};

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
  Review.findByPk(reviewId)
    .then(data => {
      let creator = data.userId
      let loggedInUser = req.user.userId

      if(creator == loggedInUser) {
        Review.update(req.body, {
          where: { id: reviewId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Review was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Review. Maybe Review was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Review"
            });
          });
      } else {
        res.status(403).send({
          message: "Forbidden!!"
        })
      } 
    })
};

exports.delete = (req, res) => {
  const reviewId = req.params.reviewId;

  Review.findByPk(reviewId)
    .then(data => {
      let creator = data.userId;
      let loggedInUser = req.user.userId;

      if(creator == loggedInUser) {
        Review.destroy({
          where: { id: reviewId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Review was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Review. Maybe Review was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Review"
            });
          });
      } else {
        res.status(403).send({
          message: "Forbidden!!"
        })
      }
    })
};
