const Joi = require('joi');

const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  phone: Joi.string().min(10).max(13).required(),

  favorite: Joi.string(),
});

module.exports = createContactSchema;
