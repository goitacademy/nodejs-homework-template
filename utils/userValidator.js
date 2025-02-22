const Joi = require('joi');

exports.createUserDataValidator = (data) =>
	Joi
		.object()
		.options({ abortEarly: false })
		.keys({
			name: Joi.string().min(3).max(12).required(),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			phone: Joi.number().min(6).required(),
		})
		.validate(data);

exports.updateUserDataValidator = (data) =>
	Joi
		.object()
		.keys({
			name: Joi.string().min(3).max(12).required(),
			email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
			phone: Joi.number().min(6).required(),
		})
		.validate(data);
