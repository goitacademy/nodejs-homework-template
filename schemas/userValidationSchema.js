const Joi = require('joi');

const userCreateValidationSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  password: Joi.string().min(6).max(16).required(),
});

const userUpdateStatusValidationSchema = Joi.object({
  subscription: Joi.required(),
});

module.exports = {
  userCreateValidationSchema,
  userUpdateStatusValidationSchema,
};
