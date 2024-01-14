import Joi from 'joi'

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
    }),
    email: Joi.string().email().required().messages({
        "any.required": `missing required email field`,
    }),
    phone: Joi.number().required().messages({
        "any.required":`missing required phone field`,
    }),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.number(),
})
.min(1)
.message({
    "object.min": `missing field`,
})