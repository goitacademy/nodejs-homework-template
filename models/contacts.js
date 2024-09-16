const { Schema, model } = require('mongoose')
const Joi = require('joi')
const addSchema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': `"name" is required`,
	}),
	email: Joi.string().required().messages({
		'any.required': `"email" is required`,
	}),
	phone: Joi.string().required().messages({
		'any.required': `"phone" is required`,
	}),
	favorite: Joi.boolean(),
})
const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({ message: 'missing field favorite' }),
})
const contactSchema = Schema(
	{
		name: { type: String, required: [true, 'Type in a name'] },
		email: { type: String, required: [true, 'Type in email'] },
		phone: { type: String, required: [true, 'Type in phone number'] },
		favorite: { type: Boolean, default: false },
	},
	{ versionKey: false, timestamps: true }
)

contactSchema.post('save', (error, data, next) => {
	error.status = 400
	next()
})
const schemas = { addSchema, updateFavoriteSchema }
const Contact = model('contact', contactSchema)

module.exports = { Contact, schemas }
