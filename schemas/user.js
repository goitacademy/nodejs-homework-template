const Joi = require('joi');
const { subscriptionList } = require('../models/user');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({ 'any.required': 'missing required "email" field', 'string.pattern.base': '{#label} format must be: example@example.com' }),
    password: Joi.string().trim().min(6).required().messages({ 'any.required': 'missing required "password" field', 'string.min': 'password must contain at least {#limit} characters' }),
    subscription: Joi.string().valid(...subscriptionList),
});

const loginSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({ 'any.required': 'missing required "email" field', 'string.pattern.base': '{#label} format must be: example@example.com' }),
    password: Joi.string().trim().min(6).required().messages({'any.required': 'missing required "password" field', 'string.min': 'password must contain at least {#limit} characters'}),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required().messages({'any.required': 'missing required "subscription" field'})
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({ 'any.required': 'missing required field email', 'string.pattern.base': '{#label} format must be: example@example.com' }),
})


module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    verifyEmailSchema,
};