import Joi from "joi";

export const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required field "name"`,
        "string.base": `"name" must be text`,
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required field "email"`,
    }),
    phone: Joi.string().required().messages({
       "any.required": `missing required field "phone"`,
    }), 
});


export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
})