const Joi = require('joi');

const errorMessages = {
    "string.base": "Field {#label} must be a string.",
    "string.empty": "Field {#label} cannot be empty.",
    "string.email": "Field {#label} must be a valid email address.",
    "string.pattern.base": "Field {#label} must be in the format (XXX) XXX-XXXX.",
    "any.required": "Missing required {#label} field.",
}

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required(),
})
    .unknown(false)
    .messages(errorMessages);

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

module.exports = {contactAddSchema, contactUpdateFavoriteSchema};