const Joi = require('joi');

const createContactSchema = Joi.object({
  query: Joi.object(),
  params: Joi.object(),
  body: Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    phone: Joi.string().regex(/^[0-9]{10}$/).required(),
    favorite: Joi.bool(),
  }),
});

module.exports = createContactSchema;
