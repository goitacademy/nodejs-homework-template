const Joi = require("joi");

const addSchema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': '"name" should be a type of "string"',
      'string.empty': '"name" cannot be an empty field',
      'any.required': 'missing required name field'
    }),
    email: Joi.string().required().messages({
      'string.base': '"email" should be a type of "string"',
      'string.empty': '"email" cannot be an empty field',
      'any.required': 'missing required email field'
    }),
    phone: Joi.string().required().messages({
      'string.base': '"phone" should be a type of "string"',
      'string.empty': '"phone" cannot be an empty field',
      'any.required': 'missing required phone field'
    }),
});

module.exports = {
    addSchema,
}