const Joi = require("joi");

// Joi shema for validate req user data
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': '"name" must be at least 3 characters long',
    'string.max': '"name" must be at most 50 characters long',
    'string.empty': '"name" cannot be an empty field',
    'any.required': '"name" is a required field',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'string.empty': '"email" cannot be an empty field',
    'any.required': '"email" is a required field',
  }),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': '"phone" must be in the format (XXX) XXX-XXXX',
      'string.empty': '"phone" cannot be an empty field',
      'any.required': '"phone" is a required field',
    }),
  favorite: Joi.boolean().messages({
    'boolean.base': '"favorite" must be a boolean',
  }),
});

module.exports = userSchema;