const Joi = require('joi');

const userSchema = Joi.object({
	email: Joi.string().email({ minDomainSegments: 2 }).required(),
	password: Joi.string().min(8).max(20).required(),
	subscription: Joi.string().valid('starter', 'premium', 'vip'),
});

module.exports = userSchema;