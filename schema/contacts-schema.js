import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `"name" must be exist`
    }),
     email: Joi.string().email().required().messages({
        "any.required": `"email" must be exist`
     }),
    phone: Joi.string().min(1).required() 
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.number()
})