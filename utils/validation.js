const Joi = require("joi");
const schemaStrict = Joi.object({
	name: Joi.string()
		.trim()
		.min(3)
		.regex(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
		.messages({
			"string.pattern.base": `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.`,
		})
		.required(),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.required(),
	phone: Joi.string()
		.trim()
		.regex(
			/\+?\d{2,3}[-\s\(]{0,3}\d{2,3}[-\s\)]{0,3}\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}/
		)
		.messages({
			"string.pattern.base": `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
		})
		.required(),
});
const schema = Joi.object({
	name: Joi.string()
		.trim()
		.min(3)
		.regex(/^[A-ZА-Я][a-zа-я]{2,}[\s][A-ZА-Я][a-zа-я]{2,}$/)
		.messages({
			"string.pattern.base": `Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan.`,
		}),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ["com", "net"] },
	}),

	phone: Joi.string()
		.trim()
		.regex(
			/\+?\d{2,3}[-\s\(]{0,3}\d{2,3}[-\s\)]{0,3}\d{2,3}[-\s]?\d{2,3}[-\s]?\d{2,3}/
		)
		.messages({
			"string.pattern.base": `Phone number must be digits and can contain spaces, dashes, parentheses and can start with +`,
		}),
});
const dataValidation = (body, strict = true) => {
	if (strict) {
		return schemaStrict.validate(body);
	}
	return schema.validate(body);
};

module.exports = dataValidation;
