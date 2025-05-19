const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/expressErrors.js');
const { ListingSchema } = require('../schema.js');
const Review = require('../models/review.js');
const User = require('../models/user.js');
const {islogin} = require('../middleware.js');
const { isOwner } = require('../middleware.js');
const {validateListing} = require('../middleware.js');
const listingControllers = require('../controllers/listing.js');
const wrapAsync = require('../utils/wrapAsync.js');

const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });

router
.route('/')
.get( wrapAsync(listingControllers.index))
.post(validateListing, islogin,upload.single('image'), wrapAsync(listingControllers.create));

// new listing route
router.get("/new", islogin,listingControllers.new);


router
.route("/:id")
.get(wrapAsync(listingControllers.show))
.put(validateListing, islogin,isOwner,upload.single('image'),wrapAsync(listingControllers.update))
.delete(islogin,isOwner,wrapAsync(listingControllers.delete));


// edit route
router.get("/:id/edit", islogin,isOwner,wrapAsync(listingControllers.edit));

module.exports = router;