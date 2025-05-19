const Joi = require('joi');

const ListingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow('', null),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    country: Joi.string().allow('', null)
});
const ReviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  comment: Joi.string().required()
});
module.exports = { ListingSchema, ReviewSchema };