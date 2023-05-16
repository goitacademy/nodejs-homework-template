const Joi = require("joi");

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required 'name' field`
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required 'email' field`
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required 'phone' field`
    }),
});

const contactUpdateSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
    email: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
});

module.exports = { 
    contactAddSchema,
    contactUpdateSchema
};