const Joi = require("joi");

const ValidationSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  }).or('name', 'email', 'phone', 'favorite');

module.exports = ValidationSchema;


