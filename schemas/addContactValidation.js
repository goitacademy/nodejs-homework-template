const Joi = require('joi');

const addContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string().min(9).max(15).required(),
});

module.exports = { addContactSchema };