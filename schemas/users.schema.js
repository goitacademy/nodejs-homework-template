const Joi = require("joi");

const userSchema = Joi.object({
    email: Joi
        .string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({ 'any.required': "missing required email field" }),
    password: Joi
        .string()
        .min(8)
        .max(10)
        .required()
        .messages({
            'any.required': "missing required password field"
        }),
})



module.exports = { userSchema }