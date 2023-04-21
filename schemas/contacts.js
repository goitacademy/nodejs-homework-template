const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
		.max(30)
		.pattern(/^[A-Za-z ]+$/)
        .required(),
    
  email:Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XX-XX.",
		})
        .required(),
})

module.exports = {
    addSchema,
}