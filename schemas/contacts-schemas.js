import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "message": `"missing required name field"`
    }),
    email: Joi.string().required().messages({
        "message": `"missing required name field"`
    }),
    phone: Joi.string().required().messages({
        "message": `"missing required name field"`
    }),
})

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})