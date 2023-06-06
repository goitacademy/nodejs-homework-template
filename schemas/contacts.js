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

const favouriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

  module.exports = {
	addSchema,
  favouriteSchema,
}