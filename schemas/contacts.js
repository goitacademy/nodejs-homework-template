const Joi = require("joi");

const contactsAddSchema = Joi.object({
    name: Joi.string().min(3).max(33).required().messages({
        "any.required": "Name is required. Please provide an name contact.",
        "string.min": "Name should have a minimum of {#limit} characters.",
        "string.max": "Name should have a maximum of {#limit} characters.",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Incorrect E-Mail Address",
        "any.required": "Email is required. Please provide an email address.", 
    }),
    phone: Joi.string().pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/).required().messages({
        "any.required": "Phone is required. Please provide an phone contact.",
        "string.pattern.base": "Invalid phone number format. Please provide a valid phone number.",
    }),
});

module.exports = {
    contactsAddSchema,
}