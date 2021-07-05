const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(2).required(),
  phone: Joi.number().min(5).required(),
});

module.exports = contactSchema;
