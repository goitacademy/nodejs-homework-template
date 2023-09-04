import Joi from "joi"

const addSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(20)
    .required()
    .messages({
      'any.required': 'missing required name field',
    }),

  phone: Joi.string()
    .required()
    .messages({
      'any.required': 'missing required phone field',
    }),

  email: Joi.string()
  .required()
  .messages({
    'any.required': 'missing required email field',
  }),
})

export default addSchema