const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

module.exports = contactAddSchema;
