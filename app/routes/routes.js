var express = require('express');
var router = express();
var multer = require('multer');

var multerStorage = require('../../multer');
var upload = multer({ storage: multerStorage.storage });

var passport = require('../config/passport');

var UserController = require('../controllers/user.controller.js');

var ThreadController = require('../controllers/thread.controller.js');
// var ThreadImageController = require('../controllers/thread.images.controller');

var ReviewController = require('../controllers/review.controller.js');
// var ReviewImageController = require('../controllers/review.images.controller');

// var RatingController = require('../controllers/rating.controller.js');

// threads route

router.post('/threads',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ThreadController.create
)

router.get('/threads',
  ThreadController.findAll
);

router.get('/threads/:threadId',
  ThreadController.findOne
);

router.patch('/threads/:threadId',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ThreadController.update
);

router.delete('/threads/:threadId',
  passport.authenticate('jwt', {session: false}),
  ThreadController.delete
);

// reviews route
router.post('/reviews',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReviewController.create
);

router.get('/review/:reviewId', 
	ReviewController.findOne
);

router.get('/reviews/:threadId',
  ReviewController.findAll
);

router.patch('/reviews/:reviewId',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReviewController.update
);

router.delete('/reviews/:reviewId',
  passport.authenticate('jwt', {session: false}),
  ReviewController.delete
);

// router.get('/current-user-star/:threadId/:userId',
// 	RatingController.findStarOfCurrentUser
// )

// user login/registration routes

router.post('/user',
  UserController.new
)

router.post('/api/auth/login',
  UserController.login
)

router.get('/api/auth/user',
	UserController.user
)

module.exports = router;
