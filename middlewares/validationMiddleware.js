const Joi = require('joi');

const contactValidation = Joi.object({
    name: Joi.string()
        .pattern(/^\D+\s\D+$/)
        .trim(),
    email: Joi.string()
        .email(),

    phone: Joi.string().pattern(/^\W+\d{3}\W+\s\d+\-*\d*$/),
});

module.exports = contactValidation;