const Joi = require('joi');

const contactAddSchema = Joi.object({
    name: Joi.string().messages({
        'any.required': `missing required name field`
    }).required(),
    email: Joi.string().email().messages({
        'any.required': `missing required name field`
    }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({
        'any.required': `missing required name field`
    }).required(),
});

module.exports = {
    contactAddSchema,
}