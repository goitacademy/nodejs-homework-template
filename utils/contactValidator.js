const Joi = require('joi');

exports.createContactValidator = (data) => Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    phone: Joi.string().required(),
}).validate(data);

