const Joi = require('joi');

const registerUser = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
});

const updateSubscription = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

module.exports = {
    registerUser,
    updateSubscription,
};
