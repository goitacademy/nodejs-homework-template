const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),

  password: Joi.string().token().min(6).max(24).required(),
});

module.exports = userSchema;
