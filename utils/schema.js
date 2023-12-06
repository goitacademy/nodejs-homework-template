const Joi = require("joi");

const contactsSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string()
	  .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net", "ukr"] } })
	  .required(),
	phone: Joi.string()
	  .length(14)
	  .pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)
	  .required(),
 });

 module.exports = contactsSchema;