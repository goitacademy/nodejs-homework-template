const Joi = require('joi');
const { regexp, constants } = require('../vars');

exports.userSchema = Joi.object({
    password: Joi.string()
        .pattern(regexp.pswd)
        .required()
        .messages({ 'any.required': 'Password is required' }),
    email: Joi.string()
        .pattern(regexp.email)
        .required()
        .messages({ 'any.required': 'Email is required' }),
    subscription: Joi.string().valid(...Object.values(constants.subscrUser)),
});

exports.updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...Object.values(constants.subscrUser))
        .required()
        .messages({ 'any.required': 'Subscription is required' }),
});

exports.checkEmailSchema = Joi.object({
    email: Joi.string()
        .pattern(regexp.email)
        .required()
        .messages({ 'any.required': 'missing required field email' }),
});
