const Joi = require('joi');
const joiValidator = require('./joiValidator');

exports.createUserDataValidator = joiValidator((data) =>
	Joi
		.object()
		.options({ abortEarly: false })
		.keys({
			name: Joi.string().min(3).max(12).required(),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			phone: Joi.string().min(6).required(),
			favorite: Joi.boolean(),
		})
		.validate(data));


exports.updateUserDataValidator = joiValidator((data) =>
	Joi
		.object()
		.keys({
			name: Joi.string().min(3).max(12),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
			phone: Joi.string().min(6),
			favorite: Joi.boolean(),
		})
		.validate(data));


exports.updateUserDataValidatorfavorite = joiValidator((data) =>
	Joi
		.object()
		.keys({
			favorite: Joi.boolean().required().messages({ 'any.required': 'Missing field favorite' }),
		})
		.validate(data));





