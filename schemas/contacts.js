const Joi = require("joi")

const addSchema = Joi.object({
	email: Joi.string().required(),
	name: Joi.string().required(),
	phone: Joi.string().required(),
})

module.exports = { addSchema }
