const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    owner :{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    category: {
  type: [String], // array of strings
  enum: [
    "Beach Access",
    "Hot Tub",
    "Gym",
    "Waterfront",
    "Family Friendly",
    "TV/Entertainment",
    "Accessible",
    "Sunny",
    "Nature",
    "Bike Friendly",
    "Nightlife",
    "Historic",
    "Public Transit",
    "Breakfast",
    "Security"
  ],
  default: []
},


});

listingSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;