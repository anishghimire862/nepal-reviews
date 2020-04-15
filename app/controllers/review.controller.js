const db = require("../models");
const Review = db.reviews;
const ReviewImages = db.reviewImages
const Op = db.Sequelize.Op;

function create (req, res) {
  console.log(req.user)
  const review = {
    description: req.body.description,
    userId: req.user.userId,
    threadId: req.body.threadId
  }
  Review.create(review)
    .then(data => {
      if(req.files) {
        const files = req.files;
        for(let file of files) {
          const reviewImage = {
            image: file.filename,
            reviewId: data.id,
            userId: req.user.userId
          }
          createReviewImages(reviewImage, (res) => {
            console.log('Uploaded file:' +res)
          })
        }
        res.send({ image: 'Image/Images uploaded.', data: data })
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Thread."
      })
    })  
};

function createReviewImages (reviewImage, callback) {
  ReviewImages.create(reviewImage)
  .then(reviewData => { 
    callback(reviewData.image)
  })
}

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

				if(req.files) {
					const files = req.files;
					for(let file of files) {
						const reviewImage = {
							image: file.filename,
            	reviewId: data.id,
            	userId: req.user.userId
						}
	          createReviewImages(reviewImage, (res) => {
	            console.log('Uploaded file:' +res)
  	        })
					}
				}

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
module.exports.create = create
