import Joi from 'joi'
import validator from 'validator'

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': `missing required name field` }),
  email: Joi.string().required().email().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!validator.isMobilePhone(value)) {
        return helper.message('phone is incorrect')
      }
      return value
    })
    .messages({
      'any.required': 'missing required phone field',
    }),
})

export const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().custom((value, helper) => {
    if (!validator.isMobilePhone(value)) {
      return helper.message('phone is incorrect')
    }
    return value
  }),
})
