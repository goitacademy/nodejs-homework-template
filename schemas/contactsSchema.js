import Joi from 'joi'
import validator from 'validator'

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ 'any.required': `"title" must be exist` }),
  email: Joi.string().required().email(),
  phone: Joi.string()
    .required()
    .custom((value, helper) => {
      if (!validator.isMobilePhone(value)) {
        return helper.message('phone is incorrect')
      }
      return value
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
