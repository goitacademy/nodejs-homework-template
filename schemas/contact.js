const Joi = require("joi");

const contactSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().regex(/^(\(\d{3}\) )\d{3}-\d{4}$/).required(),
  });

module.exports = contactSchema;