const Joi = require('joi');
const { regex } = require('../constants');

exports.userRegistrationValidator = (data) =>
	Joi
		.object()
		.keys({
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required(),
			password: Joi.string().regex(regex.PASSWD_REGEX).required(),
			subscription: Joi.string(),
		})
		.validate(data);