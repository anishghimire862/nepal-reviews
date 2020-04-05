var express = require('express');
var router = express();

var passport = require('../config/passport');

var UserController = require('../controllers/user.controller.js');

var ThreadController = require('../controllers/thread.controller.js');

var ReviewController = require('../controllers/review.controller.js');

var RatingController = require('../controllers/rating.controller.js');

// threads route

router.post('/threads',
  passport.authenticate('jwt', {session: false}),
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
  ThreadController.update
);

router.delete('/threads/:threadId',
  passport.authenticate('jwt', {session: false}),
  ThreadController.delete
);

// reviews route
router.post('/reviews',
  passport.authenticate('jwt', {session: false}),
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
  ReviewController.update
);

router.delete('/reviews/:reviewId',
  passport.authenticate('jwt', {session: false}),
  ReviewController.delete
);

//threads rating routes

router.post('/ratings',
  passport.authenticate('jwt', {session: false}),
  RatingController.create
);

router.get('/ratings/:threadId',
  RatingController.findAll
);

router.get('/reviews-ratings',
  RatingController.findReviewsAndRatings
)

router.get('/current-user-star/:threadId/:userId',
	RatingController.findStarOfCurrentUser
)

// user login/registration routes

router.post('/user',
  UserController.create
)

router.post('/api/auth/login',
  UserController.login
)

router.get('/api/auth/user',
	UserController.user
)

module.exports = router;
