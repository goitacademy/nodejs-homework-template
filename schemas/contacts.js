const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required().messages({
          'any.required': `missing name field`
      }),
    email: Joi.string().required().messages({
          'any.required': `missing email field`
      }),
    phone: Joi.required().messages({
          'any.required': `missing phone field`
      }),
  })

  module.exports = {
	addSchema,
}