const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.number().min(0).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
});

const authValidateSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ua', 'ru', 'en'] },
    })
    .required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

module.exports = { contactSchema, authValidateSchema };
