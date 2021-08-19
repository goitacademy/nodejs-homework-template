const Joi = require('joi');
const ErrorException = require('../exceptions/error.exception');

const create = Joi.object({
	name: Joi.string().min(2).max(32).required(),
	phone: Joi.string().pattern(new RegExp(/[0-9+()\s]{5,15}/)),
	email: Joi.string().email().required()
});

const update = Joi.object({
	name: Joi.string().min(2).max(32),
	phone: Joi.string().pattern(new RegExp(/[0-9+()\s]{5,15}/)),
	email: Joi.string().email()
}).or('name', 'email', 'phone');

const validate = async (schema, obj, next) => {
	try {
		await schema.validateAsync(obj, {abortEarly: false})
		return next()
	} catch (err) {
		console.log(err);
		next(ErrorException.BadRequest('Validation error', err.details));
	}
}

module.exports = {
	validationCreate: async (req, res, next) => await validate(create, req.body, next),
	validationUpdate: async (req, res, next) => await validate(update, req.body, next),
}
