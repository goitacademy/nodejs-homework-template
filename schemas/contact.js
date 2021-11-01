const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

module.exports = contactSchema;
