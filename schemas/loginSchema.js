const Joi = require('joi');

const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().required(),
});

module.exports = loginSchema;