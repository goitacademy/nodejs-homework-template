const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().pattern(/^[a-zA-Z\s'-]+$/).max(25).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\(\d{3}\) \d{3}-\d{4}$/).required()
})

module.exports = {schema}