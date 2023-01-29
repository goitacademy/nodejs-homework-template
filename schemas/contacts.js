const Joi = require('joi');

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: Joi.number().min(10).max(14),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: Joi.number().min(10).max(14),
});

module.exports = { schemaAddContact, schemaUpdateContact };