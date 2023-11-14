import Joi from "joi";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" must be exist`,
        "string.base": `"title" must be text`,
    }),
    director: Joi.string().required(),
})

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
})