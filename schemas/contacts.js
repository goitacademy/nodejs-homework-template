const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(5).max(15).required(),
}).min(1);

module.exports = contactSchema;
