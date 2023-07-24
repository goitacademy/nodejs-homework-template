const Joi = require('joi');

const subscriptionList = ['starter', 'pro', 'business'];

const registerSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
});

const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...subscriptionList)
        .required(),
});

const verifySchema = Joi.object({
    email: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
    verifySchema,
};
