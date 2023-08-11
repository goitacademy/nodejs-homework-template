const joi = require('joi')

const contactSchema = joi.object({
	name: joi.string().min(3).required(),
	email: joi.string().email().required(),
	phone: joi.string().min(5).required(),
})

const validator = schema => body => {
	return schema.validate(body)
}

const contactValidator = validator(contactSchema)

module.exports = { contactValidator }