const Joi = require('joi');

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).messages({ 'string.pattern.base': 'Invalid phone number format. The format should be (XXX) XXX-XXXX.' }).required(),
});

module.exports = {
    addSchema,
}