const joi = require('joi')

const contactSchema = joi.object({
	name: joi.string().min(3), //NAME SHOULD HAVE MINIMUM 3 SYMBOLS
	email: joi.string().email(),//EMAIL SHOULD BE IN CORRECT FORMAT
	phone: joi.string().min(5),//PHONE SHOULD HAVE AT LEAST 5 SYMBOLS
})

const validator = schema => body => {
	return schema.validate(body)
}

const contactValidator = validator(contactSchema)

module.exports = { contactValidator }