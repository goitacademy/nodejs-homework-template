const Joi = require('joi');

exports.createUserDataValidator = (data) =>
	Joi
		.object()
		.options({ abortEarly: false })
		.keys({
			name: Joi.string().min(3).max(12).required(),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			phone: Joi.string().min(6).required(),
			favorite: Joi.boolean(),
		})
		.validate(data);

exports.updateUserDataValidator = (data) =>
	Joi
		.object()
		.keys({
			name: Joi.string().min(3).max(12).required(),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }),
			phone: Joi.number().min(6).required(),
			favorite: Joi.boolean(),
		})
		.validate(data);

exports.updateUserDataValidatorfavorite = (data) =>
	Joi
		.object()
		.keys({
			favorite: Joi.boolean().required().messages({ 'any.required': 'Missing field favorite' }),
		})
		.validate(data);



