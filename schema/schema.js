const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  email: Joi.string().trim().email().required(),
  phone: Joi.number().integer().required(),
});

module.exports = contactSchema;