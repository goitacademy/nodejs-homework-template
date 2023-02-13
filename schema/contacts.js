const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
});

module.exports = { contactSchema };
