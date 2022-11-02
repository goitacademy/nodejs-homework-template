const Joi = require('joi');

const dataSchema = Joi.object({
    phone: Joi.string().trim().regex(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).required().messages({
      'any.required': `{{#label}} is a required field`,
      'string.empty': '{{#label}} is not allowed to be empty'
    }),
    name: Joi.string().trim().required().messages({
      'any.required': `Name is a required field`
    }),
    email: Joi.string().email().trim().required().messages({
      'string.email': 'Your email must be a valid email. Please enter the valid email.',
      'string.empty': 'Your email is not allowed to be empty',
    }),
}).required();


module.exports = { 
    dataSchema
}