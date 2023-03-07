const Joi = require("joi");

const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const singUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().pattern(emailRegEx).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    password: Joi.string().min(6).required(),
});

const singInSchema = Joi.object({
    email: Joi.string().pattern(emailRegEx).required().messages({
        "string.pattern.base": `Please fill a valid email address`,
    }),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const userSchemas = { singUpSchema, singInSchema, subscriptionSchema };


module.exports = userSchemas;