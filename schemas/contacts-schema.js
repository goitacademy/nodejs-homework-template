import Joi from "joi";


export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
      }),
    email: Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
      }),
    phone: Joi.string().required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'any.required': `"name" is a required field`
      }),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})