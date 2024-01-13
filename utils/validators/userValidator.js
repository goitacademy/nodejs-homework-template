const Joi = require('joi');
const { regex } = require('../../constants');
const joiValidator = require('./joiValidator');

exports.userRegistrationValidator = joiValidator((data) =>
	Joi.object()
		.options({ abortEarly: false })
		.keys({
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
			password: Joi.string().regex(regex.PASSWD_REGEX).required(),
			subscription: Joi.string(),
		})
		.validate(data));


exports.subscriptionValidator = joiValidator((data) =>
	Joi.object()
		.options({ abortEarly: false })
		.keys({
			subscription: Joi.string().valid('starter', 'pro', 'business'),
		})
		.validate(data));