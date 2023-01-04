const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().alphanum().min(8).max(14).required(),
});

module.exports = { contactSchema };
