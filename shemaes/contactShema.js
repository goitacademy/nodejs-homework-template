import Joi from "joi";

export const addContactShema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
})

export const updateContactShema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})