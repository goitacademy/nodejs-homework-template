import Joi from "joi";
import HttpError from "../helpers/HttpError.js";


const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required()
})

export const addContactValidation = (req, res, next) => {
	const { error } = contactAddSchema.validate(req.body);

	if (error) {
		if (error.details[0].type === "any.required") {
			throw HttpError(400, `missing required ${error.details[0].context.key} field`)
		} else {
			throw HttpError(400, error.message)
		}
	}

	return next()
}

export const updateContactValidation = (req, res, next) => {
	if (Object.keys(req.body).length === 0) {
		return res.status(400).json({ "message": "missing fields" })
	}

	const { error } = contactAddSchema.validate(req.body);
	if (error) {
		if (error.details[0].type === "any.required") {
			throw HttpError(400, `missing required ${error.details[0].context.key} field`)
		} else {
			throw HttpError(400, error.message)
		}
	}

	return next()
}
