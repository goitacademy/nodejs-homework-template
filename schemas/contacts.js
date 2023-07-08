const Joi = require("joi")

const addSchema = Joi.object({
    name: Joi.string()
    .trim()
    .required(),
    email: Joi.string()
    .trim()
    .email()
    .required(),
    phone: Joi.string()
    .trim()
    .regex(/^\+\d{1}\d{8,15}$/)
    .messages({
      'string.pattern.base': 'Phone number must start with a plus sign (+) and have 9 to 16 digits.',
    })
    .required()
  });
  module.exports = addSchema