const db = require("../models");
const ThreadImages = db.threadImages
exports.delete = (req, res) => {
  const imageId = req.params.imageId;

  ThreadImages.findByPk(imageId)
    .then(data => {
      let creator = data.userId;
      let loggedInUser = req.user.userId;

      if(creator == loggedInUser) {
        ThreadImages.destroy({
          where: { id: imageId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Thread Image was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Thread Image. Maybe Thread was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Thread Image"
            });
          });
      } else {
        res.status(403).send({
          message: "Forbidden!!"
        })
      }
    })
};
