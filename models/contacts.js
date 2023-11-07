const Joi = require('joi');

const body = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

module.exports = body;
