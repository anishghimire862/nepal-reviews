var express = require('express');
var router = express();
var multer = require('multer');

var multerStorage = require('../../multer');
var upload = multer({ storage: multerStorage.storage });

var passport = require('../config/passport');

var UserController = require('../controllers/user.controller.js');
var ThreadController = require('../controllers/thread.controller.js');
var ReviewController = require('../controllers/review.controller.js');
var ReplyController = require('../controllers/review.replies.controller');
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

router.put('/threads/:threadId',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ThreadController.update
);

router.delete('/threads/:threadId',
  passport.authenticate('jwt', {session: false}),
  ThreadController.delete
);

router.delete('/threads/:threadId/images/:image',
  passport.authenticate('jwt', {session: false}),
  ThreadController.deleteThreadImage
);

// reviews route
router.post('/reviews',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReviewController.create
);

router.get('/reviews/:reviewId', 
	ReviewController.findOne
);

router.get('/reviews/threads/:threadId',
  ReviewController.findAll
);

router.put('/reviews/:reviewId',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReviewController.update
);

router.delete('/reviews/:reviewId',
  passport.authenticate('jwt', {session: false}),
  ReviewController.delete
);

router.delete('/reviews/:reviewId/images/:image',
  passport.authenticate('jwt', {session: false}),
  ReviewController.deleteReviewImage
);

router.get('/user/stars/:threadId/:userId',
	ThreadController.findStarOfCurrentUser
)

// user login/registration routes

router.post('/users',
  UserController.new
)

router.post('/login',
  UserController.login
)

router.get('/api/auth/user',
	UserController.user
)

router.post('/replies',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReplyController.create
)

router.get('/replies/:reviewId',
  ReplyController.findAll
);

router.put('/replies/:replyId',
  passport.authenticate('jwt', {session: false}),
  upload.array('image'),
  ReplyController.update
);

router.delete('/replies/:replyId',
  passport.authenticate('jwt', {session: false}),
  ReplyController.delete
);

router.delete('/replies/:replyId/images/:image',
  passport.authenticate('jwt', {session: false}),
  ReplyController.deleteReplyImage
);
module.exports = router;
