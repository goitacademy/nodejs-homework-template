const Joi = require("joi");

exports.schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).unknown(false);

exports.udatedFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).unknown(false);
