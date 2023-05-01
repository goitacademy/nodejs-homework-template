const Joi = require('joi');

const updateStatusContactSchema = Joi.object({
    favorite: Joi.bool().required(),
}).messages({
    'any.required': 'missing field favorite',
});

module.exports = updateStatusContactSchema;
