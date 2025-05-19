const { ReviewSchema } = require('./schema.js'); 
const Listing = require('./models/listing');
const Review = require('./models/review');
const { ListingSchema } = require('./schema.js');

module.exports.islogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be logged in to do that!');
        return res.redirect('/login');
    }
    next();
}


module.exports.saveReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
        delete req.session.returnTo;
    }
    next();
}

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!(res.locals.currUser && listing.owner._id.equals(res.locals.currUser._id))) {
        req.flash('error', 'you do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash('error', 'Review not found!');
        return res.redirect(`/listings/${id}`);
    }
    console.log(listing,review);
    if (!(res.locals.currUser && review.author._id.equals(res.locals.currUser._id))) {
        req.flash('error', 'you do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    const { error } = ListingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const review_ = ReviewSchema.validate(req.body.review);
    const { error } = review_;
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(400, msg);
    }
    else {
        next();
    }
};