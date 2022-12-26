const Joi = require("joi");

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
    subscription: Joi.string().required()

}
);
const LoginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required()

}
);

const SubscriptionSchema = Joi.object({
    subscription: Joi.any().valid('starter','pro', 'business').required(),

}
);
module.exports = { registerSchema, LoginSchema, SubscriptionSchema}