const Joi = require("joi");

const contactComesSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(10).required(),
  favorite: Joi.boolean(),
});

module.exports = contactComesSchema;
