const Joi = require("joi");

const contactsAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required().messages({
        "string.email": "Incorrect E-Mail Address",
        "any.required": "Email is required. Please provide an email address.", 
    }),
    phone: Joi.string().required(),
});

module.exports = {
    contactsAddSchema,
}