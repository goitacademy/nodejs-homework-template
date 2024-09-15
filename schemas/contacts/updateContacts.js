const Joi = require('joi');

const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email().lowercase(),
    phone: Joi.string().regex(/^[0-9 ()-]+$/),
})
    .min(1)
    .options({
        messages: {
            'object.min': 'missing fields',
        },
    });

module.exports = updateContactSchema;
