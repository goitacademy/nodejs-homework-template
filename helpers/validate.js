const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'ua', 'net'] } })
    .required(),
  phone: Joi.string()
    .length(14)
    .pattern(/^(\([0-9]{3}\)) [0-9]{3}-[0-9]{4}$/)
    .required(),
});

module.exports = contactsSchema;
