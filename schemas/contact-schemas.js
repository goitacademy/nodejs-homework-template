import Joi from 'joi'

export const contactAddScheme = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'missing required name',
        'string.base': 'name must be string'
    }),
    email: Joi.string().required().messages({
        'any.required': 'missing required email',
        'string.base': 'email must be string'
    }),
    phone: Joi.string().required().messages({
        'any.required': 'missing required phone',
        'string.base': 'phone must be string'
    })
})

export const contactUpdateScheme = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string()   
})
