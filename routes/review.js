const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/expressErrors.js');
const Review = require('../models/review.js');
const { ReviewSchema } = require('../schema.js');   
const {validateReview} = require('../middleware.js'); 
const {islogin} = require('../middleware.js');
const { isOwner ,isReviewAuthor} = require('../middleware.js');
const reviewController = require('../controllers/review.js');


// Review routes (create)
router.post("/",  validateReview,islogin,wrapAsync(reviewController.createReview));

// Review routes (delete)
router.delete("/:reviewId",islogin, isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;