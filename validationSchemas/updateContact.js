const Joi = require('joi');

const updateContactSchema = Joi.object({
  query: Joi.object(),
  params: Joi.object({
    contactId: Joi.string().length(21).required(),
  }),
  body: Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().regex(/^[0-9]{10}$/).required(),
  }),
});

module.exports = updateContactSchema;