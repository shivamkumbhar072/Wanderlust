
const Listing = require('../models/listing.js');
const ExpressError = require('../utils/expressErrors.js');
const { ListingSchema } = require('../schema.js');
const Review = require('../models/review.js');
const User = require('../models/user.js');



module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

module.exports.new = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.show = async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate({path:'reviews',populate : ({path:"author"})}).populate("owner");
    if (!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    // console.log(res.locals.currUser._id);
    // console.log(listing.owner._id);
    res.render('listings/show.ejs', { listing });
}

module.exports.create = async(req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body);
    newListing.owner = req.user._id; 
    newListing.image = { url, filename };
    await newListing.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect('/listings');
}
module.exports.edit = async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }
    if (listing.image && listing.image.url) {
        listing_prev = listing.image.url.replace("/uploads", "/uploads/h_300,w_250");
    }
    res.render('listings/edit.ejs', { listing });
}

module.exports.update = async(req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body, { new: true });
    if(req.file) {
        const url = req.file.path;
        const filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    
    req.flash('success', "Your listing has been updated successfully.");
    res.redirect(`/listings/${id}`);
}

module.exports.delete = async(req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', "The listing has been deleted successfully.");
    res.redirect('/listings');
}