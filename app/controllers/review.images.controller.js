const db = require("../models");
const ReviewImages = db.reviewImages
exports.delete = (req, res) => {
  const imageId = req.params.imageId;

  ReviewImages.findByPk(imageId)
    .then(data => {
      let creator = data.userId;
      let loggedInUser = req.user.userId;

      if(creator == loggedInUser) {
        ReviewImages.destroy({
          where: { id: imageId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Review Image was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Review Image. Maybe Review was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Review Image"
            });
          });
      } else {
        res.status(403).send({
          message: "Forbidden!!"
        })
      }
    })
};

