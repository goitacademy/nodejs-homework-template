const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .regex(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

module.exports = contactsSchema;
