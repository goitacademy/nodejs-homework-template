import Joi from "joi";

export const contactsSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
        "any.required": `missing required name field`
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "any.required": `missing required email field`
    }),
    phone: Joi.number().required().messages({
        "any.required": `missing required phone field`
    })
})