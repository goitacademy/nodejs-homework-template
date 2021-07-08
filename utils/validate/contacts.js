const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(3).required().email(),
  phone: Joi.number().min(6).required(),
});

module.exports = contactSchema;
