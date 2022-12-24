const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
});

module.exports = {
    addSchema,
}