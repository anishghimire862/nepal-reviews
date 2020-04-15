const db = require("../models");
const Thread = db.threads;
const ThreadImages = db.threadImages
const User = db.users;
const Rating = db.ratings;
const Op = db.Sequelize.Op;

function create (req, res) {
  console.log(req.user)
  const thread = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    userId: req.user.userId
  }
  Thread.create(thread)
    .then(data => {
      if(req.files) {
        const files = req.files;
        for(let file of files) {
          const threadImage = {
            image: file.filename,
            threadId: data.id,
            userId: req.user.userId
          }
          createThreadImages(threadImage, (res) => {
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

function createThreadImages (threadImage, callback) {
  ThreadImages.create(threadImage)
  .then(threadData => { 
    callback(threadData.image)
  })
}

exports.findAll = (req, res) => {
  Thread.findAll({
		include: [{
			model: User,
			as: 'users'
    },
    { model: ThreadImages },
		{model: Rating, as: 'ratings'}
		],
		order: [
			['createdAt', 'desc']
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

exports.findOne = (req, res) => {
  let threadId = req.params.threadId;
  Thread.findByPk(threadId, {
		include: [{
			model: User,
			as: 'users'
    },
    { model: ThreadImages },
		{ model: Rating, as: 'ratings' }
		]
	})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retriving a thread."
      })
    })
};

exports.update = (req, res) => {
  let threadId = req.params.threadId;
  Thread.findByPk(threadId)
    .then(data => {
      let creator = data.userId
      let loggedInUser = req.user.userId

			if(req.files) {
		    const files = req.files;
		    for(let file of files) {
    	    const threadImage = {
            image: file.filename,
            threadId: data.id,
            userId: req.user.userId
          }
          createThreadImages(threadImage, (res) => {
            console.log('Updated file:' +res)
          })
        }
			}

      if(creator == loggedInUser) {			
        Thread.update(req.body, {
          where: { id: threadId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Thread was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update Thread. Maybe Thread was not found or req.body is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Thread"
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
  const threadId = req.params.threadId;

  Thread.findByPk(threadId)
    .then(data => {
      let creator = data.userId;
      let loggedInUser = req.user.userId;

      if(creator == loggedInUser) {
        Thread.destroy({
          where: { id: threadId }
        })
          .then(num => {
            if (num == 1) {
              res.send({
                message: "Thread was deleted successfully!"
              });
            } else {
              res.send({
                message: `Cannot delete Thread. Maybe Thread was not found!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Could not delete Thread"
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
