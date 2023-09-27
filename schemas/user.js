const Joi = require('joi');
const { subscriptionList } = require('../models/user');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({ 'any.required': 'missing required "email" field' }),
    password: Joi.string().trim().min(6).required().messages({'any.required': 'missing required "password" field', 'string.min': 'password must contain at least {#limit} characters'}),
});

const loginSchema = Joi.object({
    email: Joi.string().trim().pattern(emailRegexp).required().messages({ 'any.required': 'missing required "email" field' }),
    password: Joi.string().trim().min(6).required().messages({'any.required': 'missing required "password" field', 'string.min': 'password must contain at least {#limit} characters'}),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptionList).required().messages({'any.required': 'missing required "subscription" field'})
});


module.exports = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
};