const Joi = require("joi");


const validationContact = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .pattern(/^[A-Za-z]+$/)
        .messages({
            "string.pattern.base":
            "invalid name. The name must be written only in letters and contain from 2 to 30",
        })
        .required(),
    email: Joi.string()
        .email({minDomainSegments: 2})
        .messages({
            "string.pattern.base":
            "Invalid email. The email must be valid.",
        })
        .required(),
    phone: Joi.string()
        .pattern(/^\(d{3}\) \d{3}-\d{4}$/)
        .messages({
            "string.pattern.base":
            "Invalid phoe number format. The format should be (xxx) xxx-xxxx.",
        })
        .required(),
});

module.exports = validationContact;