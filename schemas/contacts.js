const Joi = require('joi');

const contactSchema = Joi.object({
    name: Joi.string().required().messages({'any.required': `missing required name field`, 'string.empty': `missing required name field`}),
    email: Joi.string().required().messages({'any.required': `missing required email field`, 'string.empty': `missing required email field`}),
    phone: Joi.string().required().messages({'any.required': `missing required phone field`, 'string.empty': `missing required phone field`})
});

module.exports = {
    contactSchema
}