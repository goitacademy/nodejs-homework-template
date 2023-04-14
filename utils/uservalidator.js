const Joi = require('joi');
const uservalidator = (data) => Joi.object({
    // name: Joi.string().min(3).max(12).required(),
    // phone: Joi.string().min(8).max(12).required(),
    email: Joi.string().email().required(),
    subscription: Joi.string(),
    password : Joi.string().required(),
}).validate(data)

module.exports = uservalidator 